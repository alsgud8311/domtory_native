## 깃 관리 전략

우리는 빠른 배포와 관리를 위한 Github flow 방식을 차용합니다.

![](https://i.imgur.com/5vUOvVG.png)
![](https://i.imgur.com/lsQY3fE.png)

### Master 브랜치

항상 **Stable**한 상태 유지.(**모든 커밋은 언제 배포하든 문제 없어야하고, 언제든 브랜치를 새로 만들어도 문제가 없어야** 한다.) Main 브랜치의 모든 커밋은 **빌드가 되고, 테스트를 통과**해얗함

### Feature 브랜치

- **새로운 기능**을 개발할 때마다 생성하기
- 별도로 Hotfix 브랜치를 관리하지 않으며, **버그 수정도 Topic 브랜치**에서 진행하기
  ⭐️⭐️**Feature 브랜치의 이름은 기능을 설명하는 명확한 이름으로 네이밍**⭐️⭐️
- Topic 브랜치의 커밋은 기능이 완성되지 않았더라도 **꾸준히 Push** 하기
- 기능 개발이 완료되었을 떄나, 아이디어 공유 등이 필요하다고 판단될 경우에 PR 개설. 모든 팀원들은 코드리뷰 및 토론에 참여하기
- 토론과 리뷰가 끝나고 코드에 문제가 없다면  **동의(Approve)의 표시로 LGTM(Looks Good To ME) 남겨놓기**
- PR을 개설할 때는 어떤 기능이 추가되었는지 적기 + 코드에 주석을 달아 보기 쉽도록 작성하기

| 코드리뷰 약어            | 의미                                 |
| :----------------------- | :----------------------------------- |
| LGTM(Looks Good To me)   | 코드 괜찮음. 통과                    |
| IMO(In My Opinion)       | 코드 리뷰에서 제안할 때              |
| PTAL(Please Take A Look) | PR 보지 않는 팀원 봐달라고 요청할 때 |

## 커밋 컨벤션

### ⭐️⭐️⭐️커밋 컨벤션 준수하기⭐️⭐️⭐️

**사소한 작업도 꼭 커밋하는 습관을 들이자!**

| 태그이름 | 설명                         |
| -------- | ---------------------------- |
| Feat     | 새로운 기능 추가             |
| Fix      | 버그 픽스                    |
| Design   | CSS 및 사용자 UI 디자인 변경 |
| Refactor | 리팩토링                     |
| Comment  | 설명 주석 추가               |
| Remove   | 파일 삭제 작업만 수행        |
| Rename   | 파일 이름 수정만 수행        |

## 폴더 구조
```
📦src
┣ 📂assets -> 로컬에서 관리하는 이미지, 비디오, 아이콘 등
┣ 📂components -> 컴포넌트들(스크린 별로 폴더 생성 후 사용)
┣ 📂constants -> 런타임동안 바뀌지 않는 변수를 저장
┣ 📂screens -> 컴포넌트들을 종합한 스크린(페이지). 중첩된 스크린의 경우 폴더 구조를 통해 계층적으로 구분
┣ 📂server -> API 호출 및 데이터 관리
┣ 📂hooks -> 훅이 있을 경우 별도 저장
┣ 📂store -> 스토어 관리에 사용
┗ 📂utils -> 일반적으로 많이 쓰는 function 등을 별도 저장
```
