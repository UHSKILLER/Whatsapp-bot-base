//base criada por Skiller caso vá postar deixe creditos ao canal
//Criador - https://youtube.com/SkillerOfc
//Contato - wa.me/558892594715
//essa const do baileys e a minha const principal caso não va usar algo so retirar
const {
	WAMessageProto,
	MessageOptions,
	WAFlag,
	WANode,
	WAMetric,
	ChatModification,
	DisconectReason,
	MessageTypeProto,
  WAConnection,
	WALocationMessage,
	ReconnectMode,
	WAContextInfo,
	proto,
	ProxyAgent,
	waChatKey,
  MimetypeMap,
  MediaPathMap,
  WAContactMessage,
  WAContactsArrayMessage,
  WAGroupInviteMessage,
  WATextMessage,
  WAMessageContent, 
  WAMessage, 
  BaileysError, 
  WA_MESSAGE_STATUS_TYPE, 
  MediaConnInfo, 
  URL_REGEX, 
  WAUrlInfo, 
  WA_DEFAULT_EPHEMERAL, 
  WAMediaUpload,
	mentionedJid,
	processTime,
	Browser,
  MessageType,
  Presence,
  WA_MESSAGE_STUB_TYPES,
  Mimetype,
	relayWAMessage,
  GroupconfigChange
} = require('@adiwajshing/baileys')

const fs = require('fs')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const moment = require('moment-timezone')
//configs
const config = JSON.parse(fs.readFileSync('./configs/configs.json'))
//este prefix e pra caso queira um unico mais a base e multiprefix
//prefix = config.prefix
verificado = config.verificado

//você pode colocar funções adicionais aqui↓

//by Skiller↑

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color('escaneie o código qr'))
	})

	fs.existsSync('./qrcode.json') && client.loadAuthInfo('./qrcode.json')
	client.on('connecting', () => {
		start('2', 'Conectando base...')
	})
	client.on('open', () => {
		success('2', 'Base conectada')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./qrcode.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
        //local pra add bem vindo etc..
        
        //by skiller
        client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			const content = JSON.stringify(mek.message)
			const type = Object.keys(mek.message)[0]
			const from = mek.key.remoteJid
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
			const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
            const prefix = /^[°•π÷×¶∆£¢€¥®™=|~#%^&.?/\\©^z+*,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~#%^&.?/\\©^z+*,;]/gi) : '.'
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const isCmd = body.startsWith(prefix)
            global.prefix
            
            //para os botões
			selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (mek.message.listResponseMessage && mek.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) && mek.message.listResponseMessage.singleSelectReply.selectedRowId) ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (mek.message.buttonsResponseMessage && mek.message.buttonsResponseMessage.selectedButtonId.startsWith(prefix) && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
            var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'buttonsMessage') && mek.message.buttonsMessage.text ? mek.message.buttonsMessage.text : ''
            //by skiller
			const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			
			//importante
            const botNumber = client.user.jid
            const isGroup = from.endsWith('@g.us')
            const sender = isGroup ? mek.participant : mek.key.remoteJid
			const ownerNumber = [`${config.dono}`]
            const isOwner = ownerNumber.includes(sender) 
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
            pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
            const selo = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": verificado, "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync(`assets/foto.jpg`)} } }
            const args = body.trim().split(/ +/).slice(1)
            const q = args.join(" ")
            //importante

            //consts para funções importantes
            const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const enviar = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			//botão 1
			if (selectedButton == `1`) {
				reply("1 funcionando")
				}
				if (selectedButton == `2`) {
					reply("2 funcionando")
					}
					if (selectedButton == `3`) {
					reply("3 funcionando")
					}
			//botão 2/lista
bselect = (type === 'listResponseMessage') ? mek.message.listResponseMessage.title : ''

if (bselect == 'lista 1') {
	reply("lista 1 funcionando")
	}
	if (bselect == 'lista 2') {
	reply("lista 2 funcionando")
	}
	if (bselect == 'lista 3') {
	reply("lista 3 funcionando")
	}
	
            //Tipos de midias
	        colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
	        //COMANDOS
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mCMD\x1b[1;37m]', time, color(comando), 'de', color(pushname), color(sender.split('@')[0]),'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mCMD\x1b[1;37m]', time, color(comando), 'de', color(pushname), color(sender.split('@')[0]), 'grupo', color(groupName), 'args :', color(args.length))
			//MENSAGENS
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color('Mensagem'), 'de', color(pushname), color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color('Mensagem'), 'de', color(pushname), color(sender.split('@')[0]), 'grupo', color(groupName), 'args :', color(args.length))
			
			switch(comando) {	
            case 'menu':// ver comandos da base
teks = `
BASE FEITA POR SKILLER DEIXE OS CRÉDITOS
https://youtube.com/SkillerOfc

.texto
-exibir texto com e sem verificado
.foto
-exibir foto com legenda
.lista
-exibir lista de comandos
.botao	
-exibir botão clicável
`
client.sendMessage(from, teks, text,{quoted: selo})
break	
			case 'botao': // botão clicavel
			const botao3 = [
{buttonId: '1', buttonText: {displayText: 'botao 1'}, type: 1},
{buttonId: '2', buttonText: {displayText: 'botao 2'}, type: 1},
{buttonId: '3', buttonText: {displayText: 'botao 3'}, type: 1},
]
const botao3Mensagem = {
contentText: `Botão clique!`,
footerText: 'Deixe os créditos ao canal ao menos o link',
buttons: botao3,
headerType: 1
}
client.sendMessage(from, botao3Mensagem, MessageType.buttonsMessage, {quoted: mek})
reply("tudo sobre os botões aqui https://botdewhatsapp.weebly.com/como-colocar-botatildeo-no-bot.html")
break
			break
            case 'lista': // botão de lista
			temporalc = client.prepareMessageFromContent(from,{
"listMessage": {
"title": "Botão de lista",
"description": "Clique nos botões baixo e envie",
"buttonText": "clique aqui",
"listType": "SINGLE_SELECT",
"sections": [
{
"rows": [
{
"title": 'lista 1',
"rowId": ''
},
{
"title": 'lista 2',
"rowId": ''
},
{
"title": 'lista 3',
"rowId": ''
}
]
}
]                    
}
}, {quoted:selo})
client.relayWAMessage(temporalc)
			break
            case 'foto': // enviar foto com legenda
            foto = fs.readFileSync('./assets/foto.jpg') 
			client.sendMessage(from, foto, image,{quoted: mek, caption: 'funcionando', thumbnail: null})
			break
            case 'texto':// texto com verificado e sem
            client.sendMessage(from, 'oi com verificado', text,{quoted: selo})
			reply("oi sem verificado")
			break
			default: 
				if (body == `${prefix}${comando}`) {
hsl = `*⟅❗ *CMD NÃO ENCONTRADO* ❗⟆ *\n\n❯ Olá @${sender.split("@")[0]}!!\n❯ O comando: *${prefix}${comando}*\n❯ Não existe ou digitou errado\n❯ Verifique usando ${prefix}menu ^^`
client.sendMessage(from, hsl, text, {quoted: mek, contextInfo: {mentionedJid: [sender]}})
}
}
} catch (err) {
e = String(err)
if (!e.includes("this.isZero" || !e.match("jid is not defined"))){
const time_error = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
console.log(color(time_error, "yellow"), color("[ ERRO ]", "aqua"), color(e, 'red'))
}
}
})
}
starts()