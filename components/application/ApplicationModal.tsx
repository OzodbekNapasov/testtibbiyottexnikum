"use client";

import { useEffect, useRef } from "react";

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRhArUo_ouPq5hHJf_TuBe8SiMid9LkYsQQBo4_iqf0ab-UGiBm4S32tFO3UdrZt6e/exec';

export function ApplicationModal() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define resetForm first since it's used by closeModal
    const resetForm = () => {
      ['fish', 'yosh', 'tel1', 'tel2', 'jshshir'].forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el) el.value = '';
      });
      const yonalish = document.getElementById('yonalish') as HTMLSelectElement;
      if (yonalish) yonalish.value = '';
      const roziman = document.getElementById('roziman') as HTMLInputElement;
      if (roziman) roziman.checked = false;
      ['attestat', 'idkarta'].forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el) el.value = '';
      });
      ['attName', 'idName'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = 'Fayl tanlanmagan';
      });
      ['attBox', 'idBox'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('has-file');
      });
      const status = document.getElementById('status');
      if (status) status.className = 'status';
      const bar = document.getElementById('progressBar');
      if (bar) bar.style.display = 'none';
      const btn = document.getElementById('submitBtn') as HTMLButtonElement;
      if (btn) {
        btn.disabled = false;
        btn.textContent = '✅ Ariza yuborish';
      }
      const formBody = document.getElementById('formBody');
      const successScreen = document.getElementById('successScreen');
      if (formBody) formBody.style.display = '';
      if (successScreen) successScreen.style.display = 'none';
    };

    // Declare functions on window object for onclick handlers
    (window as any).openModal = () => {
      const overlay = document.getElementById('overlay');
      if (overlay) {
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    };

    (window as any).closeModal = () => {
      const overlay = document.getElementById('overlay');
      if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
        resetForm();
      }
    };

    (window as any).overlayClick = (e: React.MouseEvent) => {
      if (e.target === document.getElementById('overlay')) {
        (window as any).closeModal();
      }
    };

    (window as any).fileChosen = (input: HTMLInputElement, nameId: string, boxId: string) => {
      const file = input.files?.[0];
      const nameEl = document.getElementById(nameId);
      const boxEl = document.getElementById(boxId);
      if (nameEl) {
        nameEl.textContent = file ? file.name : 'Fayl tanlanmagan';
      }
      if (boxEl) {
        boxEl.classList.toggle('has-file', !!file);
      }
    };

    (window as any).setStatus = (type: string, msg: string) => {
      const el = document.getElementById('status');
      if (el) {
        el.className = 'status ' + type;
        el.innerHTML = msg;
      }
    };

    (window as any).setProgress = (pct: number | null) => {
      const bar = document.getElementById('progressBar');
      if (pct === null) {
        if (bar) bar.style.display = 'none';
        return;
      }
      if (bar) {
        bar.style.display = 'block';
        const fill = document.getElementById('progressFill');
        if (fill) fill.style.width = pct + '%';
      }
    };

    (window as any).fileToBase64 = (file: File): Promise<{ data: string; type: string; name: string }> => {
      return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res({ data: (r.result as string).split(',')[1], type: file.type, name: file.name });
        r.onerror = rej;
        r.readAsDataURL(file);
      });
    };

    (window as any).submitForm = async () => {
      const fish = (document.getElementById('fish') as HTMLInputElement)?.value.trim();
      const yosh = (document.getElementById('yosh') as HTMLInputElement)?.value.trim();
      const yonalish = (document.getElementById('yonalish') as HTMLSelectElement)?.value;
      const tel1 = (document.getElementById('tel1') as HTMLInputElement)?.value.trim();
      const tel2 = (document.getElementById('tel2') as HTMLInputElement)?.value.trim();
      const jshshir = (document.getElementById('jshshir') as HTMLInputElement)?.value.trim();
      const attFile = (document.getElementById('attestat') as HTMLInputElement)?.files?.[0];
      const idFile = (document.getElementById('idkarta') as HTMLInputElement)?.files?.[0];
      const roziman = (document.getElementById('roziman') as HTMLInputElement)?.checked;

      if (!fish || !yosh || !yonalish || !tel1 || !jshshir || !attFile || !idFile) {
        (window as any).setStatus('err', '⚠️ Barcha majburiy (*) maydonlarni to\'ldiring!');
        return;
      }
      if (jshshir.length !== 14) {
        (window as any).setStatus('err', '⚠️ JSHSHIR 14 ta raqamdan iborat bo\'lishi kerak!');
        return;
      }
      if (!roziman) {
        (window as any).setStatus('err', '⚠️ Rozilik checkboxini belgilang!');
        return;
      }

      const btn = document.getElementById('submitBtn') as HTMLButtonElement;
      if (btn) {
        btn.disabled = true;
        btn.textContent = '⏳ Yuborilmoqda...';
      }
      (window as any).setStatus('load', '📤 Ma\'lumotlar va fayllar yuborilmoqda...');
      (window as any).setProgress(20);

      try {
        const attestat = await (window as any).fileToBase64(attFile);
        const idKarta = await (window as any).fileToBase64(idFile);
        (window as any).setProgress(60);

        await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ fish, yosh, yonalish, tel1, tel2, jshshir, attestat, idKarta })
        });

        (window as any).setProgress(100);
        setTimeout(() => {
          (window as any).setProgress(null);
          const formBody = document.getElementById('formBody');
          const successScreen = document.getElementById('successScreen');
          if (formBody) formBody.style.display = 'none';
          if (successScreen) successScreen.style.display = 'flex';
        }, 400);
      } catch (err: any) {
        (window as any).setStatus('err', '❌ Xatolik: ' + err.message);
        (window as any).setProgress(null);
        if (btn) {
          btn.disabled = false;
          btn.textContent = '✅ Ariza yuborish';
        }
      }
    };

    return () => {
      // Cleanup functions from window object
      delete (window as any).openModal;
      delete (window as any).closeModal;
      delete (window as any).overlayClick;
      delete (window as any).fileChosen;
      delete (window as any).setStatus;
      delete (window as any).setProgress;
      delete (window as any).fileToBase64;
      delete (window as any).submitForm;
    };
  }, []);

  return (
    <div className="application-modal">
      <div className="overlay" id="overlay" onClick={(e) => (window as any).overlayClick(e)}>
        <div className="modal">
          <div className="modal-head">
            <div>
              <h2>Ariza Topshirish</h2>
              <p>Barcha majburiy maydonlarni to'ldiring</p>
            </div>
            <button className="close-btn" onClick={() => (window as any).closeModal()}>✕</button>
          </div>
          <div className="modal-body" id="formBody">
            <div className="divider">Shaxsiy ma'lumotlar</div>
            <div className="field">
              <label>F.I.Sh <span className="req">*</span></label>
              <input type="text" id="fish" placeholder="Familiya Ism Sharif" />
            </div>
            <div className="grid-2">
              <div className="field">
                <label>Yoshi <span className="req">*</span></label>
                <input type="number" id="yosh" placeholder="18" min="14" max="60" />
              </div>
              <div className="field">
                <label>JSHSHIR <span className="req">*</span></label>
                <input type="text" id="jshshir" placeholder="14 ta raqam" maxLength={14} />
              </div>
            </div>
            <div className="divider">Yo'nalish</div>
            <div className="field">
              <label>Yo'nalishni tanlang <span className="req">*</span></label>
              <select id="yonalish">
                <option value="">— Tanlang —</option>
                <option>Hamshiralik ishi (2 yillik)</option>
                <option>Hamshiralik ishi (3 yillik)</option>
                <option>Farmatsiya ishi (3 yillik)</option>
                <option>Davolash ishi / Feldsher (3 yillik)</option>
              </select>
            </div>
            <div className="divider">Aloqa</div>
            <div className="grid-2">
              <div className="field">
                <label>Telefon 1 <span className="req">*</span></label>
                <input type="tel" id="tel1" placeholder="+998 90 000 00 00" />
              </div>
              <div className="field">
                <label>Qo'shimcha telefon</label>
                <input type="tel" id="tel2" placeholder="+998 90 000 00 00" />
              </div>
            </div>
            <div className="divider">Hujjatlar</div>
            <div className="field">
              <label>Attestat <span className="req">*</span></label>
              <label className="upload-box" htmlFor="attestat" id="attBox">
                <span className="upload-icon">🎓</span>
                <div>
                  <div className="upload-text">Attestatni yuklang (JPG, PNG, PDF)</div>
                  <div className="upload-name" id="attName">Fayl tanlanmagan</div>
                </div>
              </label>
              <input type="file" id="attestat" accept="image/*,.pdf" onChange={(e) => (window as any).fileChosen(e.target, 'attName', 'attBox')} />
            </div>
            <div className="field">
              <label>ID karta <span className="req">*</span></label>
              <label className="upload-box" htmlFor="idkarta" id="idBox">
                <span className="upload-icon">🪪</span>
                <div>
                  <div className="upload-text">ID kartani yuklang (JPG, PNG, PDF)</div>
                  <div className="upload-name" id="idName">Fayl tanlanmagan</div>
                </div>
              </label>
              <input type="file" id="idkarta" accept="image/*,.pdf" onChange={(e) => (window as any).fileChosen(e.target, 'idName', 'idBox')} />
            </div>
            <label className="check-row">
              <input type="checkbox" id="roziman" />
              <span>Shaxsiy ma'lumotlarim qabul komissiyasi tomonidan ko'rib chiqilishiga roziman.</span>
            </label>
            <button className="submit-btn" id="submitBtn" onClick={() => (window as any).submitForm()}>✅ Ariza yuborish</button>
            <div className="progress-bar" id="progressBar">
              <div className="progress-fill" id="progressFill"></div>
            </div>
            <div className="status" id="status"></div>
          </div>
          <div className="success-screen" id="successScreen">
            <div className="big">🎉</div>
            <h3>Ariza muvaffaqiyatli yuborildi!</h3>
            <p>Qabul komissiyasi siz bilan tez orada bog'lanadi.</p>
            <button onClick={() => (window as any).closeModal()}>Yopish</button>
          </div>
        </div>
      </div>
    </div>
  );
}
