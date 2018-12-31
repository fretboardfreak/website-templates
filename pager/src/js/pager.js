/*
 * pager.js
 *
 * Version: 1.0
 */

export class Pager {
  index = 0;
  identifier;  // identifier for  Pager elements on html page
  json_url;
  media = [];
  load_cb; // callback used to format the contents of the page

  constructor(identifier, json_url, load_cb){
    this.identifier = identifier;
    this.json_url = json_url;
    this.load_cb = load_cb;
  }

  // Register click events for the Next and Previous calls
  static register(instance) {
    $("#pgr-" + instance.identifier + "-next").click(function(){
      instance.next();
    });
    $("#pgr-" + instance.identifier + "-prev").click(function(){
      instance.previous();
    });
  }

  // Load the data from the server side JSON file
  load () {
    $.ajax({
      url: this.json_url,
      data: '',
      type: 'GET',
      context: this,
      dataType: 'json',
      success: function(response){
        this.media = response.data;
        this.update();
      },
      error: function(error){
        console.log('Error loading pager data: '  + error);
      }
    });
  }

  // Update the pager contents when a next or previous event is triggered.
  // The load_cb() callback is called with the pager content element and the
  // data for the next page from the JSON file. It is up to the load_cb()
  // callback to format the data and load them into the pager content element.
  update() {
    this.load_cb($("#pgr-" + this.identifier), this.media[this.index]);

    if (this.index == 0) {
      $("#pgr-" + this.identifier + "-prev").prop('disabled', true);
    } else {
      $("#pgr-" + this.identifier + "-prev").prop('disabled', false);
    }
    if (this.index == this.media.length - 1) {
      $("#pgr-" + this.identifier + "-next").prop('disabled', true);
    } else {
      $("#pgr-" + this.identifier + "-next").prop('disabled', false);
    }
  }

  // Move to the next page.
  next() {
    if (this.index < this.media.length - 1) {
      this.index = this.index + 1;
      this.update();
    }
  }

  // Move to the previous page.
  previous() {
    if (this.index > 0) {
      this.index = this.index - 1;
      this.update();
    }
  }

}
