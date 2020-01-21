import  moment from 'moment';
class Order {
    constructor(id, itemdata, totalamount, date) {
        this.id = id;
        this.itemdata = itemdata;
        this.totalamount = totalamount;
        this.date = date;
    };
    get readableDate(){
        return moment(this.date).format('MMM Do YYYY, hh:mm');
    }
}

export default Order;