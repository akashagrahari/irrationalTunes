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
    });
}


function hideIntro(){
    $('#intro').hide();
}

function resetControlIcons() {
    pause.hide();
}

function resetStage() {
    cursor = 0;
    stage.val('');
}

function hideElementsByClassName(className) {
    $("." + className).hide();
  }

function refreshControlNumber(selectNumberVal){
    hideElementsByClassName('stage-number');
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
    isPlaying = false;
    resetControlIcons();
    resetStage();
    // pause = $('#pause');
    // isSet = true;
    // cursor = 0;
    // isPlaying = false;
    // if(!pause.hasClass('hidden')){
    //     pause.addClass('hidden');
    //   }
    tempoVal = tempo.val();
    scaleFormulaVal = scaleFormula.val();
    rootNoteVal = rootNote.val();
    octaveVal = 20+(12*parseInt(octave.val()));
    selectNumberVal = selectNumber.val();
    refreshControlNumber(selectNumberVal);
    loadJSON(selectNumberVal, function(response) {
        var jsonData = JSON.parse(response);
        irrNo = jsonData.value;

    });
    // switch(selectNumberVal){
    //     case "pi":
    //       loadJSON(selectNumberVal, function(response) {
    //           var jsonData = JSON.parse(response);
    //           irrNo = jsonData.value;
    
    //       });
    //     case "euler":
            
    // //     break;
    // //   case 2:
    // //     irrNo = '<%= (BigMath::E(1000)).to_s %>';
    // //     break;
    // //   case 3:
    // //     irrNo = '<%= BigDecimal.new('2').sqrt(1000).to_s %>';
    // //     break;
    // //   case 4:
    // //     irrNo = '<%= ((BigMath::PI(1000))*2).to_s %>';
    // //     break;
    // //   default:
    // //     alert("Something Went Wrong! \nWe are working on it");
    // }
    console.log("selected irrational number = " + selectNumberVal);
    console.log("selected irrational number value = " + irrNo);
    intervals = scaleFormula.val().split('').map(function(item) {
      return parseInt(item, 10);
    });
    noteArray = getNoteArray(intervals);
    console.log(intervals);
    console.log(noteArray);
}

function playToggle() {
    isPlaying = !isPlaying;
    hideElementsByClassName('stage-number');
    if(!isPlaying){
      pause.removeClass('hidden');
    }
    else{
      pause.addClass('hidden');
    }
    length = irrNo.length;
    tempoVal = parseInt(tempo.val());
    typeIt();
  
    function playNote(note) {
      textBox.val(textBox.val()+irrNo[cursor]);
      sfPromise.then(function(instrument){
          if(!isNaN(irrNo[cursor])) {
            instrument.play(note);
          }
        });
        cursor++;
    }
  
    function typeIt() {
      if(cursor > length || !isPlaying) return;
      if(cursor == 0){
        playNote(noteArray[irrNo[cursor]]+octave.val());
      }
      else if(cursor == 1){
        cursor++;
      }
      else if(cursor == 2){
        textBox.val(textBox.val()+'.');
        playNote(noteArray[irrNo[cursor]]+octave.val());
      }
      else{
        playNote(noteArray[irrNo[cursor]]+octave.val());
      }
      setTimeout(typeIt, ((60/tempoVal)*1000));
    }
  }