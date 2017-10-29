var socket = io.connect();

socket.on("connect", function (data) {
  console.log("sending event: going live");
  socket.emit("goingLive");
});

socket.on("sessionRequest", function (data) {
  var pop = confirm(
    data.name + " is requesting tutoring for: " + data.minutes + " minutes?"
  );
  if (pop) {
    socket.emit("sessionAccepted", data.id);
  } else {
    socket.emit("sessionRejected", data.id);
  }
});

socket.on("sessionStart", function (data) {
  setupWebRTC(data.initiator);
});

class SignalingCtrl {
  constructor() {
    this.onmessage = null;
    socket.on("message", d => this.onmessage(d));
  }

  send(type, data) {
    socket.emit("message", { type: type, data: data });
  }
}

async function setupWebRTC(initiator) {
  let remote_v = document.getElementById("rtc_video");
  let local_v = document.getElementById("my_video");
  let configuration = {
    iceServers: [
      {
        urls: "numb.viagenie.ca",
        username: "myemailum14@gmail.com",
        credential: "thunder1111"
      }, {
        urls: "numb.viagenie.ca",
        username: "myemailum14@gmail.com",
        credential: "thunder1111"
      },
      {urls:"stun1.l.google.com:19302"}, {urls:"stun2.l.google.com:19302"}, {urls:"stun3.l.google.com:19302"}, {urls:"stun4.l.google.com:19302"}, {urls:"numb.viagenie.ca:3478"}, {urls:"stun.12connect.com:3478"}, {urls:"stun.12voip.com:3478"}, {urls:"stun.1cbit.ru:3478"}, {urls:"stun.1und1.de:3478"}, {urls:"stun.2talk.co.nz:3478"}, {urls:"stun.2talk.com:3478"}, {urls:"stun.3clogic.com:3478"}, {urls:"stun.3cx.com:3478"}, {urls:"stun.726.com:3478"}, {urls:"stun.a-mm.tv:3478"}, {urls:"stun.aa.net.uk:3478"}, {urls:"stun.aceweb.com:3478"}, {urls:"stun.acrobits.cz:3478"}, {urls:"stun.acronis.com:3478"}, {urls:"stun.actionvoip.com:3478"}, {urls:"stun.advfn.com:3478"}, {urls:"stun.aeta-audio.com:3478"}, {urls:"stun.b2b2c.ca:3478"}, {urls:"stun.bahnhof.net:3478"}, {urls:"stun.barracuda.com:3478"}, {urls:"stun.beam.pro:3478"}, {urls:"stun.bitburger.de:3478"}, {urls:"stun.bluesip.net:3478"}, {urls:"stun.bomgar.com:3478"}, {urls:"stun.botonakis.com:3478"}, {urls:"stun.budgetphone.nl:3478"}, {urls:"stun.budgetsip.com:3478"}, {urls:"stun.cablenet-as.net:3478"}, {urls:"stun.callromania.ro:3478"}, {urls:"stun.callwithus.com:3478"}, {urls:"stun.cheapvoip.com:3478"}, {urls:"stun.cloopen.com:3478"}, {urls:"stun.cognitoys.com:3478"}, {urls:"stun.comfi.com:3478"}, {urls:"stun.commpeak.com:3478"}, {urls:"stun.communigate.com:3478"}, {urls:"stun.comrex.com:3478"}, {urls:"stun.comtube.com:3478"}, {urls:"stun.comtube.ru:3478"}, {urls:"stun.dowlatow.ru:3478"}, {urls:"stun.duocom.es:3478"}, {urls:"stun.dus.net:3478"}, {urls:"stun.e-fon.ch:3478"}, {urls:"stun.easemob.com:3478"}, {urls:"stun.easycall.pl:3478"}, {urls:"stun.easyvoip.com:3478"}, {urls:"stun.eibach.de:3478"}, {urls:"stun.ekiga.net:3478"}, {urls:"stun.ekir.de:3478"}, {urls:"stun.elitetele.com:3478"}, {urls:"stun.emu.ee:3478"}, {urls:"stun.engineeredarts.co.uk:3478"}, {urls:"stun.eoni.com:3478"}, {urls:"stun.epygi.com:3478"}, {urls:"stun.faktortel.com.au:3478"}, {urls:"stun.fbsbx.com:3478"}, {urls:"stun.fh-stralsund.de:3478"}, {urls:"stun.fmbaros.ru:3478"}, {urls:"stun.fmo.de:3478"}, {urls:"stun.freecall.com:3478"}, {urls:"stun.instantteleseminar.com:3478"}, {urls:"stun.internetcalls.com:3478"}, {urls:"stun.intervoip.com:3478"}, {urls:"stun.ipcomms.net:3478"}, {urls:"stun.ipfire.org:3478"}, {urls:"stun.ippi.com:3478"}, {urls:"stun.ippi.fr:3478"}, {urls:"stun.it1.hr:3478"}, {urls:"stun.ivao.aero:3478"}, {urls:"stun.jabbim.cz:3478"}, {urls:"stun.jumblo.com:3478"}, {urls:"stun.justvoip.com:3478"}, {urls:"stun.kaospilot.dk:3478"}, {urls:"stun.kaseya.com:3478"}, {urls:"stun.kaznpu.kz:3478"}, {urls:"stun.kiwilink.co.nz:3478"}, {urls:"stun.kuaibo.com:3478"}, {urls:"stun.l.google.com:19302"}, {urls:"stun.lamobo.org:3478"}, {urls:"stun.nfon.net:3478"}, {urls:"stun.ngine.de:3478"}, {urls:"stun.node4.co.uk:3478"}, {urls:"stun.nonoh.net:3478"}, {urls:"stun.nottingham.ac.uk:3478"}, {urls:"stun.nova.is:3478"}, {urls:"stun.onesuite.com:3478"}, {urls:"stun.onthenet.com.au:3478"}, {urls:"stun.ooma.com:3478"}, {urls:"stun.oovoo.com:3478"}, {urls:"stun.ozekiphone.com:3478"}, {urls:"stun.personal-voip.de:3478"}, {urls:"stun.petcube.com:3478"}, {urls:"stun.pexip.com:3478"}, {urls:"stun.phone.com:3478"}, {urls:"stun.pidgin.im:3478"}, {urls:"stun.pjsip.org:3478"}, {urls:"stun.planete.net:3478"}, {urls:"stun.poivy.com:3478"}, {urls:"stun.powervoip.com:3478"}, {urls:"stun.ppdi.com:3478"}, {urls:"stun.rackco.com:3478"}, {urls:"stun.redworks.nl:3478"}, {urls:"stun.ringostat.com:3478"}, {urls:"stun.rmf.pl:3478"}, {urls:"stun.rockenstein.de:3478"}, {urls:"stun.rolmail.net:3478"}, {urls:"stun.rudtp.ru:3478"}, {urls:"stun.russian-club.net:3478"}, {urls:"stun.rynga.com:3478"}, {urls:"stun.sainf.ru:3478"}, {urls:"stun.schlund.de:3478"}, {urls:"stun.sigmavoip.com:3478"}, {urls:"stun.sip.us:3478"}, {urls:"stun.sipdiscount.com:3478"}, {urls:"stun.sipgate.net:10000"}, {urls:"stun.sipgate.net:3478"}, {urls:"stun.siplogin.de:3478"}, {urls:"stun.sipnet.net:3478"}, {urls:"stun.sipnet.ru:3478"}, {urls:"stun.siportal.it:3478"}, {urls:"stun.sippeer.dk:3478"}, {urls:"stun.siptraffic.com:3478"}, {urls:"stun.sma.de:3478"}, {urls:"stun.smartvoip.com:3478"}, {urls:"stun.smsdiscount.com:3478"}, {urls:"stun.snafu.de:3478"}, {urls:"stun.solcon.nl:3478"}, {urls:"stun.solnet.ch:3478"}, {urls:"stun.sonetel.com:3478"}, {urls:"stun.sonetel.net:3478"}, {urls:"stun.sovtest.ru:3478"}, {urls:"stun.speedy.com.ar:3478"}, {urls:"stun.spoiltheprincess.com:3478"}, {urls:"stun.srce.hr:3478"}, {urls:"stun.ssl7.net:3478"}, {urls:"stun.stunprotocol.org:3478"}, {urls:"stun.swissquote.com:3478"}, {urls:"stun.t-online.de:3478"}, {urls:"stun.talks.by:3478"}, {urls:"stun.tel.lu:3478"}, {urls:"stun.telbo.com:3478"}, {urls:"stun.telefacil.com:3478"}, {urls:"stun.threema.ch:3478"}, {urls:"stun.tng.de:3478"}, {urls:"stun.trueconf.ru:3478"}, {urls:"stun.twt.it:3478"}, {urls:"stun.ucallweconn.net:3478"}, {urls:"stun.ucsb.edu:3478"}, {urls:"stun.ucw.cz:3478"}, {urls:"stun.uiscom.ru:3478"}, {urls:"stun.uls.co.za:3478"}, {urls:"stun.unseen.is:3478"}, {urls:"stun.up.edu.ph:3478"}, {urls:"stun.usfamily.net:3478"}, {urls:"stun.uucall.com:3478"}, {urls:"stun.veoh.com:3478"}, {urls:"stun.vipgroup.net:3478"}, {urls:"stun.viva.gr:3478"}, {urls:"stun.vivox.com:3478"}, {urls:"stun.vline.com:3478"}, {urls:"stun.vmi.se:3478"}, {urls:"stun.vo.lu:3478"}, {urls:"stun.vodafone.ro:3478"}, {urls:"stun.voicetrading.com:3478"}, {urls:"stun.voip.aebc.com:3478"}, {urls:"stun.voip.blackberry.com:3478"}, {urls:"stun.voip.eutelia.it:3478"}, {urls:"stun.voiparound.com:3478"}, {urls:"stun.voipblast.com:3478"}, {urls:"stun.voipbuster.com:3478"}, {urls:"stun.voipbusterpro.com:3478"}, {urls:"stun.voipcheap.co.uk:3478"}, {urls:"stun.voipcheap.com:3478"}, {urls:"stun.voipdiscount.com:3478"}, {urls:"stun.voipfibre.com:3478"}, {urls:"stun.voipgain.com:3478"}, {urls:"stun.voipgate.com:3478"}, {urls:"stun.voipinfocenter.com:3478"}, {urls:"stun.voipplanet.nl:3478"}, {urls:"stun.voippro.com:3478"}, {urls:"stun.voipraider.com:3478"}, {urls:"stun.voipstunt.com:3478"}, {urls:"stun.voipwise.com:3478"}, {urls:"stun.voipzoom.com:3478"}, {urls:"stun.voxgratia.org:3478"}, {urls:"stun.voxox.com:3478"}, {urls:"stun.voztele.com:3478"}, {urls:"stun.wcoil.com:3478"}, {urls:"stun.webcalldirect.com:3478"}, {urls:"stun.whoi.edu:3478"}, {urls:"stun.wifirst.net:3478"}, {urls:"stun.yy.com:3478"}, {urls:"stun.zadarma.com:3478"}, {urls:"stun.zepter.ru:3478"}, {urls:"stun.zoiper.com:3478"}, {urls:"stun1.faktortel.com.au:3478"}, {urls:"stun.zoiper.com:3478"},
    ]
  };


  let rpc = new SignalingCtrl();
  let pc = null;
  let stream = null;
  let mediaConstraints = {
    video: true,
    audio: false
  };
  let sdpConstraints = {
    offerToReceiveAudio: false,
    offerToReceiveVideo: true
  };

  rpc.onmessage = function (msg) {
    console.log(`got msg ${msg.type}`);
    switch (msg.type) {
      case "SDPoffer":
        handleOffer(msg.data);
        break;
      case "SDPanswer":
        addAnswer(msg.data);
        break;
      case "icecandidate":
        addRICE(msg.data);
        break;
      default:
        console.log("unknown message", msg.type);
        break;
    }
  };



  if (initiator) {
    stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    pc = new RTCPeerConnection(configuration);
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    local_v.srcObject = stream;

    pc.onicecandidate = handleICEcandidate;
    pc.oniceconnectionstatechange = e => console.log("ice state: ", pc.iceConnectionState);
    pc.onnegotiationneeded = createOffer;
    pc.ontrack = e => {
      console.log(e.streams);
      remote_v.srcObject = e.streams[0];
    };
  }



  async function createOffer() {
    if (!initiator) return;
    await pc.setLocalDescription(await pc.createOffer(sdpConstraints));
    rpc.send("SDPoffer", { sdp: pc.localDescription });
  }

  function handleICEcandidate(evt) {
    if (!evt.candidate) return;
    console.log("adding ice for self", evt.target.iceGatheringState);
    rpc.send("icecandidate", { candidate: evt.candidate });
  }

  async function addRICE(d) {
    console.log("adding remote ice");
    await pc.addIceCandidate(new RTCIceCandidate(d.candidate));
  }

  async function handleOffer(data) {
    console.log("got remote offer");
    if (!pc) {
      pc = new RTCPeerConnection(configuration);
      pc.onicecandidate = handleICEcandidate;
      pc.oniceconnectionstatechange = e => console.log("ice state: ", pc.iceConnectionState);
      pc.onnegotiationneeded = createOffer;
      pc.ontrack = e => {
        console.log(e.streams);
        remote_v.srcObject = e.streams[0];
      };
    }

    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
    stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    local_v.srcObject = stream;
    await pc.setLocalDescription(await pc.createAnswer(sdpConstraints));
    console.log('answer sent');
    rpc.send("SDPanswer", { sdp: pc.localDescription });

  }

  async function addAnswer(answer) {
    console.log("got answer");
    await pc.setRemoteDescription(new RTCSessionDescription(answer.sdp));
  }


}

