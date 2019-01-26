WITH
	batch AS (
		SELECT
			DISTINCT
			  (
				name
			  ),
			rarity,
			colors,
			type,
			text,
			COUNT(1) AS card
		FROM cards
		WHERE
			edition_id IN ('RIX', 'XLN')
		GROUP BY
			name,
			rarity,
			colors,
			type,
			text
	),
	matches AS (
		SELECT
			colors,
			(
				CASE
					WHEN type LIKE('%Vampire%') THEN 'Vampire'
					WHEN type LIKE('%Dinosaur%') THEN 'Dinosaur'
					WHEN type LIKE('%Merfolk%') THEN 'Merfolk'
					WHEN type LIKE('%Pirate%') THEN 'Pirate'
				END
			) AS type,
			rarity,
			card
		FROM batch
		WHERE
			type LIKE('%Vampire%')
			OR type LIKE('%Pirate%')
			OR type LIKE('%Dinosaur%')
			OR type LIKE('%Merfolk%')
-- 			name LIKE('%Elf%')
-- 			OR type LIKE('%Elf%')
-- 			OR text LIKE('%Elf%')
-- 			OR text LIKE('elf')
	),
	color_distribution_across_rarity AS (
		SELECT
			colors,
			type,
			SUM(CASE WHEN rarity='Special' THEN card ELSE NULL END) AS special,
			SUM(CASE WHEN rarity='Mythic Rare' THEN card ELSE NULL END) AS mythic,
			SUM(CASE WHEN rarity='Rare' THEN card ELSE NULL END) AS rare,
			SUM(CASE WHEN rarity='Uncommon' THEN card ELSE NULL END) AS uncommon,
			SUM(CASE WHEN rarity='Common' THEN card ELSE NULL END) AS common
		FROM matches
		GROUP BY
			colors,
			type
	),
	type_distribution_across_rarity AS (
		SELECT
			type,
			colors,
-- 			SUM(CASE WHEN rarity='Special' THEN card ELSE NULL END) AS special,
			SUM(CASE WHEN rarity='Mythic Rare' THEN card ELSE NULL END) AS mythic,
			SUM(CASE WHEN rarity='Rare' THEN card ELSE NULL END) AS rare,
			SUM(CASE WHEN rarity='Uncommon' THEN card ELSE NULL END) AS uncommon,
			SUM(CASE WHEN rarity='Common' THEN card ELSE NULL END) AS common
		FROM matches
		GROUP BY
			type,
		colors
	),
	colors_from_matches AS (
		SELECT
			DISTINCT (colors)
		FROM matches
	),
	type_distribution_across_color AS (
		SELECT
			type,
			SUM(CASE WHEN colors='["White","Blue","Black","Red","Green"]' THEN card ELSE NULL END) AS white_blue_black_red_green,
			SUM(CASE WHEN colors='["Blue"]' THEN card ELSE NULL END) AS blue,
			SUM(CASE WHEN colors='["White","Black","Green"]' THEN card ELSE NULL END) AS white_black_green,
			SUM(CASE WHEN colors='["White","Red","Green"]' THEN card ELSE NULL END) AS white_red_green,
			SUM(CASE WHEN colors='["Green"]' THEN card ELSE NULL END) AS green,
			SUM(CASE WHEN colors='["White","Green"]' THEN card ELSE NULL END) AS white_green,
			SUM(CASE WHEN colors='["Black","Red","Green"]' THEN card ELSE NULL END) AS black_red_green,
			SUM(CASE WHEN colors='["White","Black","Red","Green"]' THEN card ELSE NULL END) AS white_black_red_green,
			SUM(CASE WHEN colors='["White","Blue","Black","Green"]' THEN card ELSE NULL END) AS white_blue_black_green,
			SUM(CASE WHEN colors='["White","Red"]' THEN card ELSE NULL END) AS white_red,
			SUM(CASE WHEN colors='["White"]' THEN card ELSE NULL END) AS white,
			SUM(CASE WHEN colors='["White","Blue","Green"]' THEN card ELSE NULL END) AS white_blue_green,
			SUM(CASE WHEN colors='["Blue","Red"]' THEN card ELSE NULL END) AS blue_red,
			SUM(CASE WHEN colors='["White","Blue"]' THEN card ELSE NULL END) AS white_blue,
			SUM(CASE WHEN colors='["White","Blue","Red"]' THEN card ELSE NULL END) AS white_blue_red,
			SUM(CASE WHEN colors='["White","Blue","Black"]' THEN card ELSE NULL END) AS white_blue_black,
			SUM(CASE WHEN colors='["Black"]' THEN card ELSE NULL END) AS black,
			SUM(CASE WHEN colors='["Blue","Black","Red","Green"]' THEN card ELSE NULL END) AS blue_black_red_green,
			SUM(CASE WHEN colors='["White","Black","Red"]' THEN card ELSE NULL END) AS white_black_red,
			SUM(CASE WHEN colors='["Blue","Black","Green"]' THEN card ELSE NULL END) AS blue_black_green,
			SUM(CASE WHEN colors='["White","Black"]' THEN card ELSE NULL END) AS white_black,
			SUM(CASE WHEN colors='["Blue","Black"]' THEN card ELSE NULL END) AS blue_black,
			SUM(CASE WHEN colors='["Red","Green"]' THEN card ELSE NULL END) AS red_green,
			SUM(CASE WHEN colors='["Black","Green"]' THEN card ELSE NULL END) AS black_green,
			SUM(CASE WHEN colors='["Black","Red"]' THEN card ELSE NULL END) AS black_red,
			SUM(CASE WHEN colors='["Blue","Black","Red"]' THEN card ELSE NULL END) AS blue_black_red,
			SUM(CASE WHEN colors='["White","Blue","Red","Green"]' THEN card ELSE NULL END) AS white_blue_red_green,
			SUM(CASE WHEN colors='["Blue","Green"]' THEN card ELSE NULL END) AS blue_green,
			SUM(CASE WHEN colors='["Red"]' THEN card ELSE NULL END) AS red,
			SUM(CASE WHEN colors='["White","Blue","Black","Red"]' THEN card ELSE NULL END) AS white_blue_black_red,
			SUM(CASE WHEN colors='["Blue","Red","Green"]' THEN card ELSE NULL END) AS blue_red_green,
			SUM(CASE WHEN colors='["Colorless"]' THEN card ELSE NULL END) AS colorless
		FROM matches
		GROUP BY
			type
	)

