/** Shared login/signup modal markup and asset tags for landing pages */

export const AUTH_MODAL_HTML = `
<div class="modal fade login-popup" tabindex="-1" role="dialog" aria-labelledby="dialog-login-name" aria-hidden="true">
  <motion class="modal-dialog modal-lg modal-dialog-centered">
    <motion class="modal-content">
      <motion class="modal-body">
        <button type="button" aria-label="Close" class="btn-close close pull-right" data-bs-dismiss="modal">
          <span aria-hidden="true">×</span>
        </button>
        <app-login></app-login>
      </motion>
    </motion>
  </motion>
</div>
<bs-modal-backdrop class="modal-backdrop fade"></bs-modal-backdrop>`.replace(/<motion/g, "<div").replace(/<\/motion>/g, "</div>");

export const AUTH_HEAD_LINKS = `
  <link href="assets/css/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
  <link href="assets/css/auth-modal.css" rel="stylesheet" />`;

export const AUTH_FOOT_SCRIPTS = `
  <script src="assets/js/bootstrap.bundle.min.js"></script>
  <script src="js/site-logic.js"></script>`;

/** Header Signup / Login — open modal instead of navigating away */
export function headerAuthButtonsHtml() {
  return `<a href="javascript:void(0)" class="btn-login btn-accent" data-auth-open="signup">Signup</a>
        <a href="javascript:void(0)" class="btn-login" data-auth-open="login">Login</a>`;
}
