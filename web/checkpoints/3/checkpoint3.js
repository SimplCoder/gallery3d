(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"checkpoint3_atlas_1", frames: [[0,0,1920,1036],[0,1038,1549,604],[0,1644,1726,388]]},
		{name:"checkpoint3_atlas_2", frames: [[1944,1030,26,16],[1944,1048,15,15],[1136,1294,137,120],[1761,1426,148,131],[1052,632,225,118],[1534,1426,225,225],[0,1718,968,68],[1761,1559,146,106],[0,1294,1134,102],[1745,279,250,250],[1279,632,65,124],[1479,279,264,264],[1859,0,180,178],[1944,904,65,124],[1975,1030,65,124],[1975,1156,65,124],[1975,1282,65,124],[970,1779,65,124],[1037,1718,65,124],[1104,1718,65,124],[1171,1718,65,124],[1238,1718,65,124],[1909,1559,122,124],[1306,1065,667,359],[1911,1426,122,124],[1534,1653,122,124],[1658,1667,122,124],[1782,1667,122,124],[785,0,1072,277],[1906,1685,122,124],[875,1426,617,160],[0,1528,765,128],[767,1588,765,128],[1387,904,555,156],[785,632,265,118],[0,1398,873,128],[970,1718,55,55],[1387,632,608,270],[785,279,692,351],[0,0,783,784],[0,786,1385,277],[0,1065,1304,227]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_38 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.checkpoint_panel_program_button = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(img.CachedBmp_41);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2372,188);


(lib.checkpoint_panel_program_time = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.help_panel_close_button = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.checkpoint_panel_program_background = function() {
	this.initialize(ss["checkpoint3_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.checkpoint_panel_program_white_area = function() {
	this.initialize(ss["checkpoint3_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["checkpoint3_atlas_2"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["checkpoint3_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(img.CachedBmp_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2766,604);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2718,1466);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,536,138.5), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(136.85,239,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_43();
	this.instance_1.setTransform(-41,21.95,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_42();
	this.instance_2.setTransform(81,231,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-41,22,863,260), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(-142,14,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(-142,14,1186,94), null);


(lib.shadow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shadow, new cjs.Rectangle(0,0,391.5,392), null);


(lib.Path_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,0,333.5,179.5), null);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,73,53), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,90,89), null);


(lib.countdown = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_14();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_15();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_16();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_17();
	this.instance_4.setTransform(0,0,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_18();
	this.instance_5.setTransform(0,0,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_19();
	this.instance_6.setTransform(0,0,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_20();
	this.instance_7.setTransform(0,0,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_21();
	this.instance_8.setTransform(0,0,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_22();
	this.instance_9.setTransform(0,0,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_23();
	this.instance_10.setTransform(0,0,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_24();
	this.instance_11.setTransform(0,0,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_25();
	this.instance_12.setTransform(0,0,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_26();
	this.instance_13.setTransform(0,0,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_27();
	this.instance_14.setTransform(0,0,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_47();
	this.instance_15.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},30).to({state:[{t:this.instance_2}]},30).to({state:[{t:this.instance_3}]},30).to({state:[{t:this.instance_4}]},30).to({state:[{t:this.instance_5}]},30).to({state:[{t:this.instance_6}]},30).to({state:[{t:this.instance_7}]},30).to({state:[{t:this.instance_8}]},31).to({state:[{t:this.instance_9}]},29).to({state:[{t:this.instance_10}]},30).to({state:[{t:this.instance_11}]},31).to({state:[{t:this.instance_12}]},29).to({state:[{t:this.instance_13}]},31).to({state:[{t:this.instance_14}]},30).to({state:[{t:this.instance_15}]},29).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,61,62);


(lib.congrats = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.congrats, new cjs.Rectangle(0,0,692.5,138.5), null);


(lib.close = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.help_panel_close_button();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,55,55);


(lib.answer2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(36,5.15,0.3931,0.3931);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(-10,0,0.5708,0.5708);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10,0,316.8,111.3);


(lib.answer3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(29.15,4.65,0.3877,0.3877);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(-9,2,0.5308,0.5308);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,2,294.6,82.8);


(lib.answer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(10.5,0,0.3982,0.3982);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(-21,-6,0.5746,0.5746);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21,-6,318.9,145.8);


(lib.replay = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Path();
	this.instance.setTransform(81.05,77.8,0.337,0.337,0,0,0,45.2,44.6);
	this.instance.alpha = 0.1484;

	this.instance_1 = new lib.Path_1();
	this.instance_1.setTransform(43.4,71.8,0.337,0.337,0,0,0,37,26.9);
	this.instance_1.alpha = 0.1484;

	this.instance_2 = new lib.CachedBmp_40();
	this.instance_2.setTransform(25.1,30.1,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_39();
	this.instance_3.setTransform(27.8,32.8,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_38();
	this.instance_4.setTransform(81.2,18.9,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_37();
	this.instance_5.setTransform(71.15,15.55,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_36();
	this.instance_6.setTransform(9.8,6.9,0.5,0.5);

	this.instance_7 = new lib.Path_6();
	this.instance_7.setTransform(66.05,89.1,0.337,0.337,0,0,0,166.9,90);
	this.instance_7.alpha = 0.1484;

	this.instance_8 = new lib.CachedBmp_35();
	this.instance_8.setTransform(9.8,6.9,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_34();
	this.instance_9.setTransform(3.55,3.5,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_33();
	this.instance_10.setTransform(0,0,0.5,0.5);

	this.instance_11 = new lib.shadow();
	this.instance_11.setTransform(66.05,72.3,0.3371,0.3371,0,0,0,196,196);
	this.instance_11.alpha = 0.3008;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.replay, new cjs.Rectangle(0,0,132,138.4), null);


// stage content:
(lib.RECOVER_checkpoint3_try_close = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{timesup:464,start:1,Stop:4,Correct:458,wrong1:464});

	this.actionFrames = [0,4,450,458,464,469,470];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_4 = function() {
		this.close.addEventListener("click", window.close);
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answer.addEventListener("click", fl_ClickToGoToAndStopAtFrame_459.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_459()
		{
			this.gotoAndStop(458);
		}
		
		
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answer2.addEventListener("click", fl_ClickToGoToAndStopAtFrame_465.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_465()
		{
			
			this.gotoAndStop(464);
		}
		
		
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answer3.addEventListener("click", fl_ClickToGoToAndStopAtFrame_471.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_471()
		{
			this.gotoAndStop(470);
		}
	}
	this.frame_450 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop('timesup');
	}
	this.frame_458 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(5);
		}
	}
	this.frame_464 = function() {
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.replay.addEventListener("click", fl_ClickToGoToAndPlayAtFrame_5.bind(this));
		
		function fl_ClickToGoToAndPlayAtFrame_5()
		{
			this.gotoAndPlay(4);
		}
	}
	this.frame_469 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_470 = function() {
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.replay.addEventListener("click", fl_ClickToGoToAndPlayAtFrame_5.bind(this));
		
		function fl_ClickToGoToAndPlayAtFrame_5()
		{
			this.gotoAndPlay(4);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(446).call(this.frame_450).wait(8).call(this.frame_458).wait(6).call(this.frame_464).wait(5).call(this.frame_469).wait(1).call(this.frame_470).wait(8));

	// close
	this.close = new lib.close();
	this.close.name = "close";
	this.close.setTransform(1292.5,60.5,1,1,0,0,0,27.5,27.5);
	this.close._off = true;
	new cjs.ButtonHelper(this.close, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.close).wait(4).to({_off:false},0).wait(474));

	// counter
	this.instance = new lib.countdown("synched",0);
	this.instance.setTransform(719.6,71.6,1,1,0,0,0,30.6,31);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},451).wait(27));

	// buttons
	this.replay = new lib.replay();
	this.replay.name = "replay";
	this.replay.setTransform(655.4,507.55,1,1,0,0,0,66,69.2);
	this.replay._off = true;
	this.replay.filters = [new cjs.ColorFilter(1, 1, 1, 1, 1, 0, 39, 0)];
	this.replay.cache(-2,-2,136,142);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(464).to({_off:false},0).wait(14));

	// Layer_5
	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(353,438,0.5,0.5);

	this.instance_2 = new lib.congrats();
	this.instance_2.setTransform(686.2,356.8,1,1,0,0,0,346.2,69.2);

	this.instance_3 = new lib.CachedBmp_4();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.Symbol5();
	this.instance_4.setTransform(658.1,356.8,1,1,0,0,0,268.1,69.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},458).to({state:[]},1).to({state:[{t:this.instance_3},{t:this.instance_4}]},5).to({state:[{t:this.instance_3},{t:this.instance_4}]},6).wait(8));

	// Layer_6
	this.Answer3 = new lib.answer3();
	this.Answer3.name = "Answer3";
	this.Answer3.setTransform(805.45,551.7,1.2897,1.2897);
	new cjs.ButtonHelper(this.Answer3, 0, 1, 2, false, new lib.answer3(), 3);

	this.answer3 = new lib.answer3();
	this.answer3.name = "answer3";
	this.answer3.setTransform(935.45,562.7,1.2897,1.2897);
	new cjs.ButtonHelper(this.answer3, 0, 1, 2, false, new lib.answer3(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Answer3}]}).to({state:[{t:this.Answer3}]},1).to({state:[{t:this.answer3}]},3).to({state:[]},454).wait(20));

	// Layer_4
	this.Answer2 = new lib.answer2();
	this.Answer2.name = "Answer2";
	this.Answer2.setTransform(474.5,450.2,1.2721,1.2721);
	new cjs.ButtonHelper(this.Answer2, 0, 1, 2, false, new lib.answer2(), 3);

	this.answer2 = new lib.answer2();
	this.answer2.name = "answer2";
	this.answer2.setTransform(505.5,593.95,1.2721,1.2721);
	new cjs.ButtonHelper(this.answer2, 0, 1, 2, false, new lib.answer2(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Answer2}]}).to({state:[{t:this.Answer2}]},1).to({state:[{t:this.answer2}]},3).to({state:[]},454).wait(20));

	// button
	this.button_1 = new lib.answer();
	this.button_1.name = "button_1";
	this.button_1.setTransform(328.3,605.2,1.2557,1.2557,0,0,0,138.8,39.1);
	new cjs.ButtonHelper(this.button_1, 0, 1, 2, false, new lib.answer(), 3);

	this.answer = new lib.answer();
	this.answer.name = "answer";
	this.answer.setTransform(260.3,621.2,1.2557,1.2557,0,0,0,138.8,39.1);
	new cjs.ButtonHelper(this.answer, 0, 1, 2, false, new lib.answer(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.button_1}]}).to({state:[{t:this.button_1}]},1).to({state:[{t:this.answer}]},3).to({state:[]},454).wait(20));

	// Layer_1
	this.instance_5 = new lib.Symbol3();
	this.instance_5.setTransform(686.9,322.45,1,1,0,0,0,374.9,53);
	this.instance_5.shadow = new cjs.Shadow("rgba(85,0,119,1)",3,3,4);

	this.instance_6 = new lib.Symbol2();
	this.instance_6.setTransform(703.6,219.3,1,1,0,0,0,432.6,22.5);
	this.instance_6.shadow = new cjs.Shadow("rgba(53,0,92,1)",3,3,4);

	this.instance_7 = new lib.checkpoint_panel_program_time();
	this.instance_7.setTransform(536,28);

	this.instance_8 = new lib.CachedBmp_5();
	this.instance_8.setTransform(117.4,82,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_6();
	this.instance_9.setTransform(117.4,82,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_8();
	this.instance_10.setTransform(65.4,82,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_7();
	this.instance_11.setTransform(-10.95,245.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6,p:{y:219.3}},{t:this.instance_5,p:{y:322.45}}]}).to({state:[{t:this.instance_9},{t:this.instance_7},{t:this.instance_6,p:{y:219.3}},{t:this.instance_5,p:{y:322.45}}]},1).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_7},{t:this.instance_6,p:{y:194.3}},{t:this.instance_5,p:{y:296.45}}]},3).wait(474));

	// white
	this.instance_12 = new lib.checkpoint_panel_program_white_area();
	this.instance_12.setTransform(201,397,0.6074,0.5596);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1).to({_off:true},3).wait(474));

	// bg
	this.instance_13 = new lib.checkpoint_panel_program_background();
	this.instance_13.setTransform(0,0,0.7077,0.7077);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(478));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(668.1,367.5,703.9999999999999,380.1);
// library properties:
lib.properties = {
	id: '4E90C311FDE2D6458DDFAE8DCEDDD0EA',
	width: 1358,
	height: 735,
	fps: 30,
	color: "#6C3894",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_41.png", id:"CachedBmp_41"},
		{src:"images/CachedBmp_7.png", id:"CachedBmp_7"},
		{src:"images/CachedBmp_4.png", id:"CachedBmp_4"},
		{src:"images/checkpoint3_atlas_1.png", id:"checkpoint3_atlas_1"},
		{src:"images/checkpoint3_atlas_2.png", id:"checkpoint3_atlas_2"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['4E90C311FDE2D6458DDFAE8DCEDDD0EA'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
	
setTimeout( function() {
	resizeCanvas();
},200);
	
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;