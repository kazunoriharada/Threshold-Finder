const numbers = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]; // 特定の数値の組み合わせ
shuffleArray(numbers); // 配列をシャッフル
// シャッフルされた配列から順に要素を取り出す
// var audio_number = 'cello'
var audio_number = document.getElementById('signal_id').textContent;
var number = numbers[0];
var audioPath1 = `./static/${audio_number}/${(number/10).toFixed(1)}.wav`;
var audio1Played = false;
numbers.shift();
var number_B = number - Math.floor(Math.random() * 4) + 1;
number_B = number_B < 3 ? 3 : number_B;
var audioPath2 = `./static/${audio_number}/${(number_B/10).toFixed(1)}.wav`;
var audio2Played = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 要素を入れ替え
    }
    return array;
}
function playCal(audioId) {
    var audio = document.getElementById(audioId);
    audio.src = `./static/${audio_number}/2.4.wav`;
    audio.play();
}


function playAudio(audioId) {
    var audio = document.getElementById(audioId);
    audio.src = (audioId === 'audio1') ? audioPath1 : audioPath2;
    // stop other audio
    var otherAudioId = (audioId === 'audio1') ? 'audio2' : 'audio1';
    var otherAudio = document.getElementById(otherAudioId);
    otherAudio.pause();
    audio.play();
    if (audioId === 'audio1') {
        audio1Played = true;
    } else {
        audio2Played = true;
    }
}

function sendData(action) {
    fetch('/record_action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: action,
            audio1: audioPath1.replace('./static/', '').replace('s.wav', ''),
            audio2: audioPath2.replace('./static/', '').replace('s.wav', '')
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
}

function recordDifference() {
    if (audio1Played & audio2Played) {
        // stop audio
        var audio1 = document.getElementById('audio1');
        var audio2 = document.getElementById('audio2');
        audio1.pause();
        audio2.pause();
        sendData('Different');
        if (number < number_B) {
            if (numbers.length == 0) {
                alert('休憩です。実験担当者の指示に従ってください。');
                return;
            }
            setNextAudio_A()
        } else {
            number_B ++;
        }
        audioPath2 = `./static/${audio_number}/${(number_B/10).toFixed(1)}.wav`;
        audio2Played = false;
        }
    }

function goToNext(event) {
    if (audio1Played & audio2Played) {
    var audio1 = document.getElementById('audio1');
    var audio2 = document.getElementById('audio2');
    audio1.pause();
    audio2.pause();
    sendData(event.target.id);
    // 乱数で90%の確率で次の音に音の高さを変える
    if (Math.random() < 0.9) {
        number_B ++;
    }
    if (number_B > 24) {
        if (numbers.length == 0) {
            alert('休憩です。実験担当者の指示に従ってください。');
            return;
        }
        setNextAudio_A();
    }
    audioPath2 = `./static/${audio_number}/${(number_B/10).toFixed(1)}.wav`;
    audio2Played = false;
    }
}

function setNextAudio_A() {
    number = numbers[0];
    audioPath1 = `./static/${audio_number}/${(number/10).toFixed(1)}.wav`;
    audio1Played = false;
    numbers.shift();
    number_B = number - Math.floor(Math.random() * 4) + 1;
    number_B = number_B < 3 ? 3 : number_B;
}