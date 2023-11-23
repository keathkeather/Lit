/* global monogatari */

// Define the messages used in the game.
monogatari.action ('message').messages ({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Welcome',
		body: 'This is the Monogatari VN Engine',
		icon: ''
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration ('credits', {

});


// Define the images that will be available on your game's image gallery
monogatari.assets ('gallery', {

});

// Define the music used in the game.
monogatari.assets ('music', {

});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {

});

// Define the videos used in the game.
monogatari.assets ('videos', {

});

// Define the images used in the game.
monogatari.assets ('images', {

});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'g1': 'gubat1.jpg',
	'c1': 'castle1.jpg',
	'c2': 'castle2.jpg',
	'c3': 'castle3.jpg'
});


// Define the Characters
monogatari.characters ({
	'i': {
		name: 'Ibong Adarna',
		color: '#F5A40D',
		directory: 'i',
		sprites: {
			normal: 'ibongadarna.png'
		}
	},
	'r': {
		name: 'Reyna',
		color: '#EE11C6',
		directory: 'r',
		sprites: {
			normal: 'reyna.png'
		}
	},
	'd': {
		name: 'Don Diego',
		color: '#780C95',
		directory: 'd',
		sprites: {
			normal: 'dondiego.png'
		}
	},
	'h': {
		name: 'Hari',
		color: '#10ECE8',
		directory: 'h',
		sprites: {
			normal: 'hari.png'
		}
	},
	'j': {
		name: 'Don Juan',
		color: '#1E5CE0',
		directory: 'j',
		sprites: {
			normal: 'donjuan.png'
		}
	},
	'p': {
		name: 'Don Pedro',
		color: '#C10F4A',
		directory: 'p',
		sprites: {
			normal: 'donpedro.png'
		}
	},
	'm': {
		name: 'Don Pedro',
		color: '#C10F4A',
		directory: 'm',
		sprites: {
			normal: 'manggagamot.png'
		}
	},
	'e': {
		name: 'Ermetanyo',
		color: '#BF3212',
		directory: 'e',
		sprites: {
			normal: 'ermetanyo.png'
		}
	},
	't': {
		name: 'Matanda',
		color: '#C4894A',
		directory: 't',
		sprites: {
			normal: 'pulube.png'
		}
	}
});

