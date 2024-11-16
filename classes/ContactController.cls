/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 11-16-2024
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class ContactController {
        @AuraEnabled(cacheable=true)
   public static List<Contact> getContacts(Id accountId) {
       return [SELECT Id, Name FROM Contact WHERE AccountId = :accountId];
   }
}