// function setupWebRTC(initiator) {
//     let v = document.getElementById('rtc_video');
//     let me = document.getElementById('my_video');
//     let signalCtrl = new SignalingCtrl();
//     let configuration = { 'iceServers': [{ 'urls': 'stun:stun.example.org' }] };
//     let pc = new RTCPeerConnection(configuration);
//     let stack = [];
//     window.pc = pc;
//     function unloadStack() {
//         let t = null;
//         while (t = stack.shift()) {
//             console.log('added ice from stack');
//             pc.e => pc.addIceCandidate(e)Candidate(new RTCIceCandidate(t.candidate)).catch(logErr);
//         }
//     }

//     //when get ice tell remote peer
//     pc.onicecandidate = e => {
//         if (!e || !e.candidate) return;
//         signalCtrl.send('icecandidate', { candidate: e.candidate })
//     };

//     pc.ontrack = e => v.srcObject = e.streams[0];
//     pc.oniceconnectionstatechange = e => console.log(pc.iceConnectionState);

//     if (initiator) {
//         console.log('im intiating');
//         pc.createOffer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 }).
//             then(offer => pc.setLocalDescription(offer)).
//             catch(logErr);
//     }

//     pc.onnegotiationneeded = e => {
//         if (initiator) {
//             console.log('sending sdp offer');
//             signalCtrl.send('SDPoffer', { sdp: pc.localDescription });
//         }
//     }

