SELECT * 
FROM article AS a 
JOIN fav AS f ON f.article_id = a.article_id
JOIN member AS m ON  f.member_id = m.member_id
WHERE m.member_id = 1;