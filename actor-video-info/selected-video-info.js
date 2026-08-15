// Curated core set: 5 emotions x 6 actors (F2, F5, F7, F8, M4, M5),
// chosen because their agreement_pairwise score (from the MEOW validation
// dataset) was closest to 2.5 for each actor.
var video_info_selected = [
  {
    "name": "F2_confident",
    "player_embed_url": "https://player.vimeo.com/video/1050606772?h=de2af903a0",
    "width": 1920,
    "height": 1080,
    "actor": "F2",
    "target_emotion": "confident"
  },
  {
    "name": "F2_curious",
    "player_embed_url": "https://player.vimeo.com/video/1050606930?h=ed3bdff391",
    "width": 1920,
    "height": 1080,
    "actor": "F2",
    "target_emotion": "curious"
  },
  {
    "name": "F2_nervous",
    "player_embed_url": "https://player.vimeo.com/video/1050607919?h=2656348727",
    "width": 1920,
    "height": 1080,
    "actor": "F2",
    "target_emotion": "nervous"
  },
  {
    "name": "F2_hateful",
    "player_embed_url": "https://player.vimeo.com/video/1050607648?h=3a1f9c06ff",
    "width": 1920,
    "height": 1080,
    "actor": "F2",
    "target_emotion": "hateful"
  },
  {
    "name": "F2_despondent",
    "player_embed_url": "https://player.vimeo.com/video/1050607080?h=280e6e6088",
    "width": 1920,
    "height": 1080,
    "actor": "F2",
    "target_emotion": "despondent"
  },
  {
    "name": "M5_eager",
    "player_embed_url": "https://player.vimeo.com/video/1050627121?h=86dc8100ae",
    "width": 1920,
    "height": 1080,
    "actor": "M5",
    "target_emotion": "eager"
  },
  {
    "name": "M5_fearful",
    "player_embed_url": "https://player.vimeo.com/video/1050627225?h=6e8c5d8743",
    "width": 1920,
    "height": 1080,
    "actor": "M5",
    "target_emotion": "fearful"
  },
  {
    "name": "M5_guilty",
    "player_embed_url": "https://player.vimeo.com/video/1050627281?h=447095a775",
    "width": 1920,
    "height": 1080,
    "actor": "M5",
    "target_emotion": "guilty"
  },
  {
    "name": "M5_friendly",
    "player_embed_url": "https://player.vimeo.com/video/1050627258?h=f65eeb44a3",
    "width": 1920,
    "height": 1080,
    "actor": "M5",
    "target_emotion": "friendly"
  },
  {
    "name": "M5_contented",
    "player_embed_url": "https://player.vimeo.com/video/1050626924?h=8a166f2da8",
    "width": 1920,
    "height": 1080,
    "actor": "M5",
    "target_emotion": "contented"
  },
  {
    "name": "F7_anxious",
    "player_embed_url": "https://player.vimeo.com/video/1050627968?h=59834639d8",
    "width": 1920,
    "height": 1080,
    "actor": "F7",
    "target_emotion": "anxious"
  },
  {
    "name": "F7_aghast",
    "player_embed_url": "https://player.vimeo.com/video/1050627890?h=d19c1039a9",
    "width": 1920,
    "height": 1080,
    "actor": "F7",
    "target_emotion": "aghast"
  },
  {
    "name": "F7_concerned",
    "player_embed_url": "https://player.vimeo.com/video/1050628111?h=d193152039",
    "width": 1920,
    "height": 1080,
    "actor": "F7",
    "target_emotion": "concerned"
  },
  {
    "name": "F7_threatening",
    "player_embed_url": "https://player.vimeo.com/video/1050633014?h=1d4a22d08e",
    "width": 1920,
    "height": 1080,
    "actor": "F7",
    "target_emotion": "threatening"
  },
  {
    "name": "F7_apologetic",
    "player_embed_url": "https://player.vimeo.com/video/1050627984?h=3c8aabf05d",
    "width": 1920,
    "height": 1080,
    "actor": "F7",
    "target_emotion": "apologetic"
  },
  {
    "name": "F5_grateful",
    "player_embed_url": "https://player.vimeo.com/video/1050634055?h=16b3fc3e80",
    "width": 1920,
    "height": 1080,
    "actor": "F5",
    "target_emotion": "grateful"
  },
  {
    "name": "F5_encouraging",
    "player_embed_url": "https://player.vimeo.com/video/1050633986?h=b36a9c9320",
    "width": 1920,
    "height": 1080,
    "actor": "F5",
    "target_emotion": "encouraging"
  },
  {
    "name": "F5_resentful",
    "player_embed_url": "https://player.vimeo.com/video/1050634258?h=0fb487e6f6",
    "width": 1920,
    "height": 1080,
    "actor": "F5",
    "target_emotion": "resentful"
  },
  {
    "name": "F5_disappointed",
    "player_embed_url": "https://player.vimeo.com/video/1050633917?h=8b38e7a68e",
    "width": 1920,
    "height": 1080,
    "actor": "F5",
    "target_emotion": "disappointed"
  },
  {
    "name": "F5_serious",
    "player_embed_url": "https://player.vimeo.com/video/1050634282?h=88b00d6e5e",
    "width": 1920,
    "height": 1080,
    "actor": "F5",
    "target_emotion": "serious"
  },
  {
    "name": "F8_jealous",
    "player_embed_url": "https://player.vimeo.com/video/1050634869?h=a8b1e50d2a",
    "width": 1920,
    "height": 1080,
    "actor": "F8",
    "target_emotion": "jealous"
  },
  {
    "name": "F8_cautious",
    "player_embed_url": "https://player.vimeo.com/video/1050634507?h=62cae5abfb",
    "width": 1920,
    "height": 1080,
    "actor": "F8",
    "target_emotion": "cautious"
  },
  {
    "name": "F8_confused",
    "player_embed_url": "https://player.vimeo.com/video/1050634537?h=5eaafea20d",
    "width": 1920,
    "height": 1080,
    "actor": "F8",
    "target_emotion": "confused"
  },
  {
    "name": "F8_horrified",
    "player_embed_url": "https://player.vimeo.com/video/1050634758?h=cbd5586059",
    "width": 1920,
    "height": 1080,
    "actor": "F8",
    "target_emotion": "horrified"
  },
  {
    "name": "F8_decisive",
    "player_embed_url": "https://player.vimeo.com/video/1050634575?h=995885523b",
    "width": 1920,
    "height": 1080,
    "actor": "F8",
    "target_emotion": "decisive"
  },
  {
    "name": "M4_reassuring",
    "player_embed_url": "https://player.vimeo.com/video/1050637862?h=1da30035fa",
    "width": 1920,
    "height": 1080,
    "actor": "M4",
    "target_emotion": "reassuring"
  },
  {
    "name": "M4_affectionate",
    "player_embed_url": "https://player.vimeo.com/video/1050637129?h=274e51bd2c",
    "width": 1920,
    "height": 1080,
    "actor": "M4",
    "target_emotion": "affectionate"
  },
  {
    "name": "M4_worried",
    "player_embed_url": "https://player.vimeo.com/video/1050638010?h=117289b1db",
    "width": 1920,
    "height": 1080,
    "actor": "M4",
    "target_emotion": "worried"
  },
  {
    "name": "M4_confused",
    "player_embed_url": "https://player.vimeo.com/video/1050637415?h=19b69d193c",
    "width": 1920,
    "height": 1080,
    "actor": "M4",
    "target_emotion": "confused"
  },
  {
    "name": "M4_anxious",
    "player_embed_url": "https://player.vimeo.com/video/1050637218?h=9e9a0cf717",
    "width": 1920,
    "height": 1080,
    "actor": "M4",
    "target_emotion": "anxious"
  },
]
