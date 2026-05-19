/**
 * Static-site interaction layer for the cloned ReddyBook homepage.
 * No external API calls — local UI behavior only.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "reddybook_demo_session";
  var APK_DISMISSED_KEY = "reddybook_apk_dismissed";
  /** Fixed banner for login + signup (Login - Deposits, Withdrawals, and Verification (3)) */
  var AUTH_BANNER_SRC =
    "assets/images/reddybook-banners/15-login---deposits-withdrawals-and-verification-3.webp";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function setSession(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
  }

  /* ── Modal system (Bootstrap-compatible classes, no Angular) ── */

  function getBackdrop() {
    var el = qs("bs-modal-backdrop");
    if (!el) {
      el = document.createElement("bs-modal-backdrop");
      el.className = "modal-backdrop fade";
      document.body.appendChild(el);
    }
    return el;
  }

  function anyModalOpen() {
    return qsa(".modal.show, .modal.in").length > 0;
  }

  /** Bootstrap may inject extra div.modal-backdrop; remove so the page never stays foggy. */
  function removeStrayBackdrops() {
    qsa("body > div.modal-backdrop").forEach(function (el) {
      el.remove();
    });
  }

  function clearBodyModalLock() {
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.overflowY = "";
    document.body.style.paddingRight = "";
    removeStrayBackdrops();
  }

  function syncBodyModalState() {
    var backdrop = getBackdrop();
    if (anyModalOpen()) {
      removeStrayBackdrops();
      document.body.classList.add("modal-open");
      document.body.style.overflowY = "hidden";
      backdrop.classList.add("show", "in");
      backdrop.style.display = "block";
      backdrop.style.pointerEvents = "auto";
    } else {
      clearBodyModalLock();
      backdrop.classList.remove("show", "in");
      backdrop.style.display = "none";
      backdrop.style.pointerEvents = "none";
    }
  }

  function showModal(modal) {
    if (!modal) return;
    qsa(".modal.show, .modal.in").forEach(function (m) {
      if (m !== modal) hideModal(m, false);
    });
    modal.style.display = "block";
    modal.classList.add("show", "in");
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    syncBodyModalState();
  }

  function hideModal(modal, sync) {
    if (!modal) return;
    modal.style.display = "none";
    modal.classList.remove("show", "in");
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    if (sync !== false) syncBodyModalState();
  }

  function hideAllModals() {
    qsa(".modal").forEach(function (m) {
      hideModal(m, false);
    });
    syncBodyModalState();
    clearBodyModalLock();
  }

  function getApkPromoModal() {
    var link = qs('.modal a[href*=".apk"]');
    if (link) return link.closest(".modal");
    return qs(".modal[data-apk-promo]");
  }

  function rememberApkDismissed() {
    try {
      sessionStorage.setItem(APK_DISMISSED_KEY, "1");
    } catch (e) { }
  }

  function wasApkDismissed() {
    try {
      return sessionStorage.getItem(APK_DISMISSED_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    hideModal(modal);
    if (modal.dataset.apkPromo === "1") rememberApkDismissed();
    if (!anyModalOpen()) clearBodyModalLock();
  }

  function enhanceModalCloseButtons(modal) {
    var root = modal || document;
    qsa(".close, .btn-close", root).forEach(function (btn) {
      btn.setAttribute("type", "button");
      btn.style.zIndex = "10050";
      btn.style.pointerEvents = "auto";
      btn.style.cursor = "pointer";
      if (!btn.style.position || btn.style.position === "static") {
        btn.style.position = "absolute";
      }
    });
  }

  /** Remove APK download — poster click only closes the popup. */
  function disableApkDownload(modal) {
    if (!modal) return;
    modal.dataset.apkPromo = "1";
    var body = qs(".modal-body", modal);
    if (body) body.style.position = "relative";
    qsa("a", modal).forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (href.indexOf(".apk") !== -1 || href.indexOf("apk2/") !== -1) {
        a.removeAttribute("href");
        a.removeAttribute("download");
        a.removeAttribute("target");
        a.style.cursor = "pointer";
        a.style.position = "relative";
        a.style.zIndex = "1";
        a.addEventListener(
          "click",
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(modal);
          },
          true
        );
      }
    });
  }

  function initModals() {
    enhanceModalCloseButtons();

    qsa(".modal").forEach(function (modal) {
      disableApkDownload(modal);
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal(modal);
      });
    });

    document.addEventListener(
      "click",
      function (e) {
        var closeBtn = e.target.closest(
          "[data-bs-dismiss='modal'], .modal .close, .modal .btn-close"
        );
        if (!closeBtn) return;
        var modal = closeBtn.closest(".modal");
        if (!modal) return;
        e.preventDefault();
        e.stopPropagation();
        closeModal(modal);
      },
      true
    );

    var backdrop = getBackdrop();
    backdrop.addEventListener("click", function () {
      hideAllModals();
      rememberApkDismissed();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        hideAllModals();
        rememberApkDismissed();
      }
    });

    qsa("[data-bs-toggle='modal']").forEach(function (trigger) {
      if (trigger.getAttribute("data-auth-open")) return;
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var targetSel = trigger.getAttribute("data-bs-target");
        if (!targetSel) return;
        showModal(qs(targetSel));
      });
    });
  }

  function showApkPromoOnLoad() {
    qsa(".modal").forEach(function (m) {
      hideModal(m, false);
    });

    if (isLandingPage()) {
      syncBodyModalState();
      return;
    }

    if (wasApkDismissed()) {
      syncBodyModalState();
      return;
    }

    var apkModal = getApkPromoModal();
    if (!apkModal) {
      syncBodyModalState();
      return;
    }

    disableApkDownload(apkModal);
    enhanceModalCloseButtons(apkModal);
    showModal(apkModal);
  }

  /* ── Login form (injected into empty app-login from clone) ── */

  function buildAuthMarkup() {
    return (
      '<div class="login-block row g-0">' +
      '<div class="col-md-6 banner-sec">' +
      '<img class="img-fluid w-100 rb-auth-banner" alt="ReddyBook — deposits, withdrawals &amp; verification" src="' +
      AUTH_BANNER_SRC +
      '">' +
      "</div>" +
      '<div class="col-md-6 login-sec">' +
      '<div class="rb-auth-tabs" role="tablist">' +
      '<button type="button" class="rb-auth-tab active" data-tab="login" role="tab">Login</button>' +
      '<button type="button" class="rb-auth-tab" data-tab="signup" role="tab">Sign Up</button>' +
      "</div>" +
      '<div id="rb-panel-login" class="rb-auth-pane active" role="tabpanel">' +
      '<form class="login-form" id="demo-login-form" novalidate>' +
      '<div class="form-group">' +
      '<label class="rb-field-label" for="demo-login-username">Username</label>' +
      '<input id="demo-login-username" type="text" name="username" class="form-control" placeholder="Enter User ID" autocomplete="username" required>' +
      "</div>" +
      '<div class="form-group">' +
      '<label class="rb-field-label" for="demo-login-password">Password</label>' +
      '<input id="demo-login-password" type="password" name="password" class="form-control" placeholder="Enter Password" autocomplete="current-password" required>' +
      "</div>" +
      '<label class="remember-row"><input type="checkbox" name="remember"> Remember me</label>' +
      '<button type="submit" class="btn button-login">Login</button>' +
      '<p class="login-feedback" style="display:none" role="alert"></p>' +
      "</form>" +
      "</div>" +
      '<div id="rb-panel-signup" class="rb-auth-pane" role="tabpanel">' +
      '<form class="login-form" id="demo-signup-form" novalidate>' +
      '<div class="form-group">' +
      '<label class="rb-field-label" for="demo-signup-username">Username</label>' +
      '<input id="demo-signup-username" type="text" name="username" class="form-control" placeholder="Choose User ID" autocomplete="username" required>' +
      "</div>" +
      '<div class="form-group">' +
      '<label class="rb-field-label" for="demo-signup-password">Password</label>' +
      '<input id="demo-signup-password" type="password" name="password" class="form-control" placeholder="Min. 6 characters" autocomplete="new-password" required>' +
      "</div>" +
      '<div class="form-group">' +
      '<label class="rb-field-label" for="demo-signup-confirm">Confirm Password</label>' +
      '<input id="demo-signup-confirm" type="password" name="confirm" class="form-control" placeholder="Re-enter Password" autocomplete="new-password" required>' +
      "</div>" +
      '<button type="submit" class="btn button-login">Create Account</button>' +
      '<p class="login-feedback" style="display:none" role="alert"></p>' +
      "</form>" +
      "</div>" +
      '<div class="copy-text"><p>Demo mode — use any username &amp; password (6+ chars)</p></div>' +
      "</div></div>"
    );
  }

  function switchAuthTab(tab) {
    var host = qs("app-login");
    if (!host) return;
    qsa(".rb-auth-tab", host).forEach(function (btn) {
      var on = btn.getAttribute("data-tab") === tab;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    qsa(".rb-auth-pane", host).forEach(function (pane) {
      pane.classList.toggle("active", pane.id === "rb-panel-" + tab);
    });
    qsa(".login-feedback", host).forEach(function (el) {
      el.style.display = "none";
      el.textContent = "";
    });
  }

  function showFormError(form, message) {
    var feedback = qs(".login-feedback", form);
    if (!feedback) return;
    feedback.textContent = message;
    feedback.style.display = "block";
  }

  function isLandingPage() {
    return document.body.classList.contains("landing-page");
  }

  function ensureAuthModalStyles() {
    if (!qs(".login-popup")) return;
    if (!qs('link[href*="auth-modal.css"]')) {
      var authCss = document.createElement("link");
      authCss.rel = "stylesheet";
      authCss.href = "assets/css/auth-modal.css";
      document.head.appendChild(authCss);
    }
    if (isLandingPage() && !qs('link[href*="bootstrap.min.css"]')) {
      var bsCss = document.createElement("link");
      bsCss.rel = "stylesheet";
      bsCss.href = "assets/css/bootstrap/css/bootstrap.min.css";
      document.head.appendChild(bsCss);
    }
  }

  function ensureAuthModalOnPage() {
    if (qs(".login-popup")) return;
    if (!isLandingPage()) return;

    var modal = document.createElement("motion");
    modal.className = "modal fade login-popup";
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<motion class="modal-dialog modal-lg modal-dialog-centered">' +
      '<motion class="modal-content"><motion class="modal-body">' +
      '<button type="button" aria-label="Close" class="btn-close close pull-right" data-bs-dismiss="modal">' +
      '<span aria-hidden="true">×</span></button>' +
      "<app-login></app-login>" +
      "</motion></motion></motion>";
    modal.innerHTML = modal.innerHTML.replace(/<motion/g, "<div").replace(/<\/motion>/g, "</div>");
    document.body.appendChild(modal);

    if (!qs("bs-modal-backdrop")) {
      var backdrop = document.createElement("bs-modal-backdrop");
      backdrop.className = "modal-backdrop fade";
      document.body.appendChild(backdrop);
    }
  }

  function upgradeLandingAuthLinks() {
    if (!isLandingPage()) return;

    qsa('.landing-header-actions a[href="register.html"]').forEach(function (a) {
      a.setAttribute("href", "javascript:void(0)");
      a.setAttribute("data-auth-open", "signup");
    });
    qsa('.landing-header-actions a[href="login.html"]').forEach(function (a) {
      a.setAttribute("href", "javascript:void(0)");
      a.setAttribute("data-auth-open", "login");
    });

    qsa('a.btn-cta[href="register.html"]').forEach(function (a) {
      if (a.closest("footer")) return;
      a.setAttribute("href", "javascript:void(0)");
      a.setAttribute("data-auth-open", "signup");
    });
    qsa('a.btn-cta[href="login.html"]').forEach(function (a) {
      if (a.closest("footer")) return;
      var label = (a.textContent || "").trim().toLowerCase();
      if (label.indexOf("login") === -1 && label.indexOf("log in") === -1) return;
      a.setAttribute("href", "javascript:void(0)");
      a.setAttribute("data-auth-open", "login");
    });
  }

  function bindAuthTrigger(el) {
    if (!el || el.dataset.authBound === "1") return;
    if (el.classList.contains("rb-auth-dashboard-link")) return;
    var tab = el.getAttribute("data-auth-open");
    if (tab !== "login" && tab !== "signup") return;
    el.dataset.authBound = "1";
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openAuthModal(tab);
    });
  }

  function completeAuth(session) {
    setSession(session);
    applyAuthUI();
    hideModal(qs(".login-popup"));
    if (isLandingPage()) {
      window.location.href = "index.html";
    }
  }

  function initAuthForms() {
    var host = qs("app-login");
    if (!host) return;
    if (!host.dataset.loginReady) {
      host.innerHTML = buildAuthMarkup();
      host.dataset.loginReady = "1";
    }
    var banner = qs(".rb-auth-banner", host);
    if (banner) banner.setAttribute("src", AUTH_BANNER_SRC);

    if (host.dataset.authBound) return;
    host.dataset.authBound = "1";

    qsa(".rb-auth-tab", host).forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchAuthTab(btn.getAttribute("data-tab"));
      });
    });

    var loginForm = qs("#demo-login-form", host);
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var username = (loginForm.username.value || "").trim();
      var password = loginForm.password.value || "";
      if (!username) {
        showFormError(loginForm, "Please enter your User ID.");
        return;
      }
      if (password.length < 6) {
        showFormError(loginForm, "Password must be at least 6 characters.");
        return;
      }
      completeAuth({
        username: username,
        remember: !!loginForm.remember.checked,
        loggedInAt: Date.now(),
      });
    });

    var signupForm = qs("#demo-signup-form", host);
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var username = (signupForm.username.value || "").trim();
      var password = signupForm.password.value || "";
      var confirmPw = signupForm.confirm.value || "";
      if (!username) {
        showFormError(signupForm, "Please choose a User ID.");
        return;
      }
      if (password.length < 6) {
        showFormError(signupForm, "Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPw) {
        showFormError(signupForm, "Passwords do not match.");
        return;
      }
      completeAuth({
        username: username,
        remember: true,
        signedUp: true,
        loggedInAt: Date.now(),
      });
    });
  }

  function openAuthModal(tab) {
    initAuthForms();
    switchAuthTab(tab || "login");
    showModal(qs(".login-popup"));
  }

  function openLoginModal() {
    openAuthModal("login");
  }

  function openSignupModal() {
    openAuthModal("signup");
  }

  /* ── Rules modal (created in JS — no HTML layout change) ── */

  function ensureRulesModal() {
    var existing = qs("#rules-modal");
    if (existing) return existing;

    var wrap = document.createElement("div");
    wrap.innerHTML =
      '<div id="rules-modal" class="modal fade rules-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
      '<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">' +
      '<div class="modal-content rules-container">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title">Rules</h5>' +
      '<button type="button" class="btn-close close" aria-label="Close"><span aria-hidden="true">×</span></button>' +
      "</div>" +
      '<div class="modal-body panel-body card-body">' +
      "<p>These rules apply to this demo site copy for presentation purposes only.</p>" +
      '<table class="table table-bordered table-sm"><tbody>' +
      "<tr><td>Minimum bet</td><td>As shown on each market</td></tr>" +
      "<tr><td>Maximum bet</td><td>Subject to market limits displayed</td></tr>" +
      "<tr><td>Settlement</td><td>Markets settle per official results</td></tr>" +
      "<tr><td>Account</td><td>Contact your agent for deposits &amp; withdrawals</td></tr>" +
      "</tbody></table>" +
      '<p class="small m-0">No real-money transactions occur on this static clone.</p>' +
      "</div></div></div></div>";
    document.body.appendChild(wrap.firstElementChild);
    var modal = qs("#rules-modal");
    qs(".btn-close, .close", modal).addEventListener("click", function (e) {
      e.preventDefault();
      hideModal(modal);
    });
    return modal;
  }

  /* ── Auth UI toggle ── */

  function applyAuthUI() {
    var session = getSession();
    var signupBtn = qs('.header-auth-btns .btn-signup, .header-auth-btns [data-auth-open="signup"]');
    var loginBtn = qs('.header-auth-btns .btn-signin, .header-auth-btns a.btn-login-profile');
    var profileMenu = qs(".dropdown-menu.profile");
    var dropdownHeader = qs(".dropdown-menu.profile .dropdown-header h6");
    var landingSignup = qs('.landing-header-actions [data-auth-open="signup"]');
    var landingLogin = qs('.landing-header-actions [data-auth-open="login"]');

    if (session) {
      if (signupBtn) signupBtn.style.display = "none";
      if (loginBtn) {
        loginBtn.style.display = "";
        loginBtn.textContent = session.username.toUpperCase();
        loginBtn.classList.add("btn-login-profile");
        loginBtn.removeAttribute("data-bs-toggle");
        loginBtn.removeAttribute("data-bs-target");
        loginBtn.href = "javascript:void(0)";
      }
      if (dropdownHeader) {
        dropdownHeader.textContent = "HI, " + session.username.toUpperCase();
      }
      if (profileMenu) profileMenu.style.display = "";
      if (landingSignup) landingSignup.style.display = "none";
      if (landingLogin) {
        landingLogin.style.display = "";
        landingLogin.textContent = "Dashboard";
        landingLogin.removeAttribute("data-auth-open");
        landingLogin.href = "index.html";
        landingLogin.classList.add("rb-auth-dashboard-link");
        landingLogin.dataset.authBound = "";
      }
    } else {
      if (signupBtn) signupBtn.style.display = "";
      if (loginBtn) {
        loginBtn.style.display = "";
        loginBtn.textContent = "LOGIN";
        loginBtn.classList.remove("btn-login-profile");
        loginBtn.removeAttribute("data-bs-toggle");
        loginBtn.removeAttribute("data-bs-target");
        loginBtn.href = "javascript:void(0)";
      }
      if (profileMenu) profileMenu.style.display = "none";
      if (landingSignup) {
        landingSignup.style.display = "";
        landingSignup.href = "javascript:void(0)";
        landingSignup.setAttribute("data-auth-open", "signup");
      }
      if (landingLogin) {
        landingLogin.style.display = "";
        landingLogin.textContent = "Login";
        landingLogin.href = "javascript:void(0)";
        landingLogin.setAttribute("data-auth-open", "login");
        landingLogin.classList.remove("rb-auth-dashboard-link");
        landingLogin.dataset.authBound = "";
      }
    }
  }

  function upgradeDashboardAuthLinks() {
    qsa(".header-auth-btns .btn-login").forEach(function (btn) {
      if (btn.classList.contains("btn-login-profile")) return;
      var label = (btn.textContent || "").trim().toUpperCase();
      var href = btn.getAttribute("href") || "";
      if (href.indexOf("/signup") !== -1 || label.indexOf("SIGN") !== -1) {
        btn.setAttribute("href", "javascript:void(0)");
        btn.setAttribute("data-auth-open", "signup");
        btn.dataset.authBound = "";
      } else if (
        label.indexOf("LOGIN") !== -1 ||
        btn.getAttribute("data-bs-target") === ".login-popup"
      ) {
        btn.setAttribute("href", "javascript:void(0)");
        btn.setAttribute("data-auth-open", "login");
        btn.removeAttribute("data-bs-toggle");
        btn.removeAttribute("data-bs-target");
        btn.dataset.authBound = "";
      }
    });
  }

  function initAuthButtons() {
    upgradeDashboardAuthLinks();
    qsa('[data-auth-open="signup"], [data-auth-open="login"]').forEach(bindAuthTrigger);

    qsa('.header-nav .profile a[href="javascript:void(0)"]').forEach(function (a) {
      if ((a.textContent || "").toLowerCase().indexOf("sign out") !== -1) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          clearSession();
          applyAuthUI();
          qsa('[data-auth-open="signup"], [data-auth-open="login"]').forEach(function (el) {
            el.dataset.authBound = "";
          });
          initAuthButtons();
        });
      }
    });

    applyAuthUI();
  }

  /* ── Sidebar toggle ── */

  function initSidebar() {
    qsa(".toggle-sidebar-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.body.classList.toggle("toggle-sidebar");
      });
    });
  }

  /* ── Collapse (sidebar nested menus) ── */

  function initCollapse() {
    qsa('[data-bs-toggle="collapse"]').forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var targetSel = trigger.getAttribute("href");
        if (!targetSel || targetSel.charAt(0) !== "#") return;
        var target = qs(targetSel);
        if (!target) return;

        var expanded = trigger.getAttribute("aria-expanded") === "true";
        var willOpen = !target.classList.contains("show");

        if (trigger.closest("#sidebar-nav")) {
          var parentUl = trigger.closest("ul.nav-content, #sidebar-nav");
          if (parentUl && willOpen) {
            qsa(".collapse.show", parentUl).forEach(function (openEl) {
              if (openEl !== target) {
                openEl.classList.remove("show");
                var otherTrigger = qs('[href="#' + openEl.id + '"]');
                if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
              }
            });
          }
        }

        target.classList.toggle("show", willOpen);
        trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
        trigger.classList.toggle("collapsed", !willOpen);
      });
    });
  }

  /* ── Sport tabs: filter home lists + inject mock panels ── */

  var rbCurrentSportView = "home";

  function ensureSportFilterStyles() {
    if (qs("#rb-sport-filter-style")) return;
    var style = document.createElement("style");
    style.id = "rb-sport-filter-style";
    style.textContent =
      ".rb-sport-filter-hidden{display:none!important}" +
      ".rb-sport-view-single .rb-home-promo{display:none!important}" +
      ".rb-sport-view-single .rb-upcoming-block{display:none!important}" +
      ".rb-sport-view-casino .rb-sport-lists-wrap{display:none!important}" +
      ".rb-dynamic-sport-root{margin-bottom:8px}" +
      ".rb-dynamic-sport-card.rb-sport-filter-hidden{display:none!important}";
    document.head.appendChild(style);
  }

  function getSportNameFromList(list) {
    var titleEl = qs(".list-sport-title", list);
    if (!titleEl) return "";
    return (titleEl.textContent || "").replace(/\s+/g, " ").trim();
  }

  function tagExistingSportPanels() {
    var mock = window.RBSportMock;
    if (!mock) return;
    qsa("app-sport-list").forEach(function (list) {
      var name = getSportNameFromList(list);
      var sportId = mock.NAME_TO_ID[name.toLowerCase()];
      if (!sportId) return;
      var panel = list.closest(".card");
      if (!panel) {
        panel = list.parentElement;
        while (panel && panel.tagName !== "BODY" && !panel.querySelector(".bet-table-body")) {
          panel = panel.parentElement;
        }
      }
      if (!panel) return;
      panel.setAttribute("data-rb-sport-panel", sportId);
      var listsWrap = panel.closest(".rb-sport-lists-wrap");
      if (!listsWrap) {
        var wrap = panel.parentElement;
        if (wrap) wrap.classList.add("rb-sport-lists-wrap");
      }
    });
  }

  function tagHomePromoSections() {
    var home = qs(".middle-page-content.home-page");
    if (!home) return;
    qsa(".game-slider, .coupon-card", home).forEach(function (el) {
      el.classList.add("rb-home-promo");
    });
    var casinoTitle = qsa(".list-sport-title", home).filter(function (el) {
      return (el.textContent || "").indexOf("Casino") !== -1;
    })[0];
    if (casinoTitle) {
      var casinoBlock = casinoTitle.closest(".card") || casinoTitle.parentElement;
      if (casinoBlock) casinoBlock.classList.add("rb-casino-block", "rb-home-promo");
      var provider = qs(".casinoprovider-thumb-section", home);
      if (provider) provider.classList.add("rb-casino-block", "rb-home-promo");
    }
  }

  function injectDynamicSportPanels() {
    var mock = window.RBSportMock;
    if (!mock) return;
    var home = qs(".middle-page-content.home-page");
    if (!home) return;
    if (qs("#rb-dynamic-sport-root")) return;

    var root = document.createElement("div");
    root.id = "rb-dynamic-sport-root";
    root.className = "rb-dynamic-sport-root rb-sport-filter-hidden";
    root.innerHTML = mock.renderAllDynamicPanels();

    var anchor = qs('[data-rb-sport-panel="2"]', home);
    if (anchor) {
      var tennisCard = anchor.closest(".card");
      if (tennisCard && tennisCard.parentElement) {
        tennisCard.parentElement.insertBefore(root, tennisCard.nextSibling);
        return;
      }
    }
    home.appendChild(root);
  }

  function panelHasLive(panel) {
    return !!qs(".game-date.inplay", panel);
  }

  function applySportView(sportKey) {
    var home = qs(".middle-page-content.home-page");
    if (!home) return;
    rbCurrentSportView = sportKey || "home";

    var isHome = sportKey === "home";
    var isInplay = sportKey === "inplay";
    var isCasino = sportKey === "99998" || sportKey === "99997";
    var isSportbook = sportKey === "sportbook";

    home.classList.toggle(
      "rb-sport-view-single",
      !isHome && !isInplay && !isCasino && !isSportbook
    );
    home.classList.toggle("rb-sport-view-casino", isCasino);

    qsa(".rb-home-promo", home).forEach(function (el) {
      var hide = !isHome && !isInplay;
      if (isCasino) hide = false;
      el.classList.toggle("rb-sport-filter-hidden", hide);
    });

    qsa("[data-rb-sport-panel]").forEach(function (panel) {
      var pid = panel.getAttribute("data-rb-sport-panel");
      var show = isHome || isSportbook || pid === sportKey;
      if (isInplay) show = panelHasLive(panel);
      if (isCasino) show = false;
      panel.classList.toggle("rb-sport-filter-hidden", !show);
    });

    var dynamicRoot = qs("#rb-dynamic-sport-root");
    if (dynamicRoot) {
      var showDynamic =
        !isHome &&
        !isInplay &&
        !isCasino &&
        !isSportbook &&
        !!qs('[data-rb-dynamic-panel="' + sportKey + '"]', dynamicRoot);
      dynamicRoot.classList.toggle("rb-sport-filter-hidden", !showDynamic);
      qsa("[data-rb-dynamic-panel]", dynamicRoot).forEach(function (card) {
        var match = card.getAttribute("data-rb-dynamic-panel") === sportKey;
        card.classList.toggle("rb-sport-filter-hidden", !match);
        if (match && isInplay) {
          qsa(".bet-table-row", card).forEach(function (row) {
            var live = !!qs(".game-date.inplay", row);
            row.classList.toggle("rb-sport-filter-hidden", !live);
          });
        } else if (match) {
          qsa(".bet-table-row.rb-sport-filter-hidden", card).forEach(function (row) {
            row.classList.remove("rb-sport-filter-hidden");
          });
        }
      });
    }

    if (isInplay) {
      qsa("[data-rb-sport-panel] .bet-table-row").forEach(function (row) {
        var live = !!qs(".game-date.inplay", row);
        row.classList.toggle("rb-sport-filter-hidden", !live);
      });
    } else {
      qsa("[data-rb-sport-panel] .bet-table-row.rb-sport-filter-hidden").forEach(function (row) {
        row.classList.remove("rb-sport-filter-hidden");
      });
    }

    if (isCasino) {
      var casino = qs(".rb-casino-block", home) || qs(".casinoprovider-thumb-section", home);
      if (casino) casino.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      var main = qs("#main");
      if (main && !isHome) main.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function setActiveSportTab(link) {
    qsa(".new-middle-menus a").forEach(function (a) {
      a.classList.remove("nmm-active", "router-link-active", "router-link-exact-active");
    });
    if (link) {
      link.classList.add("nmm-active");
    }
  }

  function initSportNav() {
    ensureSportFilterStyles();
    tagHomePromoSections();
    tagExistingSportPanels();
    injectDynamicSportPanels();

    var mock = window.RBSportMock;

    function onNavClick(link, e) {
      if (e) e.preventDefault();
      setActiveSportTab(link);
      var sportKey = "home";
      if (mock) sportKey = mock.getSportIdFromNavLink(link) || "home";
      if (link.id === "home001" || (link.getAttribute("href") || "") === "/home") sportKey = "home";
      if (link.id === "inplay001" || (link.getAttribute("href") || "") === "/inplay") sportKey = "inplay";
      applySportView(sportKey);
    }

    qsa(".new-middle-menus a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        onNavClick(link, e);
      });
    });

    qsa("#sidebar-nav a.nav-link[data-bs-toggle='collapse']").forEach(function (link) {
      var span = qs("span", link);
      if (!span || !mock) return;
      var sportId = mock.NAME_TO_ID[(span.textContent || "").trim().toLowerCase()];
      if (!sportId) return;
      link.addEventListener("click", function () {
        var navLink = qs("#sport" + sportId);
        if (navLink) setActiveSportTab(navLink);
        applySportView(sportId);
      });
    });

    applySportView("home");
    initBetButtons();
  }

  /* ── Internal links (prevent 404 on static host) ── */

  function initInternalLinks() {
    qsa('a[href^="/"]').forEach(function (a) {
      if (a.getAttribute("data-static-nav") === "off") return;
      var href = a.getAttribute("href");
      if (!href || href === "/" || href === "/home") {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        return;
      }
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var main = qs("#main");
        if (main) main.scrollIntoView({ behavior: "smooth" });
      });
    });

    qsa("a.rules").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        showModal(ensureRulesModal());
      });
    });
  }

  /* ── Search ── */

  function initSearch() {
    var form = qs(".search-form");
    if (!form) return;
    var input = qs('input[placeholder="Search Events"]', form);
    if (!input) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (input.value || "").trim().toLowerCase();
      if (!q) return;

      var candidates = qsa(
        "app-sport-list b, app-sport-list .event-name, .lm_datas b, .sidebar-nav .final-link span"
      );
      var first = null;
      candidates.forEach(function (el) {
        var text = (el.textContent || "").toLowerCase();
        var row = el.closest(".card, .row, li, .sport-list-item, .nav-item") || el;
        if (text.indexOf(q) !== -1) {
          row.classList.add("search-hit");
          if (!first) first = row;
        } else {
          row.classList.remove("search-hit");
        }
      });

      if (first) {
        first.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    if (!qs("#search-hit-style")) {
      var style = document.createElement("style");
      style.id = "search-hit-style";
      style.textContent = ".search-hit{outline:2px solid var(--theme-secondary-color,#ffc107);outline-offset:2px}";
      document.head.appendChild(style);
    }
  }

  /* ── Bet price cells (visual selection only) ── */

  function initBetButtons() {
    qsa(".bl-box").forEach(function (box) {
      box.style.cursor = "pointer";
      box.addEventListener("click", function () {
        var group = box.closest(".h-backLay, .row, .card");
        if (group) qsa(".bl-box.selected", group).forEach(function (b) { b.classList.remove("selected"); });
        box.classList.add("selected");
      });
    });
    if (!qs("#bet-selected-style")) {
      var style = document.createElement("style");
      style.id = "bet-selected-style";
      style.textContent = ".bl-box.selected{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--theme-secondary-color,#ffc107)}";
      document.head.appendChild(style);
    }
  }

  /* ── Forms: change password, prevent real submit ── */

  function initForms() {
    qsa("form").forEach(function (form) {
      if (form.id === "demo-login-form" || form.classList.contains("search-form")) return;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = qs('[type="submit"]', form);
        if (btn) {
          var old = btn.textContent;
          btn.textContent = "Saved (demo)";
          btn.disabled = true;
          setTimeout(function () {
            btn.textContent = old;
            btn.disabled = false;
          }, 1500);
        }
      });
    });
  }

  /* ── Swiper carousels ── */

  function initSwipers() {
    if (typeof Swiper === "undefined") return;
    qsa(".mySwiper").forEach(function (el, index) {
      if (el.swiper || el.dataset.swiperReady) return;
      el.dataset.swiperReady = "1";
      try {
        new Swiper(el, {
          loop: true,
          autoplay: { delay: 4000, disableOnInteraction: false },
          pagination: {
            el: el.querySelector(".swiper-pagination") || ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: el.querySelector(".swiper-button-next"),
            prevEl: el.querySelector(".swiper-button-prev"),
          },
          slidesPerView: 1,
          spaceBetween: 8,
        });
      } catch (err) {
        console.warn("Swiper init skipped for", el, err);
      }
    });
  }

  /* ── Featured events marquee click ── */

  function initMarquee() {
    qsa(".lm_datas b").forEach(function (b) {
      b.style.cursor = "pointer";
      b.addEventListener("click", function () {
        var term = (b.textContent || "").trim().toLowerCase();
        var input = qs('input[placeholder="Search Events"]');
        if (input) {
          input.value = term.split(" v ")[0] || term;
          qs(".search-form").dispatchEvent(new Event("submit", { cancelable: true }));
        }
      });
    });
  }

  /* ── Profile dropdown (header) ── */

  function initDropdowns() {
    var dropdown = qs(".header-auth-btns .dropdown");
    if (!dropdown) return;
    var menu = qs(".dropdown-menu.profile", dropdown);
    var profileBtn = qs(".btn-login-profile", dropdown);

    dropdown.addEventListener("click", function (e) {
      if (!getSession()) return;
      if (e.target.closest(".dropdown-menu")) return;
      if (!e.target.closest(".btn-login-profile")) return;
      e.preventDefault();
      e.stopPropagation();
      var open = menu.classList.contains("show");
      qsa(".dropdown-menu.show").forEach(function (m) {
        m.classList.remove("show");
      });
      if (!open) menu.classList.add("show");
    });

    if (profileBtn) {
      profileBtn.addEventListener("click", function (e) {
        if (!getSession()) return;
        e.preventDefault();
        e.stopPropagation();
        menu.classList.toggle("show");
      });
    }

    document.addEventListener("click", function () {
      qsa(".dropdown-menu.show").forEach(function (m) {
        m.classList.remove("show");
      });
    });
  }

  /* ── Promo / ad images from Reddybookclubs asset pack ── */

  var PROMO_BANNERS = [
    "assets/images/reddybook-banners/01-about-us-banner---2.webp",
    "assets/images/reddybook-banners/02-about-us-main-banner---1.webp",
    "assets/images/reddybook-banners/03-customer-care-banner---2.webp",
    "assets/images/reddybook-banners/04-customer-care-main-banner---1.webp",
    "assets/images/reddybook-banners/05-homepage---how-do-reddybook-bonuses-and-promotions-work.webp",
    "assets/images/reddybook-banners/06-homepage---how-reddybook-club-operates.webp",
    "assets/images/reddybook-banners/07-homepage---important-points-to-remember.webp",
    "assets/images/reddybook-banners/08-homepage---live-betting-experience.webp",
    "assets/images/reddybook-banners/09-homepage---reddybook-login-process_-enter-your-id-and-start-.webp",
    "assets/images/reddybook-banners/10-homepage---things-to-keep-in-mind-before-you-get-a-reddy-boo.webp",
    "assets/images/reddybook-banners/11-homepage---what-is-reddybook_-complete-guide-to-betting-logi.webp",
    "assets/images/reddybook-banners/12-homepage---withdrawal-process-step-by-step_-login-to-your-ac.webp",
    "assets/images/reddybook-banners/13-homepage-banner.webp",
    "assets/images/reddybook-banners/14-login---deposits-withdrawals-and-verification-2.webp",
    "assets/images/reddybook-banners/15-login---deposits-withdrawals-and-verification-3.webp",
    "assets/images/reddybook-banners/16-login---deposits-withdrawals-and-verification.webp",
    "assets/images/reddybook-banners/17-login---how-to-login-to-your-reddy-book-club-account.webp",
    "assets/images/reddybook-banners/18-login---reddy-book-club-login-on-mobile.webp",
    "assets/images/reddybook-banners/19-login---reddy-book-login_-access-your-reddy-book-club-cricke.webp",
    "assets/images/reddybook-banners/20-login-page-banner.webp",
    "assets/images/reddybook-banners/21-privacy-policy-banner---2.webp",
    "assets/images/reddybook-banners/22-privacy-policy-main-banner---1.webp",
    "assets/images/reddybook-banners/23-register---common-registration-problems-and-simple-fixes.webp",
    "assets/images/reddybook-banners/24-register---how-to-register-on-reddy-book-club.webp",
    "assets/images/reddybook-banners/25-register---reddy-book-registration_-get-your-reddy-book-club.webp",
    "assets/images/reddybook-banners/26-register---what-about-the-reddy-book-club-apk-2.webp",
    "assets/images/reddybook-banners/27-register---what-about-the-reddy-book-club-apk.webp",
    "assets/images/reddybook-banners/28-register---what-details-may-be-needed-during-registration.webp",
    "assets/images/reddybook-banners/29-register---why-register-with-reddy-book-club.webp",
    "assets/images/reddybook-banners/30-register-page-banner.webp",
    "assets/images/reddybook-banners/31-responsible-gaming-banner---2.webp",
    "assets/images/reddybook-banners/32-responsible-gaming-main-banner---1.webp",
    "assets/images/reddybook-banners/33-t-c-banner---2.webp",
    "assets/images/reddybook-banners/34-t-c-main-banner---1.webp",
  ];

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function pickRandomBanner() {
    return PROMO_BANNERS[Math.floor(Math.random() * PROMO_BANNERS.length)];
  }

  /* Original casino-provider ad tiles (MAC88, GAMZIX, etc.) — not landing-page banners */
  var CASINO_PROVIDER_IMAGES = [
    "assets/images/casino-providers/17627666895880894.webp",
    "assets/images/casino-providers/17627666966773371.webp",
    "assets/images/casino-providers/17627667037947034.webp",
    "assets/images/casino-providers/17627667094382181.webp",
    "assets/images/casino-providers/17627667207446881.webp",
    "assets/images/casino-providers/17627667265483610.webp",
    "assets/images/casino-providers/17627667335828371.webp",
    "assets/images/casino-providers/17627667396466553.webp",
    "assets/images/casino-providers/17627667473323418.webp",
    "assets/images/casino-providers/17627667559465232.webp",
    "assets/images/casino-providers/17627667617577382.webp",
    "assets/images/casino-providers/17627667697736998.webp",
    "assets/images/casino-providers/17627667768757066.webp",
    "assets/images/casino-providers/17627667832075489.webp",
    "assets/images/casino-providers/17627667896330903.webp",
    "assets/images/casino-providers/17627667959015593.webp",
    "assets/images/casino-providers/17627668019132332.webp",
    "assets/images/casino-providers/17627668338456002.webp",
  ];

  function initCasinoProviderImages() {
    var section = qs(".casinoprovider-thumb-section");
    if (!section) return;
    var imgs = qsa("img", section);
    imgs.forEach(function (img, i) {
      var src = CASINO_PROVIDER_IMAGES[i % CASINO_PROVIDER_IMAGES.length];
      img.setAttribute("data-rb-casino-provider", "1");
      img.src = src;
      img.removeAttribute("srcset");
      img.alt = img.alt || "Casino provider";
      img.style.objectFit = "cover";
      img.style.width = "100%";
      img.style.height = "100%";
    });
  }

  function collectPromoImageElements() {
    var seen = new Set();
    var out = [];
    var selectors = [
      ".top-baner img",
      "#carouselExampleIndicators .carousel-item img",
      'img[src*="speedcdn.io/assets/v9-modal-popup"]',
      '#sidebar img[src*="assets/images/ls_"]',
    ];

    selectors.forEach(function (sel) {
      qsa(sel).forEach(function (img) {
        if (seen.has(img)) return;
        if (
          img.closest(".casinoprovider-thumb-section, .custom-thumb-section") ||
          img.getAttribute("data-rb-casino-provider")
        ) {
          return;
        }
        seen.add(img);
        out.push(img);
      });
    });
    return out;
  }

  function initPromoImages() {
    if (!PROMO_BANNERS.length) return;

    var imgs = collectPromoImageElements();
    if (!imgs.length) return;

    var pool = shuffleArray(PROMO_BANNERS);
    var idx = 0;

    imgs.forEach(function (img) {
      var src = pool[idx % pool.length];
      idx += 1;
      img.src = src;
      img.removeAttribute("srcset");
      if (img.loading !== "lazy") img.loading = "lazy";
    });
  }

  /* ── Remove broken Angular bundles (404) ── */

  function disableAngularBoot() {
    qsa('script[src*="main."], script[src*="runtime."], script[src*="polyfills."], script[src*="scripts."]').forEach(
      function (s) {
        s.remove();
      }
    );
  }

  ready(function () {
    ensureAuthModalStyles();
    if (isLandingPage()) {
      ensureAuthModalOnPage();
      initAuthForms();
      initModals();
      upgradeLandingAuthLinks();
      initAuthButtons();
      showApkPromoOnLoad();
      window.RBStatic = {
        showModal: showModal,
        hideModal: hideModal,
        openLogin: openLoginModal,
        openSignup: openSignupModal,
        getSession: getSession,
        logout: function () {
          clearSession();
          applyAuthUI();
          qsa('[data-auth-open="signup"], [data-auth-open="login"]').forEach(function (el) {
            el.dataset.authBound = "";
          });
          initAuthButtons();
        },
      };
      return;
    }

    disableAngularBoot();
    initAuthForms();
    initModals();
    initAuthButtons();
    initSidebar();
    initCollapse();
    initSportNav();
    initInternalLinks();
    initSearch();
    initForms();
    initMarquee();
    initDropdowns();
    initPromoImages();
    initCasinoProviderImages();
    initSwipers();
    showApkPromoOnLoad();

    window.RBStatic = {
      showModal: showModal,
      hideModal: hideModal,
      openLogin: openLoginModal,
      openSignup: openSignupModal,
      getSession: getSession,
      logout: function () {
        clearSession();
        applyAuthUI();
      },
    };
  });
})();
