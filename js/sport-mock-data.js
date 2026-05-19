/**
 * Mock betting events for all sports — powers dynamic panels on the static clone.
 */
(function (global) {
  "use strict";

  function rnd(min, max) {
    return min + Math.random() * (max - min);
  }

  function fmt(n) {
    return (Math.round(n * 100) / 100).toFixed(2);
  }

  function mkOdds(base) {
    var back = rnd(base * 0.92, base * 1.05);
    var lay = back + rnd(0.01, 0.06);
    return {
      back: fmt(back),
      lay: fmt(lay),
      bVol: fmt(rnd(50, 25000)),
      lVol: fmt(rnd(10, 8000)),
    };
  }

  function ev(name, league, day, time, live, o1, oX, o2) {
    return {
      name: name,
      league: league,
      day: day,
      time: time,
      live: !!live,
      o1: o1 || mkOdds(1.5),
      oX: oX || mkOdds(3.2),
      o2: o2 || mkOdds(2.4),
    };
  }

  var SPORTS = {
    "4": {
      id: "4",
      name: "Cricket",
      icon: "assets/images/events/menu-4.png",
      hasDraw: true,
      events: [
        ev("Bangladesh v Pakistan", "Test Matches", "19 May", "09:30 AM", true, mkOdds(1.15), mkOdds(30), mkOdds(9.4)),
        ev("Rajasthan Royals v Lucknow Super Giants", "Indian Premier League", "19 May", "07:30 PM", true, mkOdds(1.72), mkOdds(42), mkOdds(2.18)),
        ev("Kolkata Knight Riders v Mumbai Indians", "Indian Premier League", "20 May", "03:30 PM", false, mkOdds(1.95), mkOdds(38), mkOdds(1.98)),
        ev("Gujarat Titans v Chennai Super Kings", "Indian Premier League", "20 May", "07:30 PM", false, mkOdds(1.88), mkOdds(40), mkOdds(2.05)),
        ev("Guyana Harpy Eagles v TT Red Force", "Others", "19 May", "07:30 PM", true, mkOdds(1.55), mkOdds(28), mkOdds(2.65)),
        ev("England SRL v New Zealand SRL", "T20 International SRL", "19 May", "11:00 PM", false, mkOdds(1.62), mkOdds(35), mkOdds(2.35)),
      ],
    },
    "1": {
      id: "1",
      name: "Football",
      icon: "assets/images/events/menu-1.png",
      hasDraw: true,
      events: [
        ev("Arsenal v Burnley", "English Premier League", "19 May", "10:00 PM", true, mkOdds(1.28), mkOdds(6.2), mkOdds(12)),
        ev("Bournemouth v Man City", "English Premier League", "19 May", "10:00 PM", true, mkOdds(5.8), mkOdds(4.5), mkOdds(1.52)),
        ev("Chelsea v Tottenham", "English Premier League", "20 May", "12:30 AM", false, mkOdds(2.05), mkOdds(3.6), mkOdds(3.4)),
        ev("UEFA Champions League", "Others", "21 May", "12:45 AM", false, mkOdds(2.2), mkOdds(3.25), mkOdds(3.1)),
        ev("Freiburg v Aston Villa", "UEFA Europa League", "20 May", "12:30 AM", false, mkOdds(2.45), mkOdds(3.4), mkOdds(2.85)),
        ev("Real Madrid v Barcelona", "La Liga", "21 May", "01:15 AM", false, mkOdds(2.1), mkOdds(3.5), mkOdds(3.25)),
      ],
    },
    "2": {
      id: "2",
      name: "Tennis",
      icon: "assets/images/events/menu-2.png",
      hasDraw: false,
      events: [
        ev("Mensik v Struff", "ATP Hamburg 2026", "19 May", "08:05 PM", true, mkOdds(1.45), null, mkOdds(2.85)),
        ev("Sinner v Alcaraz", "ATP Rome 2026", "20 May", "09:30 PM", false, mkOdds(1.72), null, mkOdds(2.15)),
        ev("Swiatek v Gauff", "WTA Rome 2026", "20 May", "06:00 PM", false, mkOdds(1.55), null, mkOdds(2.45)),
        ev("Popyrin v Cl Tabur", "ATP Challenger", "19 May", "05:15 PM", true, mkOdds(1.22), null, mkOdds(4.5)),
        ev("Djokovic v Medvedev", "ATP Masters", "21 May", "10:30 PM", false, mkOdds(1.68), null, mkOdds(2.22)),
        ev("Rybakina v Sabalenka", "WTA 1000", "21 May", "08:00 PM", false, mkOdds(2.05), null, mkOdds(1.82)),
      ],
    },
    "2378961": {
      id: "2378961",
      name: "Politics",
      icon: "assets/images/events/menu-2378961.png",
      hasDraw: false,
      events: [
        ev("UK General Election 2026", "Next Prime Minister", "30 Jun", "—", false, mkOdds(1.85), null, mkOdds(2.05)),
        ev("US Presidential 2028", "Republican Nominee", "05 Nov", "—", false, mkOdds(2.4), null, mkOdds(1.65)),
        ev("India Lok Sabha Seat X", "By-Election", "25 May", "08:00 AM", false, mkOdds(1.55), null, mkOdds(2.55)),
        ev("EU Parliament Majority", "2026 Session", "15 Sep", "—", false, mkOdds(1.42), null, mkOdds(3.1)),
      ],
    },
    "7": {
      id: "7",
      name: "Horse Racing",
      icon: "assets/images/events/menu-7.png",
      hasDraw: false,
      events: [
        ev("2:30 Newmarket", "Class 2 Handicap", "19 May", "02:30 PM", true, mkOdds(3.5), null, mkOdds(4.2)),
        ev("3:05 Ascot", "Maiden Stakes", "19 May", "03:05 PM", false, mkOdds(5.5), null, mkOdds(2.1)),
        ev("3:40 Cheltenham", "Novice Hurdle", "19 May", "03:40 PM", false, mkOdds(2.8), null, mkOdds(3.4)),
        ev("4:15 Kempton", "All-Weather", "19 May", "04:15 PM", false, mkOdds(4.0), null, mkOdds(2.75)),
        ev("5:00 York", "Listed Race", "19 May", "05:00 PM", false, mkOdds(6.0), null, mkOdds(1.95)),
      ],
    },
    "4339": {
      id: "4339",
      name: "Greyhound Racing",
      icon: "assets/images/events/menu-4339.png",
      hasDraw: false,
      events: [
        ev("Romford R1", "A5 400m", "19 May", "06:12 PM", true, mkOdds(2.2), null, mkOdds(3.1)),
        ev("Sheffield R3", "A4 500m", "19 May", "06:28 PM", false, mkOdds(3.8), null, mkOdds(2.05)),
        ev("Towcester R5", "A3 480m", "19 May", "07:02 PM", false, mkOdds(4.5), null, mkOdds(1.75)),
        ev("Harlow R2", "A6 415m", "19 May", "07:18 PM", false, mkOdds(2.65), null, mkOdds(2.4)),
      ],
    },
    "99990": {
      id: "99990",
      name: "Binary",
      icon: "assets/images/events/menu-99990.png",
      hasDraw: false,
      events: [
        ev("BTC/USD 5min", "Up/Down", "19 May", "Live", true, mkOdds(1.92), null, mkOdds(1.92)),
        ev("ETH/USD 15min", "Up/Down", "19 May", "Live", true, mkOdds(1.88), null, mkOdds(1.94)),
        ev("NIFTY 50 1hr", "Close Higher", "20 May", "09:15 AM", false, mkOdds(1.85), null, mkOdds(2.0)),
        ev("GOLD Spot", "Hourly", "19 May", "Live", true, mkOdds(1.9), null, mkOdds(1.9)),
      ],
    },
    "99994": {
      id: "99994",
      name: "Kabaddi",
      icon: "assets/images/events/menu-99994.png",
      hasDraw: true,
      events: [
        ev("Patna Pirates v Bengal Warriors", "Pro Kabaddi", "19 May", "08:00 PM", true, mkOdds(1.75), mkOdds(12), mkOdds(2.15)),
        ev("Jaipur Pink Panthers v U Mumba", "Pro Kabaddi", "20 May", "08:00 PM", false, mkOdds(1.9), mkOdds(11), mkOdds(2.0)),
        ev("Dabang Delhi v Telugu Titans", "Pro Kabaddi", "21 May", "07:30 PM", false, mkOdds(1.65), mkOdds(13), mkOdds(2.35)),
        ev("Bengaluru Bulls v Haryana Steelers", "Pro Kabaddi", "21 May", "08:30 PM", false, mkOdds(2.1), mkOdds(10), mkOdds(1.85)),
      ],
    },
    "7522": {
      id: "7522",
      name: "Basketball",
      icon: "assets/images/events/menu-7522.png",
      hasDraw: false,
      events: [
        ev("Lakers v Celtics", "NBA Playoffs", "19 May", "09:30 AM", true, mkOdds(1.95), null, mkOdds(1.92)),
        ev("Brose Bamberg v Ulm Basketball", "BBL", "19 May", "11:00 PM", false, mkOdds(1.72), null, mkOdds(2.15)),
        ev("Warriors v Nuggets", "NBA Playoffs", "20 May", "08:00 AM", false, mkOdds(2.05), null, mkOdds(1.82)),
        ev("Montecatiniterme v San Giobbe", "Serie A2", "20 May", "10:30 PM", false, mkOdds(1.55), null, mkOdds(2.5)),
        ev("Heat v Knicks", "NBA Playoffs", "21 May", "07:00 AM", false, mkOdds(1.88), null, mkOdds(1.98)),
      ],
    },
    "7511": {
      id: "7511",
      name: "Baseball",
      icon: "assets/images/events/menu-7511.png",
      hasDraw: false,
      events: [
        ev("Yankees v Red Sox", "MLB", "19 May", "10:35 PM", false, mkOdds(1.85), null, mkOdds(2.0)),
        ev("Dodgers v Giants", "MLB", "20 May", "03:45 AM", false, mkOdds(1.62), null, mkOdds(2.35)),
        ev("Cubs v Cardinals", "MLB", "20 May", "11:20 PM", false, mkOdds(2.1), null, mkOdds(1.78)),
        ev("Astros v Rangers", "MLB", "21 May", "12:05 AM", false, mkOdds(1.92), null, mkOdds(1.95)),
      ],
    },
    "20": {
      id: "20",
      name: "Table Tennis",
      icon: "assets/images/events/menu-20.png",
      hasDraw: false,
      events: [
        ev("Fan Zhendong v Ma Long", "WTT Champions", "19 May", "06:30 PM", true, mkOdds(1.55), null, mkOdds(2.45)),
        ev("Mima Ito v Chen Meng", "WTT Women's", "19 May", "07:15 PM", false, mkOdds(2.2), null, mkOdds(1.7)),
        ev("Hugo Calderano v Lin Yun-Ju", "WTT", "20 May", "05:00 PM", false, mkOdds(1.78), null, mkOdds(2.05)),
        ev("Tomokazu Harimoto v Felix Lebrun", "WTT", "20 May", "08:45 PM", false, mkOdds(1.65), null, mkOdds(2.25)),
      ],
    },
    "998917": {
      id: "998917",
      name: "Volleyball",
      icon: "assets/images/events/menu-998917.png",
      hasDraw: false,
      events: [
        ev("Brazil v Italy", "Nations League", "19 May", "09:00 PM", true, mkOdds(1.48), null, mkOdds(2.75)),
        ev("Poland v USA", "Nations League", "20 May", "12:30 AM", false, mkOdds(1.9), null, mkOdds(1.95)),
        ev("Iran v Japan", "Asian Championship", "20 May", "05:30 PM", false, mkOdds(2.15), null, mkOdds(1.72)),
        ev("Serbia v France", "Nations League", "21 May", "10:00 PM", false, mkOdds(1.72), null, mkOdds(2.12)),
      ],
    },
    "7524": {
      id: "7524",
      name: "Ice Hockey",
      icon: "assets/images/events/menu-7524.png",
      hasDraw: false,
      events: [
        ev("Maple Leafs v Bruins", "NHL Playoffs", "19 May", "09:00 AM", true, mkOdds(2.05), null, mkOdds(1.82)),
        ev("Oilers v Stars", "NHL Playoffs", "20 May", "08:30 AM", false, mkOdds(1.75), null, mkOdds(2.15)),
        ev("Rangers v Panthers", "NHL Playoffs", "20 May", "11:00 AM", false, mkOdds(1.92), null, mkOdds(1.95)),
        ev("Avalanche v Knights", "NHL Playoffs", "21 May", "07:00 AM", false, mkOdds(1.68), null, mkOdds(2.22)),
      ],
    },
    "5": {
      id: "5",
      name: "Rugby",
      icon: "assets/images/events/menu-5.png",
      hasDraw: true,
      events: [
        ev("Ireland v France", "Six Nations", "20 May", "08:00 PM", false, mkOdds(1.85), mkOdds(22), mkOdds(2.05)),
        ev("All Blacks v Springboks", "Rugby Championship", "21 May", "06:00 AM", false, mkOdds(1.72), mkOdds(24), mkOdds(2.25)),
        ev("England v Wales", "Six Nations", "22 May", "09:30 PM", false, mkOdds(1.55), mkOdds(26), mkOdds(2.55)),
        ev("Australia v Argentina", "Rugby Championship", "23 May", "11:00 AM", false, mkOdds(1.9), mkOdds(23), mkOdds(1.98)),
      ],
    },
    "26420387": {
      id: "26420387",
      name: "Mixed Martial Arts",
      icon: "assets/images/events/menu-26420387.png",
      hasDraw: false,
      events: [
        ev("Makhachev v Oliveira 2", "UFC Lightweight", "25 May", "08:30 AM", false, mkOdds(1.45), null, mkOdds(2.85)),
        ev("Jones v Miocic", "UFC Heavyweight", "01 Jun", "09:00 AM", false, mkOdds(1.35), null, mkOdds(3.4)),
        ev("Adesanya v Pereira 3", "UFC Middleweight", "08 Jun", "07:00 AM", false, mkOdds(2.1), null, mkOdds(1.78)),
        ev("Volkanovski v Topuria", "UFC Featherweight", "15 Jun", "08:00 AM", false, mkOdds(1.95), null, mkOdds(1.9)),
      ],
    },
    "3503": {
      id: "3503",
      name: "Darts",
      icon: "assets/images/events/menu-3503.png",
      hasDraw: false,
      events: [
        ev("Littler v Price", "Premier League Darts", "19 May", "11:30 PM", true, mkOdds(1.62), null, mkOdds(2.35)),
        ev("Van Gerwen v Humphries", "Premier League", "20 May", "11:30 PM", false, mkOdds(1.88), null, mkOdds(1.98)),
        ev("Wright v Cross", "UK Open", "21 May", "10:00 PM", false, mkOdds(2.05), null, mkOdds(1.82)),
        ev("Anderson v Chisnall", "UK Open", "22 May", "10:00 PM", false, mkOdds(1.75), null, mkOdds(2.12)),
      ],
    },
    "29": {
      id: "29",
      name: "Futsal",
      icon: "assets/images/events/menu-29.png",
      hasDraw: true,
      events: [
        ev("Barcelona v Sporting CP", "UEFA Futsal", "19 May", "10:30 PM", false, mkOdds(1.65), mkOdds(4.5), mkOdds(2.4)),
        ev("Kairat v Palma", "UEFA Futsal", "20 May", "10:30 PM", false, mkOdds(2.1), mkOdds(4.2), mkOdds(1.85)),
        ev("PTE-Peac v SG Kecskemet", "Hungary League", "19 May", "09:00 PM", true, mkOdds(1.9), mkOdds(4.0), mkOdds(1.95)),
        ev("Benfica v Inter FS", "Champions League", "21 May", "11:00 PM", false, mkOdds(1.72), mkOdds(4.8), mkOdds(2.2)),
      ],
    },
  };

  var NAME_TO_ID = {};
  Object.keys(SPORTS).forEach(function (id) {
    NAME_TO_ID[SPORTS[id].name.toLowerCase()] = id;
  });

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function oddsCol(odds, dash) {
    if (dash || !odds) {
      return (
        '<div class="col-md-4 col-4"><div class="h-backLay">' +
        '<div class="back bl-box"><span class="d-block bet-button-price">-<em>-</em></span></div>' +
        '<div class="bl-box lay"><span class="d-block bet-button-price">-<em>-</em></span></div>' +
        "</div></div>"
      );
    }
    return (
      '<div class="col-md-4 col-4"><div class="h-backLay">' +
      '<div class="back bl-box"><span class="d-block bet-button-price">' +
      esc(odds.back) +
      "<em>" +
      esc(odds.bVol) +
      "</em></span></div>" +
      '<div class="bl-box lay"><span class="d-block bet-button-price">' +
      esc(odds.lay) +
      "<em>" +
      esc(odds.lVol) +
      "</em></span></div></div></div>"
    );
  }

  function renderRow(event, sport) {
    var liveBlock = event.live
      ? '<div class="game-date inplay"><span>Live</span></div>'
      : "";
    var icons =
      '<div class="game-icons"><div class="icon-tv">' +
      (sport.id === "4"
        ? '<a href="javascript:void(0);"><img src="assets/images/fancy.svg" alt="" /></a>'
        : "") +
      '<a href="javascript:void(0);"><img src="assets/images/tv.svg" alt="" /></a>' +
      (event.live ? '<span class="game-bm">BM</span>' : "") +
      "</div></div>";
    var xCol = sport.hasDraw ? oddsCol(event.oX, false) : oddsCol(null, true);

    return (
      '<div class="bet-table-row"><div class="row">' +
      '<div class="col-md-6"><div class="game-box">' +
      '<div class="game-left-col">' +
      '<div class="game-name"><a href="javascript:void(0)">' +
      '<p class="team-name text-left">' +
      esc(event.name) +
      "</p>" +
      '<p class="team-name text-left team-event">(' +
      esc(event.league) +
      ")</p></a></div>" +
      liveBlock +
      '<div class="game-date"><p class="mb-0 day text-left">' +
      esc(event.day) +
      '</p><p class="mb-0 day text-left">' +
      esc(event.time) +
      "</p></div></div>" +
      icons +
      '<a href="javascript:void(0);" class="add-pin"><i class="bi bi-pin"></i></a>' +
      "</div></div>" +
      '<div class="col-md-6 text-center"><div class="row g-0">' +
      oddsCol(event.o1, false) +
      xCol +
      oddsCol(event.o2, false) +
      "</div></div></div></div>"
    );
  }

  function renderSportList(sportId) {
    var sport = SPORTS[sportId];
    if (!sport) return "";
    var rows = sport.events.map(function (e) {
      return renderRow(e, sport);
    });
    var uid = "rb-" + sportId;
    var xHeader = sport.hasDraw
      ? '<div class="col-md-2 text-center d-none d-md-block"><small>X</small></div>'
      : '<div class="col-md-2 text-center d-none d-md-block"><small>X</small></div>';

    return (
      '<div class="card rb-dynamic-sport-card" data-rb-dynamic-panel="' +
      esc(sportId) +
      '">' +
      '<div><app-sport-list><div><div class="card-body card-content p-0">' +
      '<div class="bet-table-header"><div class="row align-items-center">' +
      '<div class="col-md-6">' +
      '<span class="list-sport-title"><img class="img-fluid game-icon-img" src="' +
      esc(sport.icon) +
      '" alt="" /> ' +
      esc(sport.name) +
      "</span>" +
      '<ul class="ks-cboxtags">' +
      '<li><input type="checkbox" id="' +
      uid +
      '-live" /><label for="' +
      uid +
      '-live">LIVE</label></li>' +
      '<li><input type="checkbox" id="' +
      uid +
      '-virt" /><label for="' +
      uid +
      '-virt">VIRTUAL</label></li>' +
      '<li><input type="checkbox" id="' +
      uid +
      '-prem" /><label for="' +
      uid +
      '-prem">PREMIUM</label></li>' +
      "</ul></div>" +
      '<div class="col-md-2 text-center d-none d-md-block"><small>1</small></div>' +
      xHeader +
      '<div class="col-md-2 text-center d-none d-md-block"><small>2</small></div>' +
      "</div></div>" +
      '<div class="bet-table-body rb-mock-rows">' +
      rows.join("") +
      "</div></div></div></app-sport-list></div></div></div>"
    );
  }

  function renderAllDynamicPanels() {
    var html = "";
    Object.keys(SPORTS).forEach(function (id) {
      if (id === "4" || id === "1" || id === "2") return;
      html += renderSportList(id);
    });
    return html;
  }

  global.RBSportMock = {
    SPORTS: SPORTS,
    NAME_TO_ID: NAME_TO_ID,
    renderSportList: renderSportList,
    renderAllDynamicPanels: renderAllDynamicPanels,
    getSportIdFromHref: function (href) {
      if (!href) return null;
      var m = href.match(/\/sports\/(\d+)/);
      return m ? m[1] : null;
    },
    getSportIdFromNavLink: function (link) {
      if (!link) return null;
      var id = link.id || "";
      if (id === "home001") return "home";
      if (id === "inplay001") return "inplay";
      if (id === "sportbook001") return "sportbook";
      if (id.indexOf("sport") === 0 && id.length > 5) return id.replace("sport", "");
      return global.RBSportMock.getSportIdFromHref(link.getAttribute("href"));
    },
  };
})(typeof window !== "undefined" ? window : this);
