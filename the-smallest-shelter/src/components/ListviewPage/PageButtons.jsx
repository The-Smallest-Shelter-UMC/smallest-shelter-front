import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ButtonWrap, PageButton } from '../MyPage/MyLikeAnimal';

export default function PageButtons({ handleCardList, click, pageNum, maxPageNum }) {
  const handlePrevious = async () => {
    if(click === true) {
      console.log(1);
      await axios
        .get(
          `https://sjs.hana-umc.shop/animal/search?page=${pageNum}`,
          {
            headers: {
              'Content-Type': `application/json`,
            },
          },
          {
            params: { page: (pageNum > 0 ? pageNum - 1 : 0) },
          }
        )
        .then((res) => {
          console.log(res.data.result)
          handleCardList(res.data.result.animal);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      console.log(2);
      await axios.get("https://sjs.hana-umc.shop/animals",
          {params: {page: (pageNum > 0 ? pageNum - 1 : 0)}},
          {withCredentials: true}
      ).then((res) => {
          console.log(res.data.result)
          handleCardList(res.data.result.animal);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const handleNext = async () => {
    if(click === true) {
      console.log(3);
      await axios
        .get(
          `https://sjs.hana-umc.shop/animal/search?page=${pageNum}`,
          {
            headers: {
              'Content-Type': `application/json`,
            },
          },
          {
            params: { page: (pageNum < maxPageNum ? pageNum + 1 : maxPageNum) },
          }
        ).then((res) => {
          console.log(res.data.result)
          handleCardList(res.data.result.animal);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      console.log(4);
      await axios
        .get(
          'https://sjs.hana-umc.shop/animals',
          { params: { page: (pageNum < maxPageNum ? pageNum + 1 : maxPageNum) } },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data.result);
          handleCardList(res.data.result.animal);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <ButtonWrap>
      <PageButton onClick={handlePrevious}>이전</PageButton>
      <PageButton onClick={handleNext}>다음</PageButton>
    </ButtonWrap> 
  )
}