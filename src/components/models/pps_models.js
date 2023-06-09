class MyClass {
    // #date_pp_in = null
    constructor() {
      this.date_pp_in = null;
      this.date_work = null;
      this.date_pp_out = null;
      this.days = 0;
      this.date_processing = null;
      this.application_number = null;
      this.operation = null;
      this.price_wo_nds = 0;
      this.counterparty = null;
      this.wagon = 0;
      this.for_cargo = null;
      this.from_cargo = null;
      this.act_date = null;
    }
    set date_pp_in(value) {
      let date;
      date = value;
      let reverse = date?.split(".")?.reverse()?.join("-");
      this._date_pp_in = reverse;
    }
    get date_pp_in(){
      return this.date_pp_in = this._date_pp_in
    }
  
    set date_work(value) {
      let date;
      date = value;
      let reverse = date?.split(".")?.reverse()?.join("-");
      this._date_work = reverse;
    }
    get date_work(){
      return this.date_work = this._date_work
    }
    set date_pp_out(value) {
      let date;
      date = value;
      let reverse = date?.split(".")?.reverse()?.join("-");
      this._date_pp_out = reverse;
    }
    get date_pp_out(){
      return this.date_pp_out = this._date_pp_out
    }
    set date_processing(value) {
      let date;
      date = value;
      let reverse = date?.split(".")?.reverse()?.join("-");
      this._date_processing = reverse;
    }
    get date_processing(){
      return this.date_processing = this._date_processing
    }
    JSON(){
      return {
        date_pp_in: this._date_pp_in || null,
        date_work: this._date_work || null,
        date_pp_out:  this._date_pp_out || null,
        date_processing: this._date_processing || null,
        days: this.days,
        application_number:   this.application_number,
        operation:this.operation,
        price_wo_nds: this.price_wo_nds ,
        counterparty: this.counterparty,
        wagon: this.wagon ,
        for_cargo: this.for_cargo,
        from_cargo: this.from_cargo,
        act_date: this.act_date,
      }
    }
  }

  export default {
    MyClass
  }