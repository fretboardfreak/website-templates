=====
Pager
=====

:author: Curtis Sand <curtissand@gmail.com>

:lastedit: 20181230-1830


Pager provides a simple javascript class that facilitates paging through
different types of content without having to load lots of large files all up
front. The Pager class reads a list of strings from a server side JSON file and
uses the resulting strings to dynamically load elements on the page.

For example, if the JSON data contains URLs to images, the pager would allow
you to iterate through the images, loading them one at a time, while ensuring
that the images are only loaded when needed instead of loading all images at
once when the page loads.

The pager class takes an identifier string so that it can find both the element
to place the content in and the buttons for triggering the next and previous
events. As such, given the identifier "myPager" the element that receives the
content will have the ID "pgr-myPager" while the buttons will have the ID's
"pgr-myPager-next" and "pgr-myPager-prev" as appropriate.


Example: Load one image at a time from "images.json"

*images.json* ::

    {"data": [
      "firstImage.jpg",
      "second.jpg",
      "foo.jpg",
      "bar.jpg"]
    }


In the HTML include the elements for the pager::

    <div>
      <div id="pgr-myPager"></div>
      <button id="pgr-myPager-next">Next</button>
      <button id="pgr-myPager-prev">Prev</button>
    </div>


Then in the Document Ready event in your website you would instantiate the
Pager something like this::

    import {Pager} from './pager.js';

    // callback to load the next page. Here we render it as an image with the
    // JSON data as the source URL
    function load_cb(tag, content) {
      tag.html('<img src="' + content + '"/>');
    }

    // Document Ready Event
    $(document).ready(function() {
      // create instance of pager with ID "myPager"
      var pager = new Pager('myPager', 'images.json' load_cb);

      // register the pager events with the buttons
      Pager.register(pager);

      // tell pager to read the JSON file and load the first page
      pager.load();
    });
