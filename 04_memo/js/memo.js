document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (typeof localStorage === "undefined") {
      showError("このブラウザはLocal Storage機能が実装されていません");
      return;
    } else {
      viewStorage();
      saveLocalStorage();
      delLocalStorage();
      allClearLocalStorage();
      selectTable();
    }
  },
  false
);

function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;

      if (key === "" || value === "") {
        showError("Key、Memoはいずれも必須です。");
        return;
      } else {
        let w_msg = `LocalStorageに\n「${key} ${value}」\nを保存（save）しますか？`;
        showConfirm(w_msg).then(function (result) {
          if (result.value === true) {
            localStorage.setItem(key, value);
            viewStorage();
            let w_msg =
              "LocalStorageに " + key + " " + value + " を保存しました。";
            showSuccess(w_msg);
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
          }
        });
      }
    },
    false
  );
}

function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      const chkbox1 = document.getElementsByName("chkbox1");
      const table1 = document.getElementById("table1");
      let w_cnt = 0;
      w_cnt = selectCheckBox("del");

      if (w_cnt >= 1) {
        showConfirm(
          `LocalStorageから選択されている ${w_cnt} 件を削除（delete）しますか？`
        ).then(function (result) {
          if (result.value === true) {
            for (let i = 0; i < chkbox1.length; i = i + 1) {
              if (chkbox1[i].checked) {
                let w_key = table1.rows[i + 1].cells[1].firstChild.data;
                localStorage.removeItem(w_key);
              }
            }
            viewStorage();
            let w_msg = `LocalStorageから ${w_cnt} 件を削除しました。`;
            showSuccess(w_msg);
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
          }
        });
      }
    },
    false
  );

  // table1にイベントリスナーを登録し、クリックイベントをキャッチする。
  // クリックした要素が「ごみ箱アイコン」class="trash"の場合、
  // 該当の行に表示されているkeyをlocalStorageから削除する。
  const table1 = document.getElementById("table1");
  table1.addEventListener(
    "click",
    function (e) {
      const target = e.target;
      if (!target || !target.classList || !target.classList.contains("trash")) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      let row = target;
      while (row && row.nodeName !== "TR") {
        row = row.parentNode;
      }
      if (!row || !row.cells || row.cells.length < 2) {
        return;
      }

      const key = row.cells[1].textContent;
      const value = row.cells[2].textContent;
      if (!key) {
        return;
      }

      showConfirm(
        `LocalStorageから\n「${key} ${value}」\nを削除（delete）しますか？`
      ).then(function (result) {
        if (result.value === true) {
          localStorage.removeItem(key);
          viewStorage();
          let w_msg = `LocalStorageに\n「${key} ${value}」\nを削除しました。`;
          showSuccess(w_msg);
        }
      });
    },
    false
  );
}

function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      showConfirm(
        "LocalStorageのデータをすべて削除します。\nよろしいですか？"
      ).then(function (result) {
        if (result.value === true) {
          localStorage.clear();
          viewStorage();
          let w_msg = "LocalStorageのデータをすべて削除しました。";
          showSuccess(w_msg);
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      });
    },
    false
  );
}

function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      // selectRadioBtn();
      selectCheckBox("select");
    },
    false
  );
}

function selectCheckBox(mode) {
  // let w_sel = "0";
  let w_cnt = 0;
  const chkbox1 = document.getElementsByName("chkbox1");
  // const radio1 = document.getElementsByName("radio1");
  const table1 = document.getElementById("table1");
  let w_textKey = "";
  let w_textMemo = "";

  for (let i = 0; i < chkbox1.length; i = i + 1) {
    if (chkbox1[i].checked) {
      if (w_cnt === 0) {
        w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
        w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
        // return (w_sel = "1");
      }
      w_cnt = w_cnt + 1;
    }
  }

  document.getElementById("textKey").value = w_textKey;
  document.getElementById("textMemo").value = w_textMemo;

  if (mode === "select") {
    if (w_cnt === 1) {
      return w_cnt;
    } else {
      showWarning("１つ選択（select）してください。");
      return 0;
    }
  }

  if (mode === "del") {
    if (w_cnt >= 1) {
      return w_cnt;
    } else {
      showWarning("１つ以上選択（select）してください。");
      return 0;
    }
  }
}

function viewStorage() {
  const list = document.getElementById("list");

  while (list.rows[0]) list.deleteRow(0);

  for (let i = 0; i < localStorage.length; i = i + 1) {
    let w_key = localStorage.key(i);

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
    td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
  }

  $("#table1").tablesorter({
    sortList: [[1, 0]],
  });

  $("#table1").trigger("update");
}

// SweetAlert2 preset functions
function showError(message, options = {}) {
  return Swal.fire({
    title: "Memo app",
    html: message,
    type: "error",
    allowOutsideClick: false,
    ...options,
  });
}

function showSuccess(message, options = {}) {
  return Swal.fire({
    title: "Memo app",
    html: message,
    type: "success",
    allowOutsideClick: false,
    ...options,
  });
}

function showConfirm(message, options = {}) {
  return Swal.fire({
    title: "Memo app",
    html: message,
    type: "question",
    showCancelButton: true,
    ...options,
  });
}

function showWarning(message, options = {}) {
  return Swal.fire({
    title: "Memo app",
    html: message,
    type: "warning",
    allowOutsideClick: false,
    ...options,
  });
}
