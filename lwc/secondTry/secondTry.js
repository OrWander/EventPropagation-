import { LightningElement, track } from "lwc";

export default class SecondTry extends LightningElement {
  @track dynamicGreeting = "Hi";
  @track displayDiv = false;
  @track someArray = ["fliz", "floz", "gadol", "meod"];
  @track new_number;
  @track arr=[];
  firstNumber;
  secondNumber;

  greetingChangeHandler(event) {
    this.dynamicGreeting = event.target.value;
  }
  showDivHandler(event) {
    this.displayDiv = event.target.checked;
  }
  changeNumberHandler(event) {
    const inputBox = event.target.name;
    if (inputBox === "firstNumber") {
      this.firstNumber = event.target.value;
    } else if (inputBox === "secondNumber") {
      this.secondNumber = event.target.value;
    }
  }
  addcalculate() {
    console.log("HI!", this.firstNumber);
    // eslint-disable-next-line radix
    const firstN = parseInt(this.firstNumber);
    // eslint-disable-next-line radix
    const secN = parseInt(this.secondNumber);
    this.new_number = (firstN + secN);
    this.arr.push(this.new_number)
  }
  subcalculate() {
    // eslint-disable-next-line radix
    const firstN = parseInt(this.firstNumber);
    // eslint-disable-next-line radix
    const secN = parseInt(this.secondNumber);
    this.new_number = (firstN - secN);
    this.arr.push(this.new_number)

  }
  mulcalculate() {
    // eslint-disable-next-line radix
    const firstN = parseInt(this.firstNumber);
    // eslint-disable-next-line radix
    const secN = parseInt(this.secondNumber);
    this.new_number = (firstN * secN);
    this.arr.push(this.new_number)

  }
  divcalculate() {
    // eslint-disable-next-line radix
    const firstN = parseInt(this.firstNumber);
    // eslint-disable-next-line radix
    const secN = parseInt(this.secondNumber);
    this.new_number = (firstN / secN);
    this.arr.push(this.new_number)

  }
}