var H5P = H5P || {};
var $ = H5P.jQuery;
var JoubelUI = H5P.JoubelUI;

function constructor(options, id) {
  this.options = options;
  this.id = id;

  this.showStep = ($container) => {
    let step = this.options.steps[this.step];

    $display = $container.find('.step-display');

    let stepprefix = this.options.transl_step.replace('@step', this.step + 1);
    $display.find('.title h2').empty().append('<span>' + stepprefix + '</span><span>' + step.title + '</span>');

    $notes = $display.find('.notes ul');
    $notes.empty();
    if (step.notes != null) {
      step.notes.forEach(note => {
        var first;
        if (note.needs_attention) {
          first = '<li class="special">';
        }
        else {
          first = '<li>'
        }
        $notes.append(first + note.text + '</li>');
      });
    }

    $image = $display.find('.image');
    $image.empty();
    H5P.newRunnable(this.options.steps[this.step].visual, id, $image);

    var $buttons = $container.find('.buttons');
    var that = this;
    $buttons.empty();
    if (this.options.steps.length > 1) {
      if (this.step > 0) {
        JoubelUI.createButton({
          'class': 'prev',
          'html': this.options.transl_prev,
          'on': {
            click: function() {
              that.prevStep($container);
            }
          },
          'appendTo': $buttons
        });
      }

      if (this.step < this.options.steps.length - 1) {
        JoubelUI.createButton({
          'class': 'next',
          'html': this.options.transl_next,
          'on': {
            click: function() {
              that.nextStep($container);
            }
          },
          'appendTo': $buttons
        });
      }
    }
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
    this.step = 0;
    $display = $container.find('.step-display');

    $title = $display.find('.title');
    $title.empty();
    $title.append('<h2></h2>');

    this.showStep($container);
  }
}

constructor.prototype.attach = function ($container) {
  var that = this;

  $container.addClass("h5p-instructions");
  $container.append('<div class="step-display"><div class="title"><h2></h2></div><div class="image"></div><div class="notes"><ul></ul></div></div>')
  $container.append('<div class="buttons"></div>');

  $display = $container.find('.step-display');

  this.showImage(this.options.cover, $display);

  $title = $display.find('.title');
  $title.find('h2').append('<span class="center">' + this.options.title + "</span>");



  $notes = $display.find('.notes ul');
  $notes.append('<li class="statistic"><span>' + this.options.transl_difficulty + '</span><span>' + this.options.difficulty + '</span></li>');
  $notes.append('<li class="statistic"><span>' + this.options.transl_steps + '</span><span>' + this.options.steps.length.toString() + '</span></li>');
  $notes.append('<li class="statistic"><span>' + this.options.transl_time + '</span><span>' + this.options.time + '</span></li>');

  $buttons = $container.find('.buttons');

  JoubelUI.createButton({
    'class': 'start',
    'html': this.options.transl_start,
    'on': {
      click: function() {
        that.startSteps($container);
      }
    },
    'appendTo': $buttons
  });
}

H5P.Instructions = constructor;