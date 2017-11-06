<?php 
	//本周推荐
	$url = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
	$result = file_get_contents($url);

	//热门作者
	$url2 = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	$result2 = file_get_contents($url2);

	//转成数组
	$result = json_decode($result,true);
	$result2 = json_decode($result2,true);

	//拼凑数据
	$result3 = array('rec'=>$result,'all'=>$result2);
	echo json_encode($result3);