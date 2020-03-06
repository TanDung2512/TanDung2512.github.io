const DELAY = 500;
var animating = false;
var cardsCounter = 0;
var numOfCards = 6;
var decisionVal = 80;
var pullDeltaX = 0;
var deg = 0;
var rotate = {};
var idTimeout = null;
var $card, $cardReject, $cardLike;
var isRotate = null;
var numbers = [1, 1, 1, 1, 1];
var user_info
var email;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var player;
var firebaseConfig = {
    apiKey: "AIzaSyDIXHOEQxxecIwg3hwGEd75MnAVjwcH3aI",
    authDomain: "stinder-85ecf.firebaseapp.com",
    databaseURL: "https://stinder-85ecf.firebaseio.com",
    projectId: "stinder-85ecf",
    storageBucket: "stinder-85ecf.appspot.com",
    messagingSenderId: "1091912500996",
    appId: "1:1091912500996:web:5f305dc438e8a0ccaf3251",
    measurementId: "G-H0JJ68JV73"
};

//inital state
$(".signin").hide();

//handle event 
$(".signin").on("click", handleSignInClick);

var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    $("#myModal").css("display", "none");
    showScreen();
}

$("#play-btn").click(function() {
    player.playVideo();
    $(this).hide();
})


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'pd2pwuXU-js',
        //events: {
        //  'onStateChange': onPlayerStateChange
        // }
    });
}
// Your web app's Firebase configuration

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
/* 

*/

$("#play-btn").hide();

function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $card.css("transform", "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)");
    var opacity = pullDeltaX / 100;
    var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
    var likeOpacity = (opacity <= 0) ? 0 : opacity;
    $cardReject.css("opacity", rejectOpacity);
    $cardLike.css("opacity", likeOpacity);
};

function getRandom() {
    return Math.floor(Math.random() * (8 - 0 + 1))
}

function reset() {
    //console.log(idTimeout);
    idTimeout && clearTimeout(idTimeout);
    idTimeout = null;
    player && player.stopVideo();
    $(".match__container").hide();
    $(".video__container").hide();
    $(".slots__container").hide();
    //console.log("aaa");
    showCards();
}

