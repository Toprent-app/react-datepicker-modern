'use strict'
function e(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e
}
Object.defineProperty(exports, '__esModule', {value: !0})
var t = require('react'),
  n = e(t),
  r = require('styled-components'),
  a = e(r),
  o = {
    lessThanXSeconds: {one: 'less than a second', other: 'less than {{count}} seconds'},
    xSeconds: {one: '1 second', other: '{{count}} seconds'},
    halfAMinute: 'half a minute',
    lessThanXMinutes: {one: 'less than a minute', other: 'less than {{count}} minutes'},
    xMinutes: {one: '1 minute', other: '{{count}} minutes'},
    aboutXHours: {one: 'about 1 hour', other: 'about {{count}} hours'},
    xHours: {one: '1 hour', other: '{{count}} hours'},
    xDays: {one: '1 day', other: '{{count}} days'},
    aboutXWeeks: {one: 'about 1 week', other: 'about {{count}} weeks'},
    xWeeks: {one: '1 week', other: '{{count}} weeks'},
    aboutXMonths: {one: 'about 1 month', other: 'about {{count}} months'},
    xMonths: {one: '1 month', other: '{{count}} months'},
    aboutXYears: {one: 'about 1 year', other: 'about {{count}} years'},
    xYears: {one: '1 year', other: '{{count}} years'},
    overXYears: {one: 'over 1 year', other: 'over {{count}} years'},
    almostXYears: {one: 'almost 1 year', other: 'almost {{count}} years'},
  }
function i(e) {
  return function (t) {
    var n = t || {},
      r = n.width ? String(n.width) : e.defaultWidth
    return e.formats[r] || e.formats[e.defaultWidth]
  }
}
var d = {
    date: i({
      formats: {
        full: 'EEEE, MMMM do, y',
        long: 'MMMM do, y',
        medium: 'MMM d, y',
        short: 'MM/dd/yyyy',
      },
      defaultWidth: 'full',
    }),
    time: i({
      formats: {full: 'h:mm:ss a zzzz', long: 'h:mm:ss a z', medium: 'h:mm:ss a', short: 'h:mm a'},
      defaultWidth: 'full',
    }),
    dateTime: i({
      formats: {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: '{{date}}, {{time}}',
        short: '{{date}}, {{time}}',
      },
      defaultWidth: 'full',
    }),
  },
  s = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P',
  }
function c(e) {
  return function (t, n) {
    var r,
      a = n || {}
    if ('formatting' === (a.context ? String(a.context) : 'standalone') && e.formattingValues) {
      var o = e.defaultFormattingWidth || e.defaultWidth,
        i = a.width ? String(a.width) : o
      r = e.formattingValues[i] || e.formattingValues[o]
    } else {
      var d = e.defaultWidth,
        s = a.width ? String(a.width) : e.defaultWidth
      r = e.values[s] || e.values[d]
    }
    return r[e.argumentCallback ? e.argumentCallback(t) : t]
  }
}
function l(e) {
  return function (t, n) {
    var r = String(t),
      a = n || {},
      o = a.width,
      i = (o && e.matchPatterns[o]) || e.matchPatterns[e.defaultMatchWidth],
      d = r.match(i)
    if (!d) return null
    var s,
      c = d[0],
      l = (o && e.parsePatterns[o]) || e.parsePatterns[e.defaultParseWidth]
    return (
      (s =
        '[object Array]' === Object.prototype.toString.call(l)
          ? (function (e, t) {
              for (var n = 0; n < e.length; n++) if (t(e[n])) return n
            })(l, function (e) {
              return e.test(c)
            })
          : (function (e, t) {
              for (var n in e) if (e.hasOwnProperty(n) && t(e[n])) return n
            })(l, function (e) {
              return e.test(c)
            })),
      (s = e.valueCallback ? e.valueCallback(s) : s),
      {value: (s = a.valueCallback ? a.valueCallback(s) : s), rest: r.slice(c.length)}
    )
  }
}
var u,
  p = {
    code: 'en-US',
    formatDistance: function (e, t, n) {
      var r
      return (
        (n = n || {}),
        (r =
          'string' == typeof o[e] ? o[e] : 1 === t ? o[e].one : o[e].other.replace('{{count}}', t)),
        n.addSuffix ? (n.comparison > 0 ? 'in ' + r : r + ' ago') : r
      )
    },
    formatLong: d,
    formatRelative: function (e, t, n, r) {
      return s[e]
    },
    localize: {
      ordinalNumber: function (e, t) {
        var n = Number(e),
          r = n % 100
        if (r > 20 || r < 10)
          switch (r % 10) {
            case 1:
              return n + 'st'
            case 2:
              return n + 'nd'
            case 3:
              return n + 'rd'
          }
        return n + 'th'
      },
      era: c({
        values: {
          narrow: ['B', 'A'],
          abbreviated: ['BC', 'AD'],
          wide: ['Before Christ', 'Anno Domini'],
        },
        defaultWidth: 'wide',
      }),
      quarter: c({
        values: {
          narrow: ['1', '2', '3', '4'],
          abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
          wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
        },
        defaultWidth: 'wide',
        argumentCallback: function (e) {
          return Number(e) - 1
        },
      }),
      month: c({
        values: {
          narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          abbreviated: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          wide: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        },
        defaultWidth: 'wide',
      }),
      day: c({
        values: {
          narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
        defaultWidth: 'wide',
      }),
      dayPeriod: c({
        values: {
          narrow: {
            am: 'a',
            pm: 'p',
            midnight: 'mi',
            noon: 'n',
            morning: 'morning',
            afternoon: 'afternoon',
            evening: 'evening',
            night: 'night',
          },
          abbreviated: {
            am: 'AM',
            pm: 'PM',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'morning',
            afternoon: 'afternoon',
            evening: 'evening',
            night: 'night',
          },
          wide: {
            am: 'a.m.',
            pm: 'p.m.',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'morning',
            afternoon: 'afternoon',
            evening: 'evening',
            night: 'night',
          },
        },
        defaultWidth: 'wide',
        formattingValues: {
          narrow: {
            am: 'a',
            pm: 'p',
            midnight: 'mi',
            noon: 'n',
            morning: 'in the morning',
            afternoon: 'in the afternoon',
            evening: 'in the evening',
            night: 'at night',
          },
          abbreviated: {
            am: 'AM',
            pm: 'PM',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'in the morning',
            afternoon: 'in the afternoon',
            evening: 'in the evening',
            night: 'at night',
          },
          wide: {
            am: 'a.m.',
            pm: 'p.m.',
            midnight: 'midnight',
            noon: 'noon',
            morning: 'in the morning',
            afternoon: 'in the afternoon',
            evening: 'in the evening',
            night: 'at night',
          },
        },
        defaultFormattingWidth: 'wide',
      }),
    },
    match: {
      ordinalNumber:
        ((u = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: function (e) {
            return parseInt(e, 10)
          },
        }),
        function (e, t) {
          var n = String(e),
            r = t || {},
            a = n.match(u.matchPattern)
          if (!a) return null
          var o = a[0],
            i = n.match(u.parsePattern)
          if (!i) return null
          var d = u.valueCallback ? u.valueCallback(i[0]) : i[0]
          return {value: (d = r.valueCallback ? r.valueCallback(d) : d), rest: n.slice(o.length)}
        }),
      era: l({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: {any: [/^b/i, /^(a|c)/i]},
        defaultParseWidth: 'any',
      }),
      quarter: l({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: {any: [/1/i, /2/i, /3/i, /4/i]},
        defaultParseWidth: 'any',
        valueCallback: function (e) {
          return e + 1
        },
      }),
      month: l({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        },
        defaultParseWidth: 'any',
      }),
      day: l({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        },
        defaultMatchWidth: 'wide',
        parsePatterns: {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
        },
        defaultParseWidth: 'any',
      }),
      dayPeriod: l({
        matchPatterns: {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
        },
        defaultMatchWidth: 'any',
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i,
          },
        },
        defaultParseWidth: 'any',
      }),
    },
    options: {weekStartsOn: 0, firstWeekContainsDate: 1},
  }
function f(e) {
  if (null === e || !0 === e || !1 === e) return NaN
  var t = Number(e)
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t)
}
function h(e, t) {
  if (t.length < e)
    throw new TypeError(
      e + ' argument' + (e > 1 ? 's' : '') + ' required, but only ' + t.length + ' present',
    )
}
function g(e) {
  h(1, arguments)
  var t = Object.prototype.toString.call(e)
  return e instanceof Date || ('object' == typeof e && '[object Date]' === t)
    ? new Date(e.getTime())
    : 'number' == typeof e || '[object Number]' === t
    ? new Date(e)
    : (('string' != typeof e && '[object String]' !== t) ||
        'undefined' == typeof console ||
        (console.warn(
          "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule",
        ),
        console.warn(new Error().stack)),
      new Date(NaN))
}
function m(e, t) {
  h(2, arguments)
  var n = g(e).getTime(),
    r = f(t)
  return new Date(n + r)
}
function b(e, t) {
  h(2, arguments)
  var n = f(t)
  return m(e, -n)
}
function v(e, t) {
  if (null == e)
    throw new TypeError('assign requires that input parameter not be null or undefined')
  for (var n in (t = t || {})) t.hasOwnProperty(n) && (e[n] = t[n])
  return e
}
function y(e, t) {
  switch (e) {
    case 'P':
      return t.date({width: 'short'})
    case 'PP':
      return t.date({width: 'medium'})
    case 'PPP':
      return t.date({width: 'long'})
    case 'PPPP':
    default:
      return t.date({width: 'full'})
  }
}
function w(e, t) {
  switch (e) {
    case 'p':
      return t.time({width: 'short'})
    case 'pp':
      return t.time({width: 'medium'})
    case 'ppp':
      return t.time({width: 'long'})
    case 'pppp':
    default:
      return t.time({width: 'full'})
  }
}
var D = {
  p: w,
  P: function (e, t) {
    var n,
      r = e.match(/(P+)(p+)?/),
      a = r[1],
      o = r[2]
    if (!o) return y(e, t)
    switch (a) {
      case 'P':
        n = t.dateTime({width: 'short'})
        break
      case 'PP':
        n = t.dateTime({width: 'medium'})
        break
      case 'PPP':
        n = t.dateTime({width: 'long'})
        break
      case 'PPPP':
      default:
        n = t.dateTime({width: 'full'})
    }
    return n.replace('{{date}}', y(a, t)).replace('{{time}}', w(o, t))
  },
}
function k(e) {
  return e.getTime() % 6e4
}
function x(e) {
  var t = new Date(e.getTime()),
    n = Math.ceil(t.getTimezoneOffset())
  return t.setSeconds(0, 0), 6e4 * n + (n > 0 ? (6e4 + k(t)) % 6e4 : k(t))
}
var C = ['D', 'DD'],
  T = ['YY', 'YYYY']
function S(e) {
  return -1 !== C.indexOf(e)
}
function B(e) {
  return -1 !== T.indexOf(e)
}
function R(e) {
  if ('YYYY' === e)
    throw new RangeError(
      'Use `yyyy` instead of `YYYY` for formatting years; see: https://git.io/fxCyr',
    )
  if ('YY' === e)
    throw new RangeError('Use `yy` instead of `YY` for formatting years; see: https://git.io/fxCyr')
  if ('D' === e)
    throw new RangeError(
      'Use `d` instead of `D` for formatting days of the month; see: https://git.io/fxCyr',
    )
  if ('DD' === e)
    throw new RangeError(
      'Use `dd` instead of `DD` for formatting days of the month; see: https://git.io/fxCyr',
    )
}
function W(e, t) {
  h(1, arguments)
  var n = t || {},
    r = n.locale,
    a = r && r.options && r.options.weekStartsOn,
    o = null == a ? 0 : f(a),
    i = null == n.weekStartsOn ? o : f(n.weekStartsOn)
  if (!(i >= 0 && i <= 6)) throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  var d = g(e),
    s = d.getUTCDay(),
    c = (s < i ? 7 : 0) + s - i
  return d.setUTCDate(d.getUTCDate() - c), d.setUTCHours(0, 0, 0, 0), d
}
function L(e, t) {
  h(1, arguments)
  var n = g(e, t),
    r = n.getUTCFullYear(),
    a = t || {},
    o = a.locale,
    i = o && o.options && o.options.firstWeekContainsDate,
    d = null == i ? 1 : f(i),
    s = null == a.firstWeekContainsDate ? d : f(a.firstWeekContainsDate)
  if (!(s >= 1 && s <= 7))
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively')
  var c = new Date(0)
  c.setUTCFullYear(r + 1, 0, s), c.setUTCHours(0, 0, 0, 0)
  var l = W(c, t),
    u = new Date(0)
  u.setUTCFullYear(r, 0, s), u.setUTCHours(0, 0, 0, 0)
  var p = W(u, t)
  return n.getTime() >= l.getTime() ? r + 1 : n.getTime() >= p.getTime() ? r : r - 1
}
function M(e, t, n) {
  h(2, arguments)
  var r = n || {},
    a = r.locale,
    o = a && a.options && a.options.weekStartsOn,
    i = null == o ? 0 : f(o),
    d = null == r.weekStartsOn ? i : f(r.weekStartsOn)
  if (!(d >= 0 && d <= 6)) throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  var s = g(e),
    c = f(t),
    l = s.getUTCDay(),
    u = c % 7,
    p = (u + 7) % 7,
    m = (p < d ? 7 : 0) + c - l
  return s.setUTCDate(s.getUTCDate() + m), s
}
function E(e) {
  h(1, arguments)
  var t = 1,
    n = g(e),
    r = n.getUTCDay(),
    a = (r < t ? 7 : 0) + r - t
  return n.setUTCDate(n.getUTCDate() - a), n.setUTCHours(0, 0, 0, 0), n
}
function F(e) {
  h(1, arguments)
  var t = g(e),
    n = t.getUTCFullYear(),
    r = new Date(0)
  r.setUTCFullYear(n + 1, 0, 4), r.setUTCHours(0, 0, 0, 0)
  var a = E(r),
    o = new Date(0)
  o.setUTCFullYear(n, 0, 4), o.setUTCHours(0, 0, 0, 0)
  var i = E(o)
  return t.getTime() >= a.getTime() ? n + 1 : t.getTime() >= i.getTime() ? n : n - 1
}
function P(e) {
  h(1, arguments)
  var t = F(e),
    n = new Date(0)
  n.setUTCFullYear(t, 0, 4), n.setUTCHours(0, 0, 0, 0)
  var r = E(n)
  return r
}
function H(e) {
  h(1, arguments)
  var t = g(e),
    n = E(t).getTime() - P(t).getTime()
  return Math.round(n / 6048e5) + 1
}
function I(e, t) {
  h(1, arguments)
  var n = t || {},
    r = n.locale,
    a = r && r.options && r.options.firstWeekContainsDate,
    o = null == a ? 1 : f(a),
    i = null == n.firstWeekContainsDate ? o : f(n.firstWeekContainsDate),
    d = L(e, t),
    s = new Date(0)
  s.setUTCFullYear(d, 0, i), s.setUTCHours(0, 0, 0, 0)
  var c = W(s, t)
  return c
}
function O(e, t) {
  h(1, arguments)
  var n = g(e),
    r = W(n, t).getTime() - I(n, t).getTime()
  return Math.round(r / 6048e5) + 1
}
var z = /^(1[0-2]|0?\d)/,
  U = /^(3[0-1]|[0-2]?\d)/,
  N = /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  A = /^(5[0-3]|[0-4]?\d)/,
  Y = /^(2[0-3]|[0-1]?\d)/,
  q = /^(2[0-4]|[0-1]?\d)/,
  G = /^(1[0-1]|0?\d)/,
  j = /^(1[0-2]|0?\d)/,
  X = /^[0-5]?\d/,
  Q = /^[0-5]?\d/,
  V = /^\d/,
  $ = /^\d{1,2}/,
  Z = /^\d{1,3}/,
  K = /^\d{1,4}/,
  _ = /^-?\d+/,
  J = /^-?\d/,
  ee = /^-?\d{1,2}/,
  te = /^-?\d{1,3}/,
  ne = /^-?\d{1,4}/,
  re = /^([+-])(\d{2})(\d{2})?|Z/,
  ae = /^([+-])(\d{2})(\d{2})|Z/,
  oe = /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  ie = /^([+-])(\d{2}):(\d{2})|Z/,
  de = /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
