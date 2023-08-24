/* eslint-disable prettier/prettier */
const ctx1 = document.getElementById('groupchart');
const ctx = document.getElementById('eventschart');

new Chart(ctx, {
    type: 'bar',
    data: {
      labels: comlabel,
      datasets: [{
        label: 'Comments per month',
        data: comdata,
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'rgba(110, 250, 68,0.1)'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});

// let datas = {
//     labels: grouplabel,
//     datasets: [{
//       label: 'Users per Group',
//       data: groupdata,
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(244,164,96)',
//         'rgb(255,165,0)',
//         'rgb(127,255,0)',
//         'rgb(32,178,170)',
//         'rgb(75,0,130)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
// };

// new Chart(ctx1, {
//     type: 'pie',
//     data: datas
//     // options: {
//     //   scales: {
//     //     y: {
//     //       beginAtZero: true
//     //     }
//     //   }
//     // }
// });

