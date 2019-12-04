var H5P = H5P || {};
var $ = H5P.jQuery;

function constructor(options, id) {
  this.options = options;
  this.id = id;

  this.step = 0;
  
  //set default values
  // ...

  this.showStep = ($container) => {
    let step = this.options.steps[this.step];

    $display = $container.find('.step-display');

    $display.find('.title h2').empty().append(step.title);

    $notes = $display.find('.notes ul');
    $notes.empty();
    step.notes.forEach(note => {
      $notes.append('<li>' + note.text + '</li>');
    });

    $image = $display.find('.image');
    $image.empty();
    if (this.options.steps[this.step].picture != null) {
      $image.append('<img src="' + H5P.getPath(this.options.steps[this.step].picture.path, this.id) + '">');
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
}

constructor.prototype.attach = function ($container) {
  var that = this;
  $container.addClass("h5p-instructions");
  //$container.append('<p>' + JSON.stringify(this.options) + "</p>");
  $container.append('<div class="step-display"><div class="title"><h2></h2></div><div class="image"></div><div class="notes"><ul></ul></div></div>')
  
  $container.append('<div class="buttons"><button class="prev">AAAAAAAA</button><button class="next">EEEEEEEE</button></div>');
  $buttons = $container.find('.buttons');
  $buttons.find('.prev').click(function () { that.prevStep($container); });
  $buttons.find('.next').click(function () { that.nextStep($container); });

  this.showStep($container);
}

H5P.Instructions = constructor;