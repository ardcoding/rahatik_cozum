export function groupRecords(records) {
  const groups = {};

  records.forEach((rec) => {
    const first3 = rec.hesap_kodu?.slice(0, 3) ?? '';
    const first5 = rec.hesap_kodu?.slice(0, 6) ?? '';
    const first8 = rec.hesap_kodu?.slice(0, 11) ?? '';

    if (!groups[first3]) groups[first3] = { children: {} };
    if (!groups[first3].children[first5]) groups[first3].children[first5] = { children: {} };
    if (first5 !== first8) {
      if (!groups[first3].children[first5].children[first8]) {
        groups[first3].children[first5].children[first8] = {
          ...rec,
          borc: Number(rec.borc) || 0,
        };
      } else {
        groups[first3].children[first5].children[first8].borc += Number(rec.borc) || 0;
      }
    }
  });

  Object.entries(groups).forEach(([_, g3]) => {
    let g3borc = 0;

    Object.entries(g3.children).forEach(([_, g5]) => {
      let g5borc = 0;

      Object.entries(g5.children).forEach(([_, rec]) => {
        g5borc += rec.borc;
      });

      g5.borc = g5borc;
      g3borc += g5borc;
    });

    g3.borc = g3borc;
  });

  return groups;
}
