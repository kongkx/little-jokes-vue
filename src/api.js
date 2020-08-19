function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delay(data, ms) {
  await sleep(ms);
  return data;
}

export const fetchLatestPost = async () => {
  return await delay(
    {
      data: [
        {
          id: 1,
          content:
            "一留学时认识的纽约朋友，在纽约待够了非要到北京玩，一日在商场参与抽奖，看到三等奖LV包包，二等奖笔记本一部，一等奖是神秘大奖，那一个眼红啊，还tm走了运的抽了一等奖，一看奖品，纽约七日游……",
          hasLiked: true
        },
        {
          id: 2,
          content:
            "小时侯有次和哥们一起出去玩，在路上他捡了十块钱，说实话不嫉妒那是假的，于是我让他去小卖部买了些零食花了八块钱，就在我心里有些平衡的时候，结果老板找他四十二。。。",
          hasLiked: false
        },
        {
          id: 3,
          content: `跟女友求婚：“以前我浑浑噩噩，直到遇到你，我才知道我以后该干什么？” 女友啪地一巴掌：“流氓！ ”`,
          hasLiked: false
        }
      ]
    },
    500
  );
};
