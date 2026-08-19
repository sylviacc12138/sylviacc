/**
 * main.js — Portfolio 交互脚本
 */

(function () {
  "use strict";

  /* ===== 导航栏滚动效果 ===== */
  var nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 8) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  /* ===== 移动端菜单 ===== */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "";
    });

    // 点击菜单链接后关闭菜单
    var links = mobileMenu.querySelectorAll("a");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ===== 滚动淡入动画 ===== */
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    // 观察所有 section 和 card
    document.querySelectorAll("section .card, section .timeline-item, .work-card").forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ===== 创作页分类筛选 ===== */
  var filterBar = document.getElementById("filterBar");
  if (filterBar) {
    var chips = filterBar.querySelectorAll(".filter-chip");
    var cards = document.querySelectorAll(".gallery .work-card");
    var emptyState = document.getElementById("emptyState");
    var emptyTitle = document.getElementById("emptyTitle");

    function applyFilter(filter, label) {
      var visible = 0;
      cards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-category") === filter;
        card.style.display = match ? "" : "none";
        if (match) visible++;
      });

      // 当前分类下无作品时显示空状态
      if (emptyState) {
        if (visible === 0) {
          emptyState.style.display = "flex";
          if (emptyTitle) {
            emptyTitle.textContent =
              filter === "all" ? "还没有添加作品" : "「" + label + "」分类下还没有作品";
          }
        } else {
          emptyState.style.display = "none";
        }
      }
    }

    // 初始状态：无作品时直接显示空状态
    applyFilter("all", "全部");

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          c.classList.remove("active");
        });
        chip.classList.add("active");
        applyFilter(chip.getAttribute("data-filter"), chip.textContent.trim());
      });
    });
  }
})();
