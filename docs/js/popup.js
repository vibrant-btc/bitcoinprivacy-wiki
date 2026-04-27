document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("samouraiBarSeen")) return;

  const bar = document.createElement("div");
  bar.className = "md-banner";

  bar.style.transform = "translateY(-100%)";
  bar.style.opacity = "0";
  bar.style.transition = "transform 0.3s ease, opacity 0.3s ease";

  bar.innerHTML = `
    <div class="md-banner__inner md-grid md-typeset" style="
      position: relative;
      text-align: center;
      font-weight: 700;
      padding: 0 48px; /* restores visual centering balance */
    ">
      <div>
        Support the Samourai Wallet Developers |
        <a href="https://billandkeonne.org" target="_blank" style="
          color: #4fc3f7;
          font-weight: 700;
          text-decoration: none;
        ">
          Learn more
        </a>
      </div>

      <button id="samourai-close" aria-label="Close" style="
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #ffffff;
      ">
        &times;
      </button>
    </div>
  `;

  document.body.prepend(bar);

  requestAnimationFrame(() => {
    bar.style.transform = "translateY(0)";
    bar.style.opacity = "1";
  });

  document.getElementById("samourai-close").addEventListener("click", function () {
    bar.style.transform = "translateY(-100%)";
    bar.style.opacity = "0";

    setTimeout(() => {
      bar.remove();
      localStorage.setItem("samouraiBarSeen", "true");
    }, 300);
  });
});