'use strict';

//Animate headers of .section
let hideHeader = header => {
  header.css('text-indent', '-9999px');
};

let showHeader = header => {
  header.css('text-indent', '0px');
};

let animateHeader = (header, text) => {
  //clear header text
  header.text("");
  //and animate it
  let nextAnimationStep = () => {
    if (text.length > 0) {
      header.text(header.text() + text.substr(0,1));
      text = text.substr(1);
      setTimeout(nextAnimationStep, 100);
    }
  };
  nextAnimationStep();
};

let animateHeaders = headers => {
  return Object.keys(headers).map((key, index) => {
    let elementSelector = key;
    let offset = headers[key];
    let header = $(elementSelector);
    hideHeader(header);
    let waypoint = {};
    waypoint[key] = header.waypoint({
      handler: function() {
        showHeader(header);
        animateHeader(header, header.text());
        this.destroy();
      },
      offset: offset
    })[0];
    return waypoint;
  }).reduce(Object.assign, {});
};

//All ids of titles should be written here to animation work
let animatedHeaders = animateHeaders({
  "#hello_header": '90%',
  "#resume_header": '70%',
  "#portfolio_header": '70%',
  "#testimonials_header": '70%',
  "#blog_header": '70%',
  "#contacts_header": '70%',
  "#other_posts": '70%'
});