//     signalCtrl.onPeerICE = e => pc.addIceCandidate(e);   //when get ice from remote peer add it
//     signalCtrl.onSDPoffer = debounce(createAnswer);   //when and if get an offer reply with answer
//     signalCtrl.onSDPanswer = debounce(answerHandler);   //if get an answer add it

//     function addIce(e) {
//         console.log('got ice candidate');
//         if (pc.remoteDescription.sdp == '') {
//             stack.push(e); console.log('added to stack');
//         } else {
//             pc.addIceCandidate(new RTCIceCandidate(e.candidate)).catch(logErr);
//         }
//     };

//     function createAnswer(e) {
//         return new Promise((resolve, reject) => {
//             console.log('got offer', e.sdp);
//             pc.setRemoteDescription(new RTCSessionDescription(e.sdp))
//                 .then(() => pc.createAnswer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 }))
//                 .then(answer => pc.setLocalDescription(answer))
//                 .then(() => unloadStack())
//                 .then(() => signalCtrl.send('SDPanswer', { sdp: pc.localDescription }))
//                 .then(setTimeout(() => resolve(), 1000))
//                 .catch(logErr);
//         });
//     }

//     async function answerHandler(e) {
//         return new Promise((resolve, reject) => {
//             console.log('got answer');
//             console.log(e);
//             pc.setRemoteDescription(new RTCSessionDescription(e.sdp))
//                 .then(() => unloadStack())
//                 .catch(logErr);
//             resolve();
//         });
//     }

