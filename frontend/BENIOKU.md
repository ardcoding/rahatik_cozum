# 📊 Rahat IK Ödev

Bu proje; dış bir REST API'den düzenli olarak veri çekip PostgreSQL veritabanına kaydeden, React + Redux Toolkit + MUI + TailwindCSS ile modern bir frontend üzerinden açılır-kapanır tablo şeklinde gösterilen bir fullstack projesidir.

---

İçindekiler

- [Teknolojiler](#-teknolojiler)  
- [Kurulum](#-kurulum)  
  - [Depoyu klonla](#1-klonla)  
  - [Backend kurulumu](#2-backend-kurulumu)  
  - [Frontend kurulumu](#3-frontend-kurulumu)  
- [Nasıl çalışır?](#-nasıl-çalışır)  
- [Kullanılan Redux Yapısı](#-kullanılan-redux-yapısı)  
- [Örnek API](#-örnek-api)  
- [Karşılaşılan Sorunlar & Çözümler](#-karşılaşılan-sorunlar--çözümler)  
- [Canlı Demo](#-canlı-demo)  
- [İletişim](#-iletişim)  
- [Lisans](#-lisans)  

---

## 🚀 Teknolojiler

* **Backend:** Node.js (Express), node-cron, Axios, PostgreSQL (pg)
* **Frontend:** React, Redux Toolkit, MUI (Material UI), TailwindCSS, React Icons
* **API:** REST API Basic Auth + Bearer Token

---

## 📦 Kurulum

### 1️⃣ Klonla

```
git clone github.com/ardcoding/rahatik
cd rahatik
```

---

### 2️⃣ Backend kurulumu

```
cd backend
npm install
```

`config/.env` dosyasını aşağıdaki şekilde düzenleyin:

```
DATABASE_USERNAME=
HOSTNAME=
DATABASE=
DATABASE_PASSWORD=
DATABASE_PORT=
AUTH_USERNAME=
AUTH_PASSWORD=

```

Veritabanını oluşturun ve tablo şemasını hazırlayın:

```sql
CREATE TABLE records (
  id SERIAL PRIMARY KEY,
  hesap_kodu VARCHAR(50) UNIQUE NOT NULL,
  hesap_adi TEXT,
  tipi CHAR(1),
  ust_hesap_id INTEGER,
  borc NUMERIC,
  alacak NUMERIC,
  borc_sistem NUMERIC,
  alacak_sistem NUMERIC,
  borc_doviz NUMERIC,
  alacak_doviz NUMERIC,
  borc_islem_doviz NUMERIC,
  alacak_islem_doviz NUMERIC,
  birim_adi VARCHAR(50),
  bakiye_sekli INTEGER,
  aktif BOOLEAN,
  dovizkod INTEGER
);
```

Backend’i başlat:

```
npm start
```

---

### 3️⃣ Frontend kurulumu

```
cd frontend
npm install
```

Tailwind’i kur:

```
npx tailwindcss init -p
```

`tailwind.config.js` dosyasına şunları ekle:

```js
content: ["./src/**/*.{js,jsx,ts,tsx}"],
```

`index.css` içine:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Frontend’i başlat:

```
npm start
```

---

## ⚙️ Nasıl Çalışır?

✅ **1. Token Alma:**
Backend cron job ya da `/api/fetch-now` endpointi ile API’den token alır.

✅ **2. Veri Çekme:**
Alınan token ile veri endpointine `PATCH` atılır, JSON formatlı veri gelir.

✅ **3. Senkronizasyon:**
Gelen kayıtlar PostgreSQL’de güncellenir veya eklenir. Veri her 5 dakikada bir cron job ile otomatik güncellenir.

✅ **4. Görüntüleme:**
Frontend, `/api/records` endpointinden kayıtları çeker, `groupRecords` fonksiyonu ile 3 kırılıma ayırır.
MUI `Collapse Table` ile açılır-kapanır grup satırları hazırlanır.
Tailwind ile responsive stil verilir.

---

## 📂 Kullanılan Redux Yapısı

* `features/records/recordsSlice.js`

  * `fetchRecords` thunk → API’den çeker.
  * `groupRecords` → slice içinde gruplar.
  * `records` → raw data.
  * `groups` → gruplu veri.

---

## 🔍 Örnek API

* **GET** `/api/records` → JSON tüm kayıtlar
* **GET** `/api/fetch-now` → Anlık API senkronizasyonu

---

## ⚡ Karşılaşılan Sorunlar & Çözümler
1️⃣ SyntaxError: Cannot use import statement outside a module
Sorun:
Node.js ES module (import) desteği için type: "module" eklenmemişti.

Çözüm:
package.json içine:

json
Kopyala
Düzenle
{
  "type": "module"
}
eklendi. Ayrıca .js dosyaları import sözdizimiyle kullanıldı.

2️⃣ certificate has expired Axios SSL Hatası
Sorun:
Dış API’nin SSL sertifikası geçersizdi.

Çözüm:
Geliştirme sırasında geçici olarak NODE_TLS_REJECT_UNAUTHORIZED=0 ortam değişkeni ile devre dışı bırakıldı.

3️⃣ invalid input syntax for type numeric: \"\" PostgreSQL Hatası
Sorun:
API’den gelen sayısal alanlar bazen boş string oluyordu. PostgreSQL NUMERIC alana '' atanamaz.

Çözüm:
Her borç ve alacak gibi sayısal alan Number(value) || 0 şeklinde güvenli dönüştürüldü.

4️⃣ Veri Gruplamada Hesaplama Hataları
Sorun:
groupRecords fonksiyonunda kırılım toplamları iki kere hesaplanıyordu. İlk tanımlamada grup toplamı atanıyor, else içinde tekrar ekleniyordu.

Çözüm:
Gruplama fonksiyonu sadeleştirildi: Yalnızca child kayıtları dönerken toplanacak şekilde düzeltildi.

5️⃣ Collapse Table ile Girinti ve Satır Yönetimi
Sorun:
MUI Collapse tablosunda açılır satırlar karışıyordu ve üst grup tekrar alt kırılımda görünüyordu.

Çözüm:

groupRecords fonksiyonu parent tekrarını önleyecek şekilde düzenlendi.

Her kırılım key mantığıyla expanded state’e unique tanımlandı.

MUI Collapse + Box ile girinti marginLeft ile sağlandı.

6️⃣ CORS Hatası
Sorun:
Frontend → Backend isteklerinde CORS engeli alındı.

Çözüm:
express backend’de:

js
Kopyala
Düzenle
import cors from 'cors';
app.use(cors());
eklenerek tüm kaynaklardan istek kabul edildi.

7️⃣ Tailwind ve MUI Çakışması
Sorun:
Tailwind ile MUI bileşenlerinde stil önceliği çakışıyordu.

Çözüm:
Tailwind temel layout ve spacing için, MUI ise tablo ve ikonlar için kullanıldı. Çakışan className ve sx alanlarına dikkat edildi.

---

## ✅ Canlı Demo

> 

---

## 📞 İletişim

Her türlü geri dönüşler için,

```
Mail: ahmmetdoraa@gmail.com
```

---

## 🪪 Lisans

MIT

Bu proje RAHAT IK Ödevi Çözümü için lisanslanmıştır. Proje geliştirme için kullanılmıştır.