/* =========================================================================
   main.js — Portfolio Hồ Công Minh · INF2501
   File JavaScript DUY NHẤT, dùng chung cho mọi trang.

   File này làm 5 việc:
     1. Chèn MENU và CHÂN TRANG giống hệt nhau vào mọi trang.
        → Muốn sửa thông tin cá nhân hay tên bài: chỉ sửa mục 1 bên dưới.
     2. Điều khiển nút hamburger (điện thoại) và menu con "Dự án".
     3. Tô sáng các chỗ chưa điền dạng [CHỮ IN HOA] để bạn dễ tìm.
     4. Khoá các link / khung nhúng / ảnh chưa có đường dẫn thật
        (để website không có link hỏng), và tự đổi link Google Docs,
        Google Drive, YouTube sang dạng nhúng được.
     5. Hiệu ứng hiện dần khi cuộn + mục lục a/b/c tự sáng trên trang bài tập.

   Mỗi trang HTML chỉ cần có:
     <body data-page="...">            ← tên trang: home, projects, bai1…bai6, conclusion
     <header id="site-header"></header> ← menu sẽ được chèn vào đây
     <footer id="site-footer"></footer> ← chân trang sẽ được chèn vào đây
   ========================================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1. THÔNG TIN CHUNG — sửa ở đây, cả 10 trang tự đổi theo
     --------------------------------------------------------------------- */
  const SITE = {
    hoTen: "Hồ Công Minh",
    mssv: "2554030031",
    lop: "K17A",
    nganh: "Thiết kế Đồ họa",
    hocPhan: "INF2501 – Nhập môn Công nghệ số và ứng dụng trí tuệ nhân tạo",
    giangVien: "Vũ Việt Hoàng",
    truong: "Trường Đại học Sư phạm Nghệ thuật Trung ương",
    khoa: "Khoa Giáo dục Đại cương",
    // Dòng ghi nhận việc dùng AI để làm website (đề yêu cầu ghi rõ công cụ + mục đích)
    ghiNhanAI:
      "Ghi nhận sử dụng AI: mã nguồn HTML, CSS, JavaScript và bố cục giao diện của website này " +
      "được viết với sự hỗ trợ của Claude (Anthropic). Nội dung các bài tập do sinh viên tự thực hiện và biên soạn."
  };

  // Danh sách 6 bài tập: dùng để tạo menu con
  const BAI_TAP = [
    { id: "bai1", file: "bai1.html", so: "01", chuong: "Chương 1", ten: "Thao tác tệp tin và thư mục" },
    { id: "bai2", file: "bai2.html", so: "02", chuong: "Chương 2", ten: "Tìm kiếm và đánh giá thông tin học thuật" },
    { id: "bai3", file: "bai3.html", so: "03", chuong: "Chương 3", ten: "Viết prompt hiệu quả" },
    { id: "bai4", file: "bai4.html", so: "04", chuong: "Chương 4", ten: "Công cụ hợp tác trực tuyến" },
    { id: "bai5", file: "bai5.html", so: "05", chuong: "Chương 5", ten: "AI tạo sinh hỗ trợ sáng tạo nội dung" },
    { id: "bai6", file: "bai6.html", so: "06", chuong: "Chương 6", ten: "Sử dụng AI có trách nhiệm" }
  ];

  // Trang hiện tại (lấy từ <body data-page="...">)
  const page = document.body.dataset.page || "";
  const isProjectsArea = page === "projects" || page.indexOf("bai") === 0;
  // Tên file hiện tại, dùng trong các lời nhắc "hãy sửa file …"
  const fileName = (page === "home" ? "index" : page || "trang này") + ".html";

  // Trên máy tính (rộng hơn 860px) menu nằm ngang; nhỏ hơn thì dùng hamburger
  const desktop = window.matchMedia("(min-width: 861px)");


  /* ---------------------------------------------------------------------
     2. TẠO MENU (đầu trang)
     --------------------------------------------------------------------- */
  function renderHeader() {
    const header = document.getElementById("site-header");
    if (!header) return null;

    // Tạo 6 mục của menu con
    const subItems = BAI_TAP.map(function (bai) {
      const active = page === bai.id ? ' class="is-active" aria-current="page"' : "";
      return (
        "<li><a href=\"" + bai.file + "\"" + active + ">" +
          "<span class=\"sub-num\">" + bai.so + "</span>" +
          "<span><span class=\"sub-title\">" + bai.ten + "</span>" +
          "<span class=\"sub-ch\">" + bai.chuong + "</span></span>" +
        "</a></li>"
      );
    }).join("");

    const active = function (yes) { return yes ? " is-active" : ""; };
    const current = function (yes) { return yes ? ' aria-current="page"' : ""; };

    header.innerHTML =
      '<div class="header-inner container">' +
        '<a class="brand" href="index.html" aria-label="Về trang chủ – ' + SITE.hoTen + '">' +
          '<span class="brand-mark">HCM<span>.</span></span>' +
          '<span class="brand-sub">Portfolio · INF2501</span>' +
        "</a>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">' +
          '<span class="nav-toggle-bars" aria-hidden="true"></span>' +
          '<span class="sr-only">Mở menu</span>' +
        "</button>" +
        '<nav class="site-nav" id="site-nav" aria-label="Menu chính">' +
          '<ul class="nav-list">' +
            '<li><a class="nav-link' + active(page === "home") + '" href="index.html"' + current(page === "home") + ">Giới thiệu</a></li>" +
            '<li class="has-sub">' +
              '<div class="nav-row">' +
                '<a class="nav-link' + active(isProjectsArea) + '" href="projects.html"' + current(page === "projects") + ">Dự án</a>" +
                '<button class="sub-toggle" type="button" aria-expanded="false" aria-controls="sub-projects">' +
                  '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' +
                  '<span class="sr-only">Mở danh sách 6 bài tập</span>' +
                "</button>" +
              "</div>" +
              '<ul class="submenu" id="sub-projects">' + subItems +
                '<li><a class="sub-all" href="projects.html">Xem tổng quan Dự án →</a></li>' +
              "</ul>" +
            "</li>" +
            '<li><a class="nav-link' + active(page === "conclusion") + '" href="conclusion.html"' + current(page === "conclusion") + ">Tổng kết</a></li>" +
          "</ul>" +
        "</nav>" +
      "</div>";

    return header;
  }


  /* ---------------------------------------------------------------------
     2b. TẠO CHÂN TRANG
     --------------------------------------------------------------------- */
  function renderFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    footer.innerHTML =
      '<div class="container">' +
        '<p class="footer-word" aria-hidden="true">' + SITE.hoTen + "<span>.</span></p>" +
        '<dl class="footer-info">' +
          "<div><dt>Sinh viên</dt><dd>" + SITE.hoTen + "</dd></div>" +
          "<div><dt>Mã sinh viên</dt><dd>" + SITE.mssv + "</dd></div>" +
          '<div class="wide"><dt>Học phần</dt><dd>' + SITE.hocPhan + "</dd></div>" +
          "<div><dt>Lớp</dt><dd>" + SITE.lop + " · " + SITE.nganh + "</dd></div>" +
          "<div><dt>Giảng viên hướng dẫn</dt><dd>" + SITE.giangVien + "</dd></div>" +
          '<div class="wide"><dt>Đơn vị</dt><dd>' + SITE.khoa + " · " + SITE.truong + "</dd></div>" +
        "</dl>" +
        '<p class="footer-ai">' + SITE.ghiNhanAI + "</p>" +
        '<div class="footer-bottom">' +
          "<span>Portfolio cá nhân · " + SITE.hoTen + " · " + SITE.mssv + "</span>" +
          '<a href="#top">Lên đầu trang ↑</a>' +
        "</div>" +
      "</div>";
  }


  /* ---------------------------------------------------------------------
     3. ĐIỀU KHIỂN MENU: hamburger + menu con
     --------------------------------------------------------------------- */
  function initMenu(header) {
    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".site-nav");
    const subItem = header.querySelector(".has-sub");
    const subToggle = header.querySelector(".sub-toggle");

    // Mở / đóng bảng menu trên điện thoại
    function setMenu(open) {
      header.classList.toggle("nav-open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector(".sr-only").textContent = open ? "Đóng menu" : "Mở menu";
      // Đang ở trang Dự án / bài tập thì mở sẵn danh sách 6 bài cho tiện
      if (open && isProjectsArea) setSub(true);
    }

    // Mở / đóng menu con "Dự án"
    function setSub(open) {
      subItem.classList.toggle("is-open", open);
      subToggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function () {
      setMenu(!header.classList.contains("nav-open"));
    });

    subToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setSub(!subItem.classList.contains("is-open"));
    });

    // Bấm ra ngoài thì đóng menu con (trên máy tính)
    document.addEventListener("click", function (event) {
      if (desktop.matches && !subItem.contains(event.target)) setSub(false);
    });

    // Dùng bàn phím: rời khỏi menu con bằng phím Tab thì đóng lại (trên máy tính)
    subItem.addEventListener("focusout", function (event) {
      if (desktop.matches && !subItem.contains(event.relatedTarget)) setSub(false);
    });

    // Phím Esc: đóng menu con trước, rồi đến bảng menu
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (subItem.classList.contains("is-open") && desktop.matches) {
        setSub(false);
        subToggle.focus();
      } else if (header.classList.contains("nav-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Bấm một link trong menu thì đóng bảng menu
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    // Xoay ngang điện thoại / phóng to cửa sổ lên cỡ máy tính → đóng menu
    desktop.addEventListener("change", function () {
      setMenu(false);
      setSub(false);
    });

    // Thêm đường kẻ dưới menu khi cuộn trang
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }


  /* ---------------------------------------------------------------------
     4. TÔ SÁNG PLACEHOLDER [CHỮ IN HOA]
     Bạn chỉ cần thay cả cụm [ ... ] bằng nội dung thật, phần tô sáng tự mất.
     --------------------------------------------------------------------- */
  const PLACEHOLDER = /\[[A-ZÀ-Ỹ0-9][^[\]\n]{1,200}\]/g;

  function highlightPlaceholders() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style, .ph, .ph-box")) return NodeFilter.FILTER_REJECT;
        PLACEHOLDER.lastIndex = 0;
        return PLACEHOLDER.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    let count = 0;
    nodes.forEach(function (node) {
      const text = node.nodeValue;
      const fragment = document.createDocumentFragment();
      let last = 0;
      text.replace(PLACEHOLDER, function (match, offset) {
        fragment.appendChild(document.createTextNode(text.slice(last, offset)));
        const mark = document.createElement("mark");
        mark.className = "ph";
        mark.textContent = match;
        fragment.appendChild(mark);
        last = offset + match.length;
        count++;
        return match;
      });
      fragment.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(fragment, node);
    });

    if (count > 0) {
      console.info("[Portfolio] " + fileName + " còn " + count + " chỗ cần điền (chữ trong [ngoặc vuông]).");
    }
  }


  /* ---------------------------------------------------------------------
     5. KIỂM TRA LINK, KHUNG NHÚNG, ẢNH
     --------------------------------------------------------------------- */
  // Đường dẫn còn là placeholder, ví dụ "[LINK BÀI 2]"
  function isPlaceholderUrl(url) {
    return !url || url.trim().charAt(0) === "[";
  }

  // Đường dẫn trỏ vào máy tính cá nhân (file:///C:/...) → người khác KHÔNG mở được
  function isLocalUrl(url) {
    return /^file:|^[a-zA-Z]:[\\/]/.test(url.trim());
  }

  // Đổi link xem thường sang link nhúng được trong iframe
  function toEmbedUrl(url) {
    let m;
    // Google Docs / Sheets / Slides: .../d/ID/edit → .../d/ID/preview
    m = url.match(/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([\w-]{20,})/);
    if (m) return "https://docs.google.com/" + m[1] + "/d/" + m[2] + (m[1] === "presentation" ? "/embed" : "/preview");
    // Google Drive (PDF, ảnh, video): .../file/d/ID/view → .../file/d/ID/preview
    m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]{20,})/);
    if (m) return "https://drive.google.com/file/d/" + m[1] + "/preview";
    // YouTube: watch?v=ID hoặc youtu.be/ID → /embed/ID
    m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/);
    if (m) return "https://www.youtube.com/embed/" + m[1];
    return url;
  }

  // Tạo khung báo "chưa có nội dung" thay cho iframe/ảnh
  function makeBox(label, title, hint) {
    const box = document.createElement("div");
    box.className = "ph-box";
    box.setAttribute("role", "note");
    const l = document.createElement("span");
    l.className = "ph-box-label";
    l.textContent = label;
    const t = document.createElement("strong");
    t.textContent = title;
    const h = document.createElement("small");
    h.textContent = hint;
    box.append(l, t, h);
    return box;
  }

  const LOCAL_HINT =
    "Đường dẫn đang trỏ vào máy tính cá nhân (file:///…) nên người khác không mở được. " +
    "Hãy tải tệp lên Google Drive (chế độ “Bất kỳ ai có đường liên kết”) hoặc chép vào thư mục files/.";

  function checkLinksAndMedia() {
    // 5a. Link <a>
    document.querySelectorAll("a[href]").forEach(function (a) {
      const href = a.getAttribute("href").trim();
      const local = isLocalUrl(href);
      if (!isPlaceholderUrl(href) && !local) return;
      a.classList.add("is-pending");
      a.setAttribute("aria-disabled", "true");
      a.removeAttribute("href");
      a.removeAttribute("target");
      a.title = local ? LOCAL_HINT : "Chưa có liên kết – hãy thay " + href + " trong file " + fileName;
    });

    // 5b. Khung nhúng <iframe>
    document.querySelectorAll("iframe[src]").forEach(function (frame) {
      const src = frame.getAttribute("src").trim();
      if (isLocalUrl(src)) {
        frame.replaceWith(makeBox("Link không công khai", "Tệp đang nằm trên máy tính của bạn", LOCAL_HINT));
      } else if (isPlaceholderUrl(src)) {
        frame.replaceWith(makeBox("Chưa có sản phẩm", src, "Thay chữ trong ngoặc vuông ở file " + fileName + " bằng link công khai."));
      } else {
        const embed = toEmbedUrl(src);
        if (embed !== src) frame.src = embed;
      }
    });

    // 5c. Ảnh <img>
    document.querySelectorAll("img[src]").forEach(function (img) {
      const src = img.getAttribute("src").trim();
      if (isPlaceholderUrl(src) || isLocalUrl(src)) {
        img.replaceWith(makeBox("Chưa có ảnh", src, img.alt ? "Mô tả: " + img.alt : "Chép ảnh vào thư mục images/ rồi sửa đường dẫn."));
        return;
      }
      // Sai tên file ảnh → hiện khung nhắc thay vì biểu tượng ảnh vỡ
      const showError = function () {
        img.replaceWith(makeBox("Không tìm thấy ảnh", src, "Kiểm tra lại tên file (viết thường, không dấu, đúng đuôi .jpg/.png) trong thư mục images/."));
      };
      if (img.complete && img.naturalWidth === 0) showError();
      else img.addEventListener("error", showError, { once: true });
    });
  }


  /* ---------------------------------------------------------------------
     6. HIỆU ỨNG HIỆN DẦN KHI CUỘN (phần tử có thuộc tính data-reveal)
     --------------------------------------------------------------------- */
  function initReveal() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      // Chỉ ẩn những phần nằm dưới màn hình đầu tiên, để không bị nháy
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
        el.classList.add("reveal-wait");
        observer.observe(el);
      }
    });
  }


  /* ---------------------------------------------------------------------
     7. MỤC LỤC a/b/c TỰ SÁNG theo phần đang đọc (trang bài tập)
     --------------------------------------------------------------------- */
  function initToc() {
    const links = document.querySelectorAll(".toc a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;

    const byId = {};
    links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("is-current"); });
        const link = byId[entry.target.id];
        if (link) link.classList.add("is-current");
      });
    }, { rootMargin: "-35% 0px -60% 0px" });

    Object.keys(byId).forEach(function (id) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }


  /* ---------------------------------------------------------------------
     CHẠY TẤT CẢ
     --------------------------------------------------------------------- */
  const header = renderHeader();
  renderFooter();
  if (header) {
    header.id = "top";
    initMenu(header);
  }
  highlightPlaceholders();
  checkLinksAndMedia();
  initReveal();
  initToc();
})();