//     //get camera and add it to RTC connection
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//         stream.getTracks().forEach(track => pc.addTrack(track, stream));
//         me.srcObject = stream;
//     }).catch(logErr);

// }

function debounce(func) {
  let p = Promise.resolve();

  return function (x) {
    p = p.then(() => func(x));
  };
}

function logErr(err) {
  console.log(err);
}
// var signalingChannel = new SignalingChannel();
// var configuration = {
//   'iceServers': [{'urls': 'stun:stun.example.org'}]
// };

// var pc;

// // call start() to initiate

// function start() {
//   pc = new RTCPeerConnection(configuration);

//   // send any ice candidates to the other peer
//   pc.onicecandidate = function (evt) {
//     if (evt.candidate)
//       signalingChannel.send(JSON.stringify({
//         'candidate': evt.candidate
//       }));
//   };

//   // let the 'negotiationneeded' event trigger offer generation
//   pc.onnegotiationneeded = function () {
//     pc.createOffer(localDescCreated, logError);
//   }

//   // once remote stream arrives, show it in the remote video element
//   pc.onaddstream = function (evt) {
//     remoteView.src = URL.createObjectURL(evt.stream);
//   };

//   // get a local stream, show it in a self-view and add it to be sent
//   navigator.getUserMedia({
//     'audio': true,
//     'video': true
//   }, function (stream) {
//     selfView.src = URL.createObjectURL(stream);
//     pc.addStream(stream);
//   }, logError);
// }

// function localDescCreated(desc) {
//   pc.setLocalDescription(desc, function () {
//     signalingChannel.send(JSON.stringify({
//       'sdp': pc.localDescription
//     }));
//   }, logError);
// }

// signalingChannel.onmessage = function (evt) {
//   if (!pc)
//     start();

//   var message = JSON.parse(evt.data);
//   if (message.sdp)
//     pc.setRemoteDescription(new RTCSessionDescription(message.sdp), function () {
//       // if we received an offer, we need to answer
//       if (pc.remoteDescription.type == 'offer')
//         pc.createAnswer(localDescCreated, logError);
//     }, logError);
//   else
//     pc.addIceCandidate(new RTCIceCandidate(message.candidate));
// };

// function logError(error) {
//   log(error.name + ': ' + error.message);
// }
