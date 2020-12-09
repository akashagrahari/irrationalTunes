var irrNo, tempo, isPlaying, cursor, pause, play, velocity, delay, isSet, scaleFormula, intervals, rootNote, number, stage, stageNumber, octave, textBox;
var Soundfont;
var ac;
var sfPromise;

var allNotesArray = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];

document.addEventListener("DOMContentLoaded", (event) => {
    $(document).ready(function() {
        // irrNo
        console.log("Assets loaded");   
        Soundfont = require('soundfont-player');
        ac = new AudioContext();
        sfPromise = Soundfont.instrument(ac, 'acoustic_grand_piano', { gain: 4 });
        initializeVars();
        hideIntro();
        refresh();
    });
});


function initializeVars() {
    tempo = $('#tempo');
    isPlaying = false;
    cursor = 0;
    pause = $('#pause');
    play = $('#play');
    velocity = 127;
    delay = 0;
    isSet=false;
    scaleFormula = $('#scale');
    irrNo = '';
    // intervals,
    rootNote = $('#root-note');
    // noteArray,
    selectNumber = $('#select-number');
    stage = $('#digits');
    stageNumber = $('.stage-number');
    octave = $('#octave');
    textBox = $('#digits');
    sfPromise.then(function(instrument){
        instrument.play('D4');
    }, function(err) {
      console.log(err);
      alert("You will need to disable adblock to use this app. This site has no ads. It's just a case of false positive.");
    });
}


function hideIntro(){
    ac.resume().then(() => {
      console.log('Playback resumed successfully');
    }, () => {
      alert('Failed to initialize audio context. Please reload.');
    });
    $('#intro').hide();
}

function resetControlIcons() {
    pause.hide();
}

function resetStage() {
    cursor = 0;
    stage.val('');
}

function refreshControlNumber(selectNumberVal){
    $('.stage-number').hide();
    console.log("#control-"+selectNumberVal);
    $("#control-"+selectNumberVal).removeClass("hidden");
    $("#control-"+selectNumberVal).show();
    // $("#control-"+selectNumberVal).attr("class",  stage-number");
    // document.getElementById('control-'+selectNumberVal).className="control stage-number";
}

function getNoteArray(intervals) {
    var array = [rootNote.val()];
    for(var i=0; i<9; i++){
      array.push(allNotesArray[(allNotesArray.indexOf(array[i])+parseInt(intervals[i%intervals.length]))%allNotesArray.length]);
    }
    return array;
}

function refresh(){
    isSet = true;
    isPlaying = false;
    resetControlIcons();
    resetStage();
    tempoVal = tempo.val();
    scaleFormulaVal = scaleFormula.val();
    rootNoteVal = rootNote.val();
    octaveVal = 20+(12*parseInt(octave.val()));
    selectNumberVal = selectNumber.val();
    refreshControlNumber(selectNumberVal);
    loadJSON(selectNumberVal, function(response) {
        var jsonData = JSON.parse(response);
        irrNo = jsonData.value;
        console.log("selected irrational number = " + selectNumberVal);
        console.log("selected irrational number value = " + irrNo);
    });
    intervals = scaleFormula.val().split('').map(function(item) {
      return parseInt(item, 10);
    });
    noteArray = getNoteArray(intervals);
    console.log(intervals);
    console.log(noteArray);
}

function playToggle() {
  if (!isSet) {
    return;
  }
  isPlaying = !isPlaying;
  $('.stage-number').hide();
  if(!isPlaying){
      pause.removeClass('hidden');
      pause.show();
  }
  else{
      pause.hide();
  }
  length = irrNo.length;
  tempoVal = parseInt(tempo.val());
  typeIt();

  function playNote(note, callback) {
    textBox.val(textBox.val()+irrNo[cursor]);
    sfPromise.then(function(instrument){
        if(!isNaN(irrNo[cursor])) {
            console.log("true");
            console.log(note);
          instrument.play(note);
        } else {
          console.log("false");
          console.log(irrNo[cursor]);
          console.log(cursor);
          console.log(note);
        }
        callback();
      });
  }

  function typeIt() {
    if(cursor > length || !isPlaying) return;
    if(cursor == 0){
      playNote(noteArray[irrNo[cursor]]+octave.val(), function() {
          cursor++;
      });
    }
    else if(cursor == 1){
      cursor++;
    }
    else if(cursor == 2){
      textBox.val(textBox.val()+'.');
      playNote(noteArray[irrNo[cursor]]+octave.val(), function() {
          cursor++;
      });
    }
    else{
      playNote(noteArray[irrNo[cursor]]+octave.val(), function() {
          cursor++;
      });
    }
    setTimeout(typeIt, ((60/tempoVal)*1000));
  }
}