SELECT
	*
FROM color_distribution_across_rarity
-- WHERE
-- 	type NOT LIKE('%Land%')
-- 	AND type NOT LIKE('%Sorcery%')
-- 	AND type NOT LIKE('%Instant%')
-- 	AND type NOT LIKE('%Planeswalker%')
ORDER BY
	type DESC

WITH
	matches AS (
		SELECT
			DISTINCT
			  (
				name
			  ),
			rarity,
			colors,
			type,
			text
		FROM cards
		WHERE
-- 			edition_id IN ('RIX', 'XLN')
			legality LIKE ('%{"format":"Standard","legality":"Legal"}%')
		GROUP BY
			name,
			rarity,
			colors,
			type,
			text
-- 		HAVING
-- 			name LIKE('%Vampire%')
-- 			OR type LIKE('%Vampire%')
-- 			OR text LIKE('%Vampire%')
-- 			OR text LIKE('%vampire%')
-- 			OR name LIKE('%Pirate%')
-- 			OR type LIKE('%Pirate%')
-- 			OR text LIKE('%Pirate%')
-- 			OR text LIKE('%pirate%')
-- 			OR name LIKE('%Dinosaur%')
-- 			OR type LIKE('%Dinosaur%')
-- 			OR text LIKE('%Dinosaur%')
-- 			OR text LIKE('%dinosaur%')
-- 			OR name LIKE('%Merfolk%')
-- 			OR type LIKE('%Merfolk%')
-- 			OR text LIKE('%Merfolk%')
-- 			OR text LIKE('%merfolk%')
	),
	matches_summary AS (
		SELECT
			*,
			COUNT(1) AS card
		FROM matches
		GROUP BY
			name,
			rarity,
			colors,
			type,
			text
	),
	color_distribution_across_rarity AS (
		SELECT
			colors,
-- 			type,
-- 			SUM(CASE WHEN rarity='Special' THEN card ELSE NULL END) AS special,
			SUM(CASE WHEN rarity='Mythic Rare' THEN card ELSE NULL END) AS mythic,
			SUM(CASE WHEN rarity='Rare' THEN card ELSE NULL END) AS rare,
			SUM(CASE WHEN rarity='Uncommon' THEN card ELSE NULL END) AS uncommon,
			SUM(CASE WHEN rarity='Common' THEN card ELSE NULL END) AS common,
			SUM(card) AS total_count
		FROM matches_summary
		GROUP BY
			colors
-- 			type
	),
	type_distribution_across_rarity AS (
		SELECT
			type,
			colors,
-- 			SUM(CASE WHEN rarity='Special' THEN card ELSE NULL END) AS special,
			SUM(CASE WHEN rarity='Mythic Rare' THEN card ELSE NULL END) AS mythic,
			SUM(CASE WHEN rarity='Rare' THEN card ELSE NULL END) AS rare,
			SUM(CASE WHEN rarity='Uncommon' THEN card ELSE NULL END) AS uncommon,
			SUM(CASE WHEN rarity='Common' THEN card ELSE NULL END) AS common
		FROM matches_summary
		GROUP BY
			type,
			colors
	),
	colors_from_matches AS (
		SELECT
			DISTINCT (colors)
		FROM matches_summary
	),
	type_distribution_across_colors AS (
		SELECT
			type,
			SUM(CASE WHEN colors='["White","Blue","Black","Red","Green"]' THEN card ELSE NULL END) AS white_blue_black_red_green,
			SUM(CASE WHEN colors='["Blue"]' THEN card ELSE NULL END) AS blue,
			SUM(CASE WHEN colors='["White","Black","Green"]' THEN card ELSE NULL END) AS white_black_green,
			SUM(CASE WHEN colors='["White","Red","Green"]' THEN card ELSE NULL END) AS white_red_green,
			SUM(CASE WHEN colors='["Green"]' THEN card ELSE NULL END) AS green,
			SUM(CASE WHEN colors='["White","Green"]' THEN card ELSE NULL END) AS white_green,
			SUM(CASE WHEN colors='["Black","Red","Green"]' THEN card ELSE NULL END) AS black_red_green,
			SUM(CASE WHEN colors='["White","Black","Red","Green"]' THEN card ELSE NULL END) AS white_black_red_green,
			SUM(CASE WHEN colors='["White","Blue","Black","Green"]' THEN card ELSE NULL END) AS white_blue_black_green,
			SUM(CASE WHEN colors='["White","Red"]' THEN card ELSE NULL END) AS white_red,
			SUM(CASE WHEN colors='["White"]' THEN card ELSE NULL END) AS white,
			SUM(CASE WHEN colors='["White","Blue","Green"]' THEN card ELSE NULL END) AS white_blue_green,
			SUM(CASE WHEN colors='["Blue","Red"]' THEN card ELSE NULL END) AS blue_red,
			SUM(CASE WHEN colors='["White","Blue"]' THEN card ELSE NULL END) AS white_blue,
			SUM(CASE WHEN colors='["White","Blue","Red"]' THEN card ELSE NULL END) AS white_blue_red,
			SUM(CASE WHEN colors='["White","Blue","Black"]' THEN card ELSE NULL END) AS white_blue_black,
			SUM(CASE WHEN colors='["Black"]' THEN card ELSE NULL END) AS black,
			SUM(CASE WHEN colors='["Blue","Black","Red","Green"]' THEN card ELSE NULL END) AS blue_black_red_green,
			SUM(CASE WHEN colors='["White","Black","Red"]' THEN card ELSE NULL END) AS white_black_red,
			SUM(CASE WHEN colors='["Blue","Black","Green"]' THEN card ELSE NULL END) AS blue_black_green,
			SUM(CASE WHEN colors='["White","Black"]' THEN card ELSE NULL END) AS white_black,
			SUM(CASE WHEN colors='["Blue","Black"]' THEN card ELSE NULL END) AS blue_black,
			SUM(CASE WHEN colors='["Red","Green"]' THEN card ELSE NULL END) AS red_green,
			SUM(CASE WHEN colors='["Black","Green"]' THEN card ELSE NULL END) AS black_green,
			SUM(CASE WHEN colors='["Black","Red"]' THEN card ELSE NULL END) AS black_red,
			SUM(CASE WHEN colors='["Blue","Black","Red"]' THEN card ELSE NULL END) AS blue_black_red,
			SUM(CASE WHEN colors='["White","Blue","Red","Green"]' THEN card ELSE NULL END) AS white_blue_red_green,
			SUM(CASE WHEN colors='["Blue","Green"]' THEN card ELSE NULL END) AS blue_green,
			SUM(CASE WHEN colors='["Red"]' THEN card ELSE NULL END) AS red,
			SUM(CASE WHEN colors='["White","Blue","Black","Red"]' THEN card ELSE NULL END) AS white_blue_black_red,
			SUM(CASE WHEN colors='["Blue","Red","Green"]' THEN card ELSE NULL END) AS blue_red_green,
			SUM(CASE WHEN colors='["Colorless"]' THEN card ELSE NULL END) AS colorless,
			SUM(card) AS total_count
		FROM matches_summary
		GROUP BY
			type
	)

SELECT
-- 	type,
-- 	green
	*
FROM color_distribution_across_rarity
-- WHERE
-- 	type NOT LIKE('%Basic Land%')
-- ORDER BY
-- 	total_count DESC