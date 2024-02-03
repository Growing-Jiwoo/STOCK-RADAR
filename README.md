# 💡 STOCK-RADAR : 주식 거래 서비스

## 목차

- [설치 및 실행](#설치-및-실행)
- [프로젝트 소개](#프로젝트-소개)
- [기능 소개](#기능-소개)
- [기술 스택](#기술-스택)
- [회고](#회고)
  <br><br>

---

## 설치 및 실행

### 설치

#### React - `npm install`

#### Django - `pip install -r requirements.txt`

### 실행

#### React - `npm start`

#### Django - `python manage.py runserver`

<br>

## 프로젝트 소개

<p align="center"><img width="300" alt="image" src="https://github.com/Growing-Jiwoo/STOCK-RADAR/assets/115076308/b9fb6adb-499f-45f4-bdc1-19b8a64da1ab"></p>

### 💡 주식 정보를 찾고, 매매 및 매수를 수행하며 거래 기록을 확인할 수 있는 웹 서비스입니다.

1. [첫 화면] - 발행된 전체 주식과 최근 조회한 주식 리스트를 조회할 수 있습니다.
   - 전체 주식 조회 : 발행된 전체 주식에 대한 시가, 현재 주가, 현재 주가에 대한 +-%, 어제 종가를 조회할 수 있습니다.
   - 최근 조회 주식 : 최근 조회했던 주식을 5개까지 조회할 수 있습니다.
2. [주식 상세 조회] - 주식 상세 조회 페이지에선 주식의 차트 및 커뮤니티, 호가, 보유중인 내 주식을 조회할 수 있고 매수, 매도를 할 수 있습니다.
   - 차트 : 조회한 주식의 1일 3일 7일 30일 단위로 차트 데이터를 확인할 수 있으며 해당 기간동안의 상한가, 하한가를 조회할 수 있고 차트 마우스 오버 시 5분 단위의 가격 정보를 조회할 수 있습니다.
   - 호가 : 조회한 주식의 당일 상한가, 하한가를 조회할 수 있고 현재 주가의 +- 0.5퍼 기준으로의 주가를 조회할 수 있습니다.
   - 보유중인 내 주식 : 조회한 주식의 거래 내역, 매수 평균가, 보유 수량, 총 수익률, 투자 원금를 조회할 수 있고 물타기 계산기를 사용할 수 있습니다.
     - 물타기 계산기 : 조회한 주식의 현재 주가를 기준으로 추가 매수할 경우 변화하는 예상 평균가를 확인할 수 있고 원하는 수량 만큼의 매수가 가능합니다.
   - 매수 : 매수 시 조회한 주식의 현재 주가, 수량 선택, 수량 선택 시 총 구매 금액을 확인할 수 있습니다.
   - 매도 : 매도 시 조회한 주식의 현재 주가, 보유중인 수량, 수량 선택, 수량 선택 시 총 수익 금액을 확인할 수 있습니다.
   - 커뮤니티 : 조회한 주식에 대해서 댓글 생성, 수정, 삭제가 가능합니다.
3. [내 정보 조회] - 보유중인 전체 주식의 수익률, 매수/매도 내역, 보유중인 주식 조회를 할 수 있습니다.
   - 매수/매도 내역 : 전체 주식에 대해서 매수/매도했던 전체 내역을 조회할 수 있습니다.
   - 보유 주식 조회 : 보유중인 주식에 대한 차트, 보유 수량, 투자 원금, 수익률, 1주당 평균가를 리스트로 조회할 수 있습니다.

---

<br />

## 기능 소개
### 로그인

<p align="center"><img width="600" height="300" src="https://github.com/Growing-Jiwoo/RealTime-Trading-Site/assets/115076308/be6f1b5e-7eb9-4e89-b79e-c50d5de0ff2d"></p>

<br />

### 주식 전체 조회, 최근 본 주식 리스트

- 발행된 전체 주식에 대한 시가, 현재 주가, 현재 주가에 대한 +-%, 어제 종가를 조회할 수 있습니다.
- 최근 조회했던 주식을 5개까지 조회할 수 있습니다.

<p align="center"><img width="600" height="300" src="https://github.com/Growing-Jiwoo/RealTime-Trading-Site/assets/115076308/7ce4e48e-aa05-41b8-a5c2-cadf5e60ece0"></p>

<br />

### 주식 상세 조회 (차트)

- 조회한 주식의 1일 3일 7일 30일 단위로 차트 데이터를 확인할 수 있습니다.
- 선택한 기간동안의 상한가, 하한가를 조회할 수 있습니다.
- 차트 마우스 오버 시 5분 단위로 생성된 가격 정보를 조회할 수 있습니다.

<p align="center"><img width="600" height="300" src="https://github.com/Growing-Jiwoo/RealTime-Trading-Site/assets/115076308/d4bf9f10-e3d3-4564-be59-41f65c2c298e"></p>

<br />

### 주식 상세 조회 (내 주식)
- 조회한 주식의 거래 내역, 매수 평균가, 보유 수량, 총 수익률, 투자 원금를 조회할 수 있습니다.
- 물타기 계산기를 사용할 수 있습니다.
  
<p align="center"><img width="600" height="300" src="https://github.com/Growing-Jiwoo/RealTime-Trading-Site/assets/115076308/1b308e26-d5a5-40d4-b5aa-ddae3a06d6e1"></p>

<br />

### 물타기 계산기

- 조회한 주식의 현재 주가를 기준으로 추가 매수할 경우 변화하는 예상 평균가를 확인할 수 있고 원하는 수량 만큼의 매수가 가능합니다.

<p align="center"><img width="600" height="300" src="https://github.com/Growing-Jiwoo/RealTime-Trading-Site/assets/115076308/be015e5e-e8e4-4b7b-9b9c-3970cdad8d9f"></p>

<br />

### 주식 매수/매도

- 매수 시 조회한 주식의 현재 주가, 수량 선택, 수량 선택 시 총 구매 금액을 확인할 수 있고 주식 매수가 가능합니다.
- 매도 시 조회한 주식의 현재 주가, 보유중인 수량, 수량 선택, 수량 선택 시 총 수익 금액을 확인할 수 있고 주식 매도가 가능합니다.

<p align="center"><img width="600" height="300" src="https://github.com/Growing-Jiwoo/RealTime-Trading-Site/assets/115076308/a557361b-8d4f-4d6f-b9cd-7ebf1b268ab2"></p>

<br />

### 호가 조회

- 조회한 주식의 당일 상한가, 하한가를 조회할 수 있고 현재 주가의 +- 0.5퍼 기준으로의 주가를 조회할 수 있습니다.

<p align="center"><img width="600" height="300" src="https://github.com/Growing-Jiwoo/RealTime-Trading-Site/assets/115076308/3872729e-ab28-4175-8476-8dfbe29a3e8d"></p>

<br />

### 커뮤니티 (댓글)

- 조회한 주식에 대해서 댓글 생성, 수정, 삭제가 가능합니다.

<p align="center"><img width="600" height="300" src="https://github.com/Growing-Jiwoo/RealTime-Trading-Site/assets/115076308/b949a22f-6942-4aea-a544-1cb855f77315"></p>

<br />

### 내 정보 조회
- 보유중인 전체 주식의 수익률을 조회할 수 있습니다.
- 보유중인 전체 주식에 대해서 매수/매도했던 전체 내역을 조회할 수 있습니다.
- 보유중인 각 주식에 대한 차트, 보유 수량, 투자 원금, 수익률, 1주당 평균가를 리스트로 조회할 수 있습니다.
  
<p align="center"><img width="600" height="300" src="https://github.com/Growing-Jiwoo/RealTime-Trading-Site/assets/115076308/21416baf-5c48-4ffe-afaf-b5d6b719441b"></p>

<br />

## 기술 스택

[Client] - `React` `Typescript` `recoil` `React-Query` `styled-components` `echarts` `react-modal` `react-hook-form`

[SERVER] - `Django` `JWT`

<br /><br />

## 회고
#### https://growing-jiwoo.tistory.com/122

<br />

