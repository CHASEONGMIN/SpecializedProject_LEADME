import itertools
from collections import Counter
import numpy as np
from pandas.core.frame import DataFrame
from six import b
from parse import load_dataframes
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import folium

def set_config():
    # 폰트, 그래프 색상 설정
    font_list = fm.findSystemFonts(fontpaths=None, fontext="ttf")
    if any(["notosanscjk" in font.lower() for font in font_list]):
        plt.rcParams["font.family"] = "Noto Sans CJK JP"
    else:
        if not any(["malgun" in font.lower() for font in font_list]):
            raise Exception(
                "Font missing, please install Noto Sans CJK or Malgun Gothic. If you're using ubuntu, try `sudo apt install fonts-noto-cjk`"
            )

        plt.rcParams["font.family"] = "Malgun Gothic"

    sns.set_palette(sns.color_palette("Spectral"))
    plt.rc("xtick", labelsize=6)


def show_store_categories_graph(dataframes, n=100):
    """
    Tutorial: 전체 음식점의 상위 `n`개 카테고리 분포를 그래프로 나타냅니다.
    """

    stores = dataframes["stores"]

    # 모든 카테고리를 1차원 리스트에 저장합니다
    # 카테고리의 형태 ex) 아구찜|포장마차 / 디저트카페|디저트
    categories = stores.category.apply(lambda c: c.split("|"))
    # chain() => 간단히 말해서 (iterables)를 연결하는 것. 
    categories = itertools.chain.from_iterable(categories)

    # 카테고리가 없는 경우 / 상위 카테고리를 추출합니다
    categories = filter(lambda c: c != "", categories)
    categories_count = Counter(list(categories))
    best_categories = categories_count.most_common(n=n)
    df = pd.DataFrame(best_categories, columns=["category", "count"]).sort_values(
        by=["count"], ascending=False
    )

    # 그래프로 나타냅니다
    # 막대그래프를 그리는 barplot 
    chart = sns.barplot(x="category", y="count", data=df)
    # x축의 글자조정(rotation => 글자 회전)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 카테고리 분포")
    plt.show()


def show_store_review_distribution_graph(dataframes):
    """
    Req. 1-3-1 전체 음식점의 리뷰 개수 분포를 그래프로 나타냅니다. 
    """
    # 리뷰가 몇개인 음식점이 몇개인지?

    # 가게마다 리뷰의 개수를 그래프로 나타냄?

    stores = dataframes["stores"]
    # 리뷰의 개수 20개이상
    stores_reviews = stores[stores["review_cnt"] > 20]
    df = pd.DataFrame(stores_reviews, columns=["store_name", "review_cnt"]).sort_values(
        by=["review_cnt"], ascending=False
    )

    chart = sns.barplot(x="store_name", y="review_cnt", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 리뷰 개수")
    plt.show()


def show_store_average_ratings_graph(dataframes):
    """
    Req. 1-3-2 각 음식점의 평균 평점을 그래프로 나타냅니다.
    """
    stores = dataframes["stores"]
    reviews = dataframes["reviews"]
    stores_reviews = pd.merge(
        stores, reviews, left_on="id", right_on="store"
    )

    # 리뷰의 개수가 30개 미만인 음식점 거르기
    stores_reviews = stores_reviews[stores_reviews["review_cnt"] >= 30]
    scores_group = stores_reviews.groupby(["store", "store_name"])

    # 평균평점구하기
    scores = scores_group.mean()
    df = pd.DataFrame(scores, columns=["score"]).sort_values(
        by=["score"], ascending=False
    )

    chart = sns.barplot(x="store_name", y="score", data=df.reset_index())
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    # y축 범위 설정
    plt.yticks(np.arange(1, 6, 0.2))
    plt.title("음식점 평균 평점")
    plt.show()
    


def show_user_review_distribution_graph(dataframes):
    """
    Req. 1-3-3 전체 유저의 리뷰 개수 분포를 그래프로 나타냅니다.
    """
    stores_user_reviews = dataframes["reviews"]
    users = dataframes['users']
    
    # user개수 세기
    freq = stores_user_reviews['user'].value_counts()

    # 인덱스 초기화하고
    user_freq = freq.reset_index()
    # 합치기위해서 columns이름 바꿔줌
    user_freq.rename(columns = {'index': 'id', 'user': 'counts'}, inplace=True)

    # user랑 리뷰개수 합치고
    user_reviews = pd.merge(users, user_freq)
    # counts의 따라 재정렬
    user_reviews = user_reviews.sort_values(by=["counts"], ascending=False)
    # 중복값 삭제해줌
    user_reviews.drop_duplicates(inplace=True)
    user = user_reviews[user_reviews["counts"] >= 100]
    df = pd.DataFrame(user, columns=["id", "counts"]).sort_values(
        by=["counts"], ascending=False
    )

    chart = sns.barplot(x="id", y="counts", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("유저 리뷰 개수")
    plt.show()

def show_user_age_gender_distribution_graph(dataframes):
    """
    Req. 1-3-4 전체 유저의 성별/나이대 분포를 그래프로 나타냅니다.
    """
    # 인구통계처럼 그리고 싶은데,,?
    users = dataframes["users"]

    genders = users.groupby(["gender"])
    genders = genders.size().reset_index(name='gender_counts')
    print(genders)

    ages = users.groupby(["age"])
    ages = ages.size().reset_index(name='ages_counts')
    print(ages)

    df1 = pd.DataFrame(genders, columns=["gender", "gender_counts"]).sort_values(
        by=["gender_counts"], ascending=False
    )

    df2 = pd.DataFrame(ages, columns=["age", "ages_counts"]).sort_values(
        by=["ages_counts"], ascending=False
    )

    # 그래프로 나타냅니다
    fig, ax = plt.subplots(ncols=2)
    chart1 = sns.barplot(x="gender", y="gender_counts", data=df1, ax=ax[0])
    chart1.set_xticklabels(chart1.get_xticklabels(), rotation=45)
    fig

    chart2 = sns.barplot(x="age", y="ages_counts", data=df2, ax=ax[1])
    chart2.set_xticklabels(chart2.get_xticklabels(), rotation=45)
    fig
    plt.title("전체 유저의 성별/나이대 분포")
    plt.show()


def show_stores_distribution_graph(dataframes):
    """
    Req. 1-3-5 각 음식점의 위치 분포를 지도에 나타냅니다.
    """
    stores = dataframes["stores"]
    # print(stores)
    location = pd.DataFrame(stores, columns=["id", "store_name", "area", "address", "latitude", "longitude"]).sort_values(
        by=["id"], ascending=True
    )
    # 너무 많아서 상위, 하위 50개 자르기
    dfm_top = location.head(50)
    dfm_bottom = location.tail(50)
    # print(dfm_top)
    # print(dfm_bottom)
    map_osm = folium.Map(location=[35.166804, 129.083479], zoom_start=12) # 지도 초기 위치
    for store in dfm_top.index:
        lat = dfm_top.loc[store, 'latitude']
        long = dfm_top.loc[store, 'longitude']
        folium.CircleMarker([lat, long], popup=dfm_top.loc[store, 'store_name'], color = 'blue', fill=True).add_to(map_osm)
    
    # 지도 저장
    map_osm.save('./store_map_top.html')

def main():
    set_config()
    data = load_dataframes()
    show_store_categories_graph(data)
    show_store_review_distribution_graph(data)
    show_store_average_ratings_graph(data)
    show_user_review_distribution_graph(data)
    show_user_age_gender_distribution_graph(data)
    show_stores_distribution_graph(data)
if __name__ == "__main__":
    main()
