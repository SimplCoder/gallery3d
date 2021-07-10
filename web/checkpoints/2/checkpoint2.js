(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"checkpoint2_atlas_1", frames: [[0,1038,1549,604],[0,0,1920,1036]]},
		{name:"checkpoint2_atlas_2", frames: [[0,1166,1592,282],[0,1450,1587,282],[0,786,1416,378],[786,0,783,784],[0,1734,1385,277],[0,0,784,784]]},
		{name:"checkpoint2_atlas_3", frames: [[1841,133,137,120],[1778,1627,225,118],[1764,380,147,131],[1841,0,148,131],[1764,513,137,120],[1538,1047,225,225],[973,378,264,264],[1772,260,225,118],[1534,1274,225,225],[1216,644,250,250],[1765,1047,257,135],[1239,378,264,264],[1505,378,257,257],[669,583,286,286],[1765,1184,257,135],[957,644,257,257],[1832,1747,146,106],[0,0,1072,277],[1220,1639,286,286],[669,279,302,302],[1761,1321,180,178],[1508,1627,268,147],[0,279,667,359],[1858,1501,122,124],[1913,380,122,124],[0,640,667,359],[1844,1855,122,124],[1880,889,122,124],[1913,506,122,124],[1505,637,478,124],[1508,1776,322,121],[1010,1927,542,121],[1468,763,478,124],[1074,260,696,116],[1534,1501,322,124],[464,1927,544,121],[1554,1899,288,124],[0,1797,462,158],[1538,889,340,156],[1074,0,765,128],[0,1119,765,128],[1074,130,765,128],[767,1509,661,128],[0,1249,765,128],[557,1639,661,128],[767,1119,765,128],[0,1379,765,128],[0,1639,555,156],[669,871,265,118],[767,1249,765,128],[557,1769,661,128],[0,1509,765,128],[767,1379,765,128],[0,1001,1536,116]]},
		{name:"checkpoint2_atlas_4", frames: [[315,40,26,16],[315,58,26,16],[252,252,15,15],[315,0,30,18],[315,76,17,17],[0,126,116,126],[0,382,104,114],[315,20,30,18],[0,254,116,126],[315,95,17,17],[106,382,65,124],[118,126,65,124],[124,0,65,124],[118,252,65,124],[173,378,65,124],[185,126,65,124],[191,0,65,124],[185,252,65,124],[240,378,65,124],[252,126,65,124],[0,0,122,124],[258,0,55,55],[258,57,55,55]]}
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



