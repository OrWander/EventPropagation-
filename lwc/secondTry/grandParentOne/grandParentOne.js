import { LightningElement, track, api, wire } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import PARENTS_MARRIED_FIELD from '@salesforce/schema/Account.parentsMarried__c';
import NUMBER_OF_GRANDCHILDREN_FIELD from '@salesforce/schema/Account.numOfGrandchildren__c';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';

const FIELDS = [PARENTS_MARRIED_FIELD, NUMBER_OF_GRANDCHILDREN_FIELD];

export default class GrandparentOne extends LightningElement {
    @api recordId;
    @track account;
    @track showMessage = false;
    @track parentsMarried = false;
    @track numberOfGrandchildren = 0;
    @track contacts = [];

    connectedCallback(){
        this.loadContacts();                     
    }

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredAccount({ error, data }) {
        if (data) {
            console.log("31 / GrandparentOne / wiredAccount / data", data);  
            this.account = data;
            this.parentsMarried = data.fields.parentsMarried__c.value;
            if (this.parentsMarried) {
                this.numberOfGrandchildren = data.fields.numOfGrandchildren__c.value;
            }
        }
    }

    loadContacts() {
        getContacts({ accountId: this.recordId })
            .then(result => {
                console.log("31 / GrandparentOne / loadContacts / getContacts res", result);  
                this.contacts = result;
                this.showMessage = this.contacts.length < 2;
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleConnect() {
        const fields = {};
        fields[ACCOUNT_ID_FIELD.fieldApiName] = this.recordId;
        fields[PARENTS_MARRIED_FIELD.fieldApiName] = true;

        updateRecord({ fields })
            .then((res) => {
                console.log("46 grandParentOne / handleConnect / updateRecord ",res);
               this.parentsMarried = true;
               this.numberOfGrandchildren = 0;
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleAddGrandchild() {
        const fields = {};
        fields[ACCOUNT_ID_FIELD.fieldApiName] = this.recordId;
        fields[NUMBER_OF_GRANDCHILDREN_FIELD.fieldApiName] = this.numberOfGrandchildren;

        updateRecord({ fields })
            .then(() => {
                this.numberOfGrandchildren++;
            })
            .catch(error => {
                console.error(error);
            });
    }
    get firstContactName() {
        return this.contacts.length > 0 ? this.contacts[0].Name : '';
    }

    get secondContactName() {
        return this.contacts.length > 1 ? this.contacts[1].Name : '';
    }

}