monogatari.script ({
	// The game starts here.
	'Start': [
		'show scene #f7f6f6 with fadeIn',
		'show notification Welcome',
		{
			'Input': {
				'Text': 'Ano ang iyong pangalan?',
				'Validation': function (input) {
					return input.trim ().length > 0;
				},
				'Save': function (input) {
					this.storage ({
						player: {
							name: input
						}
					});
					return true;
				},
				'Revert': function () {
					this.storage ({
						player: {
							name: ''
						}
					});
				},
				'Warning': 'Ilagay mo ang iyong pangalan!'
			}
		},
		'show background g1',
		'show character i normal with fadeIn',
		'i Maligayang pagdating sa aking mundo, {{player.name}}!',
		'i Buksan mo ang iyong mga mata upang masilayan ang paglahad ng aking kwento...',
		'i Palawakin mo ang iyong isip sa mga mahiwagang kaaralan sa likod ng mga salita...',
		{
			'Choice': {
				'Dialog': 'i Handa ka na ba?',
				'Yes': {
					'Text': 'Oo',
					'Do': 'jump Yes'
				},
				'No': {
					'Text': 'Hinde',
					'Do': 'jump No'
				}
			}
		}
	],

	'Yes': [
		'hide character i',
		'show background c1 fadeIn 5s',
		'show character r normal at left with fadeIn',
		'r Ano ang sinapit ng aking mahal na hari?',
		'show character m normal at right with fadeIn',
		'm Ikinalulungkot ko pong sabihin sa inyo, mahal na reyna, ngunit nasa masamang kondisyon na ang sakit ng hari.',
		'r Bakit? Ano ang naging sanhi ng kanyang hindi maipaliwanag na sakit?',
		'm Ang sakit ng hari ay dulot ng isang masamang panaginip, kaya ay napuno siya ng kalungkutan at pag-aalala.',
		'r Ano ang dapat naming gawin upang malunasan ang ganitong sakit?',
		'm Isa lamang ang maaaring lunas at iyon ang awit ng isang mahiwagang ibon, ang Ibong Adarna.',
		'm Ang Adarna ay makikita sa punong Piedras Platas sa kabundukan ng Tabor.',
		'hide character r',
		'hide character m',
		'show character p normal at center with fadeIn',
		'p Amang Hari at Inang Reyna, bilang panganay sa tatlong magkakapatid, ako ay maglalakbay upang hanapin at dalhin ang Ibong Adarna.',
		'hide character p',
		'show background c2 fadeIn 5s',
		'show character r normal at left with fadeIn',
		'r Mahigit ilang buwan na ang nakalipas ngunit wala pa ring balita sa aking panganay na si Pedro.',
		'r Ako at ang inyong Amang Hari ay lubusang nag-aalala sa kung anumang sumapit sa kaniya.',
		'show character d normal at right with fadeIn',
		'd Inang Reyna, huwag kang mag-alala.',
		'd Bilang pangalawang panganay ay susunduin ko ang aking kapatid na si Pedro, gayundin ang Ibong Adarnang.',
		'hide character r',
		'hide character d',
		'show background c1 fadeIn 5s',
		'show character j normal at left with fadeIn',
		'j Amang Hari at Inang Reyna, tatlong taon na ang nakalipas ngunit hindi pa rin nakakabalik ang aking mga kapatid.',
		'j Kung inyo pong mararapatin, hahanapin ko ang Ibong Adarna na siyang maglulunas sa sakit ng amang hari.',
		'show character h normal at right with fadeIn',
		'h O, aking bunsong anak, kung ikaw ay mawawala din sa aking tabi at paningin, tiyak na ikakamatay ko iyon.',
		'j Paumanhin Amang Hari, ngunit ako ay aalis pa din upang hanapin ang Ibong Adarna kahit na ano ang mangyari.',
		'h Wala na talaga akong magagawa kung ang desisyon mo ay buo na.',
		'j Bendisyon mo, aking Amang Hari, ang dadalhin kong sandata.',
		'hide character j',
		'hide character h',
		'show background c3 fadeIn 5s',
		'show character t normal at left with fadeIn',
		't Maawa po kayo sa akin, Ginoo. Kung may tirang pagkain kayo ay pwede ko bang mahingi?',
		't Kahit kaunti lamang ay sapat na. Ilang araw na akong hindi nakakain.',
		't Pangako ko sa iyo na papalitan ko ng kahit ano ang iyong maibibigay.',
		'show character j normal at right fadeIn 5s',
		'j Ako nga po ay mayroong natitirang isang tinapay na baon sa aking paglalakbay.',
		'j Ito po at tanggapin ninyo at ako ay busog pa naman.',
		't Maraming salamat, Ginoo! Sana ay ikaw ay ipagpala.',
		't Kung hindi man ninyo mamasamain ay maaari ko bang tanungin kung ano ang inyong pakay?',
		't Baka maaari ko kayong matulungan sa iyong paglalakbay.',
		'j Ako po ay naglalakbay papunta sa kinaroroonan ng Ibong Adarna.',
		'j Ang sabi ng manggagamot ng aming kahariang Berbanya, tanging ang awitin ng ibong Adarna ang makakalunas sa sakit ng aking Amang Hari.',
		't Mahabaging Diyos! Kung gayon ay malaki pang kahirapan ang iyong pagdaraanan.',
		't Kaya ngayon ang bilin ko ay itanim sa inyong puso. Tandaan mo, mag-ingat ka upang ikaw ay hindi maging bato.',
		't Sa pook na natatanaw mo ay maroon kang punong madadatnan na tiyak na kawili-wiling tingnan ngunit huwag ka doong tumigil.',
		't Sa ibaba noon ay bahay ng isang ermitanyo na mayaman sa kaalaman tungkol sa Adarna.',
		't Itong limos mong tinapay ay dalhin mo na dahil mas kakailanganin mo iyan sa iyong malayong paroroonan kaysa sa akin.',
		'j Hindi ko po matatanggap ang tinapay. Naibigay ko na po iyan at ang bawiin pa ay hindi ko magagawa.',
		't Salamat, Ginoo.',
		'hide character t',
		'hide character j',
		'show background g1 fadeIn 5s',
		'show character e normal at left with fadeIn',
		'e Ano ba at mayroong naligaw sa aking lugar...',
		'e Ano ang sadya mo, Ginoo?',
		'show character j normal at right with fadeIn',
		'j Ang pangalan ko po ay Juan.',
		'j Dinanas ko ang mahirap na paglalakbay upang makamit ang matamis na awitin ng Adarna na siyang lunas sa sakit ng aking Amang Hari.',
		'j Ikinababahala ng aking kalooban na baka ikamatay ng aking ama ang sakit nito kapag hindi agarang malunasan.',
		'j Kaya ngayon po ay humihingi sa inyo ng pangaral tungkol sa ibong aking sadya.',
		'j Kung gayon, Ginoong Juan, ikaw ay makinig sa aking sasabihin.',
		'e Ang Ibong Adarna ay may kahiwagaang taglay kaya hindi pa ito nadadakip ninuman.',
		'e Naninirahan ito sa isang punong-kahoy na makinang na kung tawagin ay Piedras Platas.',
		'e Tuwing hatinggabi dumadating at namamahinga ang Adarna mula sa kanyang paglipad sa maraming lugar.',
		'e Bago ito tuluyang maidlip at pitong awit na maganda ang kanyang aawitin. Kapag narinig mo itong awitin ay tiyak na ikaw ay aantukin.',
		'e Upang malabanan ang antok, heto at dalhin mo ang labaha at pitong dayap.',
		'e Sa bawat awit nito, ang iyong palad ay hiwaan at agad mong pigaan ng dayap.',
		'e Pagkatapos ng pitong awitin, ang Adarna ay magbabawas kaya ito ay iyong ilagan upang ikaw ay hind imaging bato tulad ng mga iba.',
		'e Kaya ngayon, ikaw ay pumanhik na dahil lumalalim na ang gabi.',
		'j Salamat sa inyong bigay na labaha at pitong dayap gayundin sa inyong babala.',
		'j Tiyak na sa pagbabalik, ang Ibong Adarna ay akin nang nahuli.',
		'hide character e',
		'hide character j',
		'end'
	],

	'No': [
		'i Sa susunod pagkakataon, {{player.name}}!',
		'end'
	]
});