(lib.CachedBmp_190 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_191 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_188 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_192 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_184 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_182 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_183 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_189 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_187 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_185 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_180 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_174 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_173 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_175 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_179 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_186 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_172 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_176 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_177 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_166 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_167 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_165 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_171 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_170 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_164 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_163 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_158 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_196 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_162 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_169 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_152 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_199 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_157 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_154 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_150 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_151 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_149 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_194 = function() {
	this.initialize(ss["checkpoint2_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_148 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_195 = function() {
	this.initialize(ss["checkpoint2_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_147 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_159 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_145 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_144 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_146 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_143 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_142 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_155 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_141 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_140 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_138 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_193 = function() {
	this.initialize(ss["checkpoint2_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_139 = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_135 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_132 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_134 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_133 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_136 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_131 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_128 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_124 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_119 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_121 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_160 = function() {
	this.initialize(ss["checkpoint2_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_120 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.checkpoint_panel_program_white_area = function() {
	this.initialize(ss["checkpoint2_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.checkpoint_panel_program_button = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.help_panel_close_button = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.checkpoint_panel_program_time = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.checkpoint_panel_program_setting = function() {
	this.initialize(ss["checkpoint2_atlas_4"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.checkpoint_panel_program_background = function() {
	this.initialize(ss["checkpoint2_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_137 = function() {
	this.initialize(ss["checkpoint2_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_117 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_118 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_156 = function() {
	this.initialize(ss["checkpoint2_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_116 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["checkpoint2_atlas_3"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(img.CachedBmp_114);
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
	this.instance = new lib.CachedBmp_196();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,536,138.5), null);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.checkpoint_panel_program_button();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,277.5,78);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_195();
	this.instance.setTransform(10.05,-19,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(10.1,-19,793.5,141), null);


(lib.sentence3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_194();
	this.instance.setTransform(30.05,-19,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sentence3, new cjs.Rectangle(30.1,-19,796,141), null);


(lib.sentence2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_193();
	this.instance.setTransform(30.05,-19,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sentence2, new cjs.Rectangle(30.1,-19,708,189), null);


(lib.shadow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_160();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shadow, new cjs.Rectangle(0,0,391.5,392), null);


(lib.Path_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_159();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,0,333.5,179.5), null);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_158();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,73,53), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_157();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,90,89), null);


(lib.shadow_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.CachedBmp_156();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shadow_1, new cjs.Rectangle(0,0,392,392), null);


(lib.Path_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_155();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5, new cjs.Rectangle(0,0,333.5,179.5), null);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.CachedBmp_154();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,134,73.5), null);


(lib.countdown = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_138();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_139();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_140();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_141();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_142();
	this.instance_4.setTransform(0,0,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_143();
	this.instance_5.setTransform(0,0,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_144();
	this.instance_6.setTransform(0,0,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_145();
	this.instance_7.setTransform(0,0,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_146();
	this.instance_8.setTransform(0,0,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_147();
	this.instance_9.setTransform(0,0,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_148();
	this.instance_10.setTransform(0,0,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_149();
	this.instance_11.setTransform(0,0,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_150();
	this.instance_12.setTransform(0,0,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_151();
	this.instance_13.setTransform(0,0,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_152();
	this.instance_14.setTransform(0,0,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_199();
	this.instance_15.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},30).to({state:[{t:this.instance_2}]},30).to({state:[{t:this.instance_3}]},30).to({state:[{t:this.instance_4}]},30).to({state:[{t:this.instance_5}]},30).to({state:[{t:this.instance_6}]},30).to({state:[{t:this.instance_7}]},30).to({state:[{t:this.instance_8}]},31).to({state:[{t:this.instance_9}]},29).to({state:[{t:this.instance_10}]},30).to({state:[{t:this.instance_11}]},31).to({state:[{t:this.instance_12}]},29).to({state:[{t:this.instance_13}]},31).to({state:[{t:this.instance_14}]},30).to({state:[{t:this.instance_15}]},29).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,61,62);


(lib.congrats = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_137();
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


(lib.replay2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Path();
	this.instance.setTransform(81.05,77.8,0.337,0.337,0,0,0,45.4,44.8);
	this.instance.alpha = 0.1484;

	this.instance_1 = new lib.Path_1();
	this.instance_1.setTransform(43.4,71.8,0.337,0.337,0,0,0,37.1,27);
	this.instance_1.alpha = 0.1484;

	this.instance_2 = new lib.CachedBmp_192();
	this.instance_2.setTransform(25.1,30.1,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_191();
	this.instance_3.setTransform(27.8,32.8,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_190();
	this.instance_4.setTransform(81.2,18.9,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_189();
	this.instance_5.setTransform(71.15,15.55,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_188();
	this.instance_6.setTransform(9.8,6.9,0.5,0.5);

	this.instance_7 = new lib.Path_6();
	this.instance_7.setTransform(66.05,89.1,0.337,0.337,0,0,0,167.1,90.2);
	this.instance_7.alpha = 0.1484;

	this.instance_8 = new lib.CachedBmp_187();
	this.instance_8.setTransform(9.8,6.9,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_186();
	this.instance_9.setTransform(3.55,3.5,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_185();
	this.instance_10.setTransform(0,0,0.5,0.5);

	this.instance_11 = new lib.shadow();
	this.instance_11.setTransform(66.05,72.3,0.3371,0.3371,0,0,0,196,196);
	this.instance_11.alpha = 0.3008;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,132,138.4);


(lib.replay = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Path();
	this.instance.setTransform(81.05,77.8,0.337,0.337,0,0,0,45.2,44.6);
	this.instance.alpha = 0.1484;

	this.instance_1 = new lib.Path_1();
	this.instance_1.setTransform(43.4,71.8,0.337,0.337,0,0,0,37,26.9);
	this.instance_1.alpha = 0.1484;

	this.instance_2 = new lib.CachedBmp_184();
	this.instance_2.setTransform(25.1,30.1,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_183();
	this.instance_3.setTransform(27.8,32.8,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_182();
	this.instance_4.setTransform(81.2,18.9,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_189();
	this.instance_5.setTransform(71.15,15.55,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_180();
	this.instance_6.setTransform(9.8,6.9,0.5,0.5);

	this.instance_7 = new lib.Path_6();
	this.instance_7.setTransform(66.05,89.1,0.337,0.337,0,0,0,166.9,90);
	this.instance_7.alpha = 0.1484;

	this.instance_8 = new lib.CachedBmp_179();
	this.instance_8.setTransform(9.8,6.9,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_186();
	this.instance_9.setTransform(3.55,3.5,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_177();
	this.instance_10.setTransform(0,0,0.5,0.5);

	this.instance_11 = new lib.shadow();
	this.instance_11.setTransform(66.05,72.3,0.3371,0.3371,0,0,0,196,196);
	this.instance_11.alpha = 0.3008;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.replay, new cjs.Rectangle(0,0,132,138.4), null);


(lib.play1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Path_2();
	this.instance.setTransform(81.05,86.55,0.3857,0.3857,0,0,0,68,37.7);
	this.instance.alpha = 0.1484;

	this.instance_1 = new lib.CachedBmp_176();
	this.instance_1.setTransform(55.05,43.85,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_175();
	this.instance_2.setTransform(52,40.75,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_174();
	this.instance_3.setTransform(93,21.65,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_173();
	this.instance_4.setTransform(81.45,17.8,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_172();
	this.instance_5.setTransform(11.25,7.9,0.5,0.5);

	this.instance_6 = new lib.Path_5();
	this.instance_6.setTransform(75.6,102.05,0.3857,0.3857,0,0,0,167.6,90.6);
	this.instance_6.alpha = 0.1484;

	this.instance_7 = new lib.CachedBmp_171();
	this.instance_7.setTransform(11.25,7.9,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_170();
	this.instance_8.setTransform(4.1,4.05,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_169();
	this.instance_9.setTransform(0,0,0.5,0.5);

	this.instance_10 = new lib.shadow_1();
	this.instance_10.setTransform(75.6,82.8,0.3858,0.3858,0,0,0,196,196.3);
	this.instance_10.alpha = 0.3008;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,151.2,158.3);


(lib.play = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Path_2();
	this.instance.setTransform(81.05,86.55,0.3858,0.3858,0,0,0,67.8,37.5);
	this.instance.alpha = 0.1484;

	this.instance_1 = new lib.CachedBmp_176();
	this.instance_1.setTransform(55.05,43.85,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_167();
	this.instance_2.setTransform(52,40.75,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_166();
	this.instance_3.setTransform(93,21.65,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_165();
	this.instance_4.setTransform(81.5,17.8,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_164();
	this.instance_5.setTransform(11.25,7.9,0.5,0.5);

	this.instance_6 = new lib.Path_5();
	this.instance_6.setTransform(75.6,102.05,0.3858,0.3858,0,0,0,167.3,90.4);
	this.instance_6.alpha = 0.1484;

	this.instance_7 = new lib.CachedBmp_163();
	this.instance_7.setTransform(11.25,7.9,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_162();
	this.instance_8.setTransform(4.1,4.05,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_169();
	this.instance_9.setTransform(0,0,0.5,0.5);

	this.instance_10 = new lib.shadow_1();
	this.instance_10.setTransform(75.6,82.8,0.3858,0.3858,0,0,0,196,196.2);
	this.instance_10.alpha = 0.3008;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,151.3,158.4);


(lib.answerD1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_136();
	this.instance.setTransform(30,9.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,378,78);


(lib.answerD = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_135();
	this.instance.setTransform(79,7.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,318,78);


(lib.answerC1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_134();
	this.instance.setTransform(43,7.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,314,78);


(lib.answerC = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_133();
	this.instance.setTransform(80,7.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,319,78);


(lib.answerB1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_132();
	this.instance.setTransform(79,7.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,277.5,78);


(lib.answerB = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_131();
	this.instance.setTransform(79,7.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,277.5,78);


(lib.answerA1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_130();
	this.instance.setTransform(42,7.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,314,78);


(lib.answerA = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_129();
	this.instance.setTransform(84,7.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,277.5,78);


(lib.answer2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_128();
	this.instance.setTransform(63.5,7.25,0.3931,0.3931);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,277.5,78);


(lib.answer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.CachedBmp_127();
	this.instance.setTransform(79.6,7.3,0.3982,0.3982);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_1
	this.instance_1 = new lib.checkpoint_panel_program_button();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.Symbol4("synched",0);
	this.instance_2.setTransform(138.8,39,1,1,0,0,0,138.8,39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,277.5,78);


// stage content:
(lib.checkpoint2a_with_close_function = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{timesup:464,timesup2:944,timesup3:1424,start:1,Stop:4,Correct:458,wrong1:464,"start":480,"Stop":483,"Correct":938,"wrong1":944,"start":960,"Stop":966,"Correct":1417,"wrong1":1424});

	this.actionFrames = [0,4,5,450,458,464,469,470,483,929,938,944,948,949,966,1409,1417,1424,1428,1429];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_4 = function() {
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
	this.frame_5 = function() {
		this.close.addEventListener("click", window.close);
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
		
		
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.cont.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_481.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_481()
		{
			this.gotoAndPlay(480);
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
	this.frame_483 = function() {
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answerb.addEventListener("click", fl_ClickToGoToAndStopAtFrame_939.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_939()
		{
			this.gotoAndStop(938);
		}
		
		
		
		
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answerA.addEventListener("click", fl_ClickToGoToAndStopAtFrame_945.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_945()
		{
			this.gotoAndStop(944);
		}
		
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answerC.addEventListener("click", fl_ClickToGoToAndStopAtFrame_945.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_945()
		{
			this.gotoAndStop(944);
		}
		
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answerD.addEventListener("click", fl_ClickToGoToAndStopAtFrame_945.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_945()
		{
			this.gotoAndStop(944);
		}
	}
	this.frame_929 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop('timesup2');
	}
	this.frame_938 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.cont1.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_969.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_969()
		{
			this.gotoAndPlay(965);
		}
	}
	this.frame_944 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.replay2.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_486.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_486()
		{
			this.gotoAndPlay(485);
		}
	}
	this.frame_948 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_949 = function() {
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.replay.addEventListener("click", fl_ClickToGoToAndPlayAtFrame_481.bind(this));
		
		function fl_ClickToGoToAndPlayAtFrame_481()
		{
			this.gotoAndPlay(480);
		}
	}
	this.frame_966 = function() {
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answerA1.addEventListener("click", fl_ClickToGoToAndStopAtFrame_1423.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_1423()
		{
			this.gotoAndStop(1424);
		}
		
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answerb1.addEventListener("click", fl_ClickToGoToAndStopAtFrame_1423.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_1423()
		{
			this.gotoAndStop(1424);
		}
		
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.answerD1.addEventListener("click", fl_ClickToGoToAndStopAtFrame_1423.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame_1423()
		{
			this.gotoAndStop(1424);
		}
		
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.answerC1.addEventListener("click", fl_ClickToGoToAndStopFromFrame_1418.bind(this));
		
		function fl_ClickToGoToAndStopFromFrame_1418()
		{
			this.gotoAndStop(1417);
		}
	}
	this.frame_1409 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop('timesup3');
	}
	this.frame_1417 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.cont.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_960.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_960()
		{
			this.gotoAndPlay(959);
		}
	}
	this.frame_1424 = function() {
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.replay2.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_971.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_971()
		{
			this.gotoAndPlay(970);
		}
	}
	this.frame_1428 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}
	this.frame_1429 = function() {
		/* Click to Go to Frame and Stop
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		
		this.replay.addEventListener("click", fl_ClickToGoToAndPlayAtFrame_971.bind(this));
		
		function fl_ClickToGoToAndPlayAtFrame_971()
		{
			this.gotoAndPlay(970);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(445).call(this.frame_450).wait(8).call(this.frame_458).wait(6).call(this.frame_464).wait(5).call(this.frame_469).wait(1).call(this.frame_470).wait(13).call(this.frame_483).wait(446).call(this.frame_929).wait(9).call(this.frame_938).wait(6).call(this.frame_944).wait(4).call(this.frame_948).wait(1).call(this.frame_949).wait(17).call(this.frame_966).wait(443).call(this.frame_1409).wait(8).call(this.frame_1417).wait(7).call(this.frame_1424).wait(4).call(this.frame_1428).wait(1).call(this.frame_1429).wait(8));

	// close
	this.close = new lib.close();
	this.close.name = "close";
	this.close.setTransform(1309.5,49.5,1,1,0,0,0,27.5,27.5);
	this.close._off = true;
	new cjs.ButtonHelper(this.close, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.close).wait(5).to({_off:false},0).wait(1432));

	// counter
	this.instance = new lib.countdown("synched",0);
	this.instance.setTransform(719.6,71.6,1,1,0,0,0,30.6,31);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},451).wait(28).to({_off:false},0).to({_off:true},451).wait(30).to({_off:false},0).to({_off:true},450).wait(27));

	// flash0_ai
	this.cont = new lib.play();
	this.cont.name = "cont";
	this.cont.setTransform(666.45,515.05,1,1,0,0,0,75.5,79.2);
	this.cont.filters = [new cjs.ColorFilter(1, 1, 1, 1, 0, 0, 37, 0)];
	this.cont.cache(-2,-2,155,162);
	new cjs.ButtonHelper(this.cont, 0, 1, 1);

	this.replay = new lib.replay();
	this.replay.name = "replay";
	this.replay.setTransform(655.4,507.55,1,1,0,0,0,66,69.2);
	this.replay.filters = [new cjs.ColorFilter(1, 1, 1, 1, 1, 0, 39, 0)];
	this.replay.cache(-2,-2,136,142);

	this.cont1 = new lib.play1();
	this.cont1.name = "cont1";
	this.cont1.setTransform(666.45,515.05,1,1,0,0,0,75.5,79.2);
	this.cont1.filters = [new cjs.ColorFilter(1, 1, 1, 1, 0, 0, 37, 0)];
	this.cont1.cache(-2,-2,155,162);
	new cjs.ButtonHelper(this.cont1, 0, 1, 1);

	this.replay2 = new lib.replay2();
	this.replay2.name = "replay2";
	this.replay2.setTransform(636,510,1,1,0,0,0,66,69.1);
	new cjs.ButtonHelper(this.replay2, 0, 1, 1);

	this.instance_1 = new lib.CachedBmp_105();
	this.instance_1.setTransform(310,438,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.cont}]},458).to({state:[{t:this.replay}]},6).to({state:[{t:this.replay}]},6).to({state:[]},8).to({state:[{t:this.cont1}]},459).to({state:[{t:this.replay2}]},6).to({state:[{t:this.replay}]},6).to({state:[]},10).to({state:[{t:this.instance_1}]},458).to({state:[{t:this.replay2}]},6).to({state:[{t:this.replay}]},6).wait(8));

	// Layer_5
	this.instance_2 = new lib.congrats();
	this.instance_2.setTransform(686.2,356.8,1,1,0,0,0,346.2,69.2);

	this.instance_3 = new lib.CachedBmp_114();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.Symbol5();
	this.instance_4.setTransform(658.1,356.8,1,1,0,0,0,268.1,69.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},458).to({state:[{t:this.instance_3},{t:this.instance_4}]},6).to({state:[{t:this.instance_3},{t:this.instance_4}]},6).to({state:[]},8).to({state:[{t:this.instance_3},{t:this.instance_2}]},459).to({state:[{t:this.instance_3},{t:this.instance_4}]},6).to({state:[{t:this.instance_3},{t:this.instance_4}]},6).to({state:[]},10).to({state:[{t:this.instance_3},{t:this.instance_2}]},458).to({state:[{t:this.instance_3},{t:this.instance_4}]},6).to({state:[{t:this.instance_3},{t:this.instance_4}]},6).wait(8));

	// Layer_4
	this.Answer2 = new lib.answer2();
	this.Answer2.name = "Answer2";
	this.Answer2.setTransform(708.45,499.2,1.2721,1.2721);
	new cjs.ButtonHelper(this.Answer2, 0, 1, 2, false, new lib.answer2(), 3);

	this.answer2 = new lib.answer2();
	this.answer2.name = "answer2";
	this.answer2.setTransform(708.45,499.2,1.2721,1.2721);
	new cjs.ButtonHelper(this.answer2, 0, 1, 2, false, new lib.answer2(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Answer2}]}).to({state:[{t:this.Answer2}]},1).to({state:[{t:this.answer2}]},3).to({state:[]},454).wait(979));

	// button
	this.button_1 = new lib.answer();
	this.button_1.name = "button_1";
	this.button_1.setTransform(450.3,548.3,1.2557,1.2557,0,0,0,138.8,39.1);
	new cjs.ButtonHelper(this.button_1, 0, 1, 2, false, new lib.answer(), 3);

	this.answer = new lib.answer();
	this.answer.name = "answer";
	this.answer.setTransform(450.3,548.3,1.2557,1.2557,0,0,0,138.8,39.1);
	new cjs.ButtonHelper(this.answer, 0, 1, 2, false, new lib.answer(), 3);

	this.answerD = new lib.answerD();
	this.answerD.name = "answerD";
	this.answerD.setTransform(762,549.55);
	new cjs.ButtonHelper(this.answerD, 0, 1, 2, false, new lib.answerD(), 3);

	this.answerC = new lib.answerC();
	this.answerC.name = "answerC";
	this.answerC.setTransform(431.1,549.55);
	new cjs.ButtonHelper(this.answerC, 0, 1, 2, false, new lib.answerC(), 3);

	this.answerb = new lib.answerB();
	this.answerb.name = "answerb";
	this.answerb.setTransform(615,443.9);
	new cjs.ButtonHelper(this.answerb, 0, 1, 2, false, new lib.answerB(), 3);

	this.answerA = new lib.answerA();
	this.answerA.name = "answerA";
	this.answerA.setTransform(278.5,443.9);
	new cjs.ButtonHelper(this.answerA, 0, 1, 2, false, new lib.answerA(), 3);

	this.answerD1 = new lib.answerD1();
	this.answerD1.name = "answerD1";
	this.answerD1.setTransform(762,549.55);
	new cjs.ButtonHelper(this.answerD1, 0, 1, 2, false, new lib.answerD1(), 3);

	this.answerC1 = new lib.answerC1();
	this.answerC1.name = "answerC1";
	this.answerC1.setTransform(431.1,549.55);
	new cjs.ButtonHelper(this.answerC1, 0, 1, 2, false, new lib.answerC1(), 3);

	this.answerb1 = new lib.answerB1();
	this.answerb1.name = "answerb1";
	this.answerb1.setTransform(615,443.9);
	new cjs.ButtonHelper(this.answerb1, 0, 1, 2, false, new lib.answerB1(), 3);

	this.answerA1 = new lib.answerA1();
	this.answerA1.name = "answerA1";
	this.answerA1.setTransform(278.5,443.9);
	new cjs.ButtonHelper(this.answerA1, 0, 1, 2, false, new lib.answerA1(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.button_1}]}).to({state:[{t:this.button_1}]},1).to({state:[{t:this.answer}]},3).to({state:[]},454).to({state:[{t:this.answerA},{t:this.answerb},{t:this.answerC},{t:this.answerD}]},21).to({state:[]},458).to({state:[{t:this.answerA1},{t:this.answerb1},{t:this.answerC1},{t:this.answerD1}]},23).to({state:[]},457).wait(20));

	// Layer_1
	this.instance_5 = new lib.Symbol2();
	this.instance_5.setTransform(700.7,248.5,1,1,0,0,0,432.6,22.5);
	this.instance_5.shadow = new cjs.Shadow("rgba(53,0,92,1)",3,3,4);

	this.instance_6 = new lib.checkpoint_panel_program_time();
	this.instance_6.setTransform(536,28);

	this.instance_7 = new lib.CachedBmp_115();
	this.instance_7.setTransform(117.4,82,0.5,0.5);

	this.instance_8 = new lib.checkpoint_panel_program_setting();
	this.instance_8.setTransform(1244,27);

	this.instance_9 = new lib.CachedBmp_116();
	this.instance_9.setTransform(117.4,82,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_117();
	this.instance_10.setTransform(117.4,82,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_118();
	this.instance_11.setTransform(117.4,82,0.5,0.5);

	this.instance_12 = new lib.sentence2();
	this.instance_12.setTransform(700.7,268.5,1,1,0,0,0,432.6,22.5);
	this.instance_12.shadow = new cjs.Shadow("rgba(53,0,92,1)",3,3,4);

	this.instance_13 = new lib.CachedBmp_119();
	this.instance_13.setTransform(117.4,82,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_120();
	this.instance_14.setTransform(117.4,82,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_121();
	this.instance_15.setTransform(117.4,82,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_122();
	this.instance_16.setTransform(117.4,82,0.5,0.5);

	this.instance_17 = new lib.sentence3();
	this.instance_17.setTransform(700.7,268.5,1,1,0,0,0,432.6,22.5);
	this.instance_17.shadow = new cjs.Shadow("rgba(53,0,92,1)",3,3,4);

	this.instance_18 = new lib.CachedBmp_123();
	this.instance_18.setTransform(117.4,82,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_124();
	this.instance_19.setTransform(117.4,82,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_125();
	this.instance_20.setTransform(117.4,82,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_126();
	this.instance_21.setTransform(117.4,82,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5,p:{x:700.7,y:248.5}}]}).to({state:[{t:this.instance_9},{t:this.instance_6},{t:this.instance_8},{t:this.instance_5,p:{x:703.6,y:219.3}}]},458).to({state:[{t:this.instance_10},{t:this.instance_6},{t:this.instance_8},{t:this.instance_5,p:{x:703.6,y:219.3}}]},6).to({state:[{t:this.instance_11},{t:this.instance_6},{t:this.instance_8},{t:this.instance_5,p:{x:703.6,y:219.3}}]},6).to({state:[]},8).to({state:[{t:this.instance_13},{t:this.instance_6},{t:this.instance_12}]},1).to({state:[{t:this.instance_14},{t:this.instance_6},{t:this.instance_8},{t:this.instance_5,p:{x:703.6,y:219.3}}]},458).to({state:[{t:this.instance_15},{t:this.instance_6},{t:this.instance_8},{t:this.instance_5,p:{x:703.6,y:219.3}}]},6).to({state:[{t:this.instance_16},{t:this.instance_6},{t:this.instance_8},{t:this.instance_5,p:{x:703.6,y:219.3}}]},6).to({state:[]},10).to({state:[{t:this.instance_18},{t:this.instance_6},{t:this.instance_17}]},1).to({state:[{t:this.instance_19},{t:this.instance_6},{t:this.instance_8},{t:this.instance_5,p:{x:703.6,y:219.3}}]},457).to({state:[{t:this.instance_20},{t:this.instance_6},{t:this.instance_8},{t:this.instance_5,p:{x:703.6,y:219.3}}]},6).to({state:[{t:this.instance_21},{t:this.instance_6},{t:this.instance_8},{t:this.instance_5,p:{x:703.6,y:219.3}}]},6).wait(8));

	// white
	this.instance_22 = new lib.checkpoint_panel_program_white_area();
	this.instance_22.setTransform(201,397,0.6074,0.5596);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).to({_off:true},478).wait(1).to({_off:false,y:377},0).to({_off:true},480).wait(1).to({_off:false},0).wait(477));

	// bg
	this.instance_23 = new lib.checkpoint_panel_program_background();
	this.instance_23.setTransform(0,0,0.7077,0.7077);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).to({_off:true},478).wait(1).to({_off:false},0).to({_off:true},480).wait(1).to({_off:false},0).wait(477));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(679,367.5,680,367.5);
// library properties:
lib.properties = {
	id: '4E90C311FDE2D6458DDFAE8DCEDDD0EA',
	width: 1358,
	height: 735,
	fps: 30,
	color: "#6C3894",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_114.png", id:"CachedBmp_114"},
		{src:"images/checkpoint2_atlas_1.png", id:"checkpoint2_atlas_1"},
		{src:"images/checkpoint2_atlas_2.png", id:"checkpoint2_atlas_2"},
		{src:"images/checkpoint2_atlas_3.png", id:"checkpoint2_atlas_3"},
		{src:"images/checkpoint2_atlas_4.png", id:"checkpoint2_atlas_4"}
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