'use strict';

var _s = require('underscore.string');
var extend = require('extend');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  /** Generator constructor. */
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },

  /** Initialise generator. */
  initializing: function () {
    this.pkg = require('../../package.json');
    this.props = this.config.get('props');
  },

  /** Set generator prompts. */
  prompting: function () {
    var done = this.async();

    if (this.props) {
      this.log('Using saved configuration.');
    }

    var prompts = [
      // Module name
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is the module name?',
        default: 'Example'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = extend({}, this.props, props);

      done();
    }.bind(this));
  },

  configuring: {

    /** Save user configuration. */
    saveConfig: function () {
      this.config.set({
        props: this.props
      });
    },

    /** Set path properties. */
    setPaths: function () {
      // Set root path.
      this.root = this.destinationRoot();

      if (this.props.destinationRoot && this.props.destinationRoot.length) {

        if (this.root.substring(this.root.length - 1) === '/') {
          this.props.destinationRoot = this.props.destinationRoot.substring(0, this.root.length - 2);
        }

        this.root = this.destinationPath(this.props.destinationRoot);
      }

      // Set useful paths.
      this.srcPath = path.join(this.root, 'SiteFiles/src');
      this.fontsPath = path.join(this.root, 'SiteFiles/src/ui/fonts');
      this.imgPath = path.join(this.root, 'SiteFiles/src/ui/img');
      this.jsPath = path.join(this.root, 'SiteFiles/src/ui/js');
      this.sassPath = path.join(this.root, 'SiteFiles/src/ui/sass');
      this.tasksPath = path.join(this.root, 'SiteFiles/src/tasks');
    },

    /** Set name properties. */
    setNames: function () {
      this.props.moduleDashedName = _s.ltrim(_s.dasherize(this.props.moduleName), '-');
    }
  },

  writing: {

    /** Create module file. */
    createModule: function () {
      var moduleFileName = this.props.moduleDashedName + '.module.js';
      var modulePath = path.join(this.jsPath, this.props.moduleDashedName, moduleFileName);

      this.fs.copyTpl(
        this.templatePath(this.props.es6 ? 'module.template.es6.js' : 'module.template.js'),
        this.destinationPath(modulePath),
        this.props
      );
    }
  }
});
