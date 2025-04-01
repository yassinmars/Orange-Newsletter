import React from "react";

function Footer() {
  return (
    <div>
      <footer class="footer navbar" data-bs-theme="dark">
        <h2 class="visually-hidden">Sitemap & information</h2>
        <div class="container-xxl footer-social">
          <h3 class="footer-heading me-md-3">Follow us</h3>
          <ul class="navbar-nav gap-2 flex-row align-self-start">
            <li>
              <a href="#" class="btn btn-icon btn-social btn-twitter">
                <span class="visually-hidden">Twitter</span>
              </a>
            </li>
            <li>
              <a href="#" class="btn btn-icon btn-social btn-facebook">
                <span class="visually-hidden">Facebook</span>
              </a>
            </li>
            <li>
              <a href="#" class="btn btn-icon btn-social btn-instagram">
                <span class="visually-hidden">Instagram</span>
              </a>
            </li>
            <li>
              <a href="#" class="btn btn-icon btn-social btn-whatsapp">
                <span class="visually-hidden">WhatsApp</span>
              </a>
            </li>
            <li>
              <a href="#" class="btn btn-icon btn-social btn-linkedin">
                <span class="visually-hidden">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="#" class="btn btn-icon btn-social btn-youtube">
                <span class="visually-hidden">YouTube</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="border-bottom border-1 border-dark"></div>{" "}
        <div class="container-xxl footer-terms">
          <ul class="navbar-nav gap-md-3">
            <li class="fw-bold">© Orange 2025</li>
            <li>
              <a class="nav-link" href="#">
                Terms and conditions
              </a>
            </li>
            <li>
              <a class="nav-link" href="#">
                Privacy
              </a>
            </li>
            <li>
              <a class="nav-link" href="#">
                Accessibility statement
              </a>
            </li>
            <li>
              <a class="nav-link" href="#">
                Cookie policy
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
