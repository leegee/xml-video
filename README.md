XML to descirbe a video composed of video clips, sound clips, and HTML -- sequentially and overlaid.

NB: Overlays are acheived by having multiple items in a sequence have the same start value, optionally setting the `blend`, `width`, `height`, `top`, `left` positions.

Project: contains a sequence. Sets global output options.

Sequnce: a series of items in chronoligcal order; all items have to be in a sequence. Any item can contain any other item.
    
* sequence
* video
* sound 
* html

All have properties as below: If not specified, they inherit the parent properties. If no ancestor has a particular attribute, it defaults to the subject's full duration, 

* start: milliseconds by which to delay the start, relative to parent; defaults to 0, ie synced with the parent
* duration: set to clip this and all children if any duration exceeds this figure. If not set, renders the whole file and any children. 
    * Cards render for the specified number of milliseconds, or so long as their parent is rendering.
* width: see `height`
* height: a percentage or pixel value to specify the dimension of the item
* top: see `left`
* left: a percentage or pixel value to specify the position of the item
* alpha: alpha value of the media as a float between 0-1.
* blend: blending mode for [composition operation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation), defaults to `none`.

