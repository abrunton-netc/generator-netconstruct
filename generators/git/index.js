'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  /** Generator constructor. */
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },

  /** Initialise generator. */
  initializing: function() {
    this.pkg = require('../../package.json');
    this.props = this.config.get('props');
  },

  /** Set generator prompts. */
  prompting: function() {
    if (this.props) {
      this.log('Using saved configuration.');
    }
  },

  configuring: {

    /** Save user configuration. */
    saveConfig: function() {
      this.config.set({
        props: this.props
      });
    },
  },

  writing: {
    /** Create default branches. */
    createDefaultBranches: function() {
      // Create and push preview branch.
      this.spawnCommandSync('git', ['checkout', '-b', 'release/preview', 'master']);
      this.spawnCommandSync('git', ['push', 'origin', 'release/preview']);

      // Change to master branch.
      this.spawnCommandSync('git', ['checkout', 'master']);
    }
  }
});
