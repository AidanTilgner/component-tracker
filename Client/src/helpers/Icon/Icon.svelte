<script>
  export let name,
    focusable = false,
    width = "50",
    height = "50",
    color = "#2256f2";
  let icons = [
    {
      name: "menu",
      box: [35, 24],
      svg: `
          <rect width="35" height="4" rx="2" fill="${color}"/>
          <path d="M10 22C10 20.8954 10.8954 20 12 20H33C34.1046 20 35 20.8954 35 22C35 23.1046 34.1046 24 33 24H12C10.8954 24 10 23.1046 10 22Z" fill="${color}"/>
          <path d="M0 12C0 10.8954 0.895431 10 2 10H33C34.1046 10 35 10.8954 35 12C35 13.1046 34.1046 14 33 14H2C0.89543 14 0 13.1046 0 12Z" fill="${color}"/>
          `,
    },
    {
      name: "close",
      box: [28, 28],
      svg: `
          <rect y="13" x="8" width="2.5" height="23" rx="2" transform="rotate(-45 0 14)" fill="${color}"/>
          <rect y="10" x="27.5" width="2.5" height="23" rx="2" transform="rotate(45 30 0)" fill="${color}"/>
        `,
    },
    {
      name: "down_arrow",
      box: [12, 7],
      svg: `
          <path d="M5.46967 6.53033C5.76256 6.82322 6.23744 6.82322 6.53033 6.53033L11.3033 1.75736C11.5962 1.46447 11.5962 0.989593 11.3033 0.696699C11.0104 0.403806 10.5355 0.403806 10.2426 0.696699L6 4.93934L1.75736 0.696699C1.46447 0.403806 0.989593 0.403806 0.696699 0.696699C0.403806 0.989593 0.403806 1.46447 0.696699 1.75736L5.46967 6.53033ZM5.25 5V6H6.75V5H5.25Z" fill="${color}"/>
        `,
    },
    {
      name: "up_arrow",
      box: [16, 9], // maybe 16 9
      svg: `
          <path d="M8.70711 0.292893C8.31658 -0.097631 7.68342 -0.097631 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 2V1H7V2H9Z" fill="${color}"/>
        `,
    },
    {
      name: "left_arrow",
      box: [8, 13],
      svg: `
        <path d="M0.381282 5.88128C0.0395728 6.22299 0.0395728 6.77701 0.381282 7.11872L5.94975 12.6872C6.29146 13.0289 6.84548 13.0289 7.18718 12.6872C7.52889 12.3455 7.52889 11.7915 7.18718 11.4497L2.23744 6.5L7.18718 1.55025C7.52889 1.20854 7.52889 0.654524 7.18718 0.312816C6.84548 -0.028893 6.29146 -0.028893 5.94975 0.312816L0.381282 5.88128ZM2 5.625H1L1 7.375H2L2 5.625Z" fill="${color}"/>
      `,
    },
    {
      name: "right_arrow-long",
      box: [27, 20],
      svg: `
        <path d="M25.8839 10.8839C26.372 10.3957 26.372 9.60427 25.8839 9.11612L17.9289 1.16117C17.4408 0.67301 16.6493 0.67301 16.1612 1.16117C15.673 1.64932 15.673 2.44078 16.1612 2.92893L23.2322 10L16.1612 17.0711C15.673 17.5592 15.673 18.3507 16.1612 18.8388C16.6493 19.327 17.4408 19.327 17.9289 18.8388L25.8839 10.8839ZM0 11.25H25V8.75H0L0 11.25Z" fill="${color}"/>
      `,
    },
    {
      name: "linkedin",
      box: [45, 45],
      svg: `
          <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"/>
          <path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"/>
        `,
    },
    {
      name: "youtube",
      box: [45, 45],
      svg: `
          <rect width="45" height="45" fill="url(#pattern0)"/>
          <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlink:href="#image0_221:139" transform="scale(0.00195312)"/>
          </pattern>
          <image id="image0_221:139" width="512" height="512" xlink:href="data:image/png;base64,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"/>
          </defs>
        `,
    },
    {
      name: "search",
      box: [20, 21],
      svg: `
          <g clip-path="url(#clip0_134:568)">
          <path d="M7.57615 11.9336L0.505076 19.0047C0.22613 19.2836 0.22613 19.7359 0.505076 20.0148C0.784022 20.2938 1.23628 20.2938 1.51523 20.0148L8.5863 12.9438C8.86524 12.6648 8.86524 12.2126 8.5863 11.9336C8.30735 11.6547 7.85509 11.6547 7.57615 11.9336Z" fill="#8C8C8C"/>
          <path d="M12.8571 13.7143C16.4864 13.7143 19.4286 10.7722 19.4286 7.14287C19.4286 3.51357 16.4864 0.571442 12.8571 0.571442C9.22783 0.571442 6.28571 3.51357 6.28571 7.14287C6.28571 10.7722 9.22783 13.7143 12.8571 13.7143Z" stroke="#8C8C8C" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_134:568">
          <rect width="20" height="20.5714" fill="white"/>
          </clipPath>
          </defs>
        `,
    },
    {
      name: "three-dots",
      box: [21, 9],
      svg: `
      <circle cx="2.5" cy="4.5" r="2.5" fill="${color}"/>
      <circle cx="10.5" cy="4.5" r="2.5" fill="${color}"/>
      <circle cx="18.5" cy="4.5" r="2.5" fill="${color}"/>
      `,
    },
    {
      name: "check",
      box: [30, 30],
      svg: `
      <path fill="${color}" d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"/>
      `,
    },
    {
      name: "react-icon",
      box: [48, 48],
      svg: `
      <path fill="#ffffff" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16 c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"/><path fill="#ffffff" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5 c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4 c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9 c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"/><path fill="#ffffff" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19 c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2 c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"/><circle cx="24" cy="24" r="4" fill="#ffffff"/>
      `,
    },
    {
      name: "svelte-icon",
      box: [100, 100],
      svg: `
        <path d="M83.9813 18.125C75.7333 6.24582 57.5 1.34791 45.6958 8.83957L24.8896 22.1562C19.2146 25.7125 15.2813 31.5375 14.1458 38.1208C13.1625 43.6437 16.2104 48.2208 18.8583 53.1375C17.0417 55.8604 13.6167 59.9854 13.0875 63.1646C11.8771 69.8979 13.4667 76.8583 17.4 82.3833C25.7229 94.2625 42.2208 98.5104 54.0229 91.0208L74.675 77.0125C80.35 73.4562 84.2833 67.6312 85.4188 61.0479C86.4021 55.525 85.5709 49.85 82.9229 44.9312C84.7396 42.2083 85.95 39.1812 86.4792 36.0042C87.7646 29.1917 87.9896 23.6479 83.9813 18.125Z" fill="white"/>
        <path d="M40.9167 95.7209C38.7 95.7209 36.4396 95.45 34.1792 94.9021C27.0437 93.1709 20.8042 88.9209 16.6104 82.9354C12.5229 77.1979 10.8917 69.9271 12.1375 62.9938C12.5875 60.2917 14.8792 57.0834 16.7229 54.5063C17.0812 54.0063 17.4229 53.5271 17.7312 53.0813C17.5208 52.6959 17.3083 52.3104 17.0979 51.9292C14.7229 47.6271 12.2667 43.1792 13.1979 37.9521C14.3771 31.1104 18.4542 25.0521 24.3792 21.3396L45.1792 8.02711C57.1542 0.427106 76.0208 4.97502 84.7687 17.5667C88.8458 23.1875 88.8104 28.8542 87.4292 36.1709C86.9062 39.2979 85.7667 42.2584 84.0396 44.9834C86.5354 49.8938 87.3646 55.6334 86.3708 61.2167C85.1917 68.0521 81.1229 74.1063 75.2042 77.8188L54.5667 91.8188C54.5583 91.825 54.55 91.8292 54.5417 91.8354C50.4917 94.4042 45.8062 95.7209 40.9167 95.7209ZM58.7875 6.22086C54.2729 6.22086 49.8937 7.31877 46.2167 9.65211L25.4125 22.9667C19.9437 26.3938 16.1854 31.975 15.0979 38.2834C14.2854 42.8438 16.4729 46.8042 18.7854 50.9959C19.0937 51.5542 19.4042 52.1146 19.7083 52.6813C19.8771 52.9959 19.8583 53.3771 19.6625 53.6729C19.2625 54.2729 18.7917 54.9313 18.2937 55.6292C16.5667 58.0438 14.4187 61.05 14.0396 63.3229C12.8812 69.7604 14.3937 76.5 18.1875 81.823C26.4229 93.5771 42.2562 97.3354 53.4958 90.2125L74.1354 76.2125C74.1458 76.2063 74.1542 76.2 74.1646 76.1938C79.6271 72.7709 83.3833 67.1896 84.4708 60.8834C85.425 55.5292 84.5729 50.0271 82.075 45.3875C81.9062 45.0729 81.925 44.6917 82.1208 44.3959C83.875 41.7646 85.0208 38.8875 85.5292 35.8438C85.5312 35.8375 85.5312 35.8292 85.5333 35.8229C86.8542 28.825 86.8979 23.7792 83.2021 18.6917C83.1979 18.6854 83.1937 18.6813 83.1896 18.675C77.6979 10.7625 67.9667 6.22086 58.7875 6.22086Z" fill="white"/>
        <path d="M43.6958 83.5167C36.9625 85.2563 29.925 82.6083 25.9916 76.9333C23.5708 73.6042 22.6625 69.4437 23.3437 65.3563C23.4958 64.675 23.6458 64.0708 23.7979 63.3896L24.3312 61.4354L25.3896 62.1917C27.8854 64.0083 30.4562 66.1125 33.4062 67.0208L34.1625 67.2479L34.0875 68.0042C34.0125 69.0625 34.3146 70.1979 34.9187 71.1063C36.1291 72.8458 39.2646 73.8146 41.3083 73.2854C41.7625 73.1333 42.2167 72.9833 42.5937 72.7562L63.8229 59.8771C64.8812 59.1958 65.0042 57.3646 65.2312 56.1542C65.4583 54.9437 65.1562 53.6583 64.475 52.6729C63.2646 50.9333 61.1458 50.1771 59.1021 50.7062C58.6479 50.8583 57.2375 51.3583 56.8583 51.5854L48.9146 56.6542C47.6292 57.4854 46.1916 58.0917 44.6771 58.4708C37.9437 60.2104 30.9062 57.5625 26.9729 51.8875C24.6271 48.5583 23.7833 42.9083 24.5396 38.8229C25.2208 34.8875 27.6416 31.3333 31.0458 29.2146L51.7125 17.4625C52.9979 16.6312 54.4354 16.025 55.95 15.5708C62.6833 13.8312 69.7208 16.4792 73.6542 22.1542C76.075 25.4833 76.9833 29.6437 76.3021 33.7312C76.15 34.4125 76 35.0167 75.7729 35.6979L75.7021 35.9208C75.55 36.4083 74.9667 36.6021 74.5521 36.3062L74.3333 36.15C71.8375 34.3333 69.1125 32.9729 66.1625 32.0646L65.4062 31.8375L65.4812 31.0812C65.5562 30.0229 65.2542 28.8875 64.65 27.9792C63.4396 26.2396 61.1333 25.6417 59.0917 26.1708C58.6375 26.3229 58.1833 26.4729 57.8062 26.7L37.2625 39.7812C36.2041 40.4625 35.5229 41.4458 35.2958 42.6562C35.0687 43.8667 35.3708 45.1521 36.0521 46.1375C37.2625 47.8771 39.3812 48.6333 41.425 48.1042C41.8792 47.9521 42.3333 47.8021 42.7104 47.575L50.6541 42.5062C51.9396 41.675 53.3771 41.0688 54.8916 40.6146C61.625 38.875 69.4458 39.4625 73.3812 45.1375C75.8021 48.4667 77.4 54.0062 76.7187 58.0917C76.0375 62.0271 73.6166 65.5812 70.2125 67.7L47.9312 81.625C46.6458 82.4583 45.2083 83.0625 43.6958 83.5167Z" fill="#FF3E00"/>
        <path d="M39.5438 85.0125C37.4792 85.0125 35.425 84.6437 33.4584 83.9104C30.1063 82.6604 27.2521 80.4417 25.2063 77.4937C22.6563 73.9833 21.6563 69.6167 22.3938 65.2C22.3959 65.1833 22.4 65.1667 22.4042 65.15C22.4813 64.8062 22.5563 64.4792 22.6334 64.1542C22.7084 63.8375 22.7834 63.5187 22.8584 63.1812C22.8625 63.1667 22.8646 63.1521 22.8688 63.1375L23.4021 61.1833C23.4854 60.8792 23.7125 60.6354 24.0084 60.5292C24.3063 60.4229 24.6354 60.4688 24.8917 60.6521L25.95 61.4083C26.3042 61.6646 26.65 61.9229 27.0021 62.1812C29.1167 63.7479 31.3042 65.3667 33.6896 66.1L34.4396 66.325C34.8813 66.4583 35.1688 66.8854 35.1229 67.3437L35.0479 68.0854C34.9917 68.925 35.2417 69.8521 35.7209 70.5708C36.6354 71.8833 39.3125 72.7875 41.0354 72.3583C41.4396 72.2229 41.8188 72.0958 42.0979 71.9271L52.0938 64.9312L63.3104 59.0604C63.8375 58.7104 64.0354 57.4896 64.1792 56.5979C64.2146 56.3792 64.2479 56.1708 64.2854 55.9771C64.4604 55.0479 64.2354 54.0187 63.6833 53.2229C62.7208 51.8396 61.0333 51.2167 59.3771 51.6333C58.6604 51.8729 57.5958 52.2771 57.3667 52.4083L49.4354 57.4687C48.0875 58.3417 46.5646 58.9937 44.9146 59.4062C41.4313 60.3062 37.8063 60.1187 34.4417 58.8625C31.0854 57.6104 29.0209 55.0271 26.975 52.075C24.3042 48.2833 22.8584 42.6271 23.5959 38.6458C24.3146 34.4896 26.9125 30.6521 30.5417 28.3937C30.5521 28.3875 30.5625 28.3812 30.575 28.375L51.2188 16.6354C52.4938 15.8146 53.9542 15.1625 55.6792 14.6458C55.6917 14.6417 55.7021 14.6396 55.7146 14.6354C59.2042 13.7333 62.8292 13.9208 66.1958 15.1771C69.5479 16.4271 72.4021 18.6458 74.4479 21.5937C76.9979 25.1042 77.9979 29.4708 77.2604 33.8875C77.2583 33.9042 77.2542 33.9208 77.25 33.9375C77.1125 34.5521 76.95 35.2292 76.6938 36L76.6292 36.2062C76.4667 36.7292 76.0583 37.1458 75.5396 37.3187C75.0208 37.4937 74.4438 37.4062 73.9979 37.0896L73.7792 36.9333C71.3729 35.1833 68.7208 33.8562 65.8854 32.9854L65.1354 32.7604C64.6938 32.6271 64.4063 32.2 64.4521 31.7417L64.5271 31C64.5854 30.1479 64.3396 29.2437 63.8542 28.5146C62.9542 27.2208 61.15 26.6458 59.3708 27.0958C58.9708 27.2292 58.5958 27.3562 58.3188 27.5208L47.375 33.8583L37.7854 40.5937C36.9438 41.1354 36.425 41.8896 36.2479 42.8333C36.0729 43.7625 36.2979 44.7917 36.85 45.5875C37.8125 46.9708 39.5021 47.5958 41.1563 47.1771C41.5542 47.0437 41.9292 46.9167 42.2083 46.7521L49.9229 42.425C51.1979 41.6 52.6646 40.9437 54.4021 40.4229C54.4146 40.4187 54.3896 40.425 54.4021 40.4229C58.1813 39.4458 61.9229 39.2521 65.1563 39.8812C68.9563 40.6187 71.9979 42.4979 73.9542 45.3104C76.6792 49.0625 78.3688 54.075 77.675 58.2479C76.9521 62.4229 74.3542 66.2583 70.7271 68.5167L48.4479 82.4396C47.1813 83.2604 45.7146 83.9167 43.9771 84.4375C43.9646 84.4417 43.9542 84.4437 43.9417 84.4479C42.4875 84.825 41.0125 85.0125 39.5438 85.0125ZM24.2917 65.5417C23.6479 69.4396 24.5292 73.2833 26.7729 76.3667C26.7771 76.3729 26.7813 76.3792 26.7854 76.3833C30.4771 81.7083 37.1667 84.1979 43.4375 82.5854C44.9896 82.1187 46.2896 81.5375 47.4104 80.8125L69.7042 66.8812C72.875 64.9083 75.1438 61.5604 75.7729 57.925C76.3813 54.2792 74.8021 49.7542 72.3875 46.4354C72.3833 46.4292 72.3792 46.4229 72.375 46.4167C67.6667 39.625 57.8625 41.5208 54.9375 42.275C53.3854 42.7417 52.0875 43.3208 50.9646 44.0479L43.2334 48.3875C43.225 48.3917 43.2188 48.3979 43.2104 48.4021C42.7417 48.6833 42.2292 48.8542 41.7333 49.0187C41.7125 49.025 41.6917 49.0312 41.6709 49.0375C39.2167 49.6729 36.7021 48.7521 35.2646 46.6875C34.4125 45.4583 34.0813 43.925 34.3521 42.4792C34.6271 41.0146 35.4542 39.8 36.7459 38.9708L46.3563 32.2208L57.2938 25.8875C57.3 25.8833 57.3083 25.8792 57.3146 25.875C57.7833 25.5937 58.2958 25.4229 58.7917 25.2583C58.8125 25.2521 58.8354 25.2458 58.8563 25.2396C61.425 24.5729 64.0729 25.4542 65.4479 27.4312C66.1792 28.5271 66.5396 29.875 66.45 31.1458C69.4813 32.0792 72.3146 33.4937 74.8771 35.3521C75.0854 34.7187 75.2208 34.1708 75.3604 33.5479C76.0042 29.65 75.1229 25.8062 72.8792 22.7229C72.875 22.7167 72.8708 22.7104 72.8667 22.7042C69.175 17.3792 62.4854 14.8896 56.2125 16.5021C54.6604 16.9687 53.3604 17.5479 52.2396 18.275C52.225 18.2854 52.2083 18.2937 52.1917 18.3042L31.5417 30.0458C28.3813 32.0187 26.1188 35.3625 25.4917 38.9917C24.7292 43.1146 26.4959 48.0562 28.5542 50.975C32.2542 56.3104 38.1604 59.1625 44.4375 57.5417C45.8896 57.1792 47.2167 56.6104 48.3917 55.85L56.3417 50.7771C56.35 50.7729 56.3563 50.7667 56.3646 50.7625C56.9333 50.4208 58.7813 49.8021 58.8 49.7958C58.8209 49.7896 58.8417 49.7833 58.8625 49.7771C61.3167 49.1417 63.8313 50.0625 65.2688 52.1271C66.1208 53.3562 66.4521 54.8896 66.1813 56.3354C66.1479 56.5146 66.1167 56.7083 66.0833 56.9083C65.8688 58.2333 65.6042 59.8812 64.3458 60.6917C64.3396 60.6958 64.3313 60.7 64.325 60.7042L53.1125 66.8708L43.0938 73.5833C42.6208 73.8667 42.1104 74.0375 41.6146 74.2021C41.5938 74.2083 41.5709 74.2167 41.5479 74.2208C39.0459 74.8687 35.5083 73.6479 34.125 71.6604C33.3938 70.5646 33.0334 69.2167 33.1229 67.9458C30.4167 67.1125 28.0959 65.3937 25.8521 63.7333C25.5313 63.4958 25.2125 63.2604 24.8938 63.0271L24.7313 63.6229C24.6563 63.9583 24.5813 64.2771 24.5063 64.5958C24.4354 64.9062 24.3646 65.2146 24.2917 65.5417Z" fill="white"/>
      `,
    },
  ];
  let displayIcon = icons.find((icon) => icon.name === name);
</script>

<svg
  class={$$props.className}
  {focusable}
  {width}
  {height}
  viewBox="0 0 {displayIcon.box[0]} {displayIcon.box[1]}"
>
  {@html displayIcon.svg}
</svg>

<style>
  /* svg {
    border: 1px solid blue;
  } */
</style>
