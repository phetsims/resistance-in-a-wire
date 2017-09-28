// Copyright 2017, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 * 
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var ArrowKeyNode = require( 'SCENERY_PHET/keyboard/ArrowKeyNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EscapeKeyNode = require( 'SCENERY_PHET/keyboard/EscapeKeyNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var HomeKeyNode = require( 'SCENERY_PHET/keyboard/HomeKeyNode' );
  var EndKeyNode = require( 'SCENERY_PHET/keyboard/EndKeyNode' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireA11yStrings = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireA11yStrings' );
  var PageUpKeyNode = require( 'SCENERY_PHET/keyboard/PageUpKeyNode' );
  var PageDownKeyNode = require( 'SCENERY_PHET/keyboard/PageDownKeyNode' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var ShiftKeyNode = require( 'SCENERY_PHET/keyboard/ShiftKeyNode' );
  var TabKeyNode = require( 'SCENERY_PHET/keyboard/TabKeyNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  var ICON_VERTICAL_SPACING = 8; // vertical spacing between the icons
  var TEXT_KEY_WIDTH = 42; // width of key icons in the dialog
  var DESCRIPTION_FONT = new PhetFont( 12 ); // font for icon descriptions
  var HEADING_FONT = new PhetFont( { size: 14, weight: 'bold' } ); // font for headings above sections in the dialog
  var TEXT_MAX_WIDTH = 500; // max width of text for i18n
  var HEADING_MAX_WIDTH = 200; // max width of headings for i18n
  var MIN_CONTENT_WIDTH = 650; // min width for the panel containing this content

  // options for text descriptions
  var DESCRIPTION_OPTIONS = {
    font: DESCRIPTION_FONT,
    maxWidth: TEXT_MAX_WIDTH
  };

  /**
   * Constructor.
   * 
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireKeyboardHelpContent( tandem ) {

    //------------------------------------------------------------------------------------------------------------------
    // Content for sliders
    //------------------------------------------------------------------------------------------------------------------
    var sliderControlsHeading = new Text( ResistanceInAWireA11yStrings.sliderControlsString, {
      font: HEADING_FONT,
      maxWidth: HEADING_MAX_WIDTH
    } );

    // icons
    // arrow keys
    var arrowKeysIcon = ResistanceInAWireKeyboardHelpContent.createArrowKeysVBox( { scale: 0.80 } );

    // shift and tab keys, separated by plus sign
    var shiftPlusArrowKeysIcon = ResistanceInAWireKeyboardHelpContent.createShiftPlusIconHBox( ResistanceInAWireKeyboardHelpContent.createArrowKeysVBox( { scale: 0.5 } ), { tandem: tandem } );

    // page up or page down icons, separated by 'or'
    var pageUpNode = new PageUpKeyNode();
    var pageDownNode = new PageDownKeyNode();
    var pageUpPageDownIcon = ResistanceInAWireKeyboardHelpContent.createIconOrIconHBox( pageUpNode, pageDownNode );

    // home or end, separated by 'or'
    var homeKeyNode = new HomeKeyNode();
    var endKeyNode = new EndKeyNode();
    var homeOrEndIcon = ResistanceInAWireKeyboardHelpContent.createIconOrIconHBox( homeKeyNode, endKeyNode );

    // text descriptions for arrow key interactions
    var arrowKeyDescription = new RichText( ResistanceInAWireA11yStrings.arrowKeysAdjustSlidersString, DESCRIPTION_OPTIONS );
    var shiftPlusArrowKeysDescription = new RichText( ResistanceInAWireA11yStrings.shiftArrowKeysSlidersString, DESCRIPTION_OPTIONS );
    var pageUpPageDownDescription = new RichText( ResistanceInAWireA11yStrings.pageUpPageDownSlidersString, DESCRIPTION_OPTIONS );
    var homeEndDescription = new RichText( ResistanceInAWireA11yStrings.homeEndSlidersString, DESCRIPTION_OPTIONS );

    // align text and icons with AlignBox so that both will have the same height for easy alignment
    var arrowKeyContentRow = ResistanceInAWireKeyboardHelpContent.createContentRow( arrowKeysIcon, arrowKeyDescription, { descriptionYAlign: 'bottom', descriptionYOffset: 6 } );
    var shiftArrowKeyContentRow = ResistanceInAWireKeyboardHelpContent.createContentRow( shiftPlusArrowKeysIcon, shiftPlusArrowKeysDescription );
    var pageUpPageDownContentRow = ResistanceInAWireKeyboardHelpContent.createContentRow( pageUpPageDownIcon, pageUpPageDownDescription );
    var homeEndContentRow = ResistanceInAWireKeyboardHelpContent.createContentRow( homeOrEndIcon, homeEndDescription );

    // place icons in a right aligned VBox
    var sliderIconsVBox = new VBox( {
      children: [ arrowKeyContentRow.icon, shiftArrowKeyContentRow.icon, pageUpPageDownContentRow.icon, homeEndContentRow.icon ],
      align: 'right',
      spacing: ICON_VERTICAL_SPACING
    } );

    // place descriptions in a left aligned box
    var sliderDescriptionsVBox = new VBox( {
      children: [ arrowKeyContentRow.description, shiftArrowKeyContentRow.description, pageUpPageDownContentRow.description, homeEndContentRow.description ],
      align: 'left',
      spacing: ICON_VERTICAL_SPACING
    } );

    //------------------------------------------------------------------------------------------------------------------
    // Content for general navigation
    //------------------------------------------------------------------------------------------------------------------
    var generalNavigationHeading = new Text( ResistanceInAWireA11yStrings.generalNavigationString, {
      font: HEADING_FONT,
      maxWidth: HEADING_MAX_WIDTH
    } );    
    
    // single tab key
    var singleTabKeyIcon = new TabKeyNode( {
      minKeyWidth: TEXT_KEY_WIDTH, // in ScreenView coordinates
      maxKeyWidth: TEXT_KEY_WIDTH,
      tandem: tandem.createTandem( 'singleTabKeyIcon' )
    } );

    var shiftTabKeyIcon = ResistanceInAWireKeyboardHelpContent.createShiftPlusIconHBox( new TabKeyNode( {
        minKeyWidth: TEXT_KEY_WIDTH,
        maxKeyWidth: TEXT_KEY_WIDTH
    } ) );

    // escape key
    var escapeKeyIconNode = new EscapeKeyNode( {
      tandem: tandem.createTandem( 'escapeKeyNode' )
    } );

    // descriptions for each
    var tabKeyDescription = new RichText( ResistanceInAWireA11yStrings.tabKeyDescriptionString, _.extend( {
      tandem: tandem.createTandem( 'tabKeyDescription' ),
      maxWidth: TEXT_MAX_WIDTH
    }, DESCRIPTION_OPTIONS ) );
    var shiftPlusTabDescription = new RichText( ResistanceInAWireA11yStrings.shiftTabKeyDescriptionString, _.extend( {
      tandem: tandem.createTandem( 'shiftPlusTabDescription' ),
      maxWidth: TEXT_MAX_WIDTH
    }, DESCRIPTION_OPTIONS ) );
    var escapeKeyDescription = new RichText( ResistanceInAWireA11yStrings.escapeKeyDescriptionString, _.extend( {
      tandem: tandem.createTandem( 'escapeKeyDescription' ),
      maxWidth: TEXT_MAX_WIDTH
    }, DESCRIPTION_OPTIONS ) );

    // align the icons with their content using AlignBox so that icons and text have same vertical height
    var tabKeyContentRow = ResistanceInAWireKeyboardHelpContent.createContentRow( singleTabKeyIcon, tabKeyDescription );
    var shiftPlusTabContentRow = ResistanceInAWireKeyboardHelpContent.createContentRow( shiftTabKeyIcon, shiftPlusTabDescription );
    var escapeKeyContentRow = ResistanceInAWireKeyboardHelpContent.createContentRow( escapeKeyIconNode, escapeKeyDescription );

    // place icons in a right aligned vbox
    var generalIconVBox = new VBox( {
      children: [ tabKeyContentRow.icon, shiftPlusTabContentRow.icon, escapeKeyContentRow.icon ],
      align: 'right',
      spacing: ICON_VERTICAL_SPACING
    } );

    // place descriptions in a left aligned box
    var descriptionVBox = new VBox( {
      children: [ tabKeyContentRow.description, shiftPlusTabContentRow.description, escapeKeyContentRow.description ],
      align: 'left',
      spacing: ICON_VERTICAL_SPACING
    } );

    //------------------------------------------------------------------------------------------------------------------
    // Assemble both sections of content
    //------------------------------------------------------------------------------------------------------------------
    // the two sets of icons need to be aligned using AlignGroup so we can assume their widths are the same
    var iconAlignGroup = new AlignGroup( { matchVertical: false } );
    var sliderIconsBox = iconAlignGroup.createBox( sliderIconsVBox, { xAlign: 'right' } );
    var generalIconsBox = iconAlignGroup.createBox( generalIconVBox, { xAlign: 'right' } );

    // slider icons and descriptions contained in an HBox, vertical alignment guaranteed with AlignGroup
    var sliderControlsHBox = new HBox( {
      children: [ sliderIconsBox, sliderDescriptionsVBox ],
      spacing: 15
    } );

    // general icons and descriptions aligned horizontally, vertical spacing is guaranteed to be corrected by AlignGroup
    var generalContentHBox = new HBox( {
      children: [ generalIconsBox, descriptionVBox ],
      spacing: 15
    } );

    // add the slider content and heading in a VBox
    var sliderContentVBox = new VBox( {
      children: [ sliderControlsHeading, sliderControlsHBox ],
      spacing: 10,
      align: 'left'
    } );

    // add the general content and heading in a VBox
    var generalNavigationVBox = new VBox( {
      children: [ generalNavigationHeading, generalContentHBox ],
      spacing: 10,
      align: 'left'
    } );

    // the final Dialog content box, vertically aligned to the left
    var contentVBox = new VBox( {
      children: [ sliderContentVBox, generalNavigationVBox ],
      spacing: 20,
      align: 'left'
    } );

    Panel.call( this, contentVBox, {
      stroke: null,
      fill: 'rgb( 214, 237, 249 )',
      minWidth: MIN_CONTENT_WIDTH,
      tandem: tandem,
    } );
  }

  resistanceInAWire.register( 'ResistanceInAWireKeyboardHelpContent', ResistanceInAWireKeyboardHelpContent );

  return inherit( Panel, ResistanceInAWireKeyboardHelpContent, {}, {

    /**
     * Create a group of arrow buttons that look like the arrow buttons on the keyboard,  left down and right arrow
     * keys along a bottom row with the up arrow key centered above them.
     *
     * @return {VBox}
     */
    createArrowKeysVBox: function( options ) {

      options = _.extend( {
        spacing: 3
      }, options );
      assert && assert( !options.children, 'children set in createArrowKeysVBox' );

      var topArrowKeyNode = new ArrowKeyNode( 'up' );
      var bottomArrowKeyNodes = [ new ArrowKeyNode( 'left' ), new ArrowKeyNode( 'down' ), new ArrowKeyNode( 'right' ) ];
      var bottomArrowKeyBox = new HBox( { children: bottomArrowKeyNodes, spacing: options.spacing } );

      options.children = [ topArrowKeyNode, bottomArrowKeyBox ];
      return new VBox( options );
    },

    /**
     * Create a row that includes Shift '+' some icon node.  Shift is arranged to the left of several key nodes
     * so this generates it and places it next to the desired key node, separated by a '+' node.
     *
     * @param {Node} iconNode 
     * @param {Object} options
     * @return {HBox}
     */
    createShiftPlusIconHBox: function( iconNode, options ) {

      options = _.extend( {
        shiftMinKeyWidth: TEXT_KEY_WIDTH,
        shiftMaxKeyWidth: TEXT_KEY_WIDTH
      }, options );

      // shift key icon
      var shiftKeyIcon = new ShiftKeyNode( {
        minKeyWidth: options.shiftMinKeyWidth,
        maxKeyWidth: options.shiftMaxKeyWidth
      } );

      // plus icon
      var plusIconNode = new PlusNode( {
        size: new Dimension2( 8, 1.2 )
      } );

      // shift, plus, and iconNode aranged in an HBox
      var shiftPlusIconHBox = new HBox( {
        children: [ shiftKeyIcon, plusIconNode, iconNode ],
        spacing: 7
      } );

      return shiftPlusIconHBox;
    },

    /**
     * Create an icon aligned in an HBox including 'or' Text surrounded by two other icons.
     *
     * @param {Node} iconA
     * @param {Node} iconB
     * @return {HBox}
     */
    createIconOrIconHBox: function( iconA, iconB ) {

      var orText = new Text( ResistanceInAWireA11yStrings.orString, {
        font: new PhetFont( 12 ),
        maxWidth: TEXT_MAX_WIDTH / 5
      } );

      var iconOrIconHBox = new  HBox( {
        children: [ iconA, orText, iconB ],
        spacing: 11
      } );

      return iconOrIconHBox;
    },

    /**
     * Align the icon and its description vertically by placing in a vertical align group
     * @param  {Node} icon
     * @param  {RichText} description
     * @returns {object} - keys icon {Node} and its description {RichText}
     */
    createContentRow: function( icon, description, options ) {

      options = _.extend( {
        descriptionYAlign: 'center',
        descriptionYOffset: 0
      }, options );

      var alignGroup = new AlignGroup( { matchHorizontal: false } );
      var iconBox = alignGroup.createBox( icon );
      var descriptionBox = alignGroup.createBox( description, { yAlign: options.descriptionYAlign, bottomMargin: options.descriptionYOffset } );

      return {
        icon: iconBox,
        description: descriptionBox
      };
    }
  } );
} );