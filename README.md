# 🏃‍♂️ Daily WhatsApp Reminder Bot

Un bot de **WhatsApp** hecho con **Node.js** que envía **un recordatorio diario automático** a un grupo, mencionando a todos sus participantes.  
Perfecto para motivar, molestar amistosamente o crear hábitos 😅

---

## 🚀 Qué hace

- Se conecta a WhatsApp Web usando `whatsapp-web.js`
- Guarda la sesión (QR solo una vez)
- Detecta todos los participantes del grupo
- Construye menciones reales (no fake `@texto`)
- Envía **todos los días a la misma hora** un mensaje programado
- Respeta zonas horarias 🇦🇷

---

## 🧠 Tecnologías usadas

- **Node.js**
- **whatsapp-web.js**
- **node-cron**
- **qrcode-terminal**
- **Puppeteer**

---

## 📦 Instalación

```bash
git clone <repo-url>
cd daily_wsp
npm install
```

---

## ▶️ Uso
```bash
node index.js
```
Al iniciar:
1- Se mostrará un QR
2- Escanealo con WhatsApp
3- La sesión se guarda automáticamente
4- El bot queda listo 🎉

---

## ⏰ Mensaje programado

El bot envía el mensaje todos los días a las 23:03 (hora Argentina):
```bash
cron.schedule(
  "03 23 * * *",
  () => {
    client.sendMessage(
      "ID_DEL_GRUPO@g.us",
      "Mensaje + menciones",
      { mentions }
    );
  },
  { timezone: "America/Argentina/Buenos_Aires" }
);
```
📌 El mensaje menciona a todos los participantes del grupo.

---

## 👥 Cómo funcionan las menciones

- WhatsApp NO usa usernames
- Las menciones funcionan solo si se pasa:
```bash
{ mentions: ["id_real@c.us", "id@lid"] }
```
- El bot obtiene los IDs reales desde:
```bash
  chat.participants
```
✔️ Compatible con grupos modernos (@lid y @c.us)

---

## ⚠️ Advertencias importantes
- ❌ No usar para spam
- ❌ No abusar de menciones masivas
- ⚠️ WhatsApp puede banear si detecta abuso
- ✅ Uso recomendado: grupos chicos y mensajes humanos
