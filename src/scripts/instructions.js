var H5P = H5P || {};
var $ = H5P.jQuery;

function constructor(options, id) {
  this.options = options;
  this.id = id;
  
  //set default values
  // ...

  this.showStep = ($container) => {
    let step = this.options.steps[this.step];

    $display = $container.find('.step-display');

    let stepprefix = this.options.transl_step.replace('@step', this.step + 1);
    $display.find('.title h2').empty().append(stepprefix + ' ' + step.title);

    $notes = $display.find('.notes ul');
    $notes.empty();
    step.notes.forEach(note => {
      $notes.append('<li>' + note.text + '</li>');
    });

    this.showImage(this.options.steps[this.step].picture, $display);
  }

  this.showImage = (image, $display) => {
    $image = $display.find('.image');
    $image.empty();
    if (image != null) {
      $image.append('<img src="' + H5P.getPath(image.path, this.id) + '">');
    }
  }

  this.updateStep = (newStep, $container) => {
    this.step = newStep;
    this.showStep($container);
  }

  this.prevStep = ($container) => {
    step = this.step - 1;
    if (step >= 0) {
      this.updateStep(step, $container);
    }
  }

  this.nextStep = ($container) => {
    step = this.step + 1;
    if (step < this.options.steps.length) {
     this.updateStep(step, $container);
    }
  }

  this.startSteps = ($container) => {
    var that = this;

    this.step = 0;
    $display = $container.find('.step-display');

    $title = $display.find('.title');
    $title.empty();
    $title.append('<h2></h2>');

    $buttons = $container.find('.buttons');
    $buttons.empty();
    $buttons.append('<button class="prev">' + this.options.transl_prev + '</button>');
    $buttons.append('<button class="next">' + this.options.transl_next + '</button>');
    $buttons.find('.prev').click(function () { that.prevStep($container); });
    $buttons.find('.next').click(function () { that.nextStep($container); });

    this.showStep($container);
  }
}

constructor.prototype.attach = function ($container) {
  var that = this;

  $container.addClass("h5p-instructions");
  //$container.append('<p>' + JSON.stringify(this.options) + "</p>");
  $container.append('<div class="step-display"><div class="title"><h2></h2></div><div class="image"></div><div class="notes"><ul></ul></div></div>')
  $container.append('<div class="buttons"></div>');

  $display = $container.find('.step-display');

  this.showImage(this.options.cover, $display);

  $title = $display.find('.title');
  $title.find('h2').append(this.options.title);



  $notes = $display.find('.notes ul');
  $notes.append('<li>' + this.options.transl_difficulty + ' ' + this.options.difficulty + '</li>');
  $notes.append('<li>' + this.options.transl_steps + ' ' + this.options.steps.length.toString() + '</li>');
  $notes.append('<li>' + this.options.transl_time + ' ' + '...ei ole öeldud...' + '</li>');

  $buttons = $container.find('.buttons');
  $buttons.append('<button class="start">' + this.options.transl_start + '</button>');
  $buttons.find('.start').click(function () { that.startSteps($container); });  
}

H5P.Instructions = constructor;