function release() {
    if (pullDeltaX >= decisionVal) {
        $card.addClass("to-right");
        hideCards();
        showMatchCards();
    } else if (pullDeltaX <= -decisionVal) {
        $card.addClass("to-left");
        hideCards();
        showVideo();
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
        $card.addClass("inactive");

        setTimeout(function() {
            $card.addClass("below").removeClass("inactive to-left to-right");
            cardsCounter++;
            if (cardsCounter === numOfCards) {
                cardsCounter = 0;
                $(".demo__card").removeClass("below");
            }
        }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
        $card.addClass("reset");
    }

    setTimeout(function() {
        $card.attr("style", "").removeClass("reset")
            .find(".demo__card__choice").attr("style", "");

        pullDeltaX = 0;
        animating = false;
    }, 300);
};

function hideCards() {
    $(".demo__card-cont").removeClass("animated zoomIn");
    $(".demo__card-cont").addClass("animated zoomOut");
    $(".demo__card-cont").css("animation-duration", DELAY);
    setTimeout(function() {
        $(".demo__card-cont").hide();
    }, DELAY);
}

function showCards() {
    $(".demo__card-cont").removeClass("zoomOut");
    $(".demo__card-cont").addClass("animated zoomIn fast");
    $(".demo__card-cont").css("animation-duration", DELAY);
    $(".demo__card-cont").show();
}

function showScreen() {
    $(".demo").removeClass("animated zoomOut");
    $(".demo").show();
    $(".demo").addClass("animated zoomIn");
}

function showMatchCards() {
    $(".match__container").removeClass("animated zoomOut");
    $(".match__container").addClass("animated zoomIn fast");
    $(".match__container").css("animation-duration", DELAY);
    setTimeout(function() {
        $(".match__container").show();
        $(".match__container").css("display", "flex");
    }, DELAY);
}

function showVideo() {
    $(".video__container").removeClass("animated zoomOut");
    $(".video__container").addClass("animated zoomIn fast");
    $(".video__container").css("animation-duration", "1s");
    setTimeout(function() {
        $(".video__container").show();
        $(".video__container").css("display", "block");
        $("#play-btn").show();
    }, DELAY);
}

function showSlots() {
    $(".slots__container").removeClass("animated zoomOut");
    $(".slots__container").addClass("animated zoomIn fast");
    $(".slots__container").css("animation-duration", "1s");
    setTimeout(function() {
        $(".slots__container").show();
        $(".slots__container").css("display", "flex");
    }, DELAY);
}

function hideVideo() {
    $(".video__container").removeClass("animated zoomIn");
    $(".video__container").addClass("animated zoomOut fast delay-1s");
    $(".video__container").css("animation-duration", DELAY);
    //console.log("hide");
    setTimeout(function() {
        $(".video__container").hide();
    }, DELAY);
}

$(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(e) {
    if (animating) return;
    $card = $(this);
    $cardReject = $(".demo__card__choice.m--reject", $card);
    $cardLike = $(".demo__card__choice.m--like", $card);
    var startX = e.pageX || e.originalEvent.touches[0].pageX;

    $(document).on("mousemove touchmove", function(e) {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        pullDeltaX = (x - startX);
        if (!pullDeltaX) return;
        pullChange();
    });

    $(document).on("mouseup touchend", function() {
        $(document).off("mousemove touchmove mouseup touchend");
        if (!pullDeltaX) return; // prevents from rapid click events
        release();
    });
});


function rotateModule(id) {
    this._id = id;
    this._heightBox = $("#" + this._id).css("height");
    this._heightBox = this._heightBox.replace(/px/g, '');
    //console.log(this._heightBox);
    this._curNum = 1;
}

rotateModule.prototype.genListNumber = function() {
    $("#" + this._id).append("<div class='list__number' style='transition: 0.1s ease-in-out;'></div>");

    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const self = this;
    nums.forEach(function(num) {
        $("#" + self._id + " .list__number").append("<div>" + num + "</div>");
    })
}

rotateModule.prototype.setNumber = function(nextNum) {
    //console.log(nextNum);
    //this.move2Number(nextNum);
    $("#" + this._id).text(nextNum);
}

rotateModule.prototype.move2Number = function(desNum) {
    // $("#" +this._id + " .list__number").css("transform", "translateY(-" + desNum * this._heightBox + "px)" );
    $("#" + self._id).text(desNum);
}

function triggerRotate() {
    isRotate = true;
    var listSlots = ["slot_1", "slot_2", "slot_3", "slot_4", "slot_5"]
    listSlots.forEach(function(slot, i) {
        let idInterval
        let _i = i;
        let newObj = new rotateModule(slot);
        newObj.setNumber(1);

        setTimeout(function() {
            idInterval = setInterval(function() {
                const num = getRandom();
                numbers[_i] = num;
                newObj.setNumber(num);
            }, 30)
        }, i * 1000);

        setTimeout(function() {
            clearInterval(idInterval);
            //console.log(values);
            if (i === listSlots.length - 1) {
                isRotate = false;
                console.log(isRotate);
                $(".signin").show();
            }
        }, i * 1000 + 1000);
    });
}


// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        /* idTimeout = setTimeout(function(){
          stopVideo();
          showSlots();
        }, 5000);
        */
        console.log(idTimeout);
        done = true;
    }
}

function stopVideo() {
    //console.log("player: ",player);
    // player && player.destroy();
    hideVideo();
}

function hideAll() {
    idTimeout && clearTimeout(idTimeout);
    idTimeout = null;
    player && player.stopVideo();
    $(".match__container").hide();
    $(".video__container").hide();
    $(".slots__container").hide();
    $(".demo__card-cont").hide();
}

$("#btn_3d").on("click", function() {
    triggerRotate();
})

$("#back").on("click", function() {
    hideAll();
    showCards();
})

$("#slot-rotate").on("click", function() {
    hideAll();
    showSlots();
})

function makeApiCall(uid, number) {
    var db = firebase.firestore();
    db.collection("users").doc(uid).set({
            lucky_number: number
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

function signIn() {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        makeApiCall(user.uid, numbers.join(""))
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
}

function handleSignInClick() {
    if (isRotate) return;
    if (typeof isRotate === "object" && !isRotate) return;

    var user = firebase.auth().currentUser;
    if (user) {
        makeApiCall(user.uid, numbers.join(""));
    } else {
        console.log("not sign in");
        signIn();
    }
}