function se(e, t, n) {
  var r = t.match(e)
  if (!r) return null
  var a = parseInt(r[0], 10)
  return {value: n ? n(a) : a, rest: t.slice(r[0].length)}
}
function ce(e, t) {
  var n = t.match(e)
  return n
    ? 'Z' === n[0]
      ? {value: 0, rest: t.slice(1)}
      : {
          value:
            ('+' === n[1] ? 1 : -1) *
            (36e5 * (n[2] ? parseInt(n[2], 10) : 0) +
              6e4 * (n[3] ? parseInt(n[3], 10) : 0) +
              1e3 * (n[5] ? parseInt(n[5], 10) : 0)),
          rest: t.slice(n[0].length),
        }
    : null
}
function le(e, t) {
  return se(_, e, t)
}
function ue(e, t, n) {
  switch (e) {
    case 1:
      return se(V, t, n)
    case 2:
      return se($, t, n)
    case 3:
      return se(Z, t, n)
    case 4:
      return se(K, t, n)
    default:
      return se(new RegExp('^\\d{1,' + e + '}'), t, n)
  }
}
function pe(e, t, n) {
  switch (e) {
    case 1:
      return se(J, t, n)
    case 2:
      return se(ee, t, n)
    case 3:
      return se(te, t, n)
    case 4:
      return se(ne, t, n)
    default:
      return se(new RegExp('^-?\\d{1,' + e + '}'), t, n)
  }
}
function fe(e) {
  switch (e) {
    case 'morning':
      return 4
    case 'evening':
      return 17
    case 'pm':
    case 'noon':
    case 'afternoon':
      return 12
    case 'am':
    case 'midnight':
    case 'night':
    default:
      return 0
  }
}
function he(e, t) {
  var n,
    r = t > 0,
    a = r ? t : 1 - t
  if (a <= 50) n = e || 100
  else {
    var o = a + 50
    n = e + 100 * Math.floor(o / 100) - (e >= o % 100 ? 100 : 0)
  }
  return r ? n : 1 - n
}
var ge = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  me = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function be(e) {
  return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0)
}
var ve = {
    G: {
      priority: 140,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'G':
          case 'GG':
          case 'GGG':
            return n.era(e, {width: 'abbreviated'}) || n.era(e, {width: 'narrow'})
          case 'GGGGG':
            return n.era(e, {width: 'narrow'})
          case 'GGGG':
          default:
            return (
              n.era(e, {width: 'wide'}) ||
              n.era(e, {width: 'abbreviated'}) ||
              n.era(e, {width: 'narrow'})
            )
        }
      },
      set: function (e, t, n, r) {
        return (t.era = n), e.setUTCFullYear(n, 0, 1), e.setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: ['R', 'u', 't', 'T'],
    },
    y: {
      priority: 130,
      parse: function (e, t, n, r) {
        var a = function (e) {
          return {year: e, isTwoDigitYear: 'yy' === t}
        }
        switch (t) {
          case 'y':
            return ue(4, e, a)
          case 'yo':
            return n.ordinalNumber(e, {unit: 'year', valueCallback: a})
          default:
            return ue(t.length, e, a)
        }
      },
      validate: function (e, t, n) {
        return t.isTwoDigitYear || t.year > 0
      },
      set: function (e, t, n, r) {
        var a = e.getUTCFullYear()
        if (n.isTwoDigitYear) {
          var o = he(n.year, a)
          return e.setUTCFullYear(o, 0, 1), e.setUTCHours(0, 0, 0, 0), e
        }
        var i = 'era' in t && 1 !== t.era ? 1 - n.year : n.year
        return e.setUTCFullYear(i, 0, 1), e.setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T'],
    },
    Y: {
      priority: 130,
      parse: function (e, t, n, r) {
        var a = function (e) {
          return {year: e, isTwoDigitYear: 'YY' === t}
        }
        switch (t) {
          case 'Y':
            return ue(4, e, a)
          case 'Yo':
            return n.ordinalNumber(e, {unit: 'year', valueCallback: a})
          default:
            return ue(t.length, e, a)
        }
      },
      validate: function (e, t, n) {
        return t.isTwoDigitYear || t.year > 0
      },
      set: function (e, t, n, r) {
        var a = L(e, r)
        if (n.isTwoDigitYear) {
          var o = he(n.year, a)
          return e.setUTCFullYear(o, 0, r.firstWeekContainsDate), e.setUTCHours(0, 0, 0, 0), W(e, r)
        }
        var i = 'era' in t && 1 !== t.era ? 1 - n.year : n.year
        return e.setUTCFullYear(i, 0, r.firstWeekContainsDate), e.setUTCHours(0, 0, 0, 0), W(e, r)
      },
      incompatibleTokens: ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T'],
    },
    R: {
      priority: 130,
      parse: function (e, t, n, r) {
        return pe('R' === t ? 4 : t.length, e)
      },
      set: function (e, t, n, r) {
        var a = new Date(0)
        return a.setUTCFullYear(n, 0, 4), a.setUTCHours(0, 0, 0, 0), E(a)
      },
      incompatibleTokens: [
        'G',
        'y',
        'Y',
        'u',
        'Q',
        'q',
        'M',
        'L',
        'w',
        'd',
        'D',
        'e',
        'c',
        't',
        'T',
      ],
    },
    u: {
      priority: 130,
      parse: function (e, t, n, r) {
        return pe('u' === t ? 4 : t.length, e)
      },
      set: function (e, t, n, r) {
        return e.setUTCFullYear(n, 0, 1), e.setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T'],
    },
    Q: {
      priority: 120,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'Q':
          case 'QQ':
            return ue(t.length, e)
          case 'Qo':
            return n.ordinalNumber(e, {unit: 'quarter'})
          case 'QQQ':
            return (
              n.quarter(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.quarter(e, {width: 'narrow', context: 'formatting'})
            )
          case 'QQQQQ':
            return n.quarter(e, {width: 'narrow', context: 'formatting'})
          case 'QQQQ':
          default:
            return (
              n.quarter(e, {width: 'wide', context: 'formatting'}) ||
              n.quarter(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.quarter(e, {width: 'narrow', context: 'formatting'})
            )
        }
      },
      validate: function (e, t, n) {
        return t >= 1 && t <= 4
      },
      set: function (e, t, n, r) {
        return e.setUTCMonth(3 * (n - 1), 1), e.setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T'],
    },
    q: {
      priority: 120,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'q':
          case 'qq':
            return ue(t.length, e)
          case 'qo':
            return n.ordinalNumber(e, {unit: 'quarter'})
          case 'qqq':
            return (
              n.quarter(e, {width: 'abbreviated', context: 'standalone'}) ||
              n.quarter(e, {width: 'narrow', context: 'standalone'})
            )
          case 'qqqqq':
            return n.quarter(e, {width: 'narrow', context: 'standalone'})
          case 'qqqq':
          default:
            return (
              n.quarter(e, {width: 'wide', context: 'standalone'}) ||
              n.quarter(e, {width: 'abbreviated', context: 'standalone'}) ||
              n.quarter(e, {width: 'narrow', context: 'standalone'})
            )
        }
      },
      validate: function (e, t, n) {
        return t >= 1 && t <= 4
      },
      set: function (e, t, n, r) {
        return e.setUTCMonth(3 * (n - 1), 1), e.setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T'],
    },
    M: {
      priority: 110,
      parse: function (e, t, n, r) {
        var a = function (e) {
          return e - 1
        }
        switch (t) {
          case 'M':
            return se(z, e, a)
          case 'MM':
            return ue(2, e, a)
          case 'Mo':
            return n.ordinalNumber(e, {unit: 'month', valueCallback: a})
          case 'MMM':
            return (
              n.month(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.month(e, {width: 'narrow', context: 'formatting'})
            )
          case 'MMMMM':
            return n.month(e, {width: 'narrow', context: 'formatting'})
          case 'MMMM':
          default:
            return (
              n.month(e, {width: 'wide', context: 'formatting'}) ||
              n.month(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.month(e, {width: 'narrow', context: 'formatting'})
            )
        }
      },
      validate: function (e, t, n) {
        return t >= 0 && t <= 11
      },
      set: function (e, t, n, r) {
        return e.setUTCMonth(n, 1), e.setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T'],
    },
    L: {
      priority: 110,
      parse: function (e, t, n, r) {
        var a = function (e) {
          return e - 1
        }
        switch (t) {
          case 'L':
            return se(z, e, a)
          case 'LL':
            return ue(2, e, a)
          case 'Lo':
            return n.ordinalNumber(e, {unit: 'month', valueCallback: a})
          case 'LLL':
            return (
              n.month(e, {width: 'abbreviated', context: 'standalone'}) ||
              n.month(e, {width: 'narrow', context: 'standalone'})
            )
          case 'LLLLL':
            return n.month(e, {width: 'narrow', context: 'standalone'})
          case 'LLLL':
          default:
            return (
              n.month(e, {width: 'wide', context: 'standalone'}) ||
              n.month(e, {width: 'abbreviated', context: 'standalone'}) ||
              n.month(e, {width: 'narrow', context: 'standalone'})
            )
        }
      },
      validate: function (e, t, n) {
        return t >= 0 && t <= 11
      },
      set: function (e, t, n, r) {
        return e.setUTCMonth(n, 1), e.setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T'],
    },
    w: {
      priority: 100,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'w':
            return se(A, e)
          case 'wo':
            return n.ordinalNumber(e, {unit: 'week'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        return t >= 1 && t <= 53
      },
      set: function (e, t, n, r) {
        return W(
          (function (e, t, n) {
            h(2, arguments)
            var r = g(e),
              a = f(t),
              o = O(r, n) - a
            return r.setUTCDate(r.getUTCDate() - 7 * o), r
          })(e, n, r),
          r,
        )
      },
      incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T'],
    },
    I: {
      priority: 100,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'I':
            return se(A, e)
          case 'Io':
            return n.ordinalNumber(e, {unit: 'week'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        return t >= 1 && t <= 53
      },
      set: function (e, t, n, r) {
        return E(
          (function (e, t) {
            h(2, arguments)
            var n = g(e),
              r = f(t),
              a = H(n) - r
            return n.setUTCDate(n.getUTCDate() - 7 * a), n
          })(e, n, r),
          r,
        )
      },
      incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T'],
    },
    d: {
      priority: 90,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'd':
            return se(U, e)
          case 'do':
            return n.ordinalNumber(e, {unit: 'date'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        var r = be(e.getUTCFullYear()),
          a = e.getUTCMonth()
        return r ? t >= 1 && t <= me[a] : t >= 1 && t <= ge[a]
      },
      set: function (e, t, n, r) {
        return e.setUTCDate(n), e.setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T'],
    },
    D: {
      priority: 90,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'D':
          case 'DD':
            return se(N, e)
          case 'Do':
            return n.ordinalNumber(e, {unit: 'date'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        return be(e.getUTCFullYear()) ? t >= 1 && t <= 366 : t >= 1 && t <= 365
      },
      set: function (e, t, n, r) {
        return e.setUTCMonth(0, n), e.setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: [
        'Y',
        'R',
        'q',
        'Q',
        'M',
        'L',
        'w',
        'I',
        'd',
        'E',
        'i',
        'e',
        'c',
        't',
        'T',
      ],
    },
    E: {
      priority: 90,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'E':
          case 'EE':
          case 'EEE':
            return (
              n.day(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.day(e, {width: 'short', context: 'formatting'}) ||
              n.day(e, {width: 'narrow', context: 'formatting'})
            )
          case 'EEEEE':
            return n.day(e, {width: 'narrow', context: 'formatting'})
          case 'EEEEEE':
            return (
              n.day(e, {width: 'short', context: 'formatting'}) ||
              n.day(e, {width: 'narrow', context: 'formatting'})
            )
          case 'EEEE':
          default:
            return (
              n.day(e, {width: 'wide', context: 'formatting'}) ||
              n.day(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.day(e, {width: 'short', context: 'formatting'}) ||
              n.day(e, {width: 'narrow', context: 'formatting'})
            )
        }
      },
      validate: function (e, t, n) {
        return t >= 0 && t <= 6
      },
      set: function (e, t, n, r) {
        return (e = M(e, n, r)).setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: ['D', 'i', 'e', 'c', 't', 'T'],
    },
    e: {
      priority: 90,
      parse: function (e, t, n, r) {
        var a = function (e) {
          var t = 7 * Math.floor((e - 1) / 7)
          return ((e + r.weekStartsOn + 6) % 7) + t
        }
        switch (t) {
          case 'e':
          case 'ee':
            return ue(t.length, e, a)
          case 'eo':
            return n.ordinalNumber(e, {unit: 'day', valueCallback: a})
          case 'eee':
            return (
              n.day(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.day(e, {width: 'short', context: 'formatting'}) ||
              n.day(e, {width: 'narrow', context: 'formatting'})
            )
          case 'eeeee':
            return n.day(e, {width: 'narrow', context: 'formatting'})
          case 'eeeeee':
            return (
              n.day(e, {width: 'short', context: 'formatting'}) ||
              n.day(e, {width: 'narrow', context: 'formatting'})
            )
          case 'eeee':
          default:
            return (
              n.day(e, {width: 'wide', context: 'formatting'}) ||
              n.day(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.day(e, {width: 'short', context: 'formatting'}) ||
              n.day(e, {width: 'narrow', context: 'formatting'})
            )
        }
      },
      validate: function (e, t, n) {
        return t >= 0 && t <= 6
      },
      set: function (e, t, n, r) {
        return (e = M(e, n, r)).setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: [
        'y',
        'R',
        'u',
        'q',
        'Q',
        'M',
        'L',
        'I',
        'd',
        'D',
        'E',
        'i',
        'c',
        't',
        'T',
      ],
    },
    c: {
      priority: 90,
      parse: function (e, t, n, r) {
        var a = function (e) {
          var t = 7 * Math.floor((e - 1) / 7)
          return ((e + r.weekStartsOn + 6) % 7) + t
        }
        switch (t) {
          case 'c':
          case 'cc':
            return ue(t.length, e, a)
          case 'co':
            return n.ordinalNumber(e, {unit: 'day', valueCallback: a})
          case 'ccc':
            return (
              n.day(e, {width: 'abbreviated', context: 'standalone'}) ||
              n.day(e, {width: 'short', context: 'standalone'}) ||
              n.day(e, {width: 'narrow', context: 'standalone'})
            )
          case 'ccccc':
            return n.day(e, {width: 'narrow', context: 'standalone'})
          case 'cccccc':
            return (
              n.day(e, {width: 'short', context: 'standalone'}) ||
              n.day(e, {width: 'narrow', context: 'standalone'})
            )
          case 'cccc':
          default:
            return (
              n.day(e, {width: 'wide', context: 'standalone'}) ||
              n.day(e, {width: 'abbreviated', context: 'standalone'}) ||
              n.day(e, {width: 'short', context: 'standalone'}) ||
              n.day(e, {width: 'narrow', context: 'standalone'})
            )
        }
      },
      validate: function (e, t, n) {
        return t >= 0 && t <= 6
      },
      set: function (e, t, n, r) {
        return (e = M(e, n, r)).setUTCHours(0, 0, 0, 0), e
      },
      incompatibleTokens: [
        'y',
        'R',
        'u',
        'q',
        'Q',
        'M',
        'L',
        'I',
        'd',
        'D',
        'E',
        'i',
        'e',
        't',
        'T',
      ],
    },
    i: {
      priority: 90,
      parse: function (e, t, n, r) {
        var a = function (e) {
          return 0 === e ? 7 : e
        }
        switch (t) {
          case 'i':
          case 'ii':
            return ue(t.length, e)
          case 'io':
            return n.ordinalNumber(e, {unit: 'day'})
          case 'iii':
            return (
              n.day(e, {width: 'abbreviated', context: 'formatting', valueCallback: a}) ||
              n.day(e, {width: 'short', context: 'formatting', valueCallback: a}) ||
              n.day(e, {width: 'narrow', context: 'formatting', valueCallback: a})
            )
          case 'iiiii':
            return n.day(e, {width: 'narrow', context: 'formatting', valueCallback: a})
          case 'iiiiii':
            return (
              n.day(e, {width: 'short', context: 'formatting', valueCallback: a}) ||
              n.day(e, {width: 'narrow', context: 'formatting', valueCallback: a})
            )
          case 'iiii':
          default:
            return (
              n.day(e, {width: 'wide', context: 'formatting', valueCallback: a}) ||
              n.day(e, {width: 'abbreviated', context: 'formatting', valueCallback: a}) ||
              n.day(e, {width: 'short', context: 'formatting', valueCallback: a}) ||
              n.day(e, {width: 'narrow', context: 'formatting', valueCallback: a})
            )
        }
      },
      validate: function (e, t, n) {
        return t >= 1 && t <= 7
      },
      set: function (e, t, n, r) {
        return (
          (e = (function (e, t) {
            h(2, arguments)
            var n = f(t)
            n % 7 == 0 && (n -= 7)
            var r = 1,
              a = g(e),
              o = a.getUTCDay(),
              i = n % 7,
              d = (i + 7) % 7,
              s = (d < r ? 7 : 0) + n - o
            return a.setUTCDate(a.getUTCDate() + s), a
          })(e, n, r)).setUTCHours(0, 0, 0, 0),
          e
        )
      },
      incompatibleTokens: [
        'y',
        'Y',
        'u',
        'q',
        'Q',
        'M',
        'L',
        'w',
        'd',
        'D',
        'E',
        'e',
        'c',
        't',
        'T',
      ],
    },
    a: {
      priority: 80,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'a':
          case 'aa':
          case 'aaa':
            return (
              n.dayPeriod(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.dayPeriod(e, {width: 'narrow', context: 'formatting'})
            )
          case 'aaaaa':
            return n.dayPeriod(e, {width: 'narrow', context: 'formatting'})
          case 'aaaa':
          default:
            return (
              n.dayPeriod(e, {width: 'wide', context: 'formatting'}) ||
              n.dayPeriod(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.dayPeriod(e, {width: 'narrow', context: 'formatting'})
            )
        }
      },
      set: function (e, t, n, r) {
        return e.setUTCHours(fe(n), 0, 0, 0), e
      },
      incompatibleTokens: ['b', 'B', 'H', 'K', 'k', 't', 'T'],
    },
    b: {
      priority: 80,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'b':
          case 'bb':
          case 'bbb':
            return (
              n.dayPeriod(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.dayPeriod(e, {width: 'narrow', context: 'formatting'})
            )
          case 'bbbbb':
            return n.dayPeriod(e, {width: 'narrow', context: 'formatting'})
          case 'bbbb':
          default:
            return (
              n.dayPeriod(e, {width: 'wide', context: 'formatting'}) ||
              n.dayPeriod(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.dayPeriod(e, {width: 'narrow', context: 'formatting'})
            )
        }
      },
      set: function (e, t, n, r) {
        return e.setUTCHours(fe(n), 0, 0, 0), e
      },
      incompatibleTokens: ['a', 'B', 'H', 'K', 'k', 't', 'T'],
    },
    B: {
      priority: 80,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'B':
          case 'BB':
          case 'BBB':
            return (
              n.dayPeriod(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.dayPeriod(e, {width: 'narrow', context: 'formatting'})
            )
          case 'BBBBB':
            return n.dayPeriod(e, {width: 'narrow', context: 'formatting'})
          case 'BBBB':
          default:
            return (
              n.dayPeriod(e, {width: 'wide', context: 'formatting'}) ||
              n.dayPeriod(e, {width: 'abbreviated', context: 'formatting'}) ||
              n.dayPeriod(e, {width: 'narrow', context: 'formatting'})
            )
        }
      },
      set: function (e, t, n, r) {
        return e.setUTCHours(fe(n), 0, 0, 0), e
      },
      incompatibleTokens: ['a', 'b', 't', 'T'],
    },
    h: {
      priority: 70,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'h':
            return se(j, e)
          case 'ho':
            return n.ordinalNumber(e, {unit: 'hour'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        return t >= 1 && t <= 12
      },
      set: function (e, t, n, r) {
        var a = e.getUTCHours() >= 12
        return (
          a && n < 12
            ? e.setUTCHours(n + 12, 0, 0, 0)
            : a || 12 !== n
            ? e.setUTCHours(n, 0, 0, 0)
            : e.setUTCHours(0, 0, 0, 0),
          e
        )
      },
      incompatibleTokens: ['H', 'K', 'k', 't', 'T'],
    },
    H: {
      priority: 70,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'H':
            return se(Y, e)
          case 'Ho':
            return n.ordinalNumber(e, {unit: 'hour'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        return t >= 0 && t <= 23
      },
      set: function (e, t, n, r) {
        return e.setUTCHours(n, 0, 0, 0), e
      },
      incompatibleTokens: ['a', 'b', 'h', 'K', 'k', 't', 'T'],
    },
    K: {
      priority: 70,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'K':
            return se(G, e)
          case 'Ko':
            return n.ordinalNumber(e, {unit: 'hour'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        return t >= 0 && t <= 11
      },
      set: function (e, t, n, r) {
        return (
          e.getUTCHours() >= 12 && n < 12
            ? e.setUTCHours(n + 12, 0, 0, 0)
            : e.setUTCHours(n, 0, 0, 0),
          e
        )
      },
      incompatibleTokens: ['a', 'b', 'h', 'H', 'k', 't', 'T'],
    },
    k: {
      priority: 70,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'k':
            return se(q, e)
          case 'ko':
            return n.ordinalNumber(e, {unit: 'hour'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        return t >= 1 && t <= 24
      },
      set: function (e, t, n, r) {
        var a = n <= 24 ? n % 24 : n
        return e.setUTCHours(a, 0, 0, 0), e
      },
      incompatibleTokens: ['a', 'b', 'h', 'H', 'K', 't', 'T'],
    },
    m: {
      priority: 60,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'm':
            return se(X, e)
          case 'mo':
            return n.ordinalNumber(e, {unit: 'minute'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        return t >= 0 && t <= 59
      },
      set: function (e, t, n, r) {
        return e.setUTCMinutes(n, 0, 0), e
      },
      incompatibleTokens: ['t', 'T'],
    },
    s: {
      priority: 50,
      parse: function (e, t, n, r) {
        switch (t) {
          case 's':
            return se(Q, e)
          case 'so':
            return n.ordinalNumber(e, {unit: 'second'})
          default:
            return ue(t.length, e)
        }
      },
      validate: function (e, t, n) {
        return t >= 0 && t <= 59
      },
      set: function (e, t, n, r) {
        return e.setUTCSeconds(n, 0), e
      },
      incompatibleTokens: ['t', 'T'],
    },
    S: {
      priority: 30,
      parse: function (e, t, n, r) {
        return ue(t.length, e, function (e) {
          return Math.floor(e * Math.pow(10, 3 - t.length))
        })
      },
      set: function (e, t, n, r) {
        return e.setUTCMilliseconds(n), e
      },
      incompatibleTokens: ['t', 'T'],
    },
    X: {
      priority: 10,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'X':
            return ce(re, e)
          case 'XX':
            return ce(ae, e)
          case 'XXXX':
            return ce(oe, e)
          case 'XXXXX':
            return ce(de, e)
          case 'XXX':
          default:
            return ce(ie, e)
        }
      },
      set: function (e, t, n, r) {
        return t.timestampIsSet ? e : new Date(e.getTime() - n)
      },
      incompatibleTokens: ['t', 'T', 'x'],
    },
    x: {
      priority: 10,
      parse: function (e, t, n, r) {
        switch (t) {
          case 'x':
            return ce(re, e)
          case 'xx':
            return ce(ae, e)
          case 'xxxx':
            return ce(oe, e)
          case 'xxxxx':
            return ce(de, e)
          case 'xxx':
          default:
            return ce(ie, e)
        }
      },
      set: function (e, t, n, r) {
        return t.timestampIsSet ? e : new Date(e.getTime() - n)
      },
      incompatibleTokens: ['t', 'T', 'X'],
    },
    t: {
      priority: 40,
      parse: function (e, t, n, r) {
        return le(e)
      },
      set: function (e, t, n, r) {
        return [new Date(1e3 * n), {timestampIsSet: !0}]
      },
      incompatibleTokens: '*',
    },
    T: {
      priority: 20,
      parse: function (e, t, n, r) {
        return le(e)
      },
      set: function (e, t, n, r) {
        return [new Date(n), {timestampIsSet: !0}]
      },
      incompatibleTokens: '*',
    },
  },
  ye = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  we = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  De = /^'([^]*?)'?$/,
  ke = /''/g,
  xe = /\S/,
  Ce = /[a-zA-Z]/
function Te(e, t, n, r) {
  h(3, arguments)
  var a = String(e),
    o = String(t),
    i = r || {},
    d = i.locale || p
  if (!d.match) throw new RangeError('locale must contain match property')
  var s = d.options && d.options.firstWeekContainsDate,
    c = null == s ? 1 : f(s),
    l = null == i.firstWeekContainsDate ? c : f(i.firstWeekContainsDate)
  if (!(l >= 1 && l <= 7))
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively')
  var u = d.options && d.options.weekStartsOn,
    m = null == u ? 0 : f(u),
    y = null == i.weekStartsOn ? m : f(i.weekStartsOn)
  if (!(y >= 0 && y <= 6)) throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  if ('' === o) return '' === a ? g(n) : new Date(NaN)
  var w,
    k = {firstWeekContainsDate: l, weekStartsOn: y, locale: d},
    C = [{priority: 10, set: Se, index: 0}],
    T = o
      .match(we)
      .map(function (e) {
        var t = e[0]
        return 'p' === t || 'P' === t ? (0, D[t])(e, d.formatLong, k) : e
      })
      .join('')
      .match(ye),
    W = []
  for (w = 0; w < T.length; w++) {
    var L = T[w]
    !i.useAdditionalWeekYearTokens && B(L) && R(L), !i.useAdditionalDayOfYearTokens && S(L) && R(L)
    var M = L[0],
      E = ve[M]
    if (E) {
      var F = E.incompatibleTokens
      if (Array.isArray(F)) {
        for (var P = void 0, H = 0; H < W.length; H++) {
          var I = W[H].token
          if (-1 !== F.indexOf(I) || I === M) {
            P = W[H]
            break
          }
        }
        if (P)
          throw new RangeError(
            "The format string mustn't contain `"
              .concat(P.fullToken, '` and `')
              .concat(L, '` at the same time'),
          )
      } else if ('*' === E.incompatibleTokens && W.length)
        throw new RangeError(
          "The format string mustn't contain `".concat(L, '` and any other token at the same time'),
        )
      W.push({token: M, fullToken: L})
      var O = E.parse(a, L, d.match, k)
      if (!O) return new Date(NaN)
      C.push({
        priority: E.priority,
        set: E.set,
        validate: E.validate,
        value: O.value,
        index: C.length,
      }),
        (a = O.rest)
    } else {
      if (M.match(Ce))
        throw new RangeError(
          'Format string contains an unescaped latin alphabet character `' + M + '`',
        )
      if (("''" === L ? (L = "'") : "'" === M && (L = Be(L)), 0 !== a.indexOf(L)))
        return new Date(NaN)
      a = a.slice(L.length)
    }
  }
  if (a.length > 0 && xe.test(a)) return new Date(NaN)
  var z = C.map(function (e) {
      return e.priority
    })
      .sort(function (e, t) {
        return t - e
      })
      .filter(function (e, t, n) {
        return n.indexOf(e) === t
      })
      .map(function (e) {
        return C.filter(function (t) {
          return t.priority === e
        }).reverse()
      })
      .map(function (e) {
        return e[0]
      }),
    U = g(n)
  if (isNaN(U)) return new Date(NaN)
  var N = b(U, x(U)),
    A = {}
  for (w = 0; w < z.length; w++) {
    var Y = z[w]
    if (Y.validate && !Y.validate(N, Y.value, k)) return new Date(NaN)
    var q = Y.set(N, A, Y.value, k)
    q[0] ? ((N = q[0]), v(A, q[1])) : (N = q)
  }
  return N
}
function Se(e, t) {
  if (t.timestampIsSet) return e
  var n = new Date(0)
  return (
    n.setFullYear(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()),
    n.setHours(e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds()),
    n
  )
}
function Be(e) {
  return e.match(De)[1].replace(ke, "'")
}
function Re(e) {
  h(1, arguments)
  var t = g(e)
  return !isNaN(t)
}
function We(e, t) {
  for (var n = e < 0 ? '-' : '', r = Math.abs(e).toString(); r.length < t; ) r = '0' + r
  return n + r
}
var Le = {
  G: function (e, t, n) {
    var r = e.getUTCFullYear() > 0 ? 1 : 0
    switch (t) {
      case 'G':
      case 'GG':
      case 'GGG':
        return n.era(r, {width: 'abbreviated'})
      case 'GGGGG':
        return n.era(r, {width: 'narrow'})
      case 'GGGG':
      default:
        return n.era(r, {width: 'wide'})
    }
  },
  y: function (e, t, n) {
    if ('yo' === t) {
      var r = e.getUTCFullYear(),
        a = r > 0 ? r : 1 - r
      return n.ordinalNumber(a, {unit: 'year'})
    }
    return (function (e, t) {
      var n = e.getUTCFullYear(),
        r = n > 0 ? n : 1 - n
      return We('yy' === t ? r % 100 : r, t.length)
    })(e, t)
  },
  Y: function (e, t, n, r) {
    var a = L(e, r),
      o = a > 0 ? a : 1 - a
    return 'YY' === t
      ? We(o % 100, 2)
      : 'Yo' === t
      ? n.ordinalNumber(o, {unit: 'year'})
      : We(o, t.length)
  },
  R: function (e, t) {
    return We(F(e), t.length)
  },
  u: function (e, t) {
    return We(e.getUTCFullYear(), t.length)
  },
  Q: function (e, t, n) {
    var r = Math.ceil((e.getUTCMonth() + 1) / 3)
    switch (t) {
      case 'Q':
        return String(r)
      case 'QQ':
        return We(r, 2)
      case 'Qo':
        return n.ordinalNumber(r, {unit: 'quarter'})
      case 'QQQ':
        return n.quarter(r, {width: 'abbreviated', context: 'formatting'})
      case 'QQQQQ':
        return n.quarter(r, {width: 'narrow', context: 'formatting'})
      case 'QQQQ':
      default:
        return n.quarter(r, {width: 'wide', context: 'formatting'})
    }
  },
  q: function (e, t, n) {
    var r = Math.ceil((e.getUTCMonth() + 1) / 3)
    switch (t) {
      case 'q':
        return String(r)
      case 'qq':
        return We(r, 2)
      case 'qo':
        return n.ordinalNumber(r, {unit: 'quarter'})
      case 'qqq':
        return n.quarter(r, {width: 'abbreviated', context: 'standalone'})
      case 'qqqqq':
        return n.quarter(r, {width: 'narrow', context: 'standalone'})
      case 'qqqq':
      default:
        return n.quarter(r, {width: 'wide', context: 'standalone'})
    }
  },
  M: function (e, t, n) {
    var r = e.getUTCMonth()
    switch (t) {
      case 'M':
      case 'MM':
        return (function (e, t) {
          var n = e.getUTCMonth()
          return 'M' === t ? String(n + 1) : We(n + 1, 2)
        })(e, t)
      case 'Mo':
        return n.ordinalNumber(r + 1, {unit: 'month'})
      case 'MMM':
        return n.month(r, {width: 'abbreviated', context: 'formatting'})
      case 'MMMMM':
        return n.month(r, {width: 'narrow', context: 'formatting'})
      case 'MMMM':
      default:
        return n.month(r, {width: 'wide', context: 'formatting'})
    }
  },
  L: function (e, t, n) {
    var r = e.getUTCMonth()
    switch (t) {
      case 'L':
        return String(r + 1)
      case 'LL':
        return We(r + 1, 2)
      case 'Lo':
        return n.ordinalNumber(r + 1, {unit: 'month'})
      case 'LLL':
        return n.month(r, {width: 'abbreviated', context: 'standalone'})
      case 'LLLLL':
        return n.month(r, {width: 'narrow', context: 'standalone'})
      case 'LLLL':
      default:
        return n.month(r, {width: 'wide', context: 'standalone'})
    }
  },
  w: function (e, t, n, r) {
    var a = O(e, r)
    return 'wo' === t ? n.ordinalNumber(a, {unit: 'week'}) : We(a, t.length)
  },
  I: function (e, t, n) {
    var r = H(e)
    return 'Io' === t ? n.ordinalNumber(r, {unit: 'week'}) : We(r, t.length)
  },
  d: function (e, t, n) {
    return 'do' === t
      ? n.ordinalNumber(e.getUTCDate(), {unit: 'date'})
      : (function (e, t) {
          return We(e.getUTCDate(), t.length)
        })(e, t)
  },
  D: function (e, t, n) {
    var r = (function (e) {
      h(1, arguments)
      var t = g(e),
        n = t.getTime()
      t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
      var r = t.getTime(),
        a = n - r
      return Math.floor(a / 864e5) + 1
    })(e)
    return 'Do' === t ? n.ordinalNumber(r, {unit: 'dayOfYear'}) : We(r, t.length)
  },
  E: function (e, t, n) {
    var r = e.getUTCDay()
    switch (t) {
      case 'E':
      case 'EE':
      case 'EEE':
        return n.day(r, {width: 'abbreviated', context: 'formatting'})
      case 'EEEEE':
        return n.day(r, {width: 'narrow', context: 'formatting'})
      case 'EEEEEE':
        return n.day(r, {width: 'short', context: 'formatting'})
      case 'EEEE':
      default:
        return n.day(r, {width: 'wide', context: 'formatting'})
    }
  },
  e: function (e, t, n, r) {
    var a = e.getUTCDay(),
      o = (a - r.weekStartsOn + 8) % 7 || 7
    switch (t) {
      case 'e':
        return String(o)
      case 'ee':
        return We(o, 2)
      case 'eo':
        return n.ordinalNumber(o, {unit: 'day'})
      case 'eee':
        return n.day(a, {width: 'abbreviated', context: 'formatting'})
      case 'eeeee':
        return n.day(a, {width: 'narrow', context: 'formatting'})
      case 'eeeeee':
        return n.day(a, {width: 'short', context: 'formatting'})
      case 'eeee':
      default:
        return n.day(a, {width: 'wide', context: 'formatting'})
    }
  },
  c: function (e, t, n, r) {
    var a = e.getUTCDay(),
      o = (a - r.weekStartsOn + 8) % 7 || 7
    switch (t) {
      case 'c':
        return String(o)
      case 'cc':
        return We(o, t.length)
      case 'co':
        return n.ordinalNumber(o, {unit: 'day'})
      case 'ccc':
        return n.day(a, {width: 'abbreviated', context: 'standalone'})
      case 'ccccc':
        return n.day(a, {width: 'narrow', context: 'standalone'})
      case 'cccccc':
        return n.day(a, {width: 'short', context: 'standalone'})
      case 'cccc':
      default:
        return n.day(a, {width: 'wide', context: 'standalone'})
    }
  },
  i: function (e, t, n) {
    var r = e.getUTCDay(),
      a = 0 === r ? 7 : r
    switch (t) {
      case 'i':
        return String(a)
      case 'ii':
        return We(a, t.length)
      case 'io':
        return n.ordinalNumber(a, {unit: 'day'})
      case 'iii':
        return n.day(r, {width: 'abbreviated', context: 'formatting'})
      case 'iiiii':
        return n.day(r, {width: 'narrow', context: 'formatting'})
      case 'iiiiii':
        return n.day(r, {width: 'short', context: 'formatting'})
      case 'iiii':
      default:
        return n.day(r, {width: 'wide', context: 'formatting'})
    }
  },
  a: function (e, t, n) {
    var r = e.getUTCHours() / 12 >= 1 ? 'pm' : 'am'
    switch (t) {
      case 'a':
      case 'aa':
      case 'aaa':
        return n.dayPeriod(r, {width: 'abbreviated', context: 'formatting'})
      case 'aaaaa':
        return n.dayPeriod(r, {width: 'narrow', context: 'formatting'})
      case 'aaaa':
      default:
        return n.dayPeriod(r, {width: 'wide', context: 'formatting'})
    }
  },
  b: function (e, t, n) {
    var r,
      a = e.getUTCHours()
    switch (((r = 12 === a ? 'noon' : 0 === a ? 'midnight' : a / 12 >= 1 ? 'pm' : 'am'), t)) {
      case 'b':
      case 'bb':
      case 'bbb':
        return n.dayPeriod(r, {width: 'abbreviated', context: 'formatting'})
      case 'bbbbb':
        return n.dayPeriod(r, {width: 'narrow', context: 'formatting'})
      case 'bbbb':
      default:
        return n.dayPeriod(r, {width: 'wide', context: 'formatting'})
    }
  },
  B: function (e, t, n) {
    var r,
      a = e.getUTCHours()
    switch (((r = a >= 17 ? 'evening' : a >= 12 ? 'afternoon' : a >= 4 ? 'morning' : 'night'), t)) {
      case 'B':
      case 'BB':
      case 'BBB':
        return n.dayPeriod(r, {width: 'abbreviated', context: 'formatting'})
      case 'BBBBB':
        return n.dayPeriod(r, {width: 'narrow', context: 'formatting'})
      case 'BBBB':
      default:
        return n.dayPeriod(r, {width: 'wide', context: 'formatting'})
    }
  },
  h: function (e, t, n) {
    if ('ho' === t) {
      var r = e.getUTCHours() % 12
      return 0 === r && (r = 12), n.ordinalNumber(r, {unit: 'hour'})
    }
    return (function (e, t) {
      return We(e.getUTCHours() % 12 || 12, t.length)
    })(e, t)
  },
  H: function (e, t, n) {
    return 'Ho' === t
      ? n.ordinalNumber(e.getUTCHours(), {unit: 'hour'})
      : (function (e, t) {
          return We(e.getUTCHours(), t.length)
        })(e, t)
  },
  K: function (e, t, n) {
    var r = e.getUTCHours() % 12
    return 'Ko' === t ? n.ordinalNumber(r, {unit: 'hour'}) : We(r, t.length)
  },
  k: function (e, t, n) {
    var r = e.getUTCHours()
    return 0 === r && (r = 24), 'ko' === t ? n.ordinalNumber(r, {unit: 'hour'}) : We(r, t.length)
  },
  m: function (e, t, n) {
    return 'mo' === t
      ? n.ordinalNumber(e.getUTCMinutes(), {unit: 'minute'})
      : (function (e, t) {
          return We(e.getUTCMinutes(), t.length)
        })(e, t)
  },
  s: function (e, t, n) {
    return 'so' === t
      ? n.ordinalNumber(e.getUTCSeconds(), {unit: 'second'})
      : (function (e, t) {
          return We(e.getUTCSeconds(), t.length)
        })(e, t)
  },
  S: function (e, t) {
    return (function (e, t) {
      var n = t.length,
        r = e.getUTCMilliseconds()
      return We(Math.floor(r * Math.pow(10, n - 3)), t.length)
    })(e, t)
  },
  X: function (e, t, n, r) {
    var a = (r._originalDate || e).getTimezoneOffset()
    if (0 === a) return 'Z'
    switch (t) {
      case 'X':
        return Ee(a)
      case 'XXXX':
      case 'XX':
        return Fe(a)
      case 'XXXXX':
      case 'XXX':
      default:
        return Fe(a, ':')
    }
  },
  x: function (e, t, n, r) {
    var a = (r._originalDate || e).getTimezoneOffset()
    switch (t) {
      case 'x':
        return Ee(a)
      case 'xxxx':
      case 'xx':
        return Fe(a)
      case 'xxxxx':
      case 'xxx':
      default:
        return Fe(a, ':')
    }
  },
  O: function (e, t, n, r) {
    var a = (r._originalDate || e).getTimezoneOffset()
    switch (t) {
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + Me(a, ':')
      case 'OOOO':
      default:
        return 'GMT' + Fe(a, ':')
    }
  },
  z: function (e, t, n, r) {
    var a = (r._originalDate || e).getTimezoneOffset()
    switch (t) {
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + Me(a, ':')
      case 'zzzz':
      default:
        return 'GMT' + Fe(a, ':')
    }
  },
  t: function (e, t, n, r) {
    var a = r._originalDate || e
    return We(Math.floor(a.getTime() / 1e3), t.length)
  },
  T: function (e, t, n, r) {
    return We((r._originalDate || e).getTime(), t.length)
  },
}
function Me(e, t) {
  var n = e > 0 ? '-' : '+',
    r = Math.abs(e),
    a = Math.floor(r / 60),
    o = r % 60
  if (0 === o) return n + String(a)
  var i = t || ''
  return n + String(a) + i + We(o, 2)
}
function Ee(e, t) {
  return e % 60 == 0 ? (e > 0 ? '-' : '+') + We(Math.abs(e) / 60, 2) : Fe(e, t)
}
function Fe(e, t) {
  var n = t || '',
    r = e > 0 ? '-' : '+',
    a = Math.abs(e)
  return r + We(Math.floor(a / 60), 2) + n + We(a % 60, 2)
}
var Pe = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  He = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  Ie = /^'([^]*?)'?$/,
  Oe = /''/g,
  ze = /[a-zA-Z]/
function Ue(e, t, n) {
  h(2, arguments)
  var r = String(t),
    a = n || {},
    o = a.locale || p,
    i = o.options && o.options.firstWeekContainsDate,
    d = null == i ? 1 : f(i),
    s = null == a.firstWeekContainsDate ? d : f(a.firstWeekContainsDate)
  if (!(s >= 1 && s <= 7))
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively')
  var c = o.options && o.options.weekStartsOn,
    l = null == c ? 0 : f(c),
    u = null == a.weekStartsOn ? l : f(a.weekStartsOn)
  if (!(u >= 0 && u <= 6)) throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  if (!o.localize) throw new RangeError('locale must contain localize property')
  if (!o.formatLong) throw new RangeError('locale must contain formatLong property')
  var m = g(e)
  if (!Re(m)) throw new RangeError('Invalid time value')
  var v = x(m),
    y = b(m, v),
    w = {firstWeekContainsDate: s, weekStartsOn: u, locale: o, _originalDate: m},
    k = r
      .match(He)
      .map(function (e) {
        var t = e[0]
        return 'p' === t || 'P' === t ? (0, D[t])(e, o.formatLong, w) : e
      })
      .join('')
      .match(Pe)
      .map(function (e) {
        if ("''" === e) return "'"
        var t = e[0]
        if ("'" === t) return Ne(e)
        var n = Le[t]
        if (n)
          return (
            !a.useAdditionalWeekYearTokens && B(e) && R(e),
            !a.useAdditionalDayOfYearTokens && S(e) && R(e),
            n(y, e, o.localize, w)
          )
        if (t.match(ze))
          throw new RangeError(
            'Format string contains an unescaped latin alphabet character `' + t + '`',
          )
        return e
      })
      .join('')
  return k
}
function Ne(e) {
  return e.match(Ie)[1].replace(Oe, "'")
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function Ae(
  e,
  t,
) {
  h(2, arguments)
  var n = g(e),
    r = f(t)
  return isNaN(r) ? new Date(NaN) : r ? (n.setDate(n.getDate() + r), n) : n
}
function Ye(e, t) {
  h(1, arguments)
  var n = e || {},
    r = g(n.start),
    a = g(n.end),
    o = a.getTime()
  if (!(r.getTime() <= o)) throw new RangeError('Invalid interval')
  var i = [],
    d = r
  d.setHours(0, 0, 0, 0)
  var s = t && 'step' in t ? Number(t.step) : 1
  if (s < 1 || isNaN(s)) throw new RangeError('`options.step` must be a number greater than 1')
  for (; d.getTime() <= o; ) i.push(g(d)), d.setDate(d.getDate() + s), d.setHours(0, 0, 0, 0)
  return i
}
function qe(e, t) {
  h(1, arguments)
  var n = t || {},
    r = n.locale,
    a = r && r.options && r.options.weekStartsOn,
    o = null == a ? 0 : f(a),
    i = null == n.weekStartsOn ? o : f(n.weekStartsOn)
  if (!(i >= 0 && i <= 6)) throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  var d = g(e),
    s = d.getDay(),
    c = 6 + (s < i ? -7 : 0) - (s - i)
  return d.setDate(d.getDate() + c), d.setHours(23, 59, 59, 999), d
}
function Ge(e) {
  h(1, arguments)
  var t = g(e)
  return t.setDate(1), t.setHours(0, 0, 0, 0), t
}
function je(e, t) {
  h(1, arguments)
  var n = t || {},
    r = n.locale,
    a = r && r.options && r.options.weekStartsOn,
    o = null == a ? 0 : f(a),
    i = null == n.weekStartsOn ? o : f(n.weekStartsOn)
  if (!(i >= 0 && i <= 6)) throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  var d = g(e),
    s = d.getDay(),
    c = (s < i ? 7 : 0) + s - i
  return d.setDate(d.getDate() - c), d.setHours(0, 0, 0, 0), d
}
var Xe = function (e) {
    return Ue(e, 'dd')
  },
  Qe = function (e) {
    return Ue(e, 'eeeeee')
  },
  Ve = function (e) {
    return Ue(e, 'MMMM yyyy')
  }
function $e(e) {
  var n = e.year,
    r = e.month,
    a = e.firstDayOfWeek,
    o = void 0 === a ? 1 : a,
    i = e.dayLabelFormat,
    d = void 0 === i ? Xe : i,
    s = e.weekdayLabelFormat,
    c = void 0 === s ? Qe : s,
    l = e.monthLabelFormat,
    u = void 0 === l ? Ve : l
  return {
    days: t.useMemo(
      function () {
        return (function (e) {
          var t = e.year,
            n = e.month,
            r = e.firstDayOfWeek,
            a = void 0 === r ? 1 : r,
            o = e.dayLabelFormat,
            i =
              void 0 === o
                ? function (e) {
                    return Ue(e, 'dd')
                  }
                : o,
            d = new Date(t, n),
            s = Ge(d),
            c = (function (e) {
              h(1, arguments)
              var t = g(e),
                n = t.getDay()
              return n
            })(s),
            l = (function (e) {
              h(1, arguments)
              var t = g(e),
                n = t.getMonth()
              return t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(23, 59, 59, 999), t
            })(d)
          return (function () {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length
            var r = Array(e),
              a = 0
            for (t = 0; t < n; t++)
              for (var o = arguments[t], i = 0, d = o.length; i < d; i++, a++) r[a] = o[i]
            return r
          })(
            Array.from(Array(c >= a ? c - a : 6 - a + c + 1).keys()).fill(0),
            Ye({start: s, end: l}).map(function (e) {
              return {date: e, dayLabel: i(e)}
            }),
          )
        })({year: n, month: r, firstDayOfWeek: o, dayLabelFormat: d})
      },
      [n, r, o, d],
    ),
    weekdayLabels: t.useMemo(
      function () {
        return (function (e) {
          var t = void 0 === e ? {} : e,
            n = t.firstDayOfWeek,
            r = void 0 === n ? 1 : n,
            a = t.weekdayLabelFormat,
            o =
              void 0 === a
                ? function (e) {
                    return Ue(e, 'iiiiii')
                  }
                : a,
            i = new Date()
          return Ye({start: Ae(je(i), r), end: Ae(qe(i), r)}).reduce(function (e, t) {
            return e.push(o(t)), e
          }, [])
        })({firstDayOfWeek: o, weekdayLabelFormat: c})
      },
      [o, c],
    ),
    monthLabel: u(new Date(n, r)),
  }
}
function Ze(e, t) {
  h(2, arguments)
  var n = g(e),
    r = g(t)
  return n.getTime() < r.getTime()
}
function Ke(e, t) {
  h(2, arguments)
  var n = g(e),
    r = g(t)
  return n.getTime() > r.getTime()
}
function _e(e, t) {
  h(2, arguments)
  var n = t || {},
    r = g(e).getTime(),
    a = g(n.start).getTime(),
    o = g(n.end).getTime()
  if (!(a <= o)) throw new RangeError('Invalid interval')
  return r >= a && r <= o
}
function Je(e) {
  h(1, arguments)
  var t = g(e)
  return t.setHours(0, 0, 0, 0), t
}
function et(e, t) {
  h(2, arguments)
  var n = Je(e),
    r = Je(t)
  return n.getTime() === r.getTime()
}
function tt(e, t) {
  h(2, arguments)
  var n = g(e),
    r = f(t)
  if (isNaN(r)) return new Date(NaN)
  if (!r) return n
  var a = n.getDate(),
    o = new Date(n.getTime())
  o.setMonth(n.getMonth() + r + 1, 0)
  var i = o.getDate()
  return a >= i ? o : (n.setFullYear(o.getFullYear(), o.getMonth(), a), n)
}
var nt = function (e, t) {
  return (
    void 0 === e && (e = []),
    e.some(function (e) {
      return et(t, e)
    })
  )
}
function rt(e) {
  var t = Ge(e)
  return {
    year: (function (e) {
      h(1, arguments)
      var t = g(e),
        n = t.getFullYear()
      return n
    })(t),
    month: (function (e) {
      h(1, arguments)
      var t = g(e),
        n = t.getMonth()
      return n
    })(t),
    date: t,
  }
}
function at(e, t) {
  var n = rt(t || Je(Date.now())),
    r = n.date,
    a = [n]
  return (
    e > 1 &&
      (a = Array.from(Array(e - 1).keys()).reduce(function (e) {
        return (r = tt(e[e.length - 1].date, 1)), e.concat([rt(r)])
      }, a)),
    a
  )
}
function ot(e, t, n, r) {
  var a = e[r ? (n > 0 ? 0 : e.length - r) : n > 0 ? e.length - 1 : 0].date
  return Array.from(Array(t).keys()).reduce(function (e) {
    return (
      (a = 0 === e.length ? tt(a, n) : tt(a, n >= 0 ? 1 : -1)),
      n > 0 ? e.concat([rt(a)]) : [rt(a)].concat(e)
    )
  }, [])
}
function it(e, t, n) {
  return e && 'string' == typeof t ? Ue(e, t) : e && 'function' == typeof t ? t(e) : n
}
function dt(e) {
  var t = e.startDate,
    n = e.endDate,
    r = e.isDateBlocked,
    a = e.minBookingDays,
    o = e.exactMinBookingDays,
    i = e.minBookingDate,
    d = e.maxBookingDate,
    s = !i || !Ze(t, Ae(i, -1)),
    c = !d || !Ke(Ae(t, a - 1), d)
  return !(
    (!t || 1 !== a || n || r(t)) &&
    ((t && a > 1 && !n && !o) || (t && a > 0 && o && s && c) || (t && a > 0 && o && !i && !d)
      ? Ye({start: t, end: Ae(t, a - 1)}).some(function (e) {
          return r(e)
        })
      : !t ||
        !n ||
        o ||
        Ze(n, Ae(t, a - 1)) ||
        Ye({start: t, end: n}).some(function (e) {
          return r(e)
        }))
  )
}
var st = 'startDate',
  ct = 'endDate'
function lt(e) {
  var n = e.startDate,
    r = e.endDate,
    a = e.focusedInput,
    o = e.minBookingDate,
    i = e.maxBookingDate,
    d = e.onDatesChange,
    s = e.initialVisibleMonth,
    c = e.exactMinBookingDays,
    l = void 0 !== c && c,
    u = e.minBookingDays,
    p = void 0 === u ? 1 : u,
    f = e.numberOfMonths,
    h = void 0 === f ? 2 : f,
    g = e.firstDayOfWeek,
    m = void 0 === g ? 1 : g,
    b = e.isDateBlocked,
    v =
      void 0 === b
        ? function () {
            return !1
          }
        : b,
    y = e.unavailableDates,
    w = void 0 === y ? [] : y,
    D = e.changeActiveMonthOnSelect,
    k = void 0 === D || D,
    x = t.useState(function () {
      return at(h, n || s || null)
    }),
    C = x[0],
    T = x[1],
    S = t.useState(null),
    B = S[0],
    R = S[1],
    W = t.useState(n),
    L = W[0],
    M = W[1]
  t.useEffect(function () {
    return (
      'undefined' != typeof window &&
        window.addEventListener &&
        window.addEventListener('keydown', H),
      function () {
        window.removeEventListener && window.removeEventListener('keydown', H)
      }
    )
  })
  var E = function (e) {
      return nt(w, e) || v(e)
    },
    F = function (e) {
      M(e), (!L || (L && !et(e, L))) && T(at(h, e))
    },
    P = function (e) {
      return (function (e) {
        var t = e.date,
          n = e.minBookingDate,
          r = e.maxBookingDate,
          a = e.isDateBlockedFn,
          o = e.startDate,
          i = e.endDate,
          d = e.minBookingDays,
          s = void 0 === d ? 1 : d,
          c = e.unavailableDates,
          l = void 0 === c ? [] : c,
          u = n ? new Date(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0) : n,
          p = r ? new Date(r.getFullYear(), r.getMonth(), r.getDate(), 0, 0, 0) : r
        return !!(
          nt(l, t) ||
          (u && Ze(t, u)) ||
          (p && Ke(t, p)) ||
          (o && !i && s > 1 && _e(t, {start: o, end: Ae(o, s - 2)})) ||
          (a && a(t))
        )
      })({
        date: e,
        minBookingDate: o,
        maxBookingDate: i,
        startDate: n,
        endDate: r,
        minBookingDays: p,
        isDateBlockedFn: E,
      })
    }
  function H(e) {
    if (
      ('ArrowRight' === e.key ||
        'ArrowLeft' === e.key ||
        'ArrowDown' === e.key ||
        'ArrowUp' === e.key) &&
      !L
    ) {
      var t = C[0]
      F(t.date), T(at(h, t.date))
    }
  }
  var I = t.useCallback(
      function () {
        T(ot(C, h, -1)), M(null)
      },
      [C, h],
    ),
    O = t.useCallback(
      function () {
        T(ot(C, h, -1, 1)), M(null)
      },
      [C, h],
    ),
    z = t.useCallback(
      function () {
        T(ot(C, h, 1)), M(null)
      },
      [C, h],
    ),
    U = t.useCallback(
      function () {
        T(ot(C, h, 1, 1)), M(null)
      },
      [C, h],
    ),
    N = t.useCallback(
      function (e) {
        T(at(h, e)), M(null)
      },
      [h],
    ),
    A = t.useCallback(
      function (e) {
        void 0 === e && (e = 1), T(ot(C, h, -(12 * e - h + 1))), M(null)
      },
      [C, h],
    ),
    Y = t.useCallback(
      function (e) {
        void 0 === e && (e = 1), T(ot(C, h, 12 * e - h + 1)), M(null)
      },
      [C, h],
    )
  return {
    firstDayOfWeek: m,
    activeMonths: C,
    isDateSelected: function (e) {
      return (function (e, t, n) {
        return !(!t || !n) && _e(e, {start: t, end: n})
      })(e, n, r)
    },
    isDateHovered: function (e) {
      return (function (e) {
        var t = e.date,
          n = e.startDate,
          r = e.endDate,
          a = e.isDateBlocked,
          o = e.hoveredDate,
          i = e.minBookingDays
        return o && i > 1 && e.exactMinBookingDays && _e(t, {start: o, end: Ae(o, i - 1)})
          ? !Ye({start: o, end: Ae(o, i - 1)}).some(function (e) {
              return a(e)
            })
          : n && !r && o && _e(t, {start: n, end: Ae(n, i - 1)}) && et(n, o) && i > 1
          ? !Ye({start: n, end: Ae(n, i - 1)}).some(function (e) {
              return a(e)
            })
          : !(
              !n ||
              r ||
              !o ||
              Ze(o, n) ||
              !_e(t, {start: n, end: o}) ||
              Ye({start: n, end: o}).some(function (e) {
                return a(e)
              })
            )
      })({
        date: e,
        hoveredDate: B,
        startDate: n,
        endDate: r,
        minBookingDays: p,
        exactMinBookingDays: l,
        isDateBlocked: E,
      })
    },
    isFirstOrLastSelectedDate: function (e) {
      return (function (e, t, n) {
        return !!((t && et(e, t)) || (n && et(e, n)))
      })(e, n, r)
    },
    isStartDate: function (e) {
      return (function (e, t) {
        return !(!t || !et(e, t))
      })(e, n)
    },
    isEndDate: function (e) {
      return (function (e, t) {
        return !(!t || !et(e, t))
      })(e, r)
    },
    isDateBlocked: P,
    numberOfMonths: h,
    isDateFocused: function (e) {
      return !!L && et(e, L)
    },
    focusedDate: L,
    hoveredDate: B,
    onResetDates: function () {
      d({startDate: null, endDate: null, focusedInput: 'startDate'})
    },
    onDateHover: function (e) {
      if (e) {
        if (e) {
          var t = !P(e) || (n && et(e, n)),
            a = !o || !Ze(e, Ae(o, -1)),
            d = !i || !Ke(e, i),
            s = Ae(e, p - 1),
            c = !o || !Ze(s, o),
            u = !i || !Ke(s, i),
            f = l && p > 1 && a && d && c && u,
            h = n && !r && !l && a && d,
            g = !(p > 1 && n) || _e(e, {start: n, end: Ae(n, p - 2)}),
            m = n && et(e, n) && g
          t && (f || h || m) ? R(e) : null !== B && R(null)
        }
      } else R(null)
    },
    onDateSelect: function (e) {
      ;('endDate' === a || 'startDate' === a) &&
      p > 0 &&
      l &&
      dt({
        minBookingDays: p,
        exactMinBookingDays: l,
        minBookingDate: o,
        maxBookingDate: i,
        isDateBlocked: E,
        startDate: e,
        endDate: null,
      })
        ? d({startDate: e, endDate: Ae(e, p - 1), focusedInput: null})
        : (('endDate' === a && n && Ze(e, n)) || ('startDate' === a && r && Ke(e, r))) &&
          !l &&
          dt({minBookingDays: p, isDateBlocked: E, startDate: e, endDate: null})
        ? d({endDate: null, startDate: e, focusedInput: 'endDate'})
        : 'startDate' === a &&
          !l &&
          dt({minBookingDays: p, isDateBlocked: E, endDate: r, startDate: e})
        ? d({endDate: r, startDate: e, focusedInput: 'endDate'})
        : 'startDate' === a &&
          !l &&
          dt({minBookingDays: p, isDateBlocked: E, endDate: null, startDate: e})
        ? d({endDate: null, startDate: e, focusedInput: 'endDate'})
        : 'endDate' === a &&
          n &&
          !Ze(e, n) &&
          !l &&
          dt({minBookingDays: p, isDateBlocked: E, startDate: n, endDate: e}) &&
          d({startDate: n, endDate: e, focusedInput: null}),
        'endDate' !== a && (!L || (L && !et(e, L))) && k && T(at(h, e))
    },
    onDateFocus: F,
    goToPreviousMonths: I,
    goToPreviousMonthsByOneMonth: O,
    goToNextMonths: z,
    goToNextMonthsByOneMonth: U,
    goToDate: N,
    goToPreviousYear: A,
    goToNextYear: Y,
  }
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ut = function () {
  return (ut =
    Object.assign ||
    function (e) {
      for (var t, n = 1, r = arguments.length; n < r; n++)
        for (var a in (t = arguments[n]))
          Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a])
      return e
    }).apply(this, arguments)
}
function pt(e, t) {
  return Object.defineProperty ? Object.defineProperty(e, 'raw', {value: t}) : (e.raw = t), e
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var ft = Object.getOwnPropertySymbols,
  ht = Object.prototype.hasOwnProperty,
  gt = Object.prototype.propertyIsEnumerable
function mt(e) {
  if (null == e) throw new TypeError('Object.assign cannot be called with null or undefined')
  return Object(e)
}
var bt = (function () {
    try {
      if (!Object.assign) return !1
      var e = new String('abc')
      if (((e[5] = 'de'), '5' === Object.getOwnPropertyNames(e)[0])) return !1
      for (var t = {}, n = 0; n < 10; n++) t['_' + String.fromCharCode(n)] = n
      if (
        '0123456789' !==
        Object.getOwnPropertyNames(t)
          .map(function (e) {
            return t[e]
          })
          .join('')
      )
        return !1
      var r = {}
      return (
        'abcdefghijklmnopqrst'.split('').forEach(function (e) {
          r[e] = e
        }),
        'abcdefghijklmnopqrst' === Object.keys(Object.assign({}, r)).join('')
      )
    } catch (e) {
      return !1
    }
  })()
    ? Object.assign
    : function (e, t) {
        for (var n, r, a = mt(e), o = 1; o < arguments.length; o++) {
          for (var i in (n = Object(arguments[o]))) ht.call(n, i) && (a[i] = n[i])
          if (ft) {
            r = ft(n)
            for (var d = 0; d < r.length; d++) gt.call(n, r[d]) && (a[r[d]] = n[r[d]])
          }
        }
        return a
      },
  vt = function (e, t) {
    var n = bt({}, e, t)
    for (var r in e) {
      var a
      e[r] && 'object' == typeof t[r] && bt(n, (((a = {})[r] = bt(e[r], t[r])), a))
    }
    return n
  },
  yt = {
    breakpoints: [40, 52, 64].map(function (e) {
      return e + 'em'
    }),
  },
  wt = function (e) {
    return '@media screen and (min-width: ' + e + ')'
  },
  Dt = function (e, t) {
    return kt(t, e, e)
  },
  kt = function (e, t, n, r, a) {
    for (t = t && t.split ? t.split('.') : [t], r = 0; r < t.length; r++) e = e ? e[t[r]] : a
    return e === a ? n : e
  },
  xt = function e(t) {
    var n = {},
      r = function (e) {
        var r,
          a,
          o = {},
          i = !1,
          d = e.theme && e.theme.disableStyledSystemCache
        for (var s in e)
          if (t[s]) {
            var c = t[s],
              l = e[s],
              u = kt(e.theme, c.scale, c.defaults)
            if ('object' != typeof l) bt(o, c(l, u, e))
            else {
              if (
                ((n.breakpoints =
                  (!d && n.breakpoints) || kt(e.theme, 'breakpoints', yt.breakpoints)),
                Array.isArray(l))
              ) {
                ;(n.media = (!d && n.media) || [null].concat(n.breakpoints.map(wt))),
                  (o = vt(o, Ct(n.media, c, u, l, e)))
                continue
              }
              null !== l && ((o = vt(o, Tt(n.breakpoints, c, u, l, e))), (i = !0))
            }
          }
        return (
          i &&
            ((r = o),
            (a = {}),
            Object.keys(r)
              .sort(function (e, t) {
                return e.localeCompare(t, void 0, {numeric: !0, sensitivity: 'base'})
              })
              .forEach(function (e) {
                a[e] = r[e]
              }),
            (o = a)),
          o
        )
      }
    ;(r.config = t), (r.propNames = Object.keys(t)), (r.cache = n)
    var a = Object.keys(t).filter(function (e) {
      return 'config' !== e
    })
    return (
      a.length > 1 &&
        a.forEach(function (n) {
          var a
          r[n] = e((((a = {})[n] = t[n]), a))
        }),
      r
    )
  },
  Ct = function (e, t, n, r, a) {
    var o = {}
    return (
      r.slice(0, e.length).forEach(function (r, i) {
        var d,
          s = e[i],
          c = t(r, n, a)
        s ? bt(o, (((d = {})[s] = bt({}, o[s], c)), d)) : bt(o, c)
      }),
      o
    )
  },
  Tt = function (e, t, n, r, a) {
    var o = {}
    for (var i in r) {
      var d = e[i],
        s = t(r[i], n, a)
      if (d) {
        var c,
          l = wt(d)
        bt(o, (((c = {})[l] = bt({}, o[l], s)), c))
      } else bt(o, s)
    }
    return o
  },
  St = function (e) {
    var t = e.properties,
      n = e.property,
      r = e.scale,
      a = e.transform,
      o = void 0 === a ? Dt : a,
      i = e.defaultScale
    t = t || [n]
    var d = function (e, n, r) {
      var a = {},
        i = o(e, n, r)
      if (null !== i)
        return (
          t.forEach(function (e) {
            a[e] = i
          }),
          a
        )
    }
    return (d.scale = r), (d.defaults = i), d
  },
  Bt = function (e) {
    void 0 === e && (e = {})
    var t = {}
    return (
      Object.keys(e).forEach(function (n) {
        var r = e[n]
        t[n] = !0 !== r ? ('function' != typeof r ? St(r) : r) : St({property: n, scale: n})
      }),
      xt(t)
    )
  },
  Rt = function () {
    for (var e = {}, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r]
    n.forEach(function (t) {
      t && t.config && bt(e, t.config)
    })
    var a = xt(e)
    return a
  },
  Wt = Bt({
    width: {
      property: 'width',
      scale: 'sizes',
      transform: function (e, t) {
        return kt(
          t,
          e,
          !(function (e) {
            return 'number' == typeof e && !isNaN(e)
          })(e) || e > 1
            ? e
            : 100 * e + '%',
        )
      },
    },
    height: {property: 'height', scale: 'sizes'},
    minWidth: {property: 'minWidth', scale: 'sizes'},
    minHeight: {property: 'minHeight', scale: 'sizes'},
    maxWidth: {property: 'maxWidth', scale: 'sizes'},
    maxHeight: {property: 'maxHeight', scale: 'sizes'},
    size: {properties: ['width', 'height'], scale: 'sizes'},
    overflow: !0,
    overflowX: !0,
    overflowY: !0,
    display: !0,
    verticalAlign: !0,
  }),
  Lt = {
    color: {property: 'color', scale: 'colors'},
    backgroundColor: {property: 'backgroundColor', scale: 'colors'},
    opacity: !0,
  }
Lt.bg = Lt.backgroundColor
var Mt = Bt(Lt),
  Et = Bt({
    fontFamily: {property: 'fontFamily', scale: 'fonts'},
    fontSize: {
      property: 'fontSize',
      scale: 'fontSizes',
      defaultScale: [12, 14, 16, 20, 24, 32, 48, 64, 72],
    },
    fontWeight: {property: 'fontWeight', scale: 'fontWeights'},
    lineHeight: {property: 'lineHeight', scale: 'lineHeights'},
    letterSpacing: {property: 'letterSpacing', scale: 'letterSpacings'},
    textAlign: !0,
    fontStyle: !0,
  }),
  Ft = Bt({
    alignItems: !0,
    alignContent: !0,
    justifyItems: !0,
    justifyContent: !0,
    flexWrap: !0,
    flexDirection: !0,
    flex: !0,
    flexGrow: !0,
    flexShrink: !0,
    flexBasis: !0,
    justifySelf: !0,
    alignSelf: !0,
    order: !0,
  }),
  Pt = {space: [0, 4, 8, 16, 32, 64, 128, 256, 512]},
  Ht = Bt({
    gridGap: {property: 'gridGap', scale: 'space', defaultScale: Pt.space},
    gridColumnGap: {property: 'gridColumnGap', scale: 'space', defaultScale: Pt.space},
    gridRowGap: {property: 'gridRowGap', scale: 'space', defaultScale: Pt.space},
    gridColumn: !0,
    gridRow: !0,
    gridAutoFlow: !0,
    gridAutoColumns: !0,
    gridAutoRows: !0,
    gridTemplateColumns: !0,
    gridTemplateRows: !0,
    gridTemplateAreas: !0,
    gridArea: !0,
  }),
  It = {
    border: {property: 'border', scale: 'borders'},
    borderWidth: {property: 'borderWidth', scale: 'borderWidths'},
    borderStyle: {property: 'borderStyle', scale: 'borderStyles'},
    borderColor: {property: 'borderColor', scale: 'colors'},
    borderRadius: {property: 'borderRadius', scale: 'radii'},
    borderTop: {property: 'borderTop', scale: 'borders'},
    borderTopLeftRadius: {property: 'borderTopLeftRadius', scale: 'radii'},
    borderTopRightRadius: {property: 'borderTopRightRadius', scale: 'radii'},
    borderRight: {property: 'borderRight', scale: 'borders'},
    borderBottom: {property: 'borderBottom', scale: 'borders'},
    borderBottomLeftRadius: {property: 'borderBottomLeftRadius', scale: 'radii'},
    borderBottomRightRadius: {property: 'borderBottomRightRadius', scale: 'radii'},
    borderLeft: {property: 'borderLeft', scale: 'borders'},
    borderX: {properties: ['borderLeft', 'borderRight'], scale: 'borders'},
    borderY: {properties: ['borderTop', 'borderBottom'], scale: 'borders'},
    borderTopWidth: {property: 'borderTopWidth', scale: 'borderWidths'},
    borderTopColor: {property: 'borderTopColor', scale: 'colors'},
    borderTopStyle: {property: 'borderTopStyle', scale: 'borderStyles'},
  }
;(It.borderTopLeftRadius = {property: 'borderTopLeftRadius', scale: 'radii'}),
  (It.borderTopRightRadius = {property: 'borderTopRightRadius', scale: 'radii'}),
  (It.borderBottomWidth = {property: 'borderBottomWidth', scale: 'borderWidths'}),
  (It.borderBottomColor = {property: 'borderBottomColor', scale: 'colors'}),
  (It.borderBottomStyle = {property: 'borderBottomStyle', scale: 'borderStyles'}),
  (It.borderBottomLeftRadius = {property: 'borderBottomLeftRadius', scale: 'radii'}),
  (It.borderBottomRightRadius = {property: 'borderBottomRightRadius', scale: 'radii'}),
  (It.borderLeftWidth = {property: 'borderLeftWidth', scale: 'borderWidths'}),
  (It.borderLeftColor = {property: 'borderLeftColor', scale: 'colors'}),
  (It.borderLeftStyle = {property: 'borderLeftStyle', scale: 'borderStyles'}),
  (It.borderRightWidth = {property: 'borderRightWidth', scale: 'borderWidths'}),
  (It.borderRightColor = {property: 'borderRightColor', scale: 'colors'}),
  (It.borderRightStyle = {property: 'borderRightStyle', scale: 'borderStyles'})
var Ot = Bt(It),
  zt = {
    background: !0,
    backgroundImage: !0,
    backgroundSize: !0,
    backgroundPosition: !0,
    backgroundRepeat: !0,
  }
;(zt.bgImage = zt.backgroundImage),
  (zt.bgSize = zt.backgroundSize),
  (zt.bgPosition = zt.backgroundPosition),
  (zt.bgRepeat = zt.backgroundRepeat)
var Ut = Bt(zt),
  Nt = {space: [0, 4, 8, 16, 32, 64, 128, 256, 512]},
  At = Bt({
    position: !0,
    zIndex: {property: 'zIndex', scale: 'zIndices'},
    top: {property: 'top', scale: 'space', defaultScale: Nt.space},
    right: {property: 'right', scale: 'space', defaultScale: Nt.space},
    bottom: {property: 'bottom', scale: 'space', defaultScale: Nt.space},
    left: {property: 'left', scale: 'space', defaultScale: Nt.space},
  }),
  Yt = {space: [0, 4, 8, 16, 32, 64, 128, 256, 512]},
  qt = function (e) {
    return 'number' == typeof e && !isNaN(e)
  },
  Gt = function (e, t) {
    if (!qt(e)) return kt(t, e, e)
    var n = e < 0,
      r = Math.abs(e),
      a = kt(t, r, r)
    return qt(a) ? a * (n ? -1 : 1) : n ? '-' + a : a
  },
  jt = {}
;(jt.margin = {
  margin: {property: 'margin', scale: 'space', transform: Gt, defaultScale: Yt.space},
  marginTop: {property: 'marginTop', scale: 'space', transform: Gt, defaultScale: Yt.space},
  marginRight: {property: 'marginRight', scale: 'space', transform: Gt, defaultScale: Yt.space},
  marginBottom: {property: 'marginBottom', scale: 'space', transform: Gt, defaultScale: Yt.space},
  marginLeft: {property: 'marginLeft', scale: 'space', transform: Gt, defaultScale: Yt.space},
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: Gt,
    defaultScale: Yt.space,
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transform: Gt,
    defaultScale: Yt.space,
  },
}),
  (jt.margin.m = jt.margin.margin),
  (jt.margin.mt = jt.margin.marginTop),
  (jt.margin.mr = jt.margin.marginRight),
  (jt.margin.mb = jt.margin.marginBottom),
  (jt.margin.ml = jt.margin.marginLeft),
  (jt.margin.mx = jt.margin.marginX),
  (jt.margin.my = jt.margin.marginY),
  (jt.padding = {
    padding: {property: 'padding', scale: 'space', defaultScale: Yt.space},
    paddingTop: {property: 'paddingTop', scale: 'space', defaultScale: Yt.space},
    paddingRight: {property: 'paddingRight', scale: 'space', defaultScale: Yt.space},
    paddingBottom: {property: 'paddingBottom', scale: 'space', defaultScale: Yt.space},
    paddingLeft: {property: 'paddingLeft', scale: 'space', defaultScale: Yt.space},
    paddingX: {properties: ['paddingLeft', 'paddingRight'], scale: 'space', defaultScale: Yt.space},
    paddingY: {properties: ['paddingTop', 'paddingBottom'], scale: 'space', defaultScale: Yt.space},
  }),
  (jt.padding.p = jt.padding.padding),
  (jt.padding.pt = jt.padding.paddingTop),
  (jt.padding.pr = jt.padding.paddingRight),
  (jt.padding.pb = jt.padding.paddingBottom),
  (jt.padding.pl = jt.padding.paddingLeft),
  (jt.padding.px = jt.padding.paddingX),
  (jt.padding.py = jt.padding.paddingY)
var Xt = Rt(Bt(jt.margin), Bt(jt.padding)),
  Qt = Bt({
    boxShadow: {property: 'boxShadow', scale: 'shadows'},
    textShadow: {property: 'textShadow', scale: 'shadows'},
  })
function Vt() {
  return (Vt =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t]
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
      }
      return e
    }).apply(this, arguments)
}
var $t,
  Zt,
  Kt,
  _t = function (e, t, n, r, a) {
    for (t = t && t.split ? t.split('.') : [t], r = 0; r < t.length; r++) e = e ? e[t[r]] : a
    return e === a ? n : e
  },
  Jt = [40, 52, 64].map(function (e) {
    return e + 'em'
  }),
  en = {
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  },
  tn = {
    bg: 'backgroundColor',
    m: 'margin',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mx: 'marginX',
    my: 'marginY',
    p: 'padding',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    px: 'paddingX',
    py: 'paddingY',
  },
  nn = {
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    size: ['width', 'height'],
  },
  rn = {
    color: 'colors',
    backgroundColor: 'colors',
    borderColor: 'colors',
    margin: 'space',
    marginTop: 'space',
    marginRight: 'space',
    marginBottom: 'space',
    marginLeft: 'space',
    marginX: 'space',
    marginY: 'space',
    padding: 'space',
    paddingTop: 'space',
    paddingRight: 'space',
    paddingBottom: 'space',
    paddingLeft: 'space',
    paddingX: 'space',
    paddingY: 'space',
    top: 'space',
    right: 'space',
    bottom: 'space',
    left: 'space',
    gridGap: 'space',
    gridColumnGap: 'space',
    gridRowGap: 'space',
    gap: 'space',
    columnGap: 'space',
    rowGap: 'space',
    fontFamily: 'fonts',
    fontSize: 'fontSizes',
    fontWeight: 'fontWeights',
    lineHeight: 'lineHeights',
    letterSpacing: 'letterSpacings',
    border: 'borders',
    borderTop: 'borders',
    borderRight: 'borders',
    borderBottom: 'borders',
    borderLeft: 'borders',
    borderWidth: 'borderWidths',
    borderStyle: 'borderStyles',
    borderRadius: 'radii',
    borderTopRightRadius: 'radii',
    borderTopLeftRadius: 'radii',
    borderBottomRightRadius: 'radii',
    borderBottomLeftRadius: 'radii',
    borderTopWidth: 'borderWidths',
    borderTopColor: 'colors',
    borderTopStyle: 'borderStyles',
    borderBottomWidth: 'borderWidths',
    borderBottomColor: 'colors',
    borderBottomStyle: 'borderStyles',
    borderLeftWidth: 'borderWidths',
    borderLeftColor: 'colors',
    borderLeftStyle: 'borderStyles',
    borderRightWidth: 'borderWidths',
    borderRightColor: 'colors',
    borderRightStyle: 'borderStyles',
    outlineColor: 'colors',
    boxShadow: 'shadows',
    textShadow: 'shadows',
    zIndex: 'zIndices',
    width: 'sizes',
    minWidth: 'sizes',
    maxWidth: 'sizes',
    height: 'sizes',
    minHeight: 'sizes',
    maxHeight: 'sizes',
    flexBasis: 'sizes',
    size: 'sizes',
    fill: 'colors',
    stroke: 'colors',
  },
  an = function (e, t) {
    if ('number' != typeof t || t >= 0) return _t(e, t, t)
    var n = Math.abs(t),
      r = _t(e, n, n)
    return 'string' == typeof r ? '-' + r : -1 * r
  },
  on = [
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginX',
    'marginY',
    'top',
    'bottom',
    'left',
    'right',
  ].reduce(function (e, t) {
    var n
    return Vt({}, e, (((n = {})[t] = an), n))
  }, {}),
  dn = function e(t) {
    return function (n) {
      void 0 === n && (n = {})
      var r = Vt({}, en, {}, n.theme || n),
        a = {},
        o = (function (e) {
          return function (t) {
            var n = {},
              r = _t(t, 'breakpoints', Jt),
              a = [null].concat(
                r.map(function (e) {
                  return '@media screen and (min-width: ' + e + ')'
                }),
              )
            for (var o in e) {
              var i = 'function' == typeof e[o] ? e[o](t) : e[o]
              if (null != i)
                if (Array.isArray(i))
                  for (var d = 0; d < i.slice(0, a.length).length; d++) {
                    var s = a[d]
                    s ? ((n[s] = n[s] || {}), null != i[d] && (n[s][o] = i[d])) : (n[o] = i[d])
                  }
                else n[o] = i
            }
            return n
          }
        })('function' == typeof t ? t(r) : t)(r)
      for (var i in o) {
        var d = o[i],
          s = 'function' == typeof d ? d(r) : d
        if ('variant' !== i)
          if (s && 'object' == typeof s) a[i] = e(s)(r)
          else {
            var c = _t(tn, i, i),
              l = _t(rn, c),
              u = _t(r, l, _t(r, c, {})),
              p = _t(on, c, _t)(u, s, s)
            if (nn[c]) for (var f = nn[c], h = 0; h < f.length; h++) a[f[h]] = p
            else a[c] = p
          }
        else a = Vt({}, a, {}, e(_t(r, s))(r))
      }
      return a
    }
  },
  sn = function (e) {
    var t,
      n,
      r = e.scale,
      a = e.prop,
      o = void 0 === a ? 'variant' : a,
      i = e.variants,
      d = void 0 === i ? {} : i,
      s = e.key
    ;((n = Object.keys(d).length
      ? function (e, t, n) {
          return dn(kt(t, e, null))(n.theme)
        }
      : function (e, t) {
          return kt(t, e, null)
        }).scale = r || s),
      (n.defaults = d)
    var c = (((t = {})[o] = n), t)
    return xt(c)
  },
  cn =
    (sn({key: 'buttons'}),
    sn({key: 'textStyles', prop: 'textStyle'}),
    sn({key: 'colorStyles', prop: 'colors'}),
    Wt.width),
  ln = Wt.height,
  un = Wt.minHeight,
  pn = Wt.display,
  fn = Wt.overflow,
  hn = Mt.opacity,
  gn = Et.fontSize,
  mn = Et.fontFamily,
  bn = Et.fontWeight,
  vn = Et.lineHeight,
  yn = Ft.alignItems,
  wn = Ft.justifyContent,
  Dn = Ft.flexWrap,
  kn = Ft.flexDirection,
  xn = Ft.flex,
  Cn = Ht.gridGap,
  Tn = Ht.gridColumnGap,
  Sn = Ht.gridRowGap,
  Bn = Ht.gridAutoFlow,
  Rn = Ht.gridAutoColumns,
  Wn = Ht.gridAutoRows,
  Ln = Ht.gridTemplateColumns,
  Mn = Ht.gridTemplateRows,
  En = Ht.gridTemplateAreas,
  Fn = Ht.gridArea,
  Pn = Ot.borderRadius,
  Hn = At.zIndex,
  In = At.top,
  On = At.right,
  zn = At.bottom,
  Un = At.left,
  Nn = function (e) {
    var t = e.prop,
      n = e.cssProperty,
      r = e.alias,
      a = e.key,
      o = e.transformValue,
      i = e.scale,
      d = e.properties,
      s = {}
    return (
      (s[t] = St({properties: d, property: n || t, scale: a, defaultScale: i, transform: o})),
      r && (s[r] = s[t]),
      xt(s)
    )
  },
  An = {
    datepickerStartDatePlaceholder: 'Select',
    datepickerStartDateLabel: 'Start date:',
    datepickerEndDatePlaceholder: 'Select',
    datepickerEndDateLabel: 'End date:',
    resetDates: 'Reset dates',
    close: 'Close',
  },
  Yn = ut(ut({}, An), {
    startDateAriaLabel: 'Start date',
    endDateAriaLabel: 'End date',
    startDatePlaceholder: 'Start date',
    endDatePlaceholder: 'End date',
  }),
  qn = ut(ut({}, An), {dateAriaLabel: 'Select date', datePlaceholder: 'Select date'}),
  Gn = Nn({
    prop: 'daySizeGridTemplateColumns',
    cssProperty: 'gridTemplateColumns',
    key: 'gridTemplateColumns',
    transformValue: function (e) {
      return 'repeat(7, ' + e + 'px)'
    },
    scale: [0, 4, 8, 16, 32],
  }),
  jn = Rt(Rn, Bn, Wn, Tn, Cn, Sn, En, Ln, Mn, yn, wn, Xt),
  Xn = a('div')(
    $t ||
      ($t = pt(['\n  display: grid;\n  ', '\n  ', '\n'], ['\n  display: grid;\n  ', '\n  ', '\n'])),
    jn,
    Gn,
  ),
  Qn = Rt(Xt, xn, Dn, kn, yn, wn, Fn, ln, cn),
  Vn = a('div')(
    Zt || (Zt = pt(['\n  display: flex;\n  ', '\n'], ['\n  display: flex;\n  ', '\n'])),
    Qn,
  ),
  $n = Rt(Fn, ln, Xt, cn, At, In, Un, On, zn, Hn),
  Zn = a('div')(
    Kt ||
      (Kt = pt(
        ['\n  box-sizing: border-box;\n  ', '\n'],
        ['\n  box-sizing: border-box;\n  ', '\n'],
      )),
    $n,
  )
function Kn(e) {
  var t = e.height,
    r = e.width,
    a = e.color,
    o = e.className,
    i = void 0 === o ? '' : o
  return n.createElement(
    'svg',
    {
      width: r,
      height: t,
      color: a,
      className: i,
      viewBox: '0 0 12 12',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    n.createElement('path', {
      d:
        'M8 1H7v1h1V1zM6.5 6.5h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zM6 3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-1 0v2A.5.5 0 0 0 6 3zm3.5 5.5h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm0-2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zM9 3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-1 0v2A.5.5 0 0 0 9 3zm-.5 2.5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1zm-3 0h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1zm-2 3h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zM11 1h-1v1h1v9H1V2h1V1H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM3.5 6.5h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zM5 1H4v1h1V1zm1.5 7.5h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm-4-3h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1zM3 3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-1 0v2A.5.5 0 0 0 3 3z',
      fill: 'currentColor',
      fillRule: 'nonzero',
    }),
  )
}
function _n(e) {
  void 0 === e && (e = {})
  var n = t.useContext(r.ThemeContext)
  return t.useMemo(
    function () {
      return n && 'object' == typeof n && n.reactDatepicker && 'object' == typeof n.reactDatepicker
        ? Object.keys(e).reduce(function (t, r) {
            var a
            return ut(ut({}, t), (((a = {})[r] = n.reactDatepicker[r] || e[r]), a))
          }, {})
        : e
    },
    [n, e],
  )
}
var Jn = 'Montserrat, sans-serif',
  er = {
    primaryColor: '#00aeef',
    silverCloud: '#929598',
    charcoal: '#001217',
    darcula: '#343132',
    mud: '#58595B',
    greey: '#808285',
    graci: '#BCBEC0',
    white: '#ffffff',
    accessibility: '#009fef',
    selectedDay: '#71c9ed',
    selectedDayHover: '#39beef',
    normalDayHover: '#e6e7e8',
  },
  tr = 36,
  nr = {
    fontFamily: 'Inter, sans-serif',
    colors: {
      inputLabel: 'rgba(39, 39, 39, 0.4)',
      inputPlaceholder: '#272727',
      inputBorder: 'rgba(39, 39, 39, 0.12)',
      inputBorderFocused: '#ffde00',
      inputBorderError: '#ff0000',
    },
  }
function rr(e, t, n) {
  return n &&
    'object' == typeof n &&
    n.reactDatepicker &&
    'object' == typeof n.reactDatepicker &&
    n.reactDatepicker.colors &&
    'object' == typeof n.reactDatepicker.colors &&
    n.reactDatepicker.colors[e]
    ? n.reactDatepicker.colors[e]
    : t
}
var ar,
  or,
  ir,
  dr = Nn({prop: 'placeholderColor', cssProperty: 'color'}),
  sr = Nn({prop: 'placeholderFontWeight', cssProperty: 'fontWeight'}),
  cr = Rt(At, Ot, Ut, pn, Pn, Xt),
  lr = a('label')(ar || (ar = pt(['\n  ', '\n'], ['\n  ', '\n'])), cr),
  ur = Rt(At, Un, On, In, ln, cn),
  pr = a('div')(
    or ||
      (or = pt(
        ['\n  ', '\n  cursor: pointer;\n\n  svg {\n    display: block;\n  }\n'],
        ['\n  ', '\n  cursor: pointer;\n\n  svg {\n    display: block;\n  }\n'],
      )),
    ur,
  ),
  fr = Rt(Ut, Xt, mn, gn, Mt, bn, Xt, Ot, cn, un, Qt),
  hr = a('input')(
    ir ||
      (ir = pt(
        [
          '\n  ',
          '\n  cursor: pointer;\n  box-sizing: border-box;\n  outline: 0;\n\n  ::-webkit-input-placeholder {\n    /* Chrome/Opera/Safari */\n    ',
          '\n    ',
          '\n  }\n  ::-moz-placeholder {\n    /* Firefox 19+ */\n    ',
          '\n    ',
          '\n  }\n  :-moz-placeholder {\n    /* Firefox 18- */\n    ',
          '\n    ',
          '\n  }\n',
        ],
        [
          '\n  ',
          '\n  cursor: pointer;\n  box-sizing: border-box;\n  outline: 0;\n\n  ::-webkit-input-placeholder {\n    /* Chrome/Opera/Safari */\n    ',
          '\n    ',
          '\n  }\n  ::-moz-placeholder {\n    /* Firefox 19+ */\n    ',
          '\n    ',
          '\n  }\n  :-moz-placeholder {\n    /* Firefox 18- */\n    ',
          '\n    ',
          '\n  }\n',
        ],
      )),
    fr,
    sr,
    dr,
    sr,
    dr,
    sr,
    dr,
  )
function gr(e) {
  var a = e.placeholder,
    o = e.id,
    i = e.vertical,
    d = e.isActive,
    s = e.ariaLabel,
    c = e.onClick,
    l = e.value,
    u = e.showCalendarIcon,
    p = e.padding,
    f = e.rtl,
    h = e.disableAccessibility,
    g = e.dateFormat,
    m = e.onChange,
    b = void 0 === m ? function () {} : m,
    v = t.useState(l),
    y = v[0],
    w = v[1],
    D = t.useRef(null)
  t.useEffect(
    function () {
      w(l)
    },
    [l],
  )
  var k = t.useContext(r.ThemeContext),
    x = _n({
      fontFamily: Jn,
      inputFontWeight: 600,
      inputFontSize: '14px',
      inputColor: rr('charcoal', er.charcoal, k),
      inputBackground: rr('white', er.white, k),
      inputMinHeight: '46px',
      inputWidth: '100%',
      inputPadding: p,
      inputBorder: '0',
      inputPlaceholderFontWeight: 500,
      inputPlaceholderColor: rr('silverCloud', er.silverCloud, k),
      inputCalendarWrapperPosition: 'absolute',
      inputCalendarWrapperHeight: '12px',
      inputCalendarWrapperWidth: '12px',
      inputCalendarWrapperTop: '16px',
      inputCalendarWrapperLeft: f ? 'unset' : i ? '8px' : '16px',
      inputCalendarWrapperRight: f ? (i ? '8px' : '16px') : 'unset',
      inputCalendarIconWidth: '12px',
      inputCalendarIconHeight: '12px',
      inputCalendarIconColor: rr('graci', er.graci, k),
      inputLabelDisplay: 'block',
      inputLabelPosition: 'relative',
      inputLabelBorder: '1px solid ' + rr('graci', er.graci, k),
      inputLabelBorderRadius: '2px',
      inputLabelBackground: rr('white', er.white, k),
      inputLabelMargin: '0',
      inputActiveBoxShadow: 'inset 0px -3px 0 ' + rr('primaryColor', er.primaryColor, k),
    })
  return n.createElement(
    lr,
    {
      htmlFor: o,
      display: x.inputLabelDisplay,
      position: x.inputLabelPosition,
      border: x.inputLabelBorder,
      background: x.inputLabelBackground,
      borderRadius: x.inputLabelBorderRadius,
      m: x.inputLabelMargin,
    },
    u &&
      n.createElement(
        pr,
        {
          position: x.inputCalendarWrapperPosition,
          height: x.inputCalendarWrapperHeight,
          width: x.inputCalendarWrapperWidth,
          top: x.inputCalendarWrapperTop,
          left: x.inputCalendarWrapperLeft,
          right: x.inputCalendarWrapperRight,
        },
        n.createElement(Kn, {
          width: x.inputCalendarIconWidth,
          height: x.inputCalendarIconHeight,
          color: x.inputCalendarIconColor,
        }),
      ),
    n.createElement(hr, {
      tabIndex: h ? -1 : 0,
      border: x.inputBorder,
      p: x.inputPadding,
      width: x.inputWidth,
      minHeight: x.inputMinHeight,
      background: x.inputBackground,
      fontFamily: x.fontFamily,
      color: x.inputColor,
      fontSize: x.inputFontSize,
      fontWeight: x.inputFontWeight,
      placeholderColor: x.inputPlaceholderColor,
      placeholderFontWeight: x.inputPlaceholderFontWeight,
      boxShadow: d ? x.inputActiveBoxShadow : 'none',
      id: o,
      placeholder: a,
      'aria-label': s,
      value: y,
      autoComplete: 'off',
      onChange: function (e) {
        var t = e.target.value
        w(t),
          'number' == typeof D.current && clearTimeout(D.current),
          (D.current = setTimeout(function () {
            c()
            var e = Te(t, g, new Date())
            isNaN(e) || b(e)
          }, 1e3))
      },
      onFocus: c,
      'data-testid': 'DatepickerInput',
    }),
  )
}
function mr(e) {
  var t = e.height,
    r = e.width,
    a = e.iconColor,
    o = e.direction,
    i = void 0 === o ? 'right' : o,
    d = e.className,
    s = void 0 === d ? '' : d,
    c = (function (e) {
      switch (e) {
        case 'up':
          return 0
        case 'down':
          return 180
        case 'left':
          return -90
        case 'right':
        default:
          return 90
      }
    })(i)
  return n.createElement(
    'svg',
    {
      width: r,
      height: t,
      color: a,
      className: s,
      transform: 'rotate(' + c + ' 0 0)',
      viewBox: '0 0 9 12',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    n.createElement('path', {
      fill: 'currentColor',
      d:
        'M4.46.001a.538.538 0 0 0-.358.174L.156 4.48a.538.538 0 1 0 .796.724l3.01-3.285v13.689a.563.563 0 0 0 .538.55.563.563 0 0 0 .538-.55V1.918l3.01 3.286a.538.538 0 1 0 .796-.724L4.898.175a.538.538 0 0 0-.437-.174z',
    }),
  )
}
var br,
  vr,
  yr,
  wr = Rt(mn, gn, bn, Mt, vn, Xt),
  Dr = a('div')(br || (br = pt(['\n  ', '\n'], ['\n  ', '\n'])), wr),
  kr = a(Dr)(
    yr ||
      (yr = pt(
        [
          "\n  position: relative;\n  display: inline-block;\n\n  &:after {\n    content: '';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    bottom: 0;\n    left: 0;\n    z-index: 1;\n  }\n\n  ",
          '\n',
        ],
        [
          "\n  position: relative;\n  display: inline-block;\n\n  &:after {\n    content: '';\n    position: absolute;\n    height: 2px;\n    width: 100%;\n    bottom: 0;\n    left: 0;\n    z-index: 1;\n  }\n\n  ",
          '\n',
        ],
      )),
    function (e) {
      var t = e.isActive,
        n = e.selectDateBorderColor
      return (
        t &&
        r.css(
          vr ||
            (vr = pt(
              ['\n      &:after {\n        background: ', ';\n      }\n    '],
              ['\n      &:after {\n        background: ', ';\n      }\n    '],
            )),
          n,
        )
      )
    },
  )
function xr(e) {
  var a = e.title,
    o = e.isActive,
    i = e.date,
    d = e.vertical,
    s = t.useContext(r.ThemeContext),
    c = _n({
      fontFamily: Jn,
      selectDateLabelFontSize: '11px',
      selectDateLabelColor: rr('silverCloud', er.silverCloud, s),
      selectDateLabelMargin: '0 0 8px',
      selectDateDateColor: rr('charcoal', er.charcoal, s),
      selectDateDateFontSize: d ? '16px' : '24px',
      selectDateDateFontWeight: 500,
      selectDateDatePadding: '0 0 15px',
      selectDateBorderColor: rr('primaryColor', er.primaryColor, s),
      selectDatePadding: '0',
    })
  return n.createElement(
    Zn,
    {p: c.selectDatePadding},
    n.createElement(
      Dr,
      {
        fontFamily: c.fontFamily,
        fontSize: c.selectDateLabelFontSize,
        color: c.selectDateLabelColor,
        m: c.selectDateLabelMargin,
      },
      a,
    ),
    n.createElement(
      kr,
      {
        as: 'span',
        color: c.selectDateDateColor,
        fontSize: c.selectDateDateFontSize,
        fontWeight: c.selectDateDateFontWeight,
        fontFamily: c.fontFamily,
        p: c.selectDateDatePadding,
        isActive: o,
        selectDateBorderColor: c.selectDateBorderColor,
      },
      i,
    ),
  )
}
var Cr,
  Tr,
  Sr,
  Br,
  Rr,
  Wr = function (e) {
    var a = e.label,
      o = t.useContext(r.ThemeContext),
      i = _n({
        fontFamily: Jn,
        monthLabelColor: rr('darcula', er.darcula, o),
        monthLabelLineHeight: 1.57,
        monthLabelFontWeight: 600,
        monthLabelFontSize: '14px',
      })
    return n.createElement(
      Dr,
      {
        fontFamily: i.fontFamily,
        fontSize: i.monthLabelFontSize,
        fontWeight: i.monthLabelFontWeight,
        lineHeight: i.monthLabelLineHeight,
        color: i.monthLabelColor,
        'data-testid': 'MonthLabel',
      },
      a,
    )
  },
  Lr = function (e) {
    var a = e.label,
      o = t.useContext(r.ThemeContext),
      i = _n({
        fontFamily: Jn,
        dayLabelColor: rr('silverCloud', er.silverCloud, o),
        dayLabelFontWeight: 500,
        dayLabelFontSize: '11px',
      })
    return n.createElement(
      Dr,
      {
        fontFamily: i.fontFamily,
        fontSize: i.dayLabelFontSize,
        fontWeight: i.dayLabelFontWeight,
        color: i.dayLabelColor,
        'data-testid': 'DayLabel',
      },
      a,
    )
  },
  Mr = {
    rtl: !1,
    focusedDate: null,
    isDateFocused: function () {
      return !1
    },
    isDateSelected: function () {
      return !1
    },
    isDateHovered: function () {
      return !1
    },
    isDateBlocked: function () {
      return !1
    },
    isFirstOrLastSelectedDate: function () {
      return !1
    },
    onDateFocus: function () {},
    onDateHover: function () {},
    onDateSelect: function () {},
    onDayRender: void 0,
  },
  Er = n.createContext(Mr),
  Fr = Nn({
    prop: 'dayHeight',
    cssProperty: 'height',
    key: 'dayHeight',
    transformValue: function (e) {
      return e + 'px'
    },
    scale: [0, 4, 8, 16, 32],
  }),
  Pr = Nn({
    prop: 'dayWidth',
    cssProperty: 'width',
    key: 'dayWidth',
    transformValue: function (e) {
      return e + 'px'
    },
    scale: [0, 4, 8, 16, 32],
  }),
  Hr = Nn({
    prop: 'dayHoverColor',
    cssProperty: 'color',
    key: 'dayHoverColor',
    transformValue: function (e) {
      return e
    },
    scale: [0, 4, 8, 16, 32],
  }),
  Ir = Nn({
    prop: 'daySelectedHoverColor',
    cssProperty: 'color',
    key: 'daySelectedHoverColor',
    transformValue: function (e) {
      return e
    },
    scale: [0, 4, 8, 16, 32],
  }),
  Or = Nn({
    prop: 'dayHoverBackground',
    cssProperty: 'background',
    key: 'dayHoverBackground',
    transformValue: function (e) {
      return e
    },
    scale: [0, 4, 8, 16, 32],
  }),
  zr = Nn({
    prop: 'daySelectedHoverBackground',
    cssProperty: 'background',
    key: 'daySelectedHoverBackground',
    transformValue: function (e) {
      return e
    },
    scale: [0, 4, 8, 16, 32],
  }),
  Ur = Rt(Qt, Ut, Mt, mn, bn, gn),
  Nr = a('button')(
    Rr ||
      (Rr = pt(
        [
          '\n  ',
          '\n  ',
          '\n  ',
          '\n  cursor: pointer;\n  border: 0;\n  padding: 0;\n  outline: 0;\n\n  ',
          '\n\n  // @ts-ignore\n  ',
          '\n\n  &:focus {\n    // @ts-ignore\n    ',
          '\n  }\n',
        ],
        [
          '\n  ',
          '\n  ',
          '\n  ',
          '\n  cursor: pointer;\n  border: 0;\n  padding: 0;\n  outline: 0;\n\n  ',
          '\n\n  // @ts-ignore\n  ',
          '\n\n  &:focus {\n    // @ts-ignore\n    ',
          '\n  }\n',
        ],
      )),
    Fr,
    Pr,
    Ur,
    function (e) {
      var t = e.disabledDate,
        n = e.isSelectedStartOrEnd
      return (
        t &&
        !n &&
        r.css(
          Cr ||
            (Cr = pt(
              ['\n      cursor: initial;\n      opacity: 0.4;\n    '],
              ['\n      cursor: initial;\n      opacity: 0.4;\n    '],
            )),
        )
      )
    },
    function (e) {
      var t = e.disabledDate,
        n = e.isSelected,
        a = e.isSelectedStartOrEnd,
        o = e.isWithinHoverRange
      return t || n || a || o
        ? n && !a
          ? r.css(
              Sr ||
                (Sr = pt(
                  ['\n        &:hover {\n          ', '\n          ', '\n        }\n      '],
                  ['\n        &:hover {\n          ', '\n          ', '\n        }\n      '],
                )),
              zr,
              Ir,
            )
          : ''
        : r.css(
            Tr ||
              (Tr = pt(
                ['\n        &:hover {\n          ', '\n          ', '\n        }\n      '],
                ['\n        &:hover {\n          ', '\n          ', '\n        }\n      '],
              )),
            Or,
            Hr,
          )
    },
    function (e) {
      var t = e.borderAccessibilityColor
      return r.css(
        Br ||
          (Br = pt(
            ['\n      box-shadow: none;\n      border: 2px solid ', ';\n    '],
            ['\n      box-shadow: none;\n      border: 2px solid ', ';\n    '],
          )),
        t,
      )
    },
  )
function Ar(e, t, n, r) {
  var a = r.selectedFirstOrLast,
    o = r.normal,
    i = r.selected,
    d = r.rangeHover
  return t ? a : e ? i : n ? d : o
}
function Yr(e) {
  var a = e.day,
    o = e.date,
    i = t.useRef(null),
    d = t.useContext(Er),
    s = d.focusedDate,
    c = d.isDateFocused,
    l = d.isDateSelected,
    u = d.isDateHovered,
    p = d.isDateBlocked,
    f = d.isFirstOrLastSelectedDate,
    h = d.onDateSelect,
    g = d.onDateFocus,
    m = d.onDateHover,
    b = d.onDayRender,
    v = (function (e) {
      var n = e.date,
        r = e.focusedDate,
        a = e.isDateSelected,
        o = e.isDateFocused,
        i = e.isFirstOrLastSelectedDate,
        d = e.isDateHovered,
        s = e.isDateBlocked,
        c = e.onDateSelect,
        l = e.onDateFocus,
        u = e.onDateHover,
        p = t.useCallback(
          function () {
            return c(n)
          },
          [n, c],
        ),
        f = t.useCallback(
          function () {
            return u(n)
          },
          [n, u],
        ),
        h = s(n) && !d(n)
      return {
        tabIndex: null === r || o(n) ? 0 : -1,
        isSelected: a(n),
        isSelectedStartOrEnd: i(n),
        isWithinHoverRange: d(n),
        disabledDate: h,
        onKeyDown: function (e) {
          'ArrowRight' === e.key
            ? l(Ae(n, 1))
            : 'ArrowLeft' === e.key
            ? l(Ae(n, -1))
            : 'ArrowUp' === e.key
            ? l(Ae(n, -7))
            : 'ArrowDown' === e.key && l(Ae(n, 7))
        },
        onClick: h ? function () {} : p,
        onMouseEnter: f,
      }
    })({
      date: o,
      focusedDate: s,
      isDateFocused: c,
      isDateSelected: l,
      isDateHovered: u,
      isDateBlocked: p,
      isFirstOrLastSelectedDate: f,
      onDateFocus: g,
      onDateSelect: h,
      onDateHover: m,
      dayRef: i,
    }),
    y = t.useContext(r.ThemeContext),
    w = rr('white', er.white, y),
    D = rr('mud', er.mud, y),
    k = rr('primaryColor', er.primaryColor, y),
    x = rr('accessibility', er.accessibility, y),
    C = rr('selectedDay', er.selectedDay, y),
    T = rr('selectedDayHover', er.selectedDayHover, y),
    S = rr('normalDayHover', er.normalDayHover, y),
    B = _n({
      fontFamily: Jn,
      daySize: tr,
      dayFontWeight: 500,
      dayFontSize: '14px',
      dayColor: D,
      dayHoverColor: D,
      daySelectedColor: w,
      daySelectedHoverColor: w,
      dayHoverRangeColor: w,
      daySelectedFirstOrLastColor: w,
      dayBackground: w,
      dayHoverBackground: S,
      daySelectedBackground: C,
      daySelectedHoverBackground: T,
      dayHoverRangeBackground: C,
      daySelectedFirstOrLastBackground: k,
      dayBorderColor: S,
      daySelectedBorderColor: C,
      dayHoverRangeBorderColor: C,
      daySelectedFirstOrLastBorderColor: k,
      dayAccessibilityBorderColor: x,
    }),
    R = t.useMemo(
      function () {
        return Ar(v.isSelected, v.isSelectedStartOrEnd, v.isWithinHoverRange, {
          selectedFirstOrLast: B.daySelectedFirstOrLastBorderColor,
          selected: B.daySelectedBorderColor,
          normal: B.dayBorderColor,
          rangeHover: B.dayHoverRangeColor,
        })
      },
      [v.isSelected, v.isSelectedStartOrEnd, B, v.isWithinHoverRange],
    ),
    W = t.useMemo(
      function () {
        return Ar(v.isSelected, v.isSelectedStartOrEnd, v.isWithinHoverRange, {
          selectedFirstOrLast: B.daySelectedFirstOrLastBackground,
          selected: B.daySelectedBackground,
          normal: B.dayBackground,
          rangeHover: B.dayHoverRangeBackground,
        })
      },
      [v.isSelected, v.isSelectedStartOrEnd, B, v.isWithinHoverRange],
    ),
    L = t.useMemo(
      function () {
        return Ar(v.isSelected, v.isSelectedStartOrEnd, v.isWithinHoverRange, {
          selectedFirstOrLast: B.daySelectedFirstOrLastColor,
          selected: B.daySelectedColor,
          normal: B.dayColor,
          rangeHover: B.dayHoverRangeColor,
        })
      },
      [v.isSelected, v.isSelectedStartOrEnd, B, v.isWithinHoverRange],
    )
  return n.createElement(
    Nr,
    ut({}, v, {
      ref: i,
      dayHeight: B.daySize,
      dayWidth: B.daySize,
      background: W,
      color: L,
      fontFamily: B.fontFamily,
      fontWeight: B.dayFontWeight,
      fontSize: B.dayFontSize,
      daySelectedHoverBackground: B.daySelectedHoverBackground,
      dayHoverBackground: B.dayHoverBackground,
      dayHoverColor: B.dayHoverColor,
      daySelectedHoverColor: B.daySelectedHoverColor,
      borderAccessibilityColor: B.dayAccessibilityBorderColor,
      boxShadow:
        '1px 0 0 0 ' +
        R +
        ',\n        0 1px 0 0 ' +
        R +
        ',\n        1px 1px 0 0 ' +
        R +
        ',\n        1px 0 0 0 ' +
        R +
        ' inset,\n        0 1px 0 0 ' +
        R +
        ' inset',
      'data-testid': 'Day',
      'aria-label': 'Day-' + o.toDateString(),
      type: 'button',
    }),
    'function' == typeof b
      ? b(o)
      : n.createElement(
          Vn,
          {justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'},
          a,
        ),
  )
}
var qr,
  Gr,
  jr = r.keyframes(
    qr ||
      (qr = pt(
        ['\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n'],
        ['\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n'],
      )),
  ),
  Xr = a('div')(
    Gr ||
      (Gr = pt(
        [
          '\n  animation-name: ',
          ';\n  animation-duration: 0.25s;\n  animation-timing-function: ease-in;\n\n  &:last-child {\n    padding: 0 1px 1px 0;\n  }\n',
        ],
        [
          '\n  animation-name: ',
          ';\n  animation-duration: 0.25s;\n  animation-timing-function: ease-in;\n\n  &:last-child {\n    padding: 0 1px 1px 0;\n  }\n',
        ],
      )),
    jr,
  ),
  Qr = function (e) {
    var t = e.year,
      r = e.month,
      a = e.firstDayOfWeek,
      o = $e({
        dayLabelFormat: e.dayLabelFormat,
        monthLabelFormat: e.monthLabelFormat,
        weekdayLabelFormat: e.weekdayLabelFormat,
        year: t,
        month: r,
        firstDayOfWeek: a,
      }),
      i = o.days,
      d = o.weekdayLabels,
      s = o.monthLabel,
      c = _n({daySize: tr, monthLabelMargin: '0 0 28px', monthDayLabelMargin: '0 0 16px'})
    return n.createElement(
      Xr,
      null,
      n.createElement(
        Vn,
        {justifyContent: 'center', m: c.monthLabelMargin},
        n.createElement(Wr, {label: s}),
      ),
      n.createElement(
        Xn,
        {daySizeGridTemplateColumns: c.daySize},
        d.map(function (e) {
          return n.createElement(
            Vn,
            {key: e, justifyContent: 'center', m: c.monthDayLabelMargin},
            n.createElement(Lr, {label: e}),
          )
        }),
      ),
      n.createElement(
        Xn,
        {daySizeGridTemplateColumns: c.daySize},
        i.map(function (e, t) {
          return 'object' == typeof e
            ? n.createElement(Yr, {date: e.date, key: e.dayLabel, day: e.dayLabel})
            : n.createElement('div', {key: t})
        }),
      ),
    )
  }
var Vr,
  $r,
  Zr,
  Kr = a('button')(
    Vr ||
      (Vr = pt(
        [
          '\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  border: 0;\n  background: transparent;\n  padding: 0;\n\n  &:hover {\n    text-decoration: underline;\n  }\n',
        ],
        [
          '\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  border: 0;\n  background: transparent;\n  padding: 0;\n\n  &:hover {\n    text-decoration: underline;\n  }\n',
        ],
      )),
  ),
  _r = a(function (e) {
    var t = e.height,
      r = e.width,
      a = e.color,
      o = e.className,
      i = void 0 === o ? '' : o
    return n.createElement(
      'svg',
      {
        width: r,
        height: t,
        color: a,
        className: i,
        viewBox: '0 0 14 14',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      n.createElement('path', {
        fill: 'currentColor',
        fillRule: 'nonzero',
        d:
          'M9.015 11.15c-.027-.18-.04-.39-.067-.585a3.958 3.958 0 0 1-4.48-.056C2.663 9.241 2.142 6.663 3.292 4.74c1.217-2.02 3.797-2.592 5.696-1.282.589.404 1.03.934 1.35 1.533l-1.216.808L13 7.917l-.174-4.556-1.056.696a5.812 5.812 0 0 0-1.846-2.062C7.25.155 3.64.935 1.901 3.765c-1.672 2.717-.95 6.382 1.605 8.194a5.535 5.535 0 0 0 5.616.501c0-.083 0-.167-.013-.264a9.193 9.193 0 0 0-.094-1.046z',
      }),
    )
  })(Zr || (Zr = pt(['\n  ', '\n'], ['\n  ', '\n'])), function (e) {
    return (
      e.rtl &&
      r.css(
        $r ||
          ($r = pt(
            ['\n      transform: rotate(-180deg);\n    '],
            ['\n      transform: rotate(-180deg);\n    '],
          )),
      )
    )
  })
function Jr(e) {
  var a = e.onResetDates,
    o = e.text,
    i = e.rtl,
    d = t.useContext(r.ThemeContext),
    s = _n({
      fontFamily: Jn,
      resetDatesIconColor: rr('mud', er.mud, d),
      resetDatesIconHeight: '14px',
      resetDatesIconWidth: '14px',
      resetDatesTextColor: rr('darcula', er.darcula, d),
      resetDatesTextMargin: i ? '1px 8px 0 0' : '1px 0 0 8px',
      resetDatesTextLineHeight: 1.18,
      resetDatesTextFontSize: '11px',
    })
  return n.createElement(
    Kr,
    {
      'aria-label': 'Reset dates',
      tabIndex: -1,
      onClick: a,
      onMouseUp: function (e) {
        e.currentTarget.blur()
      },
    },
    n.createElement(_r, {
      height: s.resetDatesIconHeight,
      width: s.resetDatesIconWidth,
      color: s.resetDatesIconColor,
      rtl: i,
    }),
    n.createElement(
      Dr,
      {
        m: s.resetDatesTextMargin,
        lineHeight: s.resetDatesTextLineHeight,
        fontFamily: s.fontFamily,
        fontSize: s.resetDatesTextFontSize,
        color: s.resetDatesTextColor,
      },
      o,
    ),
  )
}
var ea,
  ta,
  na = a('svg')(ta || (ta = pt(['\n  ', '\n'], ['\n  ', '\n'])), function (e) {
    var t = e.angle
    return r.css(
      ea ||
        (ea = pt(
          ['\n      transform: rotate(', 'deg);\n    '],
          ['\n      transform: rotate(', 'deg);\n    '],
        )),
      t,
    )
  })
function ra(e) {
  var t = e.height,
    r = e.width,
    a = e.color,
    o = e.direction,
    i = void 0 === o ? 'right' : o,
    d = e.className,
    s = void 0 === d ? '' : d,
    c = (function (e) {
      switch (e) {
        case 'up':
          return 180
        case 'down':
          return 0
        case 'left':
          return 90
        case 'right':
        default:
          return -90
      }
    })(i)
  return n.createElement(
    na,
    {
      width: r,
      height: t,
      color: a,
      className: s,
      angle: c,
      viewBox: '0 0 9 6',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    n.createElement('path', {
      fill: 'currentColor',
      fillRule: 'evenodd',
      d:
        'M4.058 4.594L1.185 1.72a.312.312 0 1 1 .442-.442L4.5 4.152l2.873-2.873a.312.312 0 1 1 .442.442L4.723 4.812a.316.316 0 0 1-.446 0l-.219-.218z',
    }),
  )
}
var aa,
  oa = Rt(cn, ln, Ut, Xt, Ot),
  ia = a('button')(
    aa ||
      (aa = pt(
        ['\n  ', '\n  display: flex;\n  justify-content: center;\n  align-items: center;\n'],
        ['\n  ', '\n  display: flex;\n  justify-content: center;\n  align-items: center;\n'],
      )),
    oa,
  )
function da(e) {
  var a = e.type,
    o = e.onClick,
    i = e.vertical,
    d = e.rtl,
    s = e.ariaLabel,
    c = t.useContext(r.ThemeContext),
    l = _n({
      navButtonWidth: i ? '48px' : '30px',
      navButtonHeight: i ? '48px' : '30px',
      navButtonBackground: rr('white', er.white, c),
      navButtonBorder: '1px solid ' + rr('silverCloud', er.silverCloud, c),
      navButtonPadding: '0',
      navButtonIconHeight: i ? '18px' : '11px',
      navButtonIconWidth: i ? '28px' : '18px',
      navButtonIconColor: rr('greey', er.greey, c),
    })
  function u() {
    return 'next' !== a || i
      ? 'next' === a && i
        ? 'down'
        : 'prev' !== a || i
        ? 'up'
        : 'left'
      : 'right'
  }
  return n.createElement(
    ia,
    {
      width: l.navButtonWidth,
      height: l.navButtonHeight,
      background: l.navButtonBackground,
      border: l.navButtonBorder,
      borderRight: 'up' !== u() || d ? l.navButtonBorder : 'unset',
      borderLeft: 'up' === u() && d ? 'unset' : l.navButtonBorder,
      p: l.navButtonPadding,
      type: 'button',
      'aria-label': s,
      onClick: o,
      onMouseUp: function (e) {
        e.currentTarget.blur()
      },
      'data-testid': 'DatepickerNavButton',
    },
    n.createElement(ra, {
      width: l.navButtonIconWidth,
      height: l.navButtonIconHeight,
      color: l.navButtonIconColor,
      direction: u(),
    }),
  )
}
function sa(e) {
  var t = e.height,
    r = e.width,
    a = e.color,
    o = e.className,
    i = void 0 === o ? '' : o
  return n.createElement(
    'svg',
    {
      width: r,
      height: t,
      color: a,
      className: i,
      viewBox: '0 0 15 16',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    n.createElement('path', {
      fill: 'currentColor',
      fillRule: 'nonzero',
      d:
        'M14.69.263a.802.802 0 0 0-1.187 0L7.47 6.694 1.433.262a.802.802 0 0 0-1.187 0 .938.938 0 0 0 0 1.267L6.28 7.96.246 14.392a.937.937 0 0 0 0 1.266.81.81 0 0 0 .594.262.81.81 0 0 0 .593-.262l6.035-6.432 6.035 6.432a.812.812 0 0 0 .593.262.81.81 0 0 0 .594-.262.937.937 0 0 0 0-1.266L8.656 7.96l6.034-6.43a.937.937 0 0 0 0-1.267z',
    }),
  )
}
var ca,
  la,
  ua = Rt(Xt, Mt, gn, mn, bn),
  pa = a('div')(
    ca ||
      (ca = pt(
        ['\n  ', '\n  float: left;\n  transition: color 0.15s;\n'],
        ['\n  ', '\n  float: left;\n  transition: color 0.15s;\n'],
      )),
    ua,
  ),
  fa = a('button')(
    la ||
      (la = pt(
        [
          '\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  background: transparent;\n  padding: 0;\n  border: 0;\n\n  svg {\n    transition: color 0.15s;\n  }\n\n  &:hover {\n    ',
          ' {\n      ',
          '\n    }\n\n    svg {\n      ',
          '\n    }\n  }\n',
        ],
        [
          '\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  background: transparent;\n  padding: 0;\n  border: 0;\n\n  svg {\n    transition: color 0.15s;\n  }\n\n  &:hover {\n    ',
          ' {\n      ',
          '\n    }\n\n    svg {\n      ',
          '\n    }\n  }\n',
        ],
      )),
    pa,
    Mt,
    Mt,
  )
function ha(e) {
  var a = e.onClick,
    o = e.rtl,
    i = e.closeText,
    d = t.useContext(r.ThemeContext),
    s = _n({
      fontFamily: Jn,
      closeMargin: o ? '1px 16px 0 0' : '1px 0 0 16px',
      closeColor: rr('silverCloud', er.silverCloud, d),
      closeHoverColor: rr('darcula', er.darcula, d),
      closeFontSize: '12px',
      closeFontWeight: 600,
    })
  return n.createElement(
    fa,
    {
      onClick: a,
      color: s.closeHoverColor,
      'data-testid': 'DatepickerClose',
      tabIndex: -1,
      'aria-label': 'Close',
    },
    n.createElement(sa, {width: '15px', height: '16px', color: '#ADADAD'}),
    n.createElement(
      pa,
      {
        m: s.closeMargin,
        color: s.closeColor,
        fontSize: s.closeFontSize,
        fontFamily: s.fontFamily,
        fontWeight: s.closeFontWeight,
      },
      i,
    ),
  )
}
var ga = r.keyframes(
    xa ||
      (xa = pt(
        ['\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n'],
        ['\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n'],
      )),
  ),
  ma = Rt(Ut, Xt, Pn, At, Qt, cn, Hn),
  ba = a('div')(
    Ta ||
      (Ta = pt(
        [
          '\n  ',
          '\n  ',
          '\n\n  animation-name: ',
          ';\n  animation-duration: 0.15s;\n  animation-timing-function: ease-in;\n',
        ],
        [
          '\n  ',
          '\n  ',
          '\n\n  animation-name: ',
          ';\n  animation-duration: 0.15s;\n  animation-timing-function: ease-in;\n',
        ],
      )),
    ma,
    function (e) {
      return (
        e.rtl &&
        r.css(Ca || (Ca = pt(['\n      direction: rtl;\n    '], ['\n      direction: rtl;\n    '])))
      )
    },
    ga,
  ),
  va = a('div')(
    Sa ||
      (Sa = pt(
        [
          "\n  position: relative;\n  width: 100%;\n\n  &:after {\n    content: '';\n    position: absolute;\n    height: 1px;\n    width: 100%;\n    background: #e6e7e8;\n    bottom: 0;\n    left: 0;\n  }\n",
        ],
        [
          "\n  position: relative;\n  width: 100%;\n\n  &:after {\n    content: '';\n    position: absolute;\n    height: 1px;\n    width: 100%;\n    background: #e6e7e8;\n    bottom: 0;\n    left: 0;\n  }\n",
        ],
      )),
  ),
  ya = Rt(pn, wn),
  wa = a(Zn)(Ba || (Ba = pt(['\n  ', '\n'], ['\n  ', '\n'])), ya),
  Da = Rt(fn, ln),
  ka = a(Xn)(Ra || (Ra = pt(['\n  ', '\n'], ['\n  ', '\n'])), Da)
var xa,
  Ca,
  Ta,
  Sa,
  Ba,
  Ra,
  Wa,
  La,
  Ma,
  Ea,
  Fa,
  Pa = n.forwardRef(function (e, a) {
    var o = e.startDate,
      i = e.endDate,
      d = e.minBookingDate,
      s = e.maxBookingDate,
      c = e.focusedInput,
      l = e.onDatesChange,
      u = e.dayLabelFormat,
      p = e.weekdayLabelFormat,
      f = e.monthLabelFormat,
      h = e.onDayRender,
      g = e.initialVisibleMonth,
      m = e.vertical,
      b = void 0 !== m && m,
      v = e.rtl,
      y = void 0 !== v && v,
      w = e.showResetDates,
      D = void 0 === w || w,
      k = e.showClose,
      x = void 0 === k || k,
      C = e.showSelectedDates,
      T = void 0 === C || C,
      S = e.exactMinBookingDays,
      B = void 0 !== S && S,
      R = e.isDateBlocked,
      W =
        void 0 === R
          ? function () {
              return !1
            }
          : R,
      L = e.minBookingDays,
      M = void 0 === L ? 1 : L,
      E = e.onClose,
      F = void 0 === E ? function () {} : E,
      P = e.numberOfMonths,
      H = e.firstDayOfWeek,
      I = e.displayFormat,
      O = void 0 === I ? 'MM/dd/yyyy' : I,
      z = e.phrases,
      U = void 0 === z ? An : z,
      N = e.unavailableDates,
      A = lt({
        startDate: o,
        endDate: i,
        focusedInput: c,
        onDatesChange: l,
        minBookingDate: d,
        maxBookingDate: s,
        minBookingDays: M,
        isDateBlocked: W,
        exactMinBookingDays: B,
        unavailableDates: void 0 === N ? [] : N,
        initialVisibleMonth: g,
        numberOfMonths: P,
        firstDayOfWeek: H,
      }),
      Y = A.activeMonths,
      q = A.isDateSelected,
      G = A.isFirstOrLastSelectedDate,
      j = A.isDateHovered,
      X = A.firstDayOfWeek,
      Q = A.onDateSelect,
      V = A.onResetDates,
      $ = A.goToPreviousMonths,
      Z = A.goToNextMonths,
      K = A.numberOfMonths,
      _ = A.hoveredDate,
      J = A.onDateHover,
      ee = A.isDateFocused,
      te = A.focusedDate,
      ne = A.onDateFocus,
      re = A.isDateBlocked
    t.useImperativeHandle(a, function () {
      return {
        onDateSelect: function (e) {
          Q(e)
        },
      }
    })
    var ae = t.useRef(null),
      oe = t.useContext(r.ThemeContext),
      ie = _n({
        datepickerZIndex: null,
        datepickerBackground: '#ffffff',
        datepickerPadding: b ? '16px 16px 0' : '32px',
        datepickerBorderRadius: '2px',
        datepickerPosition: 'relative',
        datepickerWidth: 'fit-content',
        datepickerCloseWrapperPosition: b ? 'relative' : 'absolute',
        datepickerCloseWrapperDisplay: b ? 'flex' : 'block',
        datepickerCloseWrapperJustifyContent: b ? 'flex-end' : 'initial',
        datepickerCloseWrapperMargin: b ? '0 0 16px' : '0',
        datepickerCloseWrapperRight: y ? 'unset' : b ? '0' : '32px',
        datepickerCloseWrapperTop: 'unset',
        datepickerCloseWrapperLeft: y ? '32px' : 'unset',
        datepickerCloseWrapperBottom: 'unset',
        datepickerCloseWrapperZIndex: 1,
        datepickerSelectDateGridTemplateColumns: b ? '87px 50px 87px' : '126px 75px 126px',
        datepickerSelectDateGridTemplateRows: 'unset',
        datepickerSelectDateArrowIconWidth: '15px',
        datepickerSelectDateArrowIconHeight: '12px',
        datepickerSelectDateArrowIconColor: rr('silverCloud', er.silverCloud, oe),
        datepickerMonthsWrapperMargin: x || T ? (T ? '28px 0 0' : '48px 0 0') : 'unset',
        datepickerPreviousMonthButtonPosition: b ? 'relative' : 'absolute',
        datepickerPreviousMonthButtonTop: b ? 'unset' : '-5px',
        datepickerPreviousMonthButtonLeft: b ? 'unset' : '0',
        datepickerPreviousMonthButtonRight: 'unset',
        datepickerPreviousMonthButtonBottom: 'unset',
        datepickerNextMonthButtonPosition: b ? 'relative' : 'absolute',
        datepickerNextMonthButtonTop: b ? 'unset' : '-5px',
        datepickerNextMonthButtonLeft: 'unset',
        datepickerNextMonthButtonRight: b ? 'unset' : '0',
        datepickerNextMonthButtonBottom: 'unset',
        datepickerMonthsGridGap: b ? '32px' : '0 32px',
        datepickerMonthsGridOverflow: 'auto',
        datepickerMonthsGridHeight: b ? '50vh' : '100%',
        datepickerResetDatesWrapperMargin: b ? 'unset' : '32px 0 0',
        datepickerBoxShadow: 'rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px',
      })
    function de() {
      ae && ae.current && b && (ae.current.scrollTop = 0)
    }
    function se() {
      Z(), de()
    }
    function ce() {
      $(), de()
    }
    return n.createElement(
      r.ThemeProvider,
      {
        theme: function (e) {
          return e || {}
        },
      },
      n.createElement(
        Er.Provider,
        {
          value: {
            rtl: y,
            isDateFocused: ee,
            isDateSelected: q,
            isDateHovered: j,
            isFirstOrLastSelectedDate: G,
            onDateFocus: ne,
            focusedDate: te,
            onDateSelect: Q,
            onDateHover: J,
            onDayRender: h,
            isDateBlocked: re,
          },
        },
        n.createElement(
          ba,
          {
            background: ie.datepickerBackground,
            p: ie.datepickerPadding,
            borderRadius: ie.datepickerBorderRadius,
            position: ie.datepickerPosition,
            boxShadow: ie.datepickerBoxShadow,
            width: ie.datepickerWidth,
            zIndex: ie.datepickerZIndex,
            rtl: y,
          },
          x &&
            n.createElement(
              wa,
              {
                m: ie.datepickerCloseWrapperMargin,
                display: ie.datepickerCloseWrapperDisplay,
                justifyContent: ie.datepickerCloseWrapperJustifyContent,
                position: ie.datepickerCloseWrapperPosition,
                right: ie.datepickerCloseWrapperRight,
                top: ie.datepickerCloseWrapperTop,
                left: ie.datepickerCloseWrapperLeft,
                bottom: ie.datepickerCloseWrapperBottom,
                zIndex: ie.datepickerCloseWrapperZIndex,
              },
              n.createElement(ha, {onClick: F, rtl: y, closeText: U.close}),
            ),
          T &&
            n.createElement(
              va,
              null,
              n.createElement(
                Xn,
                {
                  'data-testid': 'SelectedDatesGrid',
                  gridTemplateColumns: ie.datepickerSelectDateGridTemplateColumns,
                  gridTemplateRows: ie.datepickerSelectDateGridTemplateRows,
                },
                n.createElement(xr, {
                  title: U.datepickerStartDateLabel,
                  date: it(o, O, U.datepickerStartDatePlaceholder),
                  isActive: c === st,
                  vertical: b,
                }),
                n.createElement(
                  Vn,
                  {justifyContent: 'center', alignItems: 'center'},
                  n.createElement(mr, {
                    height: ie.datepickerSelectDateArrowIconHeight,
                    width: ie.datepickerSelectDateArrowIconWidth,
                    iconColor: ie.datepickerSelectDateArrowIconColor,
                  }),
                ),
                n.createElement(xr, {
                  title: U.datepickerEndDateLabel,
                  date: it(i, O, U.datepickerEndDatePlaceholder),
                  isActive: c === ct,
                  vertical: b,
                }),
              ),
            ),
          n.createElement(
            Zn,
            {position: 'relative'},
            n.createElement(
              Zn,
              {m: ie.datepickerMonthsWrapperMargin},
              n.createElement(
                ka,
                {
                  'data-testid': 'MonthGrid',
                  overflow: ie.datepickerMonthsGridOverflow,
                  height: ie.datepickerMonthsGridHeight,
                  gridTemplateColumns: b ? '1fr' : 'repeat(' + K + ', 1fr)',
                  gridGap: ie.datepickerMonthsGridGap,
                  pr: y ? '1px' : '0',
                  ref: ae,
                  onMouseLeave: function () {
                    _ && J(null)
                  },
                },
                Y.map(function (e) {
                  return n.createElement(Qr, {
                    key: 'month-' + e.year + '-' + e.month,
                    year: e.year,
                    month: e.month,
                    firstDayOfWeek: X,
                    dayLabelFormat: u || Xe,
                    weekdayLabelFormat: p || Qe,
                    monthLabelFormat: f || Ve,
                  })
                }),
              ),
            ),
            n.createElement(
              Vn,
              {alignItems: 'center'},
              n.createElement(
                n.Fragment,
                null,
                D &&
                  n.createElement(
                    Vn,
                    {flex: '1', m: ie.datepickerResetDatesWrapperMargin},
                    n.createElement(Jr, {rtl: y, onResetDates: V, text: U.resetDates}),
                  ),
                n.createElement(
                  Zn,
                  {
                    position: ie.datepickerPreviousMonthButtonPosition,
                    top: ie.datepickerPreviousMonthButtonTop,
                    left: ie.datepickerPreviousMonthButtonLeft,
                    right: ie.datepickerPreviousMonthButtonRight,
                    bottom: ie.datepickerPreviousMonthButtonBottom,
                  },
                  n.createElement(da, {
                    type: 'prev',
                    onClick: y && !b ? se : ce,
                    vertical: b,
                    rtl: y,
                    ariaLabel: 'Previous month',
                  }),
                ),
                n.createElement(
                  Zn,
                  {
                    position: ie.datepickerNextMonthButtonPosition,
                    top: ie.datepickerNextMonthButtonTop,
                    left: ie.datepickerNextMonthButtonLeft,
                    right: ie.datepickerNextMonthButtonRight,
                    bottom: ie.datepickerNextMonthButtonBottom,
                  },
                  n.createElement(da, {
                    type: 'next',
                    onClick: y && !b ? ce : se,
                    vertical: b,
                    rtl: y,
                    ariaLabel: 'Next month',
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
    )
  }),
  Ha = a(Zn)(La || (La = pt(['\n  ', '\n  ', '\n'], ['\n  ', '\n  ', '\n'])), Hn, function (e) {
    return (
      e.rtl &&
      r.css(Wa || (Wa = pt(['\n      direction: rtl;\n    '], ['\n      direction: rtl;\n    '])))
    )
  }),
  Ia = Rt(Mt, hn),
  Oa = a(mr)(Ea || (Ea = pt(['\n  ', '\n  ', '\n'], ['\n  ', '\n  ', '\n'])), Ia, function (e) {
    return (
      e.rtl &&
      r.css(
        Ma ||
          (Ma = pt(
            ['\n      transform: rotate(-90deg);\n    '],
            ['\n      transform: rotate(-90deg);\n    '],
          )),
      )
    )
  }),
  za = Rt(Ut, Ot, Pn),
  Ua = a(Xn)(Fa || (Fa = pt(['\n  ', '\n'], ['\n  ', '\n'])), za)
function Na(e) {
  var t = e.height,
    r = e.width,
    a = e.color,
    o = e.className,
    i = void 0 === o ? '' : o
  return n.createElement(
    'svg',
    {
      width: r,
      height: t,
      className: i,
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      color: a,
    },
    n.createElement('path', {
      d:
        'M16 3V7M8 3V7M4 11H20M6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5Z',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'square',
    }),
  )
}
var Aa,
  Ya,
  qa,
  Ga,
  ja = Nn({prop: 'placeholderColor', cssProperty: 'color'}),
  Xa = Nn({prop: 'placeholderFontWeight', cssProperty: 'fontWeight'}),
  Qa = Rt(At, Ot, Ut, pn, Pn, Xt),
  Va = a('label')(
    Aa ||
      (Aa = pt(
        [
          '\n  ',
          ';\n  position: relative;\n  width: 100%;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  flex-direction: ',
          ';\n  border-radius: 14px;\n  border: 1px solid ',
          ';\n  box-shadow: ',
          ';\n\n  &:hover {\n    border-color: ',
          ';\n  }\n',
        ],
        [
          '\n  ',
          ';\n  position: relative;\n  width: 100%;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  flex-direction: ',
          ';\n  border-radius: 14px;\n  border: 1px solid ',
          ';\n  box-shadow: ',
          ';\n\n  &:hover {\n    border-color: ',
          ';\n  }\n',
        ],
      )),
    Qa,
    function (e) {
      return e.$rtl ? 'row-reverse' : 'row'
    },
    function (e) {
      var t = e.$isFocused
      return e.$hasError
        ? nr.colors.inputBorderError
        : t
        ? nr.colors.inputBorderFocused
        : nr.colors.inputBorder
    },
    function (e) {
      var t = e.$isActive,
        n = e.$activeBoxShadow
      return t ? n : 'none'
    },
    nr.colors.inputBorderFocused,
  ),
  $a = a('div')(
    Ya ||
      (Ya = pt(
        [
          '\n  position: absolute;\n  top: 50%;\n  ',
          '\n  transform: translateY(-50%);\n  cursor: pointer;\n\n  svg {\n    display: block;\n  }\n',
        ],
        [
          '\n  position: absolute;\n  top: 50%;\n  ',
          '\n  transform: translateY(-50%);\n  cursor: pointer;\n\n  svg {\n    display: block;\n  }\n',
        ],
      )),
    function (e) {
      return e.$rtl ? 'left: 20px;' : 'right: 20px;'
    },
  ),
  Za = Rt(Ut, Xt, mn, gn, Mt, bn, Xt, Ot, cn, un, Qt),
  Ka = a('input')(
    qa ||
      (qa = pt(
        [
          '\n  ',
          '\n  flex: 1;\n  cursor: pointer;\n  box-sizing: border-box;\n  outline: 0;\n  border: none;\n  border-top-left-radius: ',
          ';\n  border-bottom-left-radius: ',
          ';\n  border-top-right-radius: ',
          ';\n  border-bottom-right-radius: ',
          ';\n  padding-right: ',
          ';\n  text-align: ',
          ';\n\n  ::-webkit-input-placeholder {\n    /* Chrome/Opera/Safari */\n    ',
          '\n    ',
          '\n  }\n  ::-moz-placeholder {\n    /* Firefox 19+ */\n    ',
          '\n    ',
          '\n  }\n  :-moz-placeholder {\n    /* Firefox 18- */\n    ',
          '\n    ',
          '\n  }\n',
        ],
        [
          '\n  ',
          '\n  flex: 1;\n  cursor: pointer;\n  box-sizing: border-box;\n  outline: 0;\n  border: none;\n  border-top-left-radius: ',
          ';\n  border-bottom-left-radius: ',
          ';\n  border-top-right-radius: ',
          ';\n  border-bottom-right-radius: ',
          ';\n  padding-right: ',
          ';\n  text-align: ',
          ';\n\n  ::-webkit-input-placeholder {\n    /* Chrome/Opera/Safari */\n    ',
          '\n    ',
          '\n  }\n  ::-moz-placeholder {\n    /* Firefox 19+ */\n    ',
          '\n    ',
          '\n  }\n  :-moz-placeholder {\n    /* Firefox 18- */\n    ',
          '\n    ',
          '\n  }\n',
        ],
      )),
    Za,
    function (e) {
      return e.$rtl ? '14px' : '0'
    },
    function (e) {
      return e.$rtl ? '14px' : '0'
    },
    function (e) {
      return e.$rtl ? '0' : '14px'
    },
    function (e) {
      return e.$rtl ? '0' : '14px'
    },
    function (e) {
      return e.$rtl ? '0' : '60px'
    },
    function (e) {
      return e.$rtl ? 'right' : 'left'
    },
    Xa,
    ja,
    Xa,
    ja,
    Xa,
    ja,
  ),
  _a = Rt(Mt, gn, bn),
  Ja = a('span')(
    Ga ||
      (Ga = pt(
        [
          '\n  ',
          '\n  min-width: 68px;\n  max-width: 68px;\n  flex-shrink: 0;\n  padding-left: ',
          ';\n  padding-right: ',
          ';\n  margin-right: 10px;\n  margin-left: 10px;\n  font-size: 14px;\n  font-family: ',
          ';\n  text-align: ',
          ';\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n',
        ],
        [
          '\n  ',
          '\n  min-width: 68px;\n  max-width: 68px;\n  flex-shrink: 0;\n  padding-left: ',
          ';\n  padding-right: ',
          ';\n  margin-right: 10px;\n  margin-left: 10px;\n  font-size: 14px;\n  font-family: ',
          ';\n  text-align: ',
          ';\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n',
        ],
      )),
    _a,
    function (e) {
      return e.$rtl ? '0' : '16px'
    },
    function (e) {
      return e.$rtl ? '16px' : '0'
    },
    nr.fontFamily,
    function (e) {
      return e.$rtl ? 'right' : 'left'
    },
  )
function eo(e) {
  var a = e.label,
    o = void 0 === a ? '' : a,
    i = e.placeholder,
    d = e.id,
    s = e.vertical,
    c = e.isActive,
    l = e.ariaLabel,
    u = e.onClick,
    p = e.value,
    f = e.showCalendarIcon,
    h = e.padding,
    g = e.rtl,
    m = e.disableAccessibility,
    b = e.dateFormat,
    v = e.onChange,
    y = void 0 === v ? function () {} : v,
    w = e.hasError,
    D = void 0 !== w && w,
    k = t.useState(p),
    x = k[0],
    C = k[1],
    T = t.useState(!1),
    S = T[0],
    B = T[1],
    R = t.useRef(null)
  t.useEffect(
    function () {
      C(p)
    },
    [p],
  )
  var W = t.useContext(r.ThemeContext),
    L = _n({
      fontFamily: nr.fontFamily,
      inputFontWeight: 400,
      inputFontSize: '16px',
      inputColor: rr('charcoal', er.charcoal, W),
      inputBackground: rr('white', er.white, W),
      inputMinHeight: '46px',
      inputWidth: '100%',
      inputPadding: h,
      inputBorder: rr('inputBorder', nr.colors.inputBorder, W),
      inputPlaceholderFontWeight: 500,
      inputPlaceholderColor: rr('inputPlaceholder', nr.colors.inputPlaceholder, W),
      inputCalendarWrapperPosition: 'absolute',
      inputCalendarWrapperHeight: '24px',
      inputCalendarWrapperWidth: '24px',
      inputCalendarWrapperTop: '50%',
      inputCalendarWrapperLeft: g ? '20px' : s ? '8px' : '16px',
      inputCalendarWrapperRight: g ? (s ? '8px' : '16px') : '20px',
      inputCalendarIconWidth: '24px',
      inputCalendarIconHeight: '24px',
      inputCalendarIconColor: rr('inputPlaceholder', nr.colors.inputPlaceholder, W),
      inputLabelDisplay: 'block',
      inputLabelPosition: 'relative',
      inputLabelBorder: '1px solid ' + rr('graci', er.graci, W),
      inputLabelBorderRadius: '2px',
      inputLabelBackground: rr('white', er.white, W),
      inputLabelMargin: '0',
      inputActiveBoxShadow: 'inset 0px -3px 0 ' + rr('primaryColor', er.primaryColor, W),
      inputLabelColor: rr('inputLabel', nr.colors.inputLabel, W),
    })
  return n.createElement(
    Va,
    {
      htmlFor: d,
      display: L.inputLabelDisplay,
      position: L.inputLabelPosition,
      border: L.inputLabelBorder,
      background: L.inputLabelBackground,
      borderRadius: L.inputLabelBorderRadius,
      m: L.inputLabelMargin,
      $isFocused: S,
      $hasError: D,
      $rtl: g,
      $isActive: c,
      $activeBoxShadow: L.inputActiveBoxShadow,
    },
    o && n.createElement(Ja, {color: L.inputLabelColor, $rtl: g}, o),
    n.createElement(Ka, {
      tabIndex: m ? -1 : 0,
      p: L.inputPadding,
      width: L.inputWidth,
      background: L.inputBackground,
      fontFamily: L.fontFamily,
      color: L.inputColor,
      fontSize: L.inputFontSize,
      fontWeight: L.inputFontWeight,
      placeholderColor: L.inputPlaceholderColor,
      placeholderFontWeight: L.inputPlaceholderFontWeight,
      id: d,
      placeholder: i,
      'aria-label': l,
      value: x,
      autoComplete: 'off',
      onChange: function (e) {
        var t = e.target.value
        C(t),
          'number' == typeof R.current && clearTimeout(R.current),
          (R.current = setTimeout(function () {
            u()
            var e = Te(t, b, new Date())
            isNaN(e) || y(e)
          }, 1e3))
      },
      onFocus: function () {
        B(!0), u()
      },
      onBlur: function () {
        return B(!1)
      },
      'data-testid': 'DatepickerInputModern',
      $rtl: g,
    }),
    f &&
      n.createElement(
        $a,
        {
          position: L.inputCalendarWrapperPosition,
          height: L.inputCalendarWrapperHeight,
          width: L.inputCalendarWrapperWidth,
          top: L.inputCalendarWrapperTop,
          left: L.inputCalendarWrapperLeft,
          right: L.inputCalendarWrapperRight,
          $rtl: g,
        },
        n.createElement(Na, {
          width: L.inputCalendarIconWidth,
          height: L.inputCalendarIconHeight,
          color: L.inputCalendarIconColor,
        }),
      ),
  )
}
var to,
  no,
  ro = a(Zn)(to || (to = pt(['\n  ', '\n'], ['\n  ', '\n'])), Hn),
  ao = Rt(Ut, Ot, Pn),
  oo = a(Xn)(
    no ||
      (no = pt(
        [
          '\n  ',
          ';\n  grid-template-columns: 1fr 1fr;\n  column-gap: 10px;\n\n  @media (max-width: 767px) {\n    grid-template-columns: 1fr;\n    row-gap: 10px;\n  }\n',
        ],
        [
          '\n  ',
          ';\n  grid-template-columns: 1fr 1fr;\n  column-gap: 10px;\n\n  @media (max-width: 767px) {\n    grid-template-columns: 1fr;\n    row-gap: 10px;\n  }\n',
        ],
      )),
    ao,
  )
var io,
  so,
  co = a(Zn)(so || (so = pt(['\n  ', '\n  ', '\n'], ['\n  ', '\n  ', '\n'])), Hn, function (e) {
    return (
      e.rtl &&
      r.css(io || (io = pt(['\n      direction: rtl;\n    '], ['\n      direction: rtl;\n    '])))
    )
  })
;(exports.DateRangeInput = function (e) {
  var a = e.startDate,
    o = e.endDate,
    i = e.minBookingDate,
    d = e.maxBookingDate,
    s = e.firstDayOfWeek,
    c = e.onFocusChange,
    l = e.numberOfMonths,
    u = e.focusedInput,
    p = e.onDatesChange,
    f = e.exactMinBookingDays,
    h = e.dayLabelFormat,
    g = e.weekdayLabelFormat,
    m = e.monthLabelFormat,
    b = e.onDayRender,
    v = e.initialVisibleMonth,
    y = e.showClose,
    w = void 0 === y || y,
    D = e.showSelectedDates,
    k = void 0 === D || D,
    x = e.showResetDates,
    C = void 0 === x || x,
    T = e.vertical,
    S = void 0 !== T && T,
    B = e.rtl,
    R = void 0 !== B && B,
    W = e.isDateBlocked,
    L =
      void 0 === W
        ? function () {
            return !1
          }
        : W,
    M = e.minBookingDays,
    E = void 0 === M ? 1 : M,
    F = e.onClose,
    P = void 0 === F ? function () {} : F,
    H = e.showStartDateCalendarIcon,
    I = void 0 === H || H,
    O = e.showEndDateCalendarIcon,
    z = void 0 === O || O,
    U = e.displayFormat,
    N = void 0 === U ? 'MM/dd/yyyy' : U,
    A = e.phrases,
    Y = void 0 === A ? Yn : A,
    q = e.placement,
    G = void 0 === q ? 'bottom' : q,
    j = e.startDateInputId,
    X = void 0 === j ? 'startDate' : j,
    Q = e.endDateInputId,
    V = void 0 === Q ? 'endDate' : Q,
    $ = e.unavailableDates,
    Z = void 0 === $ ? [] : $,
    K = t.useRef(null),
    _ = t.useRef(null),
    J = t.useContext(r.ThemeContext),
    ee = _n(
      ut(
        {
          dateRangeZIndex: null,
          dateRangeBackground: 'transparent',
          dateRangeGridTemplateColumns: S ? '1fr 24px 1fr' : '194px 39px 194px',
          dateRangeGridTemplateRows: 'unset',
          dateRangeBorder: '0',
          dateRangeBorderRadius: '0',
          dateRangeArrowIconWidth: '15px',
          dateRangeArrowIconHeight: '12px',
          dateRangeArrowIconColor: rr('graci', er.graci, J),
          dateRangeArrowIconOpacity: 1,
          dateRangeStartDateInputPadding: S ? (R ? '0 32px 0 8px' : '0 8px 0 32px') : '0 44px',
          dateRangeEndDateInputPadding: S ? (R ? '0 32px 0 8px' : '0 8px 0 32px') : '0 44px',
          dateRangeDatepickerWrapperPosition: 'absolute',
        },
        (function (e, t) {
          return 'top' !== e || t
            ? 'top' === e && t
              ? {
                  dateRangeDatepickerWrapperTop: 'unset',
                  dateRangeDatepickerWrapperRight: '0',
                  dateRangeDatepickerWrapperBottom: '65px',
                  dateRangeDatepickerWrapperLeft: 'unset',
                }
              : 'bottom' === e && t
              ? {
                  dateRangeDatepickerWrapperTop: 'unset',
                  dateRangeDatepickerWrapperRight: '0',
                  dateRangeDatepickerWrapperBottom: 'unset',
                  dateRangeDatepickerWrapperLeft: 'unset',
                }
              : {
                  dateRangeDatepickerWrapperTop: 'unset',
                  dateRangeDatepickerWrapperRight: 'unset',
                  dateRangeDatepickerWrapperBottom: 'unset',
                  dateRangeDatepickerWrapperLeft: '0',
                }
            : {
                dateRangeDatepickerWrapperTop: 'unset',
                dateRangeDatepickerWrapperRight: 'unset',
                dateRangeDatepickerWrapperBottom: '65px',
                dateRangeDatepickerWrapperLeft: '0',
              }
        })(G, R),
      ),
    )
  function te(e) {
    null !== u && _ && _.current && !_.current.contains(e.target) && c(null)
  }
  function ne(e) {
    K && K.current && K.current.onDateSelect && K.current.onDateSelect(e)
  }
  return (
    t.useEffect(function () {
      return (
        'undefined' != typeof window && window.addEventListener('click', te),
        function () {
          window.removeEventListener('click', te)
        }
      )
    }),
    n.createElement(
      r.ThemeProvider,
      {
        theme: function (e) {
          return e || {}
        },
      },
      n.createElement(
        Ha,
        {zIndex: ee.dateRangeZIndex, rtl: R, position: 'relative', ref: _},
        n.createElement(
          Ua,
          {
            'data-testid': 'DateRangeInputGrid',
            background: ee.dateRangeBackground,
            gridTemplateColumns: ee.dateRangeGridTemplateColumns,
            gridTemplateRows: ee.dateRangeGridTemplateRows,
            border: ee.dateRangeBorder,
            borderRadius: ee.dateRangeBorderRadius,
          },
          n.createElement(gr, {
            id: X,
            ariaLabel: Y.startDateAriaLabel,
            placeholder: Y.startDatePlaceholder,
            value: it(a, N, ''),
            onClick: function () {
              return c(st)
            },
            showCalendarIcon: I,
            vertical: S,
            isActive: u === st,
            padding: ee.dateRangeStartDateInputPadding,
            rtl: R,
            onChange: ne,
            dateFormat: N,
          }),
          n.createElement(
            Vn,
            {alignItems: 'center', justifyContent: 'center'},
            n.createElement(Oa, {
              width: ee.dateRangeArrowIconWidth,
              height: ee.dateRangeArrowIconHeight,
              color: ee.dateRangeArrowIconColor,
              opacity: ee.dateRangeArrowIconOpacity,
              rtl: R,
            }),
          ),
          n.createElement(gr, {
            id: V,
            ariaLabel: Y.endDateAriaLabel,
            placeholder: Y.endDatePlaceholder,
            value: it(o, N, ''),
            onClick: function () {
              return c(a ? ct : st)
            },
            showCalendarIcon: z,
            vertical: S,
            isActive: u === ct,
            padding: ee.dateRangeEndDateInputPadding,
            rtl: R,
            disableAccessibility: u === st,
            onChange: ne,
            dateFormat: N,
          }),
        ),
        n.createElement(
          Zn,
          {
            position: ee.dateRangeDatepickerWrapperPosition,
            bottom: ee.dateRangeDatepickerWrapperBottom,
            left: ee.dateRangeDatepickerWrapperLeft,
            top: ee.dateRangeDatepickerWrapperTop,
            right: ee.dateRangeDatepickerWrapperRight,
          },
          null !== u &&
            n.createElement(Pa, {
              onClose: function () {
                P(), c(null)
              },
              startDate: a,
              endDate: o,
              minBookingDate: i,
              maxBookingDate: d,
              firstDayOfWeek: s,
              numberOfMonths: l,
              focusedInput: u,
              displayFormat: N,
              onDatesChange: p,
              minBookingDays: E,
              isDateBlocked: L,
              exactMinBookingDays: f,
              showResetDates: C,
              vertical: S,
              showSelectedDates: k,
              showClose: w,
              rtl: R,
              dayLabelFormat: h,
              weekdayLabelFormat: g,
              monthLabelFormat: m,
              onDayRender: b,
              phrases: Y,
              unavailableDates: Z,
              ref: K,
              initialVisibleMonth: v,
            }),
        ),
      ),
    )
  )
}),
  (exports.DateRangeInputModern = function (e) {
    var a = e.startDate,
      o = e.endDate,
      i = e.minBookingDate,
      d = e.maxBookingDate,
      s = e.firstDayOfWeek,
      c = e.onFocusChange,
      l = e.numberOfMonths,
      u = e.focusedInput,
      p = e.onDatesChange,
      f = e.exactMinBookingDays,
      h = e.dayLabelFormat,
      g = e.weekdayLabelFormat,
      m = e.monthLabelFormat,
      b = e.onDayRender,
      v = e.initialVisibleMonth,
      y = e.showClose,
      w = void 0 === y || y,
      D = e.showSelectedDates,
      k = void 0 === D || D,
      x = e.showResetDates,
      C = void 0 === x || x,
      T = e.vertical,
      S = void 0 !== T && T,
      B = e.rtl,
      R = void 0 !== B && B,
      W = e.isDateBlocked,
      L =
        void 0 === W
          ? function () {
              return !1
            }
          : W,
      M = e.minBookingDays,
      E = void 0 === M ? 1 : M,
      F = e.onClose,
      P = void 0 === F ? function () {} : F,
      H = e.showStartDateCalendarIcon,
      I = void 0 === H || H,
      O = e.showEndDateCalendarIcon,
      z = void 0 === O || O,
      U = e.displayFormat,
      N = void 0 === U ? 'MM/dd/yyyy' : U,
      A = e.phrases,
      Y = void 0 === A ? Yn : A,
      q = e.placement,
      G = void 0 === q ? 'bottom' : q,
      j = e.startDateInputId,
      X = void 0 === j ? 'startDate' : j,
      Q = e.endDateInputId,
      V = void 0 === Q ? 'endDate' : Q,
      $ = e.unavailableDates,
      Z = void 0 === $ ? [] : $,
      K = e.startDateLabel,
      _ = void 0 === K ? 'From' : K,
      J = e.endDateLabel,
      ee = void 0 === J ? 'To' : J,
      te = t.useRef(null),
      ne = t.useRef(null),
      re = t.useContext(r.ThemeContext),
      ae = _n(
        ut(
          {
            dateRangeZIndex: null,
            dateRangeBackground: 'transparent',
            dateRangeGridTemplateColumns: S ? '1fr 24px 1fr' : '194px 39px 194px',
            dateRangeGridTemplateRows: 'unset',
            dateRangeBorder: '0',
            dateRangeBorderRadius: '0',
            dateRangeArrowIconWidth: '15px',
            dateRangeArrowIconHeight: '12px',
            dateRangeArrowIconColor: rr('graci', er.graci, re),
            dateRangeArrowIconOpacity: 1,
            dateRangeStartDateInputPadding: S ? (R ? '0 32px 0 8px' : '0 8px 0 32px') : '0 0x',
            dateRangeEndDateInputPadding: S ? (R ? '0 32px 0 8px' : '0 8px 0 32px') : '0 0px',
            dateRangeDatepickerWrapperPosition: 'absolute',
          },
          (function (e, t) {
            return 'top' !== e || t
              ? 'top' === e && t
                ? {
                    dateRangeDatepickerWrapperTop: 'unset',
                    dateRangeDatepickerWrapperRight: '0',
                    dateRangeDatepickerWrapperBottom: '65px',
                    dateRangeDatepickerWrapperLeft: 'unset',
                  }
                : 'bottom' === e && t
                ? {
                    dateRangeDatepickerWrapperTop: 'unset',
                    dateRangeDatepickerWrapperRight: '0',
                    dateRangeDatepickerWrapperBottom: 'unset',
                    dateRangeDatepickerWrapperLeft: 'unset',
                  }
                : {
                    dateRangeDatepickerWrapperTop: 'unset',
                    dateRangeDatepickerWrapperRight: 'unset',
                    dateRangeDatepickerWrapperBottom: 'unset',
                    dateRangeDatepickerWrapperLeft: '0',
                  }
              : {
                  dateRangeDatepickerWrapperTop: 'unset',
                  dateRangeDatepickerWrapperRight: 'unset',
                  dateRangeDatepickerWrapperBottom: '65px',
                  dateRangeDatepickerWrapperLeft: '0',
                }
          })(G, R),
        ),
      )
    function oe(e) {
      null !== u && ne && ne.current && !ne.current.contains(e.target) && c(null)
    }
    function ie(e) {
      te && te.current && te.current.onDateSelect && te.current.onDateSelect(e)
    }
    return (
      t.useEffect(function () {
        return (
          'undefined' != typeof window && window.addEventListener('click', oe),
          function () {
            window.removeEventListener('click', oe)
          }
        )
      }),
      n.createElement(
        r.ThemeProvider,
        {
          theme: function (e) {
            return e || {}
          },
        },
        n.createElement(
          ro,
          {zIndex: ae.dateRangeZIndex, rtl: R, position: 'relative', ref: ne},
          n.createElement(
            oo,
            {
              'data-testid': 'DateRangeInputGrid',
              background: ae.dateRangeBackground,
              gridTemplateColumns: ae.dateRangeGridTemplateColumns,
              gridTemplateRows: ae.dateRangeGridTemplateRows,
              border: ae.dateRangeBorder,
              borderRadius: ae.dateRangeBorderRadius,
            },
            n.createElement(eo, {
              id: X,
              label: _,
              ariaLabel: Y.startDateAriaLabel,
              placeholder: Y.startDatePlaceholder,
              value: it(a, N, ''),
              onClick: function () {
                return c(st)
              },
              showCalendarIcon: I,
              vertical: S,
              isActive: u === st,
              padding: ae.dateRangeStartDateInputPadding,
              rtl: R,
              onChange: ie,
              dateFormat: N,
            }),
            n.createElement(eo, {
              label: ee,
              id: V,
              ariaLabel: Y.endDateAriaLabel,
              placeholder: Y.endDatePlaceholder,
              value: it(o, N, ''),
              onClick: function () {
                return c(a ? ct : st)
              },
              showCalendarIcon: z,
              vertical: S,
              isActive: u === ct,
              padding: ae.dateRangeEndDateInputPadding,
              rtl: R,
              disableAccessibility: u === st,
              onChange: ie,
              dateFormat: N,
            }),
          ),
          n.createElement(
            Zn,
            {
              position: ae.dateRangeDatepickerWrapperPosition,
              bottom: ae.dateRangeDatepickerWrapperBottom,
              left: ae.dateRangeDatepickerWrapperLeft,
              top: ae.dateRangeDatepickerWrapperTop,
              right: ae.dateRangeDatepickerWrapperRight,
            },
            null !== u &&
              n.createElement(Pa, {
                onClose: function () {
                  P(), c(null)
                },
                startDate: a,
                endDate: o,
                minBookingDate: i,
                maxBookingDate: d,
                firstDayOfWeek: s,
                numberOfMonths: l,
                focusedInput: u,
                displayFormat: N,
                onDatesChange: p,
                minBookingDays: E,
                isDateBlocked: L,
                exactMinBookingDays: f,
                showResetDates: C,
                vertical: S,
                showSelectedDates: k,
                showClose: w,
                rtl: R,
                dayLabelFormat: h,
                weekdayLabelFormat: g,
                monthLabelFormat: m,
                onDayRender: b,
                phrases: Y,
                unavailableDates: Z,
                ref: te,
                initialVisibleMonth: v,
              }),
          ),
        ),
      )
    )
  }),
  (exports.DateSingleInput = function (e) {
    var a = e.date,
      o = e.minBookingDate,
      i = e.maxBookingDate,
      d = e.firstDayOfWeek,
      s = e.onFocusChange,
      c = e.showDatepicker,
      l = e.onDateChange,
      u = e.dayLabelFormat,
      p = e.weekdayLabelFormat,
      f = e.monthLabelFormat,
      h = e.onDayRender,
      g = e.initialVisibleMonth,
      m = e.numberOfMonths,
      b = void 0 === m ? 1 : m,
      v = e.showClose,
      y = void 0 === v || v,
      w = e.showResetDate,
      D = void 0 === w || w,
      k = e.vertical,
      x = void 0 !== k && k,
      C = e.rtl,
      T = void 0 !== C && C,
      S = e.isDateBlocked,
      B =
        void 0 === S
          ? function () {
              return !1
            }
          : S,
      R = e.onClose,
      W = void 0 === R ? function () {} : R,
      L = e.showCalendarIcon,
      M = void 0 === L || L,
      E = e.displayFormat,
      F = void 0 === E ? 'MM/dd/yyyy' : E,
      P = e.phrases,
      H = void 0 === P ? qn : P,
      I = e.placement,
      O = void 0 === I ? 'bottom' : I,
      z = e.inputId,
      U = void 0 === z ? 'startDate' : z,
      N = e.unavailableDates,
      A = void 0 === N ? [] : N,
      Y = t.useRef(null),
      q = t.useRef(null),
      G = _n(
        ut(
          {
            dateSingleZIndex: null,
            dateSingleInputPadding: x ? (T ? '0 32px 0 8px' : '0 8px 0 32px') : '0 44px',
            dateSingleDatepickerWrapperPosition: 'absolute',
          },
          (function (e, t) {
            return 'top' !== e || t
              ? 'top' === e && t
                ? {
                    dateSingleDatepickerWrapperTop: 'unset',
                    dateSingleDatepickerWrapperRight: '0',
                    dateSingleDatepickerWrapperBottom: '65px',
                    dateSingleDatepickerWrapperLeft: 'unset',
                  }
                : 'bottom' === e && t
                ? {
                    dateSingleDatepickerWrapperTop: 'unset',
                    dateSingleDatepickerWrapperRight: '0',
                    dateSingleDatepickerWrapperBottom: 'unset',
                    dateSingleDatepickerWrapperLeft: 'unset',
                  }
                : {
                    dateSingleDatepickerWrapperTop: 'unset',
                    dateSingleDatepickerWrapperRight: 'unset',
                    dateSingleDatepickerWrapperBottom: 'unset',
                    dateSingleDatepickerWrapperLeft: '0',
                  }
              : {
                  dateSingleDatepickerWrapperTop: 'unset',
                  dateSingleDatepickerWrapperRight: 'unset',
                  dateSingleDatepickerWrapperBottom: '65px',
                  dateSingleDatepickerWrapperLeft: '0',
                }
          })(O, T),
        ),
      )
    function j(e) {
      c && q && q.current && !q.current.contains(e.target) && s(!1)
    }
    return (
      t.useEffect(function () {
        return (
          'undefined' != typeof window && window.addEventListener('click', j),
          function () {
            window.removeEventListener('click', j)
          }
        )
      }),
      n.createElement(
        r.ThemeProvider,
        {
          theme: function (e) {
            return e || {}
          },
        },
        n.createElement(
          co,
          {zIndex: G.dateSingleZIndex, rtl: T, position: 'relative', ref: q},
          n.createElement(gr, {
            id: U,
            ariaLabel: H.dateAriaLabel,
            placeholder: H.datePlaceholder,
            value: it(a, F, ''),
            onClick: function () {
              return s(!0)
            },
            showCalendarIcon: M,
            vertical: x,
            isActive: !1,
            padding: G.dateSingleInputPadding,
            rtl: T,
            onChange: function (e) {
              Y && Y.current && Y.current.onDateSelect && Y.current.onDateSelect(e)
            },
            dateFormat: F,
          }),
          n.createElement(
            Zn,
            {
              position: G.dateSingleDatepickerWrapperPosition,
              bottom: G.dateSingleDatepickerWrapperBottom,
              left: G.dateSingleDatepickerWrapperLeft,
              top: G.dateSingleDatepickerWrapperTop,
              right: G.dateSingleDatepickerWrapperRight,
            },
            c &&
              n.createElement(Pa, {
                exactMinBookingDays: !0,
                minBookingDays: 1,
                onClose: function () {
                  W(), s(!1)
                },
                startDate: a,
                endDate: a,
                minBookingDate: o,
                maxBookingDate: i,
                firstDayOfWeek: d,
                numberOfMonths: b,
                focusedInput: c ? st : null,
                displayFormat: F,
                onDatesChange: function (e) {
                  var t = e.focusedInput,
                    n = e.startDate
                  l({showDatepicker: null !== t, date: n})
                },
                isDateBlocked: B,
                showResetDates: D,
                vertical: x,
                showSelectedDates: !1,
                showClose: y,
                rtl: T,
                dayLabelFormat: u,
                weekdayLabelFormat: p,
                monthLabelFormat: f,
                onDayRender: h,
                phrases: H,
                ref: Y,
                unavailableDates: A,
                initialVisibleMonth: g,
              }),
          ),
        ),
      )
    )
  }),
  (exports.Datepicker = Pa),
  (exports.END_DATE = ct),
  (exports.START_DATE = st),
  (exports.dateRangeInputPhrases = Yn),
  (exports.dateSingleInputPhrases = qn),
  (exports.datepickerPhrases = An)
