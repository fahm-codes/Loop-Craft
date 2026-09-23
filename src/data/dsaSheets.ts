export interface DSACompanyTag {
  name: string;
}

export interface DSAProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  platform: string;
  problemUrl: string;
  solutionUrl?: string;
  videoUrl?: string;
  companyTags?: string[];
}

export interface DSASheetSection {
  id: string;
  title: string;
  order: number;
  problemCount: number;
  problems: DSAProblem[];
}

export interface DSASheet {
  id: string;
  title: string;
  provider: string;
  description: string;
  sourceUrl: string;
  versionInfo: string;
  totalProblems: number;
  sections: DSASheetSection[];
}

export const apnaCollegeSheet: DSASheet = {
  id: 'apna-college',
  title: 'Apna College DSA Sheet',
  provider: 'Apna College',
  description: 'The official 193-problem Alpha DSA Sheet covering all major types of DSA problems for placements.',
  sourceUrl: 'https://dsa.apnacollege.in/',
  versionInfo: 'Verified 193 problems from authoritative source (Jan 2026+)',
  totalProblems: 193,
  sections: [
  {
    id: "TOPIC_5081_ID",
    title: "Day 1 : Array (Part 1)",
    order: 1,
    problemCount: 6,
    problems: [
      {
        id: "majority-element",
        title: "Majority Element",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/majority-element/description/",
        solutionUrl: "https://youtu.be/_xqIp2rj8bo?t=882",
        videoUrl: "https://youtu.be/_xqIp2rj8bo?t=882",
        companyTags: [
          "Amazon",
          "Google"
        ]
      },
      {
        id: "repeat-missing-number",
        title: "Repeat & missing number",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/find-missing-and-repeated-values/description/",
        solutionUrl: "https://youtu.be/0Fxc_jKj2vo?t=1321",
        videoUrl: "https://youtu.be/0Fxc_jKj2vo?t=1321",
        companyTags: [
          "Amazon"
        ]
      },
      {
        id: "merge-2-sorted-array-without-extra-space",
        title: "Merge 2 sorted array without extra space",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/merge-sorted-array/description/",
        solutionUrl: "https://www.youtube.com/watch?v=-1cLK6PaLsQ&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=27",
        videoUrl: "https://www.youtube.com/watch?v=-1cLK6PaLsQ&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=27",
        companyTags: [
          "Quikr",
          "Snapdeal",
          "Synopsys",
          "Zoho",
          "Juniper",
          "Goldman Sachs",
          "Brocade",
          "Amdocs",
          "Networks",
          "Linkedin",
          "Microsoft",
          "Adobe"
        ]
      },
      {
        id: "single-number",
        title: "Single Number",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/single-number/description/",
        solutionUrl: "https://youtu.be/NWg38xWYzEg?t=1393",
        videoUrl: "https://youtu.be/NWg38xWYzEg?t=1393",
        companyTags: [
          "Apple",
          "Amazon",
          "Microsoft",
          "Adobe",
          "Zoho",
          "Airbnb",
          "Qualcomm",
          "Uber",
          "Google",
          "TCS",
          "Meta"
        ]
      },
      {
        id: "stock-buy-sell",
        title: "Stock Buy & Sell",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/",
        solutionUrl: "https://youtu.be/WBzZCm46mFo?t=835",
        videoUrl: "https://youtu.be/WBzZCm46mFo?t=835",
        companyTags: [
          "Walmart",
          "Swiggy",
          "Google",
          "Salesforce",
          "Quikr",
          "Media.Net",
          "Pubmatic",
          "Paytm",
          "Oracle",
          "Ola",
          "Microsoft",
          "MakeMyTrip",
          "Intuit",
          "Goldman Sachs",
          "Flipkart",
          "Amazon",
          "DE Shaw",
          "Directi"
        ]
      },
      {
        id: "pow-xn",
        title: "Pow (x^n)",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/powx-n/description/",
        solutionUrl: "https://youtu.be/WBzZCm46mFo?t=21",
        videoUrl: "https://youtu.be/WBzZCm46mFo?t=21",
        companyTags: [
          "Linkedin",
          "Amazon",
          "Meta",
          "citadel",
          "JP morgan",
          "Oracle",
          "Microsoft",
          "Google",
          "Salesforce"
        ]
      }
    ]
  },
  {
    id: "TOPIC_9842_ID",
    title: "Day 2 : Array (Part 2)",
    order: 2,
    problemCount: 6,
    problems: [
      {
        id: "kadanes-algorithm",
        title: "Kadane's Algorithm",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/maximum-subarray/description/",
        solutionUrl: "https://youtu.be/9IZYqostl2M?t=760",
        videoUrl: "https://youtu.be/9IZYqostl2M?t=760",
        companyTags: [
          "Microsoft",
          "Facebook"
        ]
      },
      {
        id: "container-with-most-water",
        title: "Container with most water",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/container-with-most-water/description/",
        solutionUrl: "https://www.youtube.com/watch?v=EbkMABpP52U",
        videoUrl: "https://www.youtube.com/watch?v=EbkMABpP52U",
        companyTags: [
          "Dunzo",
          "Flipkart"
        ]
      },
      {
        id: "sort-array-of-0s-1s-2s",
        title: "Sort array of 0s, 1s & 2s",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/sort-colors/description/",
        solutionUrl: "https://www.youtube.com/watch?v=J48aGjfjYTI&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=26",
        videoUrl: "https://www.youtube.com/watch?v=J48aGjfjYTI&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=26",
        companyTags: [
          "MakeMyTrip",
          "Amazon",
          "Microsoft"
        ]
      },
      {
        id: "3sum",
        title: "3Sum",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/3sum/description/",
        solutionUrl: "https://www.youtube.com/watch?v=K-RsltkN63w",
        videoUrl: "https://www.youtube.com/watch?v=K-RsltkN63w",
        companyTags: [
          "Times Internet",
          "Snapdeal",
          "Morgan Stanley",
          "Samsung",
          "Microsoft",
          "Amazon",
          "Adobe"
        ]
      },
      {
        id: "4sum",
        title: "4Sum",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/4sum/description/",
        solutionUrl: "https://www.youtube.com/watch?v=X6sL8JTROLY",
        videoUrl: "https://www.youtube.com/watch?v=X6sL8JTROLY",
        companyTags: [
          "Adobe",
          "OYO",
          "Uber",
          "Microsoft",
          "Apple",
          "TCS",
          "Rubrik"
        ]
      },
      {
        id: "search-in-2d-matrix",
        title: "Search in 2d matrix",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/search-a-2d-matrix/description/",
        solutionUrl: "https://youtu.be/LEFFjgt5i6w?t=882",
        videoUrl: "https://youtu.be/LEFFjgt5i6w?t=882",
        companyTags: [
          "Cisco",
          "Uber",
          "Visa",
          "Amazon",
          "Goldman Sachs",
          "Meta",
          "Apple"
        ]
      }
    ]
  },
  {
    id: "TOPIC_4929_ID",
    title: "Day 3 : Array (Part 3)",
    order: 3,
    problemCount: 6,
    problems: [
      {
        id: "next-permutation",
        title: "Next permutation",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/next-permutation/description/",
        solutionUrl: "https://youtu.be/-1cLK6PaLsQ?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&t=967",
        videoUrl: "https://youtu.be/-1cLK6PaLsQ?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&t=967",
        companyTags: [
          "Uber",
          "Goldman Sachs",
          "Adobe"
        ]
      },
      {
        id: "merge-overlapping-intervals",
        title: "Merge overlapping intervals",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/merge-intervals/description/",
        companyTags: [
          "Google"
        ]
      },
      {
        id: "longest-substring-without-repeating",
        title: "Longest substring without repeating",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/",
        companyTags: [
          "Morgan Stanley",
          "Amazon"
        ]
      },
      {
        id: "set-matrix-zeroes",
        title: "Set matrix zeroes",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/set-matrix-zeroes/description/",
        companyTags: [
          "Amazon",
          "Microsoft"
        ]
      },
      {
        id: "word-search",
        title: "Word search",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/word-search/description/",
        companyTags: [
          "Ola",
          "Goldman Sachs",
          "Google"
        ]
      },
      {
        id: "product-of-array-except-self",
        title: "Product of array except self",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/product-of-array-except-self/description/",
        solutionUrl: "https://www.youtube.com/watch?v=TW2m8m_FNJE",
        videoUrl: "https://www.youtube.com/watch?v=TW2m8m_FNJE",
        companyTags: [
          "Ola",
          "Goldman Sachs",
          "Google"
        ]
      }
    ]
  },
  {
    id: "TOPIC_4191_ID",
    title: "Day 4 : Array (Part 4)",
    order: 4,
    problemCount: 5,
    problems: [
      {
        id: "subarray-sum-equals-k",
        title: "Subarray sum equals k",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/subarray-sum-equals-k/description/",
        solutionUrl: "https://youtu.be/KDH4mhFVvHw?si=LGsc4jbq5QZ0QnsO",
        videoUrl: "https://youtu.be/KDH4mhFVvHw?si=LGsc4jbq5QZ0QnsO",
        companyTags: [
          "Microsoft",
          "Snapdeal"
        ]
      },
      {
        id: "find-duplicate",
        title: "Find Duplicate",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
        solutionUrl: "https://youtu.be/0Fxc_jKj2vo?t=2000",
        videoUrl: "https://youtu.be/0Fxc_jKj2vo?t=2000",
        companyTags: [
          "Apple",
          "Goldman Sachs",
          "IBM",
          "Adobe",
          "Yahoo"
        ]
      },
      {
        id: "count-inversions",
        title: "Count Inversions",
        difficulty: "Hard",
        platform: "HackerRank",
        problemUrl: "https://www.hackerrank.com/challenges/ctci-merge-sort/problem",
        solutionUrl: "https://www.youtube.com/watch?v=ynnWDBTdVi0",
        videoUrl: "https://www.youtube.com/watch?v=ynnWDBTdVi0",
        companyTags: [
          "Google",
          "Amazon",
          "Salesforce"
        ]
      },
      {
        id: "spiral-matrix",
        title: "Spiral Matrix",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/spiral-matrix/description/",
        solutionUrl: "https://youtu.be/XMpdvwUObho?si=opqd98A9rm0GiTMG",
        videoUrl: "https://youtu.be/XMpdvwUObho?si=opqd98A9rm0GiTMG",
        companyTags: [
          "Flipkart",
          "Societe generale",
          "Apple"
        ]
      },
      {
        id: "search-in-sorted-matrix-ii",
        title: "Search in Sorted matrix II",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/search-a-2d-matrix-ii/description/",
        solutionUrl: "https://youtu.be/LEFFjgt5i6w?si=E2QRmGvkNcrrv64t",
        videoUrl: "https://youtu.be/LEFFjgt5i6w?si=E2QRmGvkNcrrv64t",
        companyTags: [
          "Microsoft",
          "Oracle",
          "Amazon",
          "Meta",
          "Apple",
          "TCS"
        ]
      }
    ]
  },
  {
    id: "TOPIC_4812_ID",
    title: "Day 5 : Array (Part 5)",
    order: 5,
    problemCount: 4,
    problems: [
      {
        id: "trapping-rainwater",
        title: "Trapping Rainwater",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/trapping-rain-water/description/",
        solutionUrl: "https://www.youtube.com/watch?v=UHHp8USwx4M",
        videoUrl: "https://www.youtube.com/watch?v=UHHp8USwx4M",
        companyTags: [
          "Samsung"
        ]
      },
      {
        id: "sliding-window-maximum",
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/sliding-window-maximum/description/",
        solutionUrl: "https://www.youtube.com/watch?v=XwG5cozqfaM",
        videoUrl: "https://www.youtube.com/watch?v=XwG5cozqfaM",
        companyTags: [
          "Flipkart",
          "Google",
          "Microsoft",
          "Directi",
          "Amazon"
        ]
      },
      {
        id: "largest-rectangle-in-a-histogram",
        title: "Largest Rectangle in a Histogram",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/description/",
        solutionUrl: "https://www.youtube.com/watch?v=ysy1o-QEj3k",
        videoUrl: "https://www.youtube.com/watch?v=ysy1o-QEj3k",
        companyTags: [
          "Meta",
          "Doordash",
          "Google",
          "Myntra",
          "DE Shaw",
          "Adobe",
          "TCS"
        ]
      },
      {
        id: "reverse-pairs",
        title: "Reverse Pairs",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/reverse-pairs/description/",
        companyTags: [
          "Adobe",
          "Apple",
          "Amazon",
          "Uber"
        ]
      }
    ]
  },
  {
    id: "TOPIC_3922_ID",
    title: "Day 6 : Strings (Part 1)",
    order: 6,
    problemCount: 6,
    problems: [
      {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/valid-palindrome/description/",
        solutionUrl: "https://youtu.be/dSRFgEs3a6A?si=WUcnajw8nRAsHlb4",
        videoUrl: "https://youtu.be/dSRFgEs3a6A?si=WUcnajw8nRAsHlb4",
        companyTags: [
          "Morgan Stanley",
          "Amazon",
          "DE Shaw",
          "Facebook",
          "Cisco",
          "FactSet",
          "Paytm",
          "Zoho"
        ]
      },
      {
        id: "valid-anagram",
        title: "Valid Anagram",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/valid-anagram/description/",
        companyTags: [
          "Flipkart",
          "Directi",
          "Media.Net",
          "Google",
          "Adobe",
          "Nagarro"
        ]
      },
      {
        id: "reverse-words-in-string",
        title: "Reverse Words in String",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/reverse-words-in-a-string/description/",
        solutionUrl: "https://youtu.be/RitppzIdMCo?si=bLqHmxS1_C_HlODW",
        videoUrl: "https://youtu.be/RitppzIdMCo?si=bLqHmxS1_C_HlODW",
        companyTags: [
          "TCS",
          "Infosys",
          "Nvidia",
          "Accenture",
          "Google",
          "Zoho",
          "Amazon",
          "Adobe"
        ]
      },
      {
        id: "remove-all-occurrences",
        title: "Remove All Occurrences",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/remove-all-occurrences-of-a-substring/description/",
        solutionUrl: "https://youtu.be/dSRFgEs3a6A?si=OP8Zzi_5VDRzKwju",
        videoUrl: "https://youtu.be/dSRFgEs3a6A?si=OP8Zzi_5VDRzKwju",
        companyTags: [
          "IBM",
          "Microsoft",
          "Google"
        ]
      },
      {
        id: "permutation-in-string",
        title: "Permutation in String",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/permutation-in-string/description/",
        solutionUrl: "https://youtu.be/VXewy91P0S4?si=LpzKLUD9PZf_9Nra",
        videoUrl: "https://youtu.be/VXewy91P0S4?si=LpzKLUD9PZf_9Nra",
        companyTags: [
          "Adobe",
          "Goldman Sachs",
          "Uber"
        ]
      },
      {
        id: "string-compression",
        title: "String Compression",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/string-compression/description/",
        solutionUrl: "https://youtu.be/cAB15h6-sWA?si=eS5enMt3366LGh-7",
        videoUrl: "https://youtu.be/cAB15h6-sWA?si=eS5enMt3366LGh-7",
        companyTags: [
          "GoDaddy",
          "Amazon",
          "Salesforce",
          "Yandex",
          "Pinterest",
          "Meta"
        ]
      }
    ]
  },
  {
    id: "TOPIC_5424_ID",
    title: "Day 7 : Strings (Part 2)",
    order: 7,
    problemCount: 6,
    problems: [
      {
        id: "longest-common-prefix",
        title: "Longest Common Prefix",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/longest-common-prefix/description/",
        companyTags: [
          "Google",
          "Meta",
          "TCS",
          "Infosys",
          "Deloitte",
          "Apple",
          "Microsoft",
          "Amazon"
        ]
      },
      {
        id: "group-anagrams",
        title: "Group Anagrams",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/group-anagrams/description/",
        companyTags: [
          "Google",
          "salesforce",
          "TCS",
          "Nvidia",
          "Meta",
          "Amazon",
          "Oracle",
          "Adobe",
          "PayPal"
        ]
      },
      {
        id: "minimum-window-substring",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/minimum-window-substring/description/",
        companyTags: [
          "MakeMyTrip",
          "Flipkart",
          "Google",
          "Amazon",
          "Airbnb",
          "Atlassian",
          "Microsoft"
        ]
      },
      {
        id: "kmp-algorithm",
        title: "KMP Algorithm",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/longest-happy-prefix/description/",
        companyTags: [
          "Google",
          "Amazon"
        ]
      },
      {
        id: "robin-karp-algorithm",
        title: "Robin-Karp Algorithm",
        difficulty: "Hard",
        platform: "Other",
        problemUrl: "#",
        companyTags: [
          "Microsoft"
        ]
      },
      {
        id: "reverse-words-in-string-2",
        title: "Reverse Words in String",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/reverse-words-in-a-string/description/",
        solutionUrl: "https://www.youtube.com/embed/RitppzIdMCo",
        videoUrl: "https://www.youtube.com/embed/RitppzIdMCo",
        companyTags: [
          "Google",
          "Meta",
          "TCS",
          "Accenture",
          "Infosys",
          "Amazon"
        ]
      }
    ]
  },
  {
    id: "TOPIC_9251_ID",
    title: "Day 8 : Binary Search",
    order: 8,
    problemCount: 7,
    problems: [
      {
        id: "peak-index-in-mountain-array",
        title: "Peak Index in Mountain Array",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/peak-index-in-a-mountain-array/description/",
        solutionUrl: "https://youtu.be/RjxD6UXGlhc?si=cw3-q4z5Z005_R5G",
        videoUrl: "https://youtu.be/RjxD6UXGlhc?si=cw3-q4z5Z005_R5G",
        companyTags: [
          "Google",
          "DE Shaw",
          "Meta",
          "Amazon",
          "Microsoft",
          "Adobe",
          "Accenture",
          "TCS"
        ]
      },
      {
        id: "search-in-rotated-sorted",
        title: "Search in Rotated Sorted Array ",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/description/",
        solutionUrl: "https://youtu.be/6WNZQBHWQJs?si=MihpDB7KJ2aCOO9u",
        videoUrl: "https://youtu.be/6WNZQBHWQJs?si=MihpDB7KJ2aCOO9u",
        companyTags: [
          "MakeMyTrip",
          "Visa",
          "Google",
          "Paytm",
          "Goldman Sachs",
          "Intuit",
          "Hike",
          "Microsoft",
          "DE Shaw",
          "Amazon",
          "Adobe",
          "Flipkart"
        ]
      },
      {
        id: "single-element-in-sorted-array",
        title: "Single Element in Sorted Array",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/single-element-in-a-sorted-array/description/",
        solutionUrl: "https://youtu.be/qsbCBduIs40?si=RDuU5EnemxN6j6mW",
        videoUrl: "https://youtu.be/qsbCBduIs40?si=RDuU5EnemxN6j6mW",
        companyTags: [
          "Infosys",
          "TCS",
          "blinkit",
          "Flipkart",
          "Apple",
          "Meta",
          "Google",
          "Microsoft"
        ]
      },
      {
        id: "aggressive-cows",
        title: "Aggressive Cows",
        difficulty: "Medium",
        platform: "Other",
        problemUrl: "https://www.spoj.com/problems/AGGRCOW/",
        solutionUrl: "https://youtu.be/7wOzDqsfXy0?si=c6eVx-Wc-1GIrj0y",
        videoUrl: "https://youtu.be/7wOzDqsfXy0?si=c6eVx-Wc-1GIrj0y",
        companyTags: [
          "Adobe"
        ]
      },
      {
        id: "allocate-minimum-pages",
        title: "Allocate Minimum Pages",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/description/",
        solutionUrl: "https://youtu.be/JRAByolWqhw?t=32",
        videoUrl: "https://youtu.be/JRAByolWqhw?t=32",
        companyTags: [
          "Salesforce",
          "Google",
          "Amazon"
        ]
      },
      {
        id: "painters-partition",
        title: "Painter’s Partition",
        difficulty: "Medium",
        platform: "Other",
        problemUrl: "https://www.hackerearth.com/problem/algorithm/painters-partition/",
        solutionUrl: "https://youtu.be/srsFN5OHBgw?si=k7hAiRe8HnPi4NHF",
        videoUrl: "https://youtu.be/srsFN5OHBgw?si=k7hAiRe8HnPi4NHF",
        companyTags: [
          "Google",
          "Oracle",
          "Microsoft",
          "Amazon"
        ]
      },
      {
        id: "median-of-2-sorted-arrays",
        title: "Median of 2 Sorted Arrays",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        companyTags: [
          "Google",
          "Flipkart",
          "DE Shaw",
          "Adobe",
          "Salesforce",
          "Oracle",
          "Microsoft",
          "Amazon",
          "Meta"
        ]
      }
    ]
  },
  {
    id: "TOPIC_3565_ID",
    title: "Day 9 : Recursion & Backtracking",
    order: 9,
    problemCount: 6,
    problems: [
      {
        id: "combination-sum-i",
        title: "Combination Sum I",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/combination-sum/description/",
        solutionUrl: "https://youtu.be/jkgZw2WEaqA?si=3YpIrvX_36R4MOa2",
        videoUrl: "https://youtu.be/jkgZw2WEaqA?si=3YpIrvX_36R4MOa2",
        companyTags: [
          "Microsoft",
          "Amazon",
          "DE Shaw",
          "Salesforce",
          "Oracle",
          "Adobe"
        ]
      },
      {
        id: "combination-sum-ii",
        title: "Combination Sum II",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/combination-sum-ii/description/",
        companyTags: [
          "Oracle",
          "Microsoft",
          "Amazon",
          "Adobe",
          "Goldman Sachs"
        ]
      },
      {
        id: "palindrome-partitioning",
        title: "Palindrome Partitioning",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/palindrome-partitioning/description/",
        solutionUrl: "https://youtu.be/aZ0B1eWkSVU?si=4DLqSJjkT9iT0JMS",
        videoUrl: "https://youtu.be/aZ0B1eWkSVU?si=4DLqSJjkT9iT0JMS",
        companyTags: [
          "Meta",
          "Microsoft",
          "Amazon",
          "Adobe",
          "Infosys"
        ]
      },
      {
        id: "n-queens",
        title: "N Queens",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/n-queens/",
        solutionUrl: "https://youtu.be/BdSJnIdR-4s?si=w5K9IKkKeecaXaq7",
        videoUrl: "https://youtu.be/BdSJnIdR-4s?si=w5K9IKkKeecaXaq7",
        companyTags: [
          "TCS",
          "Apple",
          "citadel",
          "Meta",
          "Google",
          "Microsoft",
          "Oracle",
          "Salesforce",
          "Amazon"
        ]
      },
      {
        id: "sudoku-solver",
        title: "Sudoku Solver",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/sudoku-solver/description/",
        solutionUrl: "https://youtu.be/70cP3qtJp-s?si=Mi8inCRxN2n-VlmR",
        videoUrl: "https://youtu.be/70cP3qtJp-s?si=Mi8inCRxN2n-VlmR",
        companyTags: [
          "citadel",
          "Oracle",
          "Microsoft",
          "Amazon",
          "Meta",
          "Goldman Sachs",
          "Intuit",
          "Google"
        ]
      },
      {
        id: "m-coloring-problem",
        title: "M-Coloring Problem",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1",
        companyTags: [
          "Amazon"
        ]
      }
    ]
  },
  {
    id: "TOPIC_4894_ID",
    title: "Day 10 : Recursion & Backtracking",
    order: 10,
    problemCount: 5,
    problems: [
      {
        id: "knights-tour",
        title: "Knights Tour",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/check-knight-tour-configuration/description/",
        solutionUrl: "https://youtu.be/Sp1jzttFVdE",
        videoUrl: "https://youtu.be/Sp1jzttFVdE",
        companyTags: [
          "Meta",
          "Google",
          "Microsoft",
          "Amazon"
        ]
      },
      {
        id: "subsets-ii",
        title: "Subsets II",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/subsets-ii/description/",
        solutionUrl: "https://www.youtube.com/watch?v=pNzljlzDCiI&t=2s",
        videoUrl: "https://www.youtube.com/watch?v=pNzljlzDCiI&t=2s",
        companyTags: [
          "Swiggy",
          "Apple",
          "Meta",
          "TCS",
          "Uber",
          "Flipkart",
          "Adobe",
          "Microsoft",
          "Amazon",
          "Google"
        ]
      },
      {
        id: "merge-sort",
        title: "Merge Sort",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/sort-an-array/description/",
        solutionUrl: "https://www.youtube.com/watch?v=cQDtOBTy7_Y&t=12s",
        videoUrl: "https://www.youtube.com/watch?v=cQDtOBTy7_Y&t=12s",
        companyTags: [
          "Infosys",
          "Oracle",
          "Adobe",
          "Amazon",
          "Apple",
          "Meta",
          "TCS"
        ]
      },
      {
        id: "rat-in-a-maze",
        title: "Rat in a Maze",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1",
        solutionUrl: "https://youtu.be/D8Yze9CDDAw?si=4HiqdNuf2gYtcMMH",
        videoUrl: "https://youtu.be/D8Yze9CDDAw?si=4HiqdNuf2gYtcMMH",
        companyTags: [
          "Amazon",
          "Microsoft"
        ]
      },
      {
        id: "count-inversions-2",
        title: "Count Inversions",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/count-the-number-of-inversions/description/",
        solutionUrl: "https://www.youtube.com/watch?v=ynnWDBTdVi0&t=69s",
        videoUrl: "https://www.youtube.com/watch?v=ynnWDBTdVi0&t=69s",
        companyTags: [
          "Google",
          "Salesforce",
          "Amazon"
        ]
      }
    ]
  },
  {
    id: "TOPIC_7754_ID",
    title: "Day 11 : Linked List (Part 1)",
    order: 11,
    problemCount: 6,
    problems: [
      {
        id: "middle-of-a-linked-list",
        title: "Middle of a Linked List",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/middle-of-the-linked-list/",
        solutionUrl: "https://www.youtube.com/watch?v=nzaHG0dme4g",
        videoUrl: "https://www.youtube.com/watch?v=nzaHG0dme4g",
        companyTags: [
          "Meta",
          "Amazon",
          "Google",
          "Intuit",
          "Qualcomm",
          "Goldman Sachs"
        ]
      },
      {
        id: "reverse-linked-list-i",
        title: "Reverse Linked List ",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/reverse-linked-list/description/",
        solutionUrl: "https://www.youtube.com/watch?v=R-CKBYnOv1U",
        videoUrl: "https://www.youtube.com/watch?v=R-CKBYnOv1U",
        companyTags: [
          "Google",
          "PayPal",
          "Microsoft",
          "Amazon",
          "Oracle",
          "Adobe",
          "Qualcomm",
          "TCS",
          "Apple",
          "Meta",
          "JP morgan"
        ]
      },
      {
        id: "remove-cycle-in-a-ll",
        title: "Remove Cycle in a LL",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/linked-list-cycle-ii/description/",
        solutionUrl: "https://www.youtube.com/watch?v=-1E8ZMS0gSs",
        videoUrl: "https://www.youtube.com/watch?v=-1E8ZMS0gSs",
        companyTags: [
          "Amazon",
          "Oracle",
          "Paytm",
          "Google",
          "Microsoft"
        ]
      },
      {
        id: "detect-cycle-in-a-ll",
        title: "Detect Cycle in a LL",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/linked-list-cycle/description/",
        solutionUrl: "https://www.youtube.com/watch?v=-1E8ZMS0gSs",
        videoUrl: "https://www.youtube.com/watch?v=-1E8ZMS0gSs",
        companyTags: [
          "Google",
          "Meta",
          "Cisco",
          "Wipro",
          "Samsung",
          "Goldman Sachs",
          "Amazon"
        ]
      },
      {
        id: "merge-2-sorted-ll",
        title: "Merge 2 Sorted LL",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/merge-two-sorted-lists/description/",
        solutionUrl: "https://www.youtube.com/watch?v=f8RPIb-0DDE",
        videoUrl: "https://www.youtube.com/watch?v=f8RPIb-0DDE",
        companyTags: [
          "Synopsys",
          "FactSet",
          "Brocade",
          "Amazon",
          "Flipkart",
          "MakeMyTrip",
          "Microsoft",
          "OATS",
          "Oracle",
          "Samsung",
          "Zoho",
          "Accolite"
        ]
      },
      {
        id: "flatten-a-linked-list",
        title: "Flatten a Linked List",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/description/",
        solutionUrl: "https://www.youtube.com/watch?v=I8b0rff5F9M",
        videoUrl: "https://www.youtube.com/watch?v=I8b0rff5F9M",
        companyTags: [
          "Meta",
          "Apple",
          "Amazon"
        ]
      }
    ]
  },
  {
    id: "TOPIC_3765_ID",
    title: "Day 12 : Linked List (Part 2)",
    order: 12,
    problemCount: 6,
    problems: [
      {
        id: "is-ll-a-palindrome-or-not",
        title: "Is LL a Palindrome or Not",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/palindrome-linked-list/",
        companyTags: [
          "Qualcomm",
          "Oracle",
          "Adobe",
          "Google",
          "Uber",
          "Amazon",
          "Microsoft"
        ]
      },
      {
        id: "clone-list-with-random-pointers",
        title: "Clone List with Random Pointers",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
        solutionUrl: "https://www.youtube.com/watch?v=8ze7Zopdsaw",
        videoUrl: "https://www.youtube.com/watch?v=8ze7Zopdsaw",
        companyTags: [
          "Nvidia",
          "intel",
          "Oracle",
          "Amazon",
          "Microsoft",
          "Google",
          "Flipkart",
          "Uber"
        ]
      },
      {
        id: "reverse-linked-list-ii",
        title: "Reverse Linked List II",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/reverse-linked-list-ii/description/",
        companyTags: [
          "Uber",
          "Adobe",
          "Microsoft",
          "Amazon",
          "Meta",
          "Google"
        ]
      },
      {
        id: "add-2-numbers",
        title: "Add 2 Numbers",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/add-two-numbers/description/",
        companyTags: [
          "Microsoft",
          "Amazon",
          "Oracle",
          "Google",
          "Tejas network",
          "Josh technology",
          "TCS",
          "Accenture"
        ]
      },
      {
        id: "reverse-nodes-in-k-groups",
        title: "Reverse Nodes in K Groups",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/description/",
        solutionUrl: "https://www.youtube.com/watch?v=-swgIiMIlJo",
        videoUrl: "https://www.youtube.com/watch?v=-swgIiMIlJo",
        companyTags: [
          "Uber",
          "Salesforce",
          "Apple",
          "Infosys",
          "Microsoft",
          "Google",
          "Amazon"
        ]
      },
      {
        id: "rotate-a-linked-list",
        title: "Rotate a Linked List",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/rotate-list/description/",
        companyTags: [
          "Infosys",
          "Nvidia",
          "Meta",
          "Morgan Stanley",
          "Siemens",
          "Adobe",
          "Oracle",
          "Amazon",
          "Microsoft",
          "Google"
        ]
      }
    ]
  },
  {
    id: "TOPIC_3047_ID",
    title: "Day 13 : Stacks & Queues (Part 1)",
    order: 13,
    problemCount: 6,
    problems: [
      {
        id: "implement-stack-using-queue",
        title: "Implement Stack using Queue",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/implement-stack-using-queues/description/",
        solutionUrl: "https://www.youtube.com/watch?v=sFvP5Ois0CE",
        videoUrl: "https://www.youtube.com/watch?v=sFvP5Ois0CE",
        companyTags: [
          "Google",
          "Oracle",
          "Adobe",
          "Microsoft",
          "Amazon",
          "Meta",
          "Optum"
        ]
      },
      {
        id: "next-greater-element",
        title: "Next Greater Element I",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/next-greater-element-i/description/",
        solutionUrl: "https://www.youtube.com/watch?v=NKbExYwvjb0",
        videoUrl: "https://www.youtube.com/watch?v=NKbExYwvjb0",
        companyTags: [
          "Apple",
          "Microsoft",
          "Meta",
          "Swiggy",
          "Amazon",
          "Google",
          "Morgan Stanley",
          "Oracle"
        ]
      },
      {
        id: "implement-queue-using-stack",
        title: "Implement Queue using Stack",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/implement-queue-using-stacks/description/",
        solutionUrl: "https://www.youtube.com/watch?v=sFvP5Ois0CE",
        videoUrl: "https://www.youtube.com/watch?v=sFvP5Ois0CE",
        companyTags: [
          "Adobe",
          "Amazon",
          "Google",
          "Microsoft",
          "Oracle",
          "Uber"
        ]
      },
      {
        id: "valid-parenthesis",
        title: "Valid Parentheses",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/valid-parentheses/description/",
        solutionUrl: "https://www.youtube.com/watch?v=NlHupEeDXzY",
        videoUrl: "https://www.youtube.com/watch?v=NlHupEeDXzY",
        companyTags: [
          "Amazon",
          "TCS",
          "JP morgan",
          "Meta",
          "Linkedin",
          "Intuit",
          "Google",
          "Visa",
          "IBM"
        ]
      },
      {
        id: "1st-non-repeating-in-stream",
        title: "1st Non Repeating in Stream",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/first-unique-character-in-a-string/description/",
        companyTags: [
          "Google",
          "TCS",
          "Meta",
          "Amazon",
          "Goldman Sachs",
          "Microsoft",
          "Adobe"
        ]
      },
      {
        id: "reverse-1st-k-elements-of-queue-2",
        title: "Reverse 1st K Elements of Queue",
        difficulty: "Easy",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/reverse-first-k-elements-of-queue/1",
        companyTags: [
          "Amazon",
          "Amdocs",
          "Microsoft"
        ]
      }
    ]
  },
  {
    id: "TOPIC_3480_ID",
    title: "Day 14 : Stacks & Queues (Part 2)",
    order: 14,
    problemCount: 5,
    problems: [
      {
        id: "time-needed-to-buy-tickets",
        title: "Time needed to Buy Tickets",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/time-needed-to-buy-tickets/description/",
        companyTags: [
          "Uber",
          "Meta",
          "Microsoft",
          "Amazon",
          "Google"
        ]
      },
      {
        id: "lru-cache",
        title: "LRU Cache",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/lru-cache/description/",
        solutionUrl: "https://www.youtube.com/watch?v=GsY6y0iPaHw",
        videoUrl: "https://www.youtube.com/watch?v=GsY6y0iPaHw",
        companyTags: [
          "Amazon",
          "Miro",
          "Ebay",
          "Microsoft",
          "Uber",
          "Visa",
          "Oracle",
          "Intuit",
          "Samsung",
          "PayPal"
        ]
      },
      {
        id: "get-min-element-from-stack",
        title: "Get Min Element from Stack",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/min-stack/description/",
        solutionUrl: "https://www.youtube.com/watch?v=wHDm-N2m2XY",
        videoUrl: "https://www.youtube.com/watch?v=wHDm-N2m2XY",
        companyTags: [
          "Amazon",
          "Meta",
          "nike",
          "Google",
          "Intuit",
          "PayPal",
          "Adobe",
          "Salesforce"
        ]
      },
      {
        id: "next-smaller-element",
        title: "Next Greater Element II",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/next-greater-element-ii/description/",
        solutionUrl: "https://youtu.be/If--3pm9K3U?t=28",
        videoUrl: "https://youtu.be/If--3pm9K3U?t=28",
        companyTags: [
          "Amazon",
          "Uber"
        ]
      },
      {
        id: "celebrity-problem",
        title: "Celebrity Problem",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/find-the-celebrity/description/",
        solutionUrl: "https://www.youtube.com/watch?v=OZPmEA_8FM8",
        videoUrl: "https://www.youtube.com/watch?v=OZPmEA_8FM8",
        companyTags: [
          "Google",
          "Linkedin",
          "Uber",
          "Salesforce",
          "Microsoft",
          "Amazon",
          "Phone Pe"
        ]
      }
    ]
  },
  {
    id: "TOPIC_4839_ID",
    title: "Day 15 : Stacks & Queues (Part 3)",
    order: 15,
    problemCount: 5,
    problems: [
      {
        id: "rotten-oranges",
        title: "Rotten Oranges",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/rotting-oranges/description/",
        solutionUrl: "https://youtu.be/RmXo5SWkhCs?t=20",
        videoUrl: "https://youtu.be/RmXo5SWkhCs?t=20",
        companyTags: [
          "Amazon",
          "Flipkart",
          "Intuit",
          "Samsung",
          "Oracle",
          "Meta",
          "Phone Pe",
          "Microsoft",
          "Google"
        ]
      },
      {
        id: "sort-a-stack",
        title: "Sort a Stack",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/sort-a-stack/1",
        companyTags: [
          "Goldman Sachs",
          "IBM",
          "Intuit",
          "Microsoft",
          "Amazon"
        ]
      },
      {
        id: "stock-span",
        title: "Stock Span",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/online-stock-span/description/",
        solutionUrl: "https://youtu.be/01vBuZyMfqk?t=20",
        videoUrl: "https://youtu.be/01vBuZyMfqk?t=20",
        companyTags: [
          "Microsoft",
          "Google",
          "Amazon",
          "Apple",
          "Adobe",
          "Meta"
        ]
      },
      {
        id: "circular-tour-gas-station",
        title: "Circular Tour / Gas Station",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/gas-station/description/",
        solutionUrl: "https://www.youtube.com/watch?v=SmTow5Ht4iU",
        videoUrl: "https://www.youtube.com/watch?v=SmTow5Ht4iU",
        companyTags: [
          "Salesforce",
          "Adobe",
          "Oracle",
          "Google",
          "Microsoft",
          "Amazon",
          "Meta",
          "Cisco",
          "Infosys",
          "Bank of Newyork"
        ]
      },
      {
        id: "max-area-in-histogram",
        title: "Max Area in Histogram",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/description/",
        solutionUrl: "https://www.youtube.com/watch?v=ysy1o-QEj3k&t=4s",
        videoUrl: "https://www.youtube.com/watch?v=ysy1o-QEj3k&t=4s",
        companyTags: [
          "TCS",
          "Uber",
          "Meta",
          "Google",
          "Amazon",
          "Microsoft",
          "Adobe",
          "DE Shaw"
        ]
      }
    ]
  },
  {
    id: "TOPIC_5310_ID",
    title: "Day 16 : Binary Trees (Part 1)",
    order: 16,
    problemCount: 6,
    problems: [
      {
        id: "preorder-traversal",
        title: "Preorder Traversal",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/binary-tree-preorder-traversal/description/",
        solutionUrl: "https://youtu.be/eKJrXBCRuNQ?t=2285",
        videoUrl: "https://youtu.be/eKJrXBCRuNQ?t=2285",
        companyTags: [
          "Salesforce",
          "Amazon",
          "Microsoft",
          "Google",
          "Adobe",
          "Meta"
        ]
      },
      {
        id: "level-order-traversal",
        title: "Level Order Traversal",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/description/",
        solutionUrl: "https://youtu.be/eKJrXBCRuNQ?t=3345",
        videoUrl: "https://youtu.be/eKJrXBCRuNQ?t=3345",
        companyTags: [
          "Amazon",
          "Google",
          "Oracle",
          "Apple",
          "Meta",
          "Uber",
          "Intuit",
          "Adobe"
        ]
      },
      {
        id: "inorder-traversal",
        title: "Inorder Traversal",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/description/",
        solutionUrl: "https://youtu.be/eKJrXBCRuNQ?t=2831",
        videoUrl: "https://youtu.be/eKJrXBCRuNQ?t=2831",
        companyTags: [
          "Adobe",
          "Uber",
          "Meta",
          "Google",
          "Amazon",
          "Microsoft"
        ]
      },
      {
        id: "minimum-distance-between-nodes",
        title: "Minimum Distance between Nodes",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/minimum-distance-between-bst-nodes/description/",
        solutionUrl: "https://www.youtube.com/watch?v=WZmjRXF_Zi4",
        videoUrl: "https://www.youtube.com/watch?v=WZmjRXF_Zi4",
        companyTags: [
          "Microsoft",
          "Google"
        ]
      },
      {
        id: "symmetric-tree",
        title: "Symmetric Tree",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/symmetric-tree/description/",
        companyTags: [
          "Adobe",
          "Amazon",
          "Google",
          "Linkedin",
          "Microsoft"
        ]
      },
      {
        id: "postorder-traversal-2",
        title: "Postorder Traversal",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/binary-tree-postorder-traversal/description/",
        solutionUrl: "https://youtu.be/eKJrXBCRuNQ?t=3157",
        videoUrl: "https://youtu.be/eKJrXBCRuNQ?t=3157",
        companyTags: [
          "Apple",
          "Adobe",
          "Google",
          "Amazon",
          "Meta"
        ]
      }
    ]
  },
  {
    id: "TOPIC_6132_ID",
    title: "Day 17 : Binary Trees (Part 2)",
    order: 17,
    problemCount: 6,
    problems: [
      {
        id: "morris-inorder-traversal",
        title: "Morris Inorder Traversal",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/description/",
        solutionUrl: "https://youtu.be/PUfADhkq1LI?t=9",
        videoUrl: "https://youtu.be/PUfADhkq1LI?t=9",
        companyTags: [
          "Uber",
          "Google",
          "Apple",
          "Adobe",
          "Microsoft",
          "Amazon"
        ]
      },
      {
        id: "diameter-of-a-tree",
        title: "Diameter of a Tree",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/diameter-of-binary-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=aPyDPImR5UM",
        videoUrl: "https://www.youtube.com/watch?v=aPyDPImR5UM",
        companyTags: [
          "Adobe",
          "Oracle",
          "Visa",
          "Google",
          "Amazon",
          "Meta",
          "TCS"
        ]
      },
      {
        id: "are-2-trees-identical-or-not",
        title: "Are 2 Trees Identical or Not",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/same-tree/description/",
        solutionUrl: "https://youtu.be/tumW7jsjv68?t=20",
        videoUrl: "https://youtu.be/tumW7jsjv68?t=20",
        companyTags: [
          "Adobe",
          "Meta",
          "Apple",
          "TCS",
          "Amazon",
          "Google",
          "Flipkart",
          "Uber",
          "Linkedin"
        ]
      },
      {
        id: "check-if-bt-mirror-of-itself-or-not",
        title: "Check if BT Mirror of itself or not",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/symmetric-tree/description/",
        companyTags: [
          "Amazon",
          "Google",
          "Linkedin",
          "Adobe",
          "Microsoft",
          "Meta",
          "Apple"
        ]
      },
      {
        id: "subtree-of-another-tree",
        title: "Subtree of Another Tree",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/subtree-of-another-tree/description/",
        solutionUrl: "https://youtu.be/tumW7jsjv68?t=611",
        videoUrl: "https://youtu.be/tumW7jsjv68?t=611",
        companyTags: [
          "Microsoft",
          "Morgan Stanley",
          "Uber",
          "Ebay",
          "Google",
          "Amazon"
        ]
      },
      {
        id: "is-tree-height-balanced",
        title: "Is Tree Height Balanced",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/balanced-binary-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=7tzHzN_Ehus",
        videoUrl: "https://www.youtube.com/watch?v=7tzHzN_Ehus",
        companyTags: [
          "Microsoft",
          "Adobe",
          "Uber",
          "Google",
          "Amazon"
        ]
      }
    ]
  },
  {
    id: "TOPIC_5173_ID",
    title: "Day 18 : Binary Trees (Part 3)",
    order: 18,
    problemCount: 6,
    problems: [
      {
        id: "bottom-view-of-a-tree",
        title: "Bottom View of a Tree",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1",
        solutionUrl: "https://www.youtube.com/watch?v=FGr-syrhvOA",
        videoUrl: "https://www.youtube.com/watch?v=FGr-syrhvOA",
        companyTags: [
          "Amazon",
          "Google",
          "Adobe",
          "Josh technology"
        ]
      },
      {
        id: "top-view-of-a-tree",
        title: "Top View of a Tree",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1",
        solutionUrl: "https://www.youtube.com/watch?v=FGr-syrhvOA",
        videoUrl: "https://www.youtube.com/watch?v=FGr-syrhvOA",
        companyTags: [
          "Accolite",
          "Flipkart",
          "Oracle",
          "Uber",
          "JP morgan",
          "Google",
          "Amazon"
        ]
      },
      {
        id: "lowest-common-ancestor-lca",
        title: "Lowest Common Ancestor (LCA)",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=oX5D0uKOMck",
        videoUrl: "https://www.youtube.com/watch?v=oX5D0uKOMck",
        companyTags: [
          "Morgan Stanley",
          "Salesforce",
          "Flipkart",
          "Adobe",
          "Oracle",
          "Linkedin",
          "Intuit",
          "Google",
          "Amazon"
        ]
      },
      {
        id: "kth-level-of-tree",
        title: "Kth Level of Tree",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=ze4JO_ODl3w",
        videoUrl: "https://www.youtube.com/watch?v=ze4JO_ODl3w",
        companyTags: [
          "Meta",
          "Microsoft",
          "Google",
          "Amazon",
          "Adobe"
        ]
      },
      {
        id: "construct-bt-from-inorder-preorder",
        title: "Construct BT from Inorder & Preorder",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/",
        solutionUrl: "https://www.youtube.com/watch?v=33b1M980cCA",
        videoUrl: "https://www.youtube.com/watch?v=33b1M980cCA",
        companyTags: [
          "Apple",
          "Microsoft",
          "Amazon",
          "VMWare",
          "Uber",
          "Adobe"
        ]
      },
      {
        id: "transform-to-sum-tree",
        title: "Transform to Sum Tree",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=TY6kEejJEM0",
        videoUrl: "https://www.youtube.com/watch?v=TY6kEejJEM0",
        companyTags: [
          "Amazon",
          "Microsoft",
          "Ebay",
          "SAP Labs"
        ]
      }
    ]
  },
  {
    id: "TOPIC_3893_ID",
    title: "Day 19 : Binary Trees (Part 4)",
    order: 19,
    problemCount: 6,
    problems: [
      {
        id: "flatten-bt-to-ll",
        title: "Flatten BT to LL",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/",
        solutionUrl: "https://www.youtube.com/watch?v=dU2Z5HWSGM0",
        videoUrl: "https://www.youtube.com/watch?v=dU2Z5HWSGM0",
        companyTags: [
          "Microsoft",
          "Apple",
          "Google",
          "Amazon",
          "Oracle",
          "Adobe",
          "Myntra"
        ]
      },
      {
        id: "max-path-sum",
        title: "Max Path Sum",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/",
        companyTags: [
          "Goldman Sachs",
          "Salesforce",
          "Oracle",
          "Amazon",
          "Google",
          "Uber",
          "Flipkart"
        ]
      },
      {
        id: "max-width-of-bt",
        title: "Max Width of BT",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/maximum-width-of-binary-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=rhz-csskg_A",
        videoUrl: "https://www.youtube.com/watch?v=rhz-csskg_A",
        companyTags: [
          "Amazon",
          "Google",
          "Adobe",
          "Microsoft",
          "Uber"
        ]
      },
      {
        id: "construct-bt-from-inorder-postorder",
        title: "Construct BT from Inorder and Postorder",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/",
        solutionUrl: "https://youtu.be/33b1M980cCA?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&amp;t=7",
        videoUrl: "https://youtu.be/33b1M980cCA?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&amp;t=7",
        companyTags: [
          "Amazon",
          "Bloomberg",
          "Google",
          "Adobe",
          "Microsoft"
        ]
      },
      {
        id: "zig-zag-traversal-of-bt",
        title: "Zig Zag Traversal of BT",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/",
        companyTags: [
          "Google",
          "Adobe",
          "Ebay",
          "Flipkart",
          "Microsoft",
          "Amazon",
          "Meta",
          "Oracle"
        ]
      },
      {
        id: "kth-ancestor",
        title: "Kth Ancestor",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/kth-ancestor-of-a-tree-node/description/",
        companyTags: [
          "Microsoft",
          "Amazon",
          "Google"
        ]
      }
    ]
  },
  {
    id: "TOPIC_3561_ID",
    title: "Day 20 : BST (Part 1)",
    order: 20,
    problemCount: 5,
    problems: [
      {
        id: "kth-largest-in-bst",
        title: "Kth largest in BST",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/kth-largest-element-in-a-stream/description/",
        companyTags: [
          "Amazon",
          "Adobe",
          "Salesforce",
          "Google",
          "Atlassian",
          "Meta"
        ]
      },
      {
        id: "sorted-array-to-balanced-bst",
        title: "Sorted Array to Balanced BST",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=0s6sCjs_4g0",
        videoUrl: "https://www.youtube.com/watch?v=0s6sCjs_4g0",
        companyTags: [
          "Adobe",
          "Airbnb",
          "Google",
          "Amazon",
          "Samsung"
        ]
      },
      {
        id: "kth-smallest-in-bst",
        title: "Kth Smallest in BST",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        solutionUrl: "https://www.youtube.com/watch?v=Kq4BbvIhj44",
        videoUrl: "https://www.youtube.com/watch?v=Kq4BbvIhj44",
        companyTags: [
          "Uber",
          "Google",
          "Accolite",
          "Amazon",
          "Microsoft"
        ]
      },
      {
        id: "lca-in-bst",
        title: "LCA in BST",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=ORxkZ12FrU4",
        videoUrl: "https://www.youtube.com/watch?v=ORxkZ12FrU4",
        companyTags: [
          "Meta",
          "Apple",
          "Bloomberg",
          "Amazon",
          "Linkedin",
          "Oracle",
          "Samsung"
        ]
      },
      {
        id: "validate-bst",
        title: "Validate BST",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/validate-binary-search-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=dSBcCynP1nA&t=21s",
        videoUrl: "https://www.youtube.com/watch?v=dSBcCynP1nA&t=21s",
        companyTags: [
          "citadel",
          "Uber",
          "Salesforce",
          "Google",
          "IBM",
          "Adobe",
          "Oracle",
          "Amazon"
        ]
      }
    ]
  },
  {
    id: "TOPIC_8376_ID",
    title: "Day 21 : BST (Part 2)",
    order: 21,
    problemCount: 5,
    problems: [
      {
        id: "recover-bst",
        title: "Recover BST",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/recover-binary-search-tree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=0KGzfij_SCk",
        videoUrl: "https://www.youtube.com/watch?v=0KGzfij_SCk",
        companyTags: [
          "Adobe",
          "Oracle",
          "Google",
          "Amazon",
          "Microsoft"
        ]
      },
      {
        id: "populate-next-right-pointers",
        title: "Populate Next Right Pointers",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/",
        solutionUrl: "https://www.youtube.com/watch?v=a8VKpW1DsD8",
        videoUrl: "https://www.youtube.com/watch?v=a8VKpW1DsD8",
        companyTags: [
          "Amazon",
          "Adobe",
          "Flipkart",
          "Salesforce",
          "Oracle"
        ]
      },
      {
        id: "construct-from-preorder",
        title: "Construct from Preorder",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/description/",
        solutionUrl: "https://youtu.be/-n5Ur1wE5Jc?si=Bh0ukUvFtj3p1Ku8",
        videoUrl: "https://youtu.be/-n5Ur1wE5Jc?si=Bh0ukUvFtj3p1Ku8",
        companyTags: [
          "Adobe",
          "Google",
          "Microsoft"
        ]
      },
      {
        id: "bst-iterator",
        title: "BST Iterator",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/binary-search-tree-iterator/description/",
        solutionUrl: "https://www.youtube.com/watch?v=dS1bKglre3A",
        videoUrl: "https://www.youtube.com/watch?v=dS1bKglre3A",
        companyTags: [
          "Adobe",
          "Linkedin",
          "Microsoft",
          "Amazon"
        ]
      },
      {
        id: "flatten-bst-to-sorted-list",
        title: "Flatten BST to Sorted list",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/description/",
        solutionUrl: "https://youtu.be/dU2Z5HWSGM0?si=wyQANxRxIlsJsDoC",
        videoUrl: "https://youtu.be/dU2Z5HWSGM0?si=wyQANxRxIlsJsDoC",
        companyTags: [
          "Meta",
          "Nvidia",
          "Microsoft",
          "Amazon"
        ]
      }
    ]
  },
  {
    id: "TOPIC_9297_ID",
    title: "Day 22 : BST (Part 3)",
    order: 22,
    problemCount: 5,
    problems: [
      {
        id: "merge-2-bsts",
        title: "Merge 2 BSTs",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/merge-bsts-to-create-single-bst/description/",
        solutionUrl: "https://www.youtube.com/watch?v=AiKZjCuy2k4",
        videoUrl: "https://www.youtube.com/watch?v=AiKZjCuy2k4",
        companyTags: [
          "Bloomberg",
          "Microsoft"
        ]
      },
      {
        id: "serialize-deserialize-bst",
        title: "Serialize & Deserialize BST",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/",
        companyTags: [
          "Meta",
          "Amazon",
          "Google",
          "Linkedin",
          "Uber",
          "Intuit",
          "Qualcomm",
          "citadel",
          "Nvidia"
        ]
      },
      {
        id: "inorder-predecessor",
        title: "Inorder Predecessor",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/delete-node-in-a-bst/description/",
        solutionUrl: "https://www.youtube.com/watch?v=IHNkql1tAnk",
        videoUrl: "https://www.youtube.com/watch?v=IHNkql1tAnk",
        companyTags: [
          "Flipkart",
          "Oracle",
          "Google",
          "Amazon",
          "Adobe",
          "Meta",
          "Microsoft"
        ]
      },
      {
        id: "largest-bst-in-bt",
        title: "Largest BST in BT",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/largest-bst-subtree/description/",
        solutionUrl: "https://www.youtube.com/watch?v=Pr-HFxp7npk",
        videoUrl: "https://www.youtube.com/watch?v=Pr-HFxp7npk",
        companyTags: [
          "Microsoft",
          "Meta"
        ]
      },
      {
        id: "inorder-successor",
        title: "Inorder Successor",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/inorder-successor-in-bst/description/",
        solutionUrl: "https://www.youtube.com/watch?v=IHNkql1tAnk",
        videoUrl: "https://www.youtube.com/watch?v=IHNkql1tAnk",
        companyTags: [
          "Microsoft",
          "Meta"
        ]
      }
    ]
  },
  {
    id: "TOPIC_9795_ID",
    title: "Day 23 : Heaps",
    order: 23,
    problemCount: 6,
    problems: [
      {
        id: "merge-k-sorted-arrays",
        title: "Merge K Sorted Arrays",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/merge-sorted-array/description/?envType=problem-list-v2&envId=sorting",
        companyTags: [
          "Cisco",
          "Amazon",
          "IBM",
          "Oracle",
          "Adobe",
          "Google",
          "HCL",
          "Microsoft"
        ]
      },
      {
        id: "k-most-frequent-elements",
        title: "K most Frequent Elements",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/top-k-frequent-elements/description/",
        companyTags: [
          "Salesforce",
          "Microsoft",
          "Amazon",
          "Google",
          "Oracle",
          "Goldman Sachs",
          "Uber"
        ]
      },
      {
        id: "median-from-stream",
        title: "Median from Stream",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/find-median-from-data-stream/description/",
        companyTags: [
          "Pinterest",
          "Google",
          "Apple",
          "Amazon",
          "Goldman Sachs",
          "Microsoft",
          "PayPal",
          "Oracle",
          "Meta"
        ]
      },
      {
        id: "smallest-range-in-k-sorted-list",
        title: "Smallest Range in K Sorted List",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/description/",
        companyTags: [
          "Phone Pe",
          "Flipkart",
          "DE Shaw",
          "Amazon",
          "Meta",
          "Adobe",
          "Microsoft"
        ]
      },
      {
        id: "kth-smallest-element",
        title: "Kth Smallest Element",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/?envType=problem-list-v2&envId=sorting",
        companyTags: [
          "Meta",
          "Phone Pe",
          "Salesforce",
          "Apple",
          "Amazon"
        ]
      },
      {
        id: "heap-sort",
        title: "Heap Sort",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/sort-an-array/description/",
        companyTags: [
          "Oracle",
          "Google",
          "Amazon",
          "Adobe",
          "TCS",
          "Infosys",
          "Meta",
          "Apple"
        ]
      }
    ]
  },
  {
    id: "TOPIC_4429_ID",
    title: "Day 24 : Tries",
    order: 24,
    problemCount: 5,
    problems: [
      {
        id: "word-break-problem",
        title: "Word Break Problem",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/word-break/description/",
        companyTags: [
          "Flipkart",
          "Amazon",
          "Google",
          "netflix",
          "Intuit",
          "Uber",
          "Walmart",
          "Salesforce",
          "Oracle"
        ]
      },
      {
        id: "implement-a-trie",
        title: "Implement a Trie",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/description/",
        companyTags: [
          "Meta",
          "Nvidia",
          "Google",
          "Uber",
          "Samsung",
          "Amazon",
          "Microsoft"
        ]
      },
      {
        id: "longest-string-with-all-prefix",
        title: "Longest String with All Prefix",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/longest-word-with-all-prefixes/description/",
        companyTags: [
          "Google"
        ]
      },
      {
        id: "implement-a-phone-directory",
        title: "Implement a Phone Directory",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/design-phone-directory/description/",
        companyTags: [
          "Google"
        ]
      },
      {
        id: "longest-common-prefix-2",
        title: "Longest Common Prefix",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/longest-common-prefix/description/",
        companyTags: [
          "Visa",
          "Oracle",
          "Amazon",
          "TCS",
          "Accenture",
          "Infosys",
          "Deloitte",
          "Google"
        ]
      }
    ]
  },
  {
    id: "TOPIC_7959_ID",
    title: "Day 25 : Graphs (Part 1)",
    order: 25,
    problemCount: 6,
    problems: [
      {
        id: "dfs-depth-first-search",
        title: "DFS : Depth First Search",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1",
        solutionUrl: "https://youtu.be/3czYbhac160?si=x2Z0M_2JhXz2J8zr",
        videoUrl: "https://youtu.be/3czYbhac160?si=x2Z0M_2JhXz2J8zr",
        companyTags: [
          "Samsung",
          "Intuit",
          "Amazon",
          "Accolite"
        ]
      },
      {
        id: "bfs-breadth-first-search",
        title: "BFS : Breadth First Search",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1",
        solutionUrl: "https://youtu.be/scQITTLgFJo?si=wWP38t1K-etIUYRr",
        videoUrl: "https://youtu.be/scQITTLgFJo?si=wWP38t1K-etIUYRr",
        companyTags: [
          "Microsoft",
          "Samsung",
          "Adobe",
          "Amazon",
          "Flipkart",
          "Ola",
          "SAP Labs"
        ]
      },
      {
        id: "detect-cycle-in-undirected-using-bfs",
        title: "Detect Cycle in Undirected using BFS",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/course-schedule/description/",
        solutionUrl: "https://youtu.be/MIjOkApZ39g?si=2JoLLAipBhDTi_N5",
        videoUrl: "https://youtu.be/MIjOkApZ39g?si=2JoLLAipBhDTi_N5",
        companyTags: [
          "Visa",
          "Flipkart",
          "Amazon",
          "Google",
          "Adobe",
          "Microsoft",
          "Oracle"
        ]
      },
      {
        id: "detect-cycle-in-undirected-using-dfs",
        title: "Detect Cycle in Undirected using DFS",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/course-schedule/description/",
        solutionUrl: "https://youtu.be/OZClCpPQDR4?si=LHmPSDxyURUIDxsD",
        videoUrl: "https://youtu.be/OZClCpPQDR4?si=LHmPSDxyURUIDxsD",
        companyTags: [
          "Google",
          "Visa",
          "Oracle",
          "Microsoft",
          "Adobe",
          "Flipkart",
          "Amazon"
        ]
      },
      {
        id: "detect-cycle-in-directed-using-dfs",
        title: "Detect Cycle in Directed using DFS",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/redundant-connection/description/",
        solutionUrl: "https://youtu.be/AcppN5XFt24?t=27",
        videoUrl: "https://youtu.be/AcppN5XFt24?t=27",
        companyTags: [
          "Microsoft",
          "Google",
          "Amazon",
          "InMobi"
        ]
      },
      {
        id: "detect-cycle-in-directed-using-bfs",
        title: "Detect Cycle in Directed using BFS",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/redundant-connection/description/",
        solutionUrl: "https://youtu.be/AcppN5XFt24",
        videoUrl: "https://youtu.be/AcppN5XFt24",
        companyTags: [
          "Google",
          "Amazon",
          "InMobi",
          "Microsoft"
        ]
      }
    ]
  },
  {
    id: "TOPIC_9345_ID",
    title: "Day 26 : Graphs (Part 2)",
    order: 26,
    problemCount: 6,
    problems: [
      {
        id: "topological-sorting-dfs",
        title: "Topological Sorting (DFS)",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/topological-sort/1",
        solutionUrl: "https://youtu.be/0WIINUY12Yg",
        videoUrl: "https://youtu.be/0WIINUY12Yg",
        companyTags: [
          "Visa",
          "Moonfrog Labs",
          "Morgan Stanley",
          "DE Shaw",
          "Flipkart",
          "Samsung",
          "OYO",
          "Microsoft",
          "Accolite",
          "Amazon"
        ]
      },
      {
        id: "flood-fill-algorithm",
        title: "Flood Fill Algorithm",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/flood-fill/description/",
        solutionUrl: "https://youtu.be/JI_e2RzARbM?si=WGTSPN-KWL0C4a9q",
        videoUrl: "https://youtu.be/JI_e2RzARbM?si=WGTSPN-KWL0C4a9q",
        companyTags: [
          "Uber",
          "Amazon",
          "Yahoo",
          "Adobe",
          "Apple",
          "Google",
          "Microsoft"
        ]
      },
      {
        id: "topological-sorting-bfs",
        title: "Topological Sorting (BFS)",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/topological-sort/1",
        solutionUrl: "https://youtu.be/BnQpaTZg6Sc",
        videoUrl: "https://youtu.be/BnQpaTZg6Sc",
        companyTags: [
          "Amazon",
          "Moonfrog Labs",
          "Visa",
          "Samsung",
          "OYO",
          "DE Shaw",
          "Flipkart",
          "Morgan Stanley",
          "Accolite",
          "Microsoft"
        ]
      },
      {
        id: "course-schedule-ii",
        title: "Course Schedule II",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/course-schedule-ii/description/",
        solutionUrl: "https://youtu.be/rZsgWxodGmM?si=OgsOy5YcwN41QYwm",
        videoUrl: "https://youtu.be/rZsgWxodGmM?si=OgsOy5YcwN41QYwm",
        companyTags: [
          "Nvidia",
          "Meta",
          "Microsoft",
          "Intuit",
          "Linkedin",
          "Salesforce",
          "Google",
          "Amazon",
          "Uber"
        ]
      },
      {
        id: "cheapest-flights-within-k-stops",
        title: "Cheapest Flights within K Stops",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/description/",
        solutionUrl: "https://youtu.be/CLmykzpeCCs?si=VSbiBnnh-v9PNl6v",
        videoUrl: "https://youtu.be/CLmykzpeCCs?si=VSbiBnnh-v9PNl6v",
        companyTags: [
          "Apple",
          "Stripe",
          "Amazon",
          "Airbnb",
          "Oracle",
          "DE Shaw"
        ]
      },
      {
        id: "dijkstras-algorithm-2",
        title: "Dijkstra's Algorithm",
        difficulty: "Hard",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1",
        solutionUrl: "https://youtu.be/8gYBHjtjWBI?si=nymThY9oC_NcAMPE",
        videoUrl: "https://youtu.be/8gYBHjtjWBI?si=nymThY9oC_NcAMPE",
        companyTags: [
          "Flipkart",
          "Microsoft"
        ]
      }
    ]
  },
  {
    id: "TOPIC_7733_ID",
    title: "Day 27 : Graphs (Part 3)",
    order: 27,
    problemCount: 7,
    problems: [
      {
        id: "kruskals-algorithm-mst",
        title: "Kruskal's Algorithm (MST)",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/description/",
        solutionUrl: "https://youtu.be/inoM6jwj1CA?si=oI5j5RHPlq_syIOT",
        videoUrl: "https://youtu.be/inoM6jwj1CA?si=oI5j5RHPlq_syIOT",
        companyTags: [
          "DE Shaw",
          "Uber",
          "Directi",
          "Amazon",
          "Adobe",
          "Microsoft"
        ]
      },
      {
        id: "prims-algorithm-mst",
        title: "Prim's Algorithm (MST)",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/description/",
        solutionUrl: "https://youtu.be/Sflh1z6cIMk?si=a-giZuHw0ZKhq7pm",
        videoUrl: "https://youtu.be/Sflh1z6cIMk?si=a-giZuHw0ZKhq7pm",
        companyTags: [
          "Microsoft",
          "Directi",
          "Uber",
          "Adobe",
          "Amazon",
          "DE Shaw"
        ]
      },
      {
        id: "rotting-oranges",
        title: "Rotting Oranges",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/rotting-oranges/description/",
        solutionUrl: "https://youtu.be/RmXo5SWkhCs?si=PekrhTqJxNbimhVp",
        videoUrl: "https://youtu.be/RmXo5SWkhCs?si=PekrhTqJxNbimhVp",
        companyTags: [
          "Facebook",
          "Phone Pe",
          "Oracle",
          "citadel",
          "Meta",
          "Amazon",
          "Zoho",
          "Salesforce",
          "Flipkart",
          "Google",
          "Intuit",
          "Samsung"
        ]
      },
      {
        id: "clone-a-graph",
        title: "Clone a Graph",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/clone-graph/description/",
        companyTags: [
          "Google",
          "Amazon",
          "Meta",
          "Uber",
          "Adobe"
        ]
      },
      {
        id: "floyd-warshall-algorithm",
        title: "Floyd Warshall Algorithm",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/",
        solutionUrl: "https://youtu.be/iZBXd-vjHUA?t=16",
        videoUrl: "https://youtu.be/iZBXd-vjHUA?t=16",
        companyTags: [
          "Meta",
          "Amazon",
          "Microsoft",
          "Google",
          "Uber"
        ]
      },
      {
        id: "bellman-ford-algorithm",
        title: "Bellman Ford Algorithm",
        difficulty: "Hard",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/0",
        solutionUrl: "https://youtu.be/3rFHlbJ7qKc?si=nSmurlJ6tWbk0ymU",
        videoUrl: "https://youtu.be/3rFHlbJ7qKc?si=nSmurlJ6tWbk0ymU",
        companyTags: [
          "Directi",
          "Sharechat",
          "Microsoft",
          "Amazon"
        ]
      },
      {
        id: "01-matrix",
        title: "01 Matrix",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/01-matrix/description/",
        companyTags: [
          "Linkedin",
          "Doordash",
          "Google",
          "Amazon",
          "Flipkart",
          "Adobe"
        ]
      }
    ]
  },
  {
    id: "TOPIC_2732_ID",
    title: "Day 28 : Graphs (Part 4)",
    order: 28,
    problemCount: 7,
    problems: [
      {
        id: "number-of-islands",
        title: "Number of Islands",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/number-of-islands/description/",
        solutionUrl: "https://youtu.be/AME6baBpswY?si=0zFCNvVP0GX8e7U7",
        videoUrl: "https://youtu.be/AME6baBpswY?si=0zFCNvVP0GX8e7U7",
        companyTags: [
          "Linkedin",
          "Amazon",
          "Meta",
          "Nvidia",
          "Apple",
          "Adobe",
          "Goldman Sachs",
          "Microsoft",
          "Oracle",
          "PayPal",
          "Salesforce"
        ]
      },
      {
        id: "is-graph-bipartite",
        title: "Is Graph Bipartite?",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/is-graph-bipartite/description/",
        companyTags: [
          "Samsung",
          "Meta",
          "Pinterest",
          "Microsoft",
          "Flipkart",
          "Uber"
        ]
      },
      {
        id: "strongly-connected-components-kosarajus",
        title: "Strongly Connected Components (Kosaraju's)",
        difficulty: "Hard",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1",
        solutionUrl: "https://youtu.be/lqY8TE0P1S8",
        videoUrl: "https://youtu.be/lqY8TE0P1S8",
        companyTags: [
          "Paytm"
        ]
      },
      {
        id: "most-stones-removed",
        title: "Most Stones Removed",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/description/",
        companyTags: [
          "Microsoft",
          "Amazon",
          "Google"
        ]
      },
      {
        id: "number-of-ways-to-arrive-at-destination",
        title: "Number of Ways to Arrive at Destination",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/description/",
        companyTags: [
          "Google",
          "Amazon"
        ]
      },
      {
        id: "number-of-provinces",
        title: "Number of Provinces",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/number-of-provinces/",
        solutionUrl: "https://youtu.be/J1yCPIP-K8s?si=I86S3sfHWkRMrNxb",
        videoUrl: "https://youtu.be/J1yCPIP-K8s?si=I86S3sfHWkRMrNxb",
        companyTags: [
          "Amazon",
          "Meta",
          "Sprinklr",
          "Google"
        ]
      },
      {
        id: "alien-dictionary",
        title: "Critical Connections in a Network",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/critical-connections-in-a-network/",
        solutionUrl: "https://youtu.be/6h1SucBNxgc?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&amp;t=1426",
        videoUrl: "https://youtu.be/6h1SucBNxgc?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&amp;t=1426",
        companyTags: [
          "citadel",
          "Google",
          "Airbnb",
          "Uber"
        ]
      }
    ]
  },
  {
    id: "TOPIC_7546_ID",
    title: "Day 29 : DP (Part 1)",
    order: 29,
    problemCount: 5,
    problems: [
      {
        id: "0-1-knapsack",
        title: "0-1 Knapsack",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1",
        companyTags: [
          "Directi",
          "Morgan Stanley",
          "Oracle",
          "Snapdeal",
          "Amazon",
          "Visa",
          "Mobicip",
          "Microsoft",
          "GreyOrange",
          "Flipkart",
          "Payu"
        ]
      },
      {
        id: "buy-sell-stocks-i",
        title: "Buy & Sell Stocks I",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/",
        solutionUrl: "https://youtu.be/WBzZCm46mFo?si=0HH8sY1_cmD_h2rz",
        videoUrl: "https://youtu.be/WBzZCm46mFo?si=0HH8sY1_cmD_h2rz",
        companyTags: [
          "Amazon",
          "Directi",
          "Goldman Sachs",
          "Microsoft",
          "Google",
          "Media.Net",
          "MakeMyTrip",
          "Intuit",
          "Flipkart",
          "DE Shaw",
          "Quikr",
          "Walmart",
          "Swiggy",
          "Salesforce",
          "Paytm",
          "Pubmatic",
          "Oracle",
          "Ola"
        ]
      },
      {
        id: "target-sum-subset",
        title: "Target Sum Subset",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/target-sum/description/",
        companyTags: [
          "Myntra",
          "Meta",
          "Amazon",
          "Microsoft"
        ]
      },
      {
        id: "coin-change",
        title: "Coin Change",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/coin-change/description/",
        companyTags: [
          "Salesforce",
          "Microsoft",
          "Intuit",
          "Google",
          "Amazon",
          "Adobe",
          "Accenture",
          "Infosys"
        ]
      },
      {
        id: "unbounded-knapsack",
        title: "Unbounded Knapsack",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1",
        companyTags: [
          "Google",
          "Amazon"
        ]
      }
    ]
  },
  {
    id: "TOPIC_5236_ID",
    title: "Day 30 : DP (Part 2)",
    order: 30,
    problemCount: 6,
    problems: [
      {
        id: "longest-common-substring",
        title: "Longest Common Substring",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/longest-common-substring1452/1",
        companyTags: [
          "Amazon",
          "Microsoft",
          "Morgan Stanley"
        ]
      },
      {
        id: "longest-common-subsequence",
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/longest-common-subsequence/description/",
        companyTags: [
          "Oracle",
          "Amazon",
          "Google",
          "TCS",
          "Microsoft",
          "Meta"
        ]
      },
      {
        id: "longest-increasing-subsequence",
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/longest-increasing-subsequence/description/",
        companyTags: [
          "Salesforce",
          "Google",
          "Atlassian",
          "PayPal",
          "Goldman Sachs",
          "Amazon",
          "Intuit",
          "Ibm"
        ]
      },
      {
        id: "edit-distance",
        title: "Edit Distance",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/edit-distance/description/",
        companyTags: [
          "Goldman Sachs",
          "Google",
          "TCS",
          "Accenture",
          "Rubrik",
          "Citrix",
          "Adobe"
        ]
      },
      {
        id: "longest-palindromic-subsequence",
        title: "Longest Palindromic Subsequence",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/longest-palindromic-subsequence/description/",
        companyTags: [
          "TCS",
          "Linkedin",
          "Amazon",
          "Google",
          "Meta",
          "Cisco"
        ]
      },
      {
        id: "buy-sell-stocks-ii",
        title: "Buy & Sell Stocks II",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/",
        companyTags: [
          "Amazon",
          "Adobe",
          "TCS",
          "Apple",
          "Goldman Sachs",
          "Uber"
        ]
      }
    ]
  },
  {
    id: "TOPIC_2286_ID",
    title: "Day 31 : DP (Part 3)",
    order: 31,
    problemCount: 5,
    problems: [
      {
        id: "nth-catalan",
        title: "Nth Catalan",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/nth-catalan-number0817/1",
        companyTags: [
          "Google",
          "Amazon"
        ]
      },
      {
        id: "unique-bsts",
        title: "Unique BSTs",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/unique-binary-search-trees/description/",
        companyTags: [
          "Google",
          "Amazon",
          "Oracle",
          "Tower Research Capital",
          "Microsoft"
        ]
      },
      {
        id: "rod-cutting",
        title: "Rod Cutting",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/description/",
        companyTags: [
          "Phone Pe",
          "Apple",
          "Oracle",
          "Adobe"
        ]
      },
      {
        id: "palindromic-partitioning",
        title: "Palindromic Partitioning",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/palindrome-partitioning/description/",
        companyTags: [
          "Infosys",
          "Amazon",
          "Microsoft",
          "Meta",
          "Google"
        ]
      },
      {
        id: "mcm",
        title: "MCM",
        difficulty: "Hard",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1",
        companyTags: [
          "Walmart",
          "Flipkart"
        ]
      }
    ]
  },
  {
    id: "TOPIC_7859_ID",
    title: "Day 32 : DP (Part 4)",
    order: 32,
    problemCount: 5,
    problems: [
      {
        id: "minimum-partitioning",
        title: "Minimum Partitioning",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/description/",
        companyTags: [
          "Google",
          "Uber",
          "Samsung",
          "Amazon",
          "Meta",
          "Arcesium"
        ]
      },
      {
        id: "max-product-subarray",
        title: "Max Product Subarray",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/maximum-product-subarray/description/",
        companyTags: [
          "Meta",
          "Amazon",
          "Uber",
          "Adobe",
          "DE Shaw",
          "Linkedin"
        ]
      },
      {
        id: "wildcard-pattern-matching",
        title: "Wildcard Pattern Matching",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/wildcard-matching/description/",
        companyTags: [
          "Apple",
          "Microsoft",
          "Amazon",
          "Ola",
          "Salesforce"
        ]
      },
      {
        id: "longest-bitonic-subsequence",
        title: "Longest Bitonic Subsequence",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/description/",
        companyTags: [
          "Amazon",
          "Microsoft",
          "Google",
          "Meta"
        ]
      },
      {
        id: "egg-dropping",
        title: "Egg Dropping",
        difficulty: "Hard",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/super-egg-drop/description/",
        companyTags: [
          "Samsung",
          "Philips",
          "Myntra",
          "Nearbuy",
          "Oracle",
          "DE Shaw",
          "Amazon",
          "Hike",
          "Google",
          "Goldman Sachs",
          "MakeMyTrip",
          "Unisys",
          "VMWare",
          "Microsoft"
        ]
      }
    ]
  },
  {
    id: "TOPIC_5398_ID",
    title: "Day 33 : Greedy",
    order: 33,
    problemCount: 6,
    problems: [
      {
        id: "assign-cookies",
        title: "Assign Cookies",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/assign-cookies/description/",
        companyTags: [
          "Amazon",
          "Google",
          "Adobe",
          "Uber"
        ]
      },
      {
        id: "indian-coins",
        title: "Indian Coins",
        difficulty: "Easy",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/-minimum-number-of-coins4426/1",
        companyTags: [
          "Microsoft",
          "Morgan Stanley",
          "Visa",
          "Snapdeal",
          "Accolite",
          "Synopsys",
          "Google",
          "Samsung",
          "Oracle",
          "Paytm",
          "Amazon"
        ]
      },
      {
        id: "fractional-knapsack",
        title: "Fractional Knapsack",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1",
        solutionUrl: "https://youtu.be/yggezlvUN2w?si=uv6eGxtpvOZq9JxZ",
        videoUrl: "https://youtu.be/yggezlvUN2w?si=uv6eGxtpvOZq9JxZ",
        companyTags: [
          "Microsoft"
        ]
      },
      {
        id: "job-scheduling",
        title: "Job Scheduling",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/job-sequencing-problem--170647/1",
        companyTags: [
          "Microsoft",
          "Adobe",
          "Airbnb",
          "Amazon"
        ]
      },
      {
        id: "activity-selection",
        title: "Activity Selection",
        difficulty: "Medium",
        platform: "GeeksforGeeks",
        problemUrl: "https://www.geeksforgeeks.org/problems/activity-selection-1587115620/1",
        companyTags: [
          "Microsoft",
          "Amazon",
          "Google",
          "Meta"
        ]
      },
      {
        id: "max-length-of-pair-chain",
        title: "Max Length of Pair Chain",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/maximum-length-of-pair-chain/description/",
        companyTags: [
          "Amazon",
          "Bloomberg",
          "Microsoft",
          "Adobe",
          "Swiggy"
        ]
      }
    ]
  },
  {
    id: "TOPIC_7967_ID",
    title: "Day 34 : Miscellaneous",
    order: 34,
    problemCount: 5,
    problems: [
      {
        id: "power-set",
        title: "Power Set",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/subsets/description/",
        companyTags: [
          "Google",
          "Adobe",
          "Atlassian",
          "TCS",
          "Fiverr",
          "Uber"
        ]
      },
      {
        id: "max-xor-of-two-nums",
        title: "Max XOR of Two Numbers",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/description/",
        companyTags: [
          "Goldman Sachs",
          "Google",
          "Amazon",
          "Adobe"
        ]
      },
      {
        id: "power-of-two",
        title: "Power of Two",
        difficulty: "Easy",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/power-of-two/description/",
        companyTags: [
          "Adobe",
          "Snapdeal",
          "TCS",
          "Google",
          "Apple"
        ]
      },
      {
        id: "xor-beauty-of-array",
        title: "XOR Beauty of Array",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/find-xor-beauty-of-array/description/",
        companyTags: [
          "Amazon"
        ]
      },
      {
        id: "watering-plants",
        title: "Watering Plants II",
        difficulty: "Medium",
        platform: "LeetCode",
        problemUrl: "https://leetcode.com/problems/watering-plants-ii/description/",
        companyTags: [
          "Google"
        ]
      }
    ]
  }
]
};

export const allDSASheets: DSASheet[] = [apnaCollegeSheet];
