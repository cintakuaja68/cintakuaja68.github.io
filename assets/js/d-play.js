"object" == typeof navigator &&
  (function () {
    "use strict";
    const e = document.getElementById("container"),
      t = "tab-focus";
    document.addEventListener("focusout", (n) => {
      n.target.classList &&
        !e.contains(n.target) &&
        n.target.classList.remove(t);
    }),
      document.addEventListener("keydown", (n) => {
        "Tab" === n.key &&
          setTimeout(() => {
            const n = document.activeElement;
            n && n.classList && !e.contains(n) && n.classList.add(t);
          }, 10);
      }),
      (function () {
        if ("undefined" != typeof window)
          try {
            var e = new window.CustomEvent("test", { cancelable: !0 });
            if ((e.preventDefault(), !0 !== e.defaultPrevented))
              throw new Error("Could not prevent default");
          } catch (e) {
            var t = function (e, t) {
              var n, i;
              return (
                ((t = t || {}).bubbles = !!t.bubbles),
                (t.cancelable = !!t.cancelable),
                (n = document.createEvent("CustomEvent")).initCustomEvent(
                  e,
                  t.bubbles,
                  t.cancelable,
                  t.detail
                ),
                (i = n.preventDefault),
                (n.preventDefault = function () {
                  i.call(this);
                  try {
                    Object.defineProperty(this, "defaultPrevented", {
                      get: function () {
                        return !0;
                      },
                    });
                  } catch (e) {
                    this.defaultPrevented = !0;
                  }
                }),
                n
              );
            };
            (t.prototype = window.Event.prototype), (window.CustomEvent = t);
          }
      })();
    var n =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
    !(function (e) {
      var t = (function () {
          try {
            return !!Symbol.iterator;
          } catch (e) {
            return !1;
          }
        })(),
        n = function (e) {
          var n = {
            next: function () {
              var t = e.shift();
              return { done: void 0 === t, value: t };
            },
          };
          return (
            t &&
              (n[Symbol.iterator] = function () {
                return n;
              }),
            n
          );
        },
        i = function (e) {
          return encodeURIComponent(e).replace(/%20/g, "+");
        },
        r = function (e) {
          return decodeURIComponent(String(e).replace(/\+/g, " "));
        };
      (function () {
        try {
          var t = e.URLSearchParams;
          return (
            "a=1" === new t("?a=1").toString() &&
            "function" == typeof t.prototype.set &&
            "function" == typeof t.prototype.entries
          );
        } catch (e) {
          return !1;
        }
      })() ||
        (function () {
          var r = function (e) {
              Object.defineProperty(this, "_entries", {
                writable: !0,
                value: {},
              });
              var t = typeof e;
              if ("undefined" === t);
              else if ("string" === t) "" !== e && this._fromString(e);
              else if (e instanceof r) {
                var n = this;
                e.forEach(function (e, t) {
                  n.append(t, e);
                });
              } else {
                if (null === e || "object" !== t)
                  throw new TypeError(
                    "Unsupported input's type for URLSearchParams"
                  );
                if ("[object Array]" === Object.prototype.toString.call(e))
                  for (var i = 0; i < e.length; i++) {
                    var s = e[i];
                    if (
                      "[object Array]" !== Object.prototype.toString.call(s) &&
                      2 === s.length
                    )
                      throw new TypeError(
                        "Expected [string, any] as entry at index " +
                          i +
                          " of URLSearchParams's input"
                      );
                    this.append(s[0], s[1]);
                  }
                else
                  for (var o in e) e.hasOwnProperty(o) && this.append(o, e[o]);
              }
            },
            s = r.prototype;
          (s.append = function (e, t) {
            e in this._entries
              ? this._entries[e].push(String(t))
              : (this._entries[e] = [String(t)]);
          }),
            (s.delete = function (e) {
              delete this._entries[e];
            }),
            (s.get = function (e) {
              return e in this._entries ? this._entries[e][0] : null;
            }),
            (s.getAll = function (e) {
              return e in this._entries ? this._entries[e].slice(0) : [];
            }),
            (s.has = function (e) {
              return e in this._entries;
            }),
            (s.set = function (e, t) {
              this._entries[e] = [String(t)];
            }),
            (s.forEach = function (e, t) {
              var n;
              for (var i in this._entries)
                if (this._entries.hasOwnProperty(i)) {
                  n = this._entries[i];
                  for (var r = 0; r < n.length; r++) e.call(t, n[r], i, this);
                }
            }),
            (s.keys = function () {
              var e = [];
              return (
                this.forEach(function (t, n) {
                  e.push(n);
                }),
                n(e)
              );
            }),
            (s.values = function () {
              var e = [];
              return (
                this.forEach(function (t) {
                  e.push(t);
                }),
                n(e)
              );
            }),
            (s.entries = function () {
              var e = [];
              return (
                this.forEach(function (t, n) {
                  e.push([n, t]);
                }),
                n(e)
              );
            }),
            t && (s[Symbol.iterator] = s.entries),
            (s.toString = function () {
              var e = [];
              return (
                this.forEach(function (t, n) {
                  e.push(i(n) + "=" + i(t));
                }),
                e.join("&")
              );
            }),
            (e.URLSearchParams = r);
        })();
      var s = e.URLSearchParams.prototype;
      "function" != typeof s.sort &&
        (s.sort = function () {
          var e = this,
            t = [];
          this.forEach(function (n, i) {
            t.push([i, n]), e._entries || e.delete(i);
          }),
            t.sort(function (e, t) {
              return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0;
            }),
            e._entries && (e._entries = {});
          for (var n = 0; n < t.length; n++) this.append(t[n][0], t[n][1]);
        }),
        "function" != typeof s._fromString &&
          Object.defineProperty(s, "_fromString", {
            enumerable: !1,
            configurable: !1,
            writable: !1,
            value: function (e) {
              if (this._entries) this._entries = {};
              else {
                var t = [];
                this.forEach(function (e, n) {
                  t.push(n);
                });
                for (var n = 0; n < t.length; n++) this.delete(t[n]);
              }
              var i,
                s = (e = e.replace(/^\?/, "")).split("&");
              for (n = 0; n < s.length; n++)
                (i = s[n].split("=")),
                  this.append(r(i[0]), i.length > 1 ? r(i[1]) : "");
            },
          });
    })(
      void 0 !== n
        ? n
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof self
        ? self
        : n
    ),
      (function (e) {
        if (
          ((function () {
            try {
              var t = new e.URL("b", "http://a");
              return (
                (t.pathname = "c d"),
                "http://a/c%20d" === t.href && t.searchParams
              );
            } catch (e) {
              return !1;
            }
          })() ||
            (function () {
              var t = e.URL,
                n = function (t, n) {
                  "string" != typeof t && (t = String(t)),
                    n && "string" != typeof n && (n = String(n));
                  var i,
                    r = document;
                  if (n && (void 0 === e.location || n !== e.location.href)) {
                    (n = n.toLowerCase()),
                      ((i = (r =
                        document.implementation.createHTMLDocument(
                          ""
                        )).createElement("base")).href = n),
                      r.head.appendChild(i);
                    try {
                      if (0 !== i.href.indexOf(n)) throw new Error(i.href);
                    } catch (e) {
                      throw new Error(
                        "URL unable to set base " + n + " due to " + e
                      );
                    }
                  }
                  var s = r.createElement("a");
                  (s.href = t), i && (r.body.appendChild(s), (s.href = s.href));
                  var o = r.createElement("input");
                  if (
                    ((o.type = "url"),
                    (o.value = t),
                    ":" === s.protocol ||
                      !/:/.test(s.href) ||
                      (!o.checkValidity() && !n))
                  )
                    throw new TypeError("Invalid URL");
                  Object.defineProperty(this, "_anchorElement", { value: s });
                  var a = new e.URLSearchParams(this.search),
                    l = !0,
                    c = !0,
                    u = this;
                  ["append", "delete", "set"].forEach(function (e) {
                    var t = a[e];
                    a[e] = function () {
                      t.apply(a, arguments),
                        l && ((c = !1), (u.search = a.toString()), (c = !0));
                    };
                  }),
                    Object.defineProperty(this, "searchParams", {
                      value: a,
                      enumerable: !0,
                    });
                  var h = void 0;
                  Object.defineProperty(this, "_updateSearchParams", {
                    enumerable: !1,
                    configurable: !1,
                    writable: !1,
                    value: function () {
                      this.search !== h &&
                        ((h = this.search),
                        c &&
                          ((l = !1),
                          this.searchParams._fromString(this.search),
                          (l = !0)));
                    },
                  });
                },
                i = n.prototype;
              ["hash", "host", "hostname", "port", "protocol"].forEach(
                function (e) {
                  !(function (e) {
                    Object.defineProperty(i, e, {
                      get: function () {
                        return this._anchorElement[e];
                      },
                      set: function (t) {
                        this._anchorElement[e] = t;
                      },
                      enumerable: !0,
                    });
                  })(e);
                }
              ),
                Object.defineProperty(i, "search", {
                  get: function () {
                    return this._anchorElement.search;
                  },
                  set: function (e) {
                    (this._anchorElement.search = e),
                      this._updateSearchParams();
                  },
                  enumerable: !0,
                }),
                Object.defineProperties(i, {
                  toString: {
                    get: function () {
                      var e = this;
                      return function () {
                        return e.href;
                      };
                    },
                  },
                  href: {
                    get: function () {
                      return this._anchorElement.href.replace(/\?$/, "");
                    },
                    set: function (e) {
                      (this._anchorElement.href = e),
                        this._updateSearchParams();
                    },
                    enumerable: !0,
                  },
                  pathname: {
                    get: function () {
                      return this._anchorElement.pathname.replace(
                        /(^\/?)/,
                        "/"
                      );
                    },
                    set: function (e) {
                      this._anchorElement.pathname = e;
                    },
                    enumerable: !0,
                  },
                  origin: {
                    get: function () {
                      var e = { "http:": 80, "https:": 443, "ftp:": 21 }[
                          this._anchorElement.protocol
                        ],
                        t =
                          this._anchorElement.port != e &&
                          "" !== this._anchorElement.port;
                      return (
                        this._anchorElement.protocol +
                        "//" +
                        this._anchorElement.hostname +
                        (t ? ":" + this._anchorElement.port : "")
                      );
                    },
                    enumerable: !0,
                  },
                  password: {
                    get: function () {
                      return "";
                    },
                    set: function (e) {},
                    enumerable: !0,
                  },
                  username: {
                    get: function () {
                      return "";
                    },
                    set: function (e) {},
                    enumerable: !0,
                  },
                }),
                (n.createObjectURL = function (e) {
                  return t.createObjectURL.apply(t, arguments);
                }),
                (n.revokeObjectURL = function (e) {
                  return t.revokeObjectURL.apply(t, arguments);
                }),
                (e.URL = n);
            })(),
          void 0 !== e.location && !("origin" in e.location))
        ) {
          var t = function () {
            return (
              e.location.protocol +
              "//" +
              e.location.hostname +
              (e.location.port ? ":" + e.location.port : "")
            );
          };
          try {
            Object.defineProperty(e.location, "origin", {
              get: t,
              enumerable: !0,
            });
          } catch (n) {
            setInterval(function () {
              e.location.origin = t();
            }, 100);
          }
        }
      })(
        void 0 !== n
          ? n
          : "undefined" != typeof window
          ? window
          : "undefined" != typeof self
          ? self
          : n
      );
    /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */ var i =
      function (e, t) {
        return (
          (i =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            }),
          i(e, t)
        );
      };
    function r(e, t) {
      function n() {
        this.constructor = e;
      }
      i(e, t),
        (e.prototype =
          null === t
            ? Object.create(t)
            : ((n.prototype = t.prototype), new n()));
    }
    var s,
      o = function () {
        return (
          (o =
            Object.assign ||
            function (e) {
              for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var r in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
              return e;
            }),
          o.apply(this, arguments)
        );
      };
    function a(e) {
      var t = "function" == typeof Symbol && Symbol.iterator,
        n = t && e[t],
        i = 0;
      if (n) return n.call(e);
      if (e && "number" == typeof e.length)
        return {
          next: function () {
            return (
              e && i >= e.length && (e = void 0),
              { value: e && e[i++], done: !e }
            );
          },
        };
      throw new TypeError(
        t ? "Object is not iterable." : "Symbol.iterator is not defined."
      );
    }
    function l(e, t) {
      var n = "function" == typeof Symbol && e[Symbol.iterator];
      if (!n) return e;
      var i,
        r,
        s = n.call(e),
        o = [];
      try {
        for (; (void 0 === t || t-- > 0) && !(i = s.next()).done; )
          o.push(i.value);
      } catch (e) {
        r = { error: e };
      } finally {
        try {
          i && !i.done && (n = s.return) && n.call(s);
        } finally {
          if (r) throw r.error;
        }
      }
      return o;
    }
    function c() {
      for (var e = [], t = 0; t < arguments.length; t++)
        e = e.concat(l(arguments[t]));
      return e;
    }
    function u() {
      return (
        !(
          "undefined" != typeof __SENTRY_BROWSER_BUNDLE__ &&
          __SENTRY_BROWSER_BUNDLE__
        ) &&
        "[object process]" ===
          Object.prototype.toString.call(
            "undefined" != typeof process ? process : 0
          )
      );
    }
    !(function (e) {
      (e.Fatal = "fatal"),
        (e.Error = "error"),
        (e.Warning = "warning"),
        (e.Log = "log"),
        (e.Info = "info"),
        (e.Debug = "debug"),
        (e.Critical = "critical");
    })(s || (s = {}));
    var h = {};
    function d() {
      return u()
        ? global
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof self
        ? self
        : h;
    }
    function p(e, t, n) {
      var i = n || d(),
        r = (i.__SENTRY__ = i.__SENTRY__ || {});
      return r[e] || (r[e] = t());
    }
    var f = Object.prototype.toString;
    function m(e) {
      switch (f.call(e)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
          return !0;
        default:
          return E(e, Error);
      }
    }
    function g(e, t) {
      return f.call(e) === "[object " + t + "]";
    }
    function y(e) {
      return g(e, "ErrorEvent");
    }
    function v(e) {
      return g(e, "DOMError");
    }
    function b(e) {
      return g(e, "String");
    }
    function w(e) {
      return null === e || ("object" != typeof e && "function" != typeof e);
    }
    function _(e) {
      return g(e, "Object");
    }
    function k(e) {
      return "undefined" != typeof Event && E(e, Event);
    }
    function T(e) {
      return Boolean(e && e.then && "function" == typeof e.then);
    }
    function E(e, t) {
      try {
        return e instanceof t;
      } catch (e) {
        return !1;
      }
    }
    function S(e, t) {
      try {
        for (
          var n = e, i = [], r = 0, s = 0, o = " > ".length, a = void 0;
          n &&
          r++ < 5 &&
          !(
            "html" === (a = x(n, t)) ||
            (r > 1 && s + i.length * o + a.length >= 80)
          );

        )
          i.push(a), (s += a.length), (n = n.parentNode);
        return i.reverse().join(" > ");
      } catch (e) {
        return "<unknown>";
      }
    }
    function x(e, t) {
      var n,
        i,
        r,
        s,
        o,
        a = e,
        l = [];
      if (!a || !a.tagName) return "";
      l.push(a.tagName.toLowerCase());
      var c =
        t && t.length
          ? t
              .filter(function (e) {
                return a.getAttribute(e);
              })
              .map(function (e) {
                return [e, a.getAttribute(e)];
              })
          : null;
      if (c && c.length)
        c.forEach(function (e) {
          l.push("[" + e[0] + '="' + e[1] + '"]');
        });
      else if ((a.id && l.push("#" + a.id), (n = a.className) && b(n)))
        for (i = n.split(/\s+/), o = 0; o < i.length; o++) l.push("." + i[o]);
      var u = ["type", "name", "title", "alt"];
      for (o = 0; o < u.length; o++)
        (r = u[o]),
          (s = a.getAttribute(r)) && l.push("[" + r + '="' + s + '"]');
      return l.join("");
    }
    var C =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array
        ? function (e, t) {
            return (e.__proto__ = t), e;
          }
        : function (e, t) {
            for (var n in t)
              Object.prototype.hasOwnProperty.call(e, n) || (e[n] = t[n]);
            return e;
          });
    var A = (function (e) {
        function t(t) {
          var n = this.constructor,
            i = e.call(this, t) || this;
          return (
            (i.message = t),
            (i.name = n.prototype.constructor.name),
            C(i, n.prototype),
            i
          );
        }
        return r(t, e), t;
      })(Error),
      P = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
      O = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
    function N(e, t) {
      void 0 === t && (t = !1);
      var n = e.host,
        i = e.path,
        r = e.pass,
        s = e.port,
        o = e.projectId;
      return (
        e.protocol +
        "://" +
        e.publicKey +
        (t && r ? ":" + r : "") +
        "@" +
        n +
        (s ? ":" + s : "") +
        "/" +
        (i ? i + "/" : i) +
        o
      );
    }
    function L(e) {
      return (
        "user" in e && !("publicKey" in e) && (e.publicKey = e.user),
        {
          user: e.publicKey || "",
          protocol: e.protocol,
          publicKey: e.publicKey || "",
          pass: e.pass || "",
          host: e.host,
          port: e.port || "",
          path: e.path || "",
          projectId: e.projectId,
        }
      );
    }
    function M(e) {
      var t =
        "string" == typeof e
          ? (function (e) {
              var t = O.exec(e);
              if (!t) throw new A("Invalid Sentry Dsn: " + e);
              var n = l(t.slice(1), 6),
                i = n[0],
                r = n[1],
                s = n[2],
                o = void 0 === s ? "" : s,
                a = n[3],
                c = n[4],
                u = void 0 === c ? "" : c,
                h = "",
                d = n[5],
                p = d.split("/");
              if (
                (p.length > 1 &&
                  ((h = p.slice(0, -1).join("/")), (d = p.pop())),
                d)
              ) {
                var f = d.match(/^\d+/);
                f && (d = f[0]);
              }
              return L({
                host: a,
                pass: o,
                path: h,
                projectId: d,
                port: u,
                protocol: i,
                publicKey: r,
              });
            })(e)
          : L(e);
      return (
        (function (e) {
          if (P) {
            var t = e.port,
              n = e.projectId,
              i = e.protocol;
            if (
              (["protocol", "publicKey", "host", "projectId"].forEach(function (
                t
              ) {
                if (!e[t]) throw new A("Invalid Sentry Dsn: " + t + " missing");
              }),
              !n.match(/^\d+$/))
            )
              throw new A("Invalid Sentry Dsn: Invalid projectId " + n);
            if (
              !(function (e) {
                return "http" === e || "https" === e;
              })(i)
            )
              throw new A("Invalid Sentry Dsn: Invalid protocol " + i);
            if (t && isNaN(parseInt(t, 10)))
              throw new A("Invalid Sentry Dsn: Invalid port " + t);
          }
        })(t),
        t
      );
    }
    var I,
      j = ["fatal", "error", "warning", "log", "info", "debug", "critical"],
      R = d(),
      D = "Sentry Logger ",
      q = ["debug", "info", "warn", "error", "log", "assert"];
    function $(e) {
      var t = d();
      if (!("console" in t)) return e();
      var n = t.console,
        i = {};
      q.forEach(function (e) {
        var r = n[e] && n[e].__sentry_original__;
        e in t.console && r && ((i[e] = n[e]), (n[e] = r));
      });
      try {
        return e();
      } finally {
        Object.keys(i).forEach(function (e) {
          n[e] = i[e];
        });
      }
    }
    function U() {
      var e = !1,
        t = {
          enable: function () {
            e = !0;
          },
          disable: function () {
            e = !1;
          },
        };
      return (
        P
          ? q.forEach(function (n) {
              t[n] = function () {
                for (var t = [], i = 0; i < arguments.length; i++)
                  t[i] = arguments[i];
                e &&
                  $(function () {
                    var e;
                    (e = R.console)[n].apply(e, c([D + "[" + n + "]:"], t));
                  });
              };
            })
          : q.forEach(function (e) {
              t[e] = function () {};
            }),
        t
      );
    }
    function F(e, t) {
      return (
        void 0 === t && (t = 0),
        "string" != typeof e || 0 === t || e.length <= t
          ? e
          : e.substr(0, t) + "..."
      );
    }
    function B(e, t) {
      if (!Array.isArray(e)) return "";
      for (var n = [], i = 0; i < e.length; i++) {
        var r = e[i];
        try {
          n.push(String(r));
        } catch (e) {
          n.push("[value cannot be serialized]");
        }
      }
      return n.join(t);
    }
    function H(e, t) {
      return (
        !!b(e) &&
        (g(t, "RegExp")
          ? t.test(e)
          : "string" == typeof t && -1 !== e.indexOf(t))
      );
    }
    function V(e, t, n) {
      if (t in e) {
        var i = e[t],
          r = n(i);
        if ("function" == typeof r)
          try {
            W(r, i);
          } catch (e) {}
        e[t] = r;
      }
    }
    function z(e, t, n) {
      Object.defineProperty(e, t, { value: n, writable: !0, configurable: !0 });
    }
    function W(e, t) {
      var n = t.prototype || {};
      (e.prototype = t.prototype = n), z(e, "__sentry_original__", t);
    }
    function K(e) {
      return e.__sentry_original__;
    }
    function Y(e) {
      var t = e;
      if (m(e))
        t = o({ message: e.message, name: e.name, stack: e.stack }, X(e));
      else if (k(e)) {
        var n = e;
        (t = o(
          {
            type: n.type,
            target: J(n.target),
            currentTarget: J(n.currentTarget),
          },
          X(n)
        )),
          "undefined" != typeof CustomEvent &&
            E(e, CustomEvent) &&
            (t.detail = n.detail);
      }
      return t;
    }
    function J(e) {
      try {
        return (
          (t = e),
          "undefined" != typeof Element && E(t, Element)
            ? S(e)
            : Object.prototype.toString.call(e)
        );
      } catch (e) {
        return "<unknown>";
      }
      var t;
    }
    function X(e) {
      var t = {};
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return t;
    }
    function G(e, t) {
      void 0 === t && (t = 40);
      var n = Object.keys(Y(e));
      if ((n.sort(), !n.length)) return "[object has no keys]";
      if (n[0].length >= t) return F(n[0], t);
      for (var i = n.length; i > 0; i--) {
        var r = n.slice(0, i).join(", ");
        if (!(r.length > t)) return i === n.length ? r : F(r, t);
      }
      return "";
    }
    function Q(e) {
      var t, n;
      if (_(e)) {
        var i = {};
        try {
          for (var r = a(Object.keys(e)), s = r.next(); !s.done; s = r.next()) {
            var o = s.value;
            void 0 !== e[o] && (i[o] = Q(e[o]));
          }
        } catch (e) {
          t = { error: e };
        } finally {
          try {
            s && !s.done && (n = r.return) && n.call(r);
          } finally {
            if (t) throw t.error;
          }
        }
        return i;
      }
      return Array.isArray(e) ? e.map(Q) : e;
    }
    I = P ? p("logger", U) : U();
    function Z(e) {
      if (!e.length) return [];
      var t = e,
        n = t[0].function || "",
        i = t[t.length - 1].function || "";
      return (
        (-1 === n.indexOf("captureMessage") &&
          -1 === n.indexOf("captureException")) ||
          (t = t.slice(1)),
        -1 !== i.indexOf("sentryWrapped") && (t = t.slice(0, -1)),
        t
          .slice(0, 50)
          .map(function (e) {
            return o(o({}, e), {
              filename: e.filename || t[0].filename,
              function: e.function || "?",
            });
          })
          .reverse()
      );
    }
    var ee = "<anonymous>";
    function te(e) {
      try {
        return (e && "function" == typeof e && e.name) || ee;
      } catch (e) {
        return ee;
      }
    }
    function ne() {
      if (!("fetch" in d())) return !1;
      try {
        return new Headers(), new Request(""), new Response(), !0;
      } catch (e) {
        return !1;
      }
    }
    function ie(e) {
      return (
        e &&
        /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
      );
    }
    function re() {
      if (!ne()) return !1;
      try {
        return new Request("_", { referrerPolicy: "origin" }), !0;
      } catch (e) {
        return !1;
      }
    }
    var se,
      oe = d(),
      ae = {},
      le = {};
    function ce(e) {
      if (!le[e])
        switch (((le[e] = !0), e)) {
          case "console":
            !(function () {
              if (!("console" in oe)) return;
              q.forEach(function (e) {
                e in oe.console &&
                  V(oe.console, e, function (t) {
                    return function () {
                      for (var n = [], i = 0; i < arguments.length; i++)
                        n[i] = arguments[i];
                      he("console", { args: n, level: e }),
                        t && t.apply(oe.console, n);
                    };
                  });
              });
            })();
            break;
          case "dom":
            !(function () {
              if (!("document" in oe)) return;
              var e = he.bind(null, "dom"),
                t = ge(e, !0);
              oe.document.addEventListener("click", t, !1),
                oe.document.addEventListener("keypress", t, !1),
                ["EventTarget", "Node"].forEach(function (t) {
                  var n = oe[t] && oe[t].prototype;
                  n &&
                    n.hasOwnProperty &&
                    n.hasOwnProperty("addEventListener") &&
                    (V(n, "addEventListener", function (t) {
                      return function (n, i, r) {
                        if ("click" === n || "keypress" == n)
                          try {
                            var s = this,
                              o = (s.__sentry_instrumentation_handlers__ =
                                s.__sentry_instrumentation_handlers__ || {}),
                              a = (o[n] = o[n] || { refCount: 0 });
                            if (!a.handler) {
                              var l = ge(e);
                              (a.handler = l), t.call(this, n, l, r);
                            }
                            a.refCount += 1;
                          } catch (e) {}
                        return t.call(this, n, i, r);
                      };
                    }),
                    V(n, "removeEventListener", function (e) {
                      return function (t, n, i) {
                        if ("click" === t || "keypress" == t)
                          try {
                            var r = this,
                              s = r.__sentry_instrumentation_handlers__ || {},
                              o = s[t];
                            o &&
                              ((o.refCount -= 1),
                              o.refCount <= 0 &&
                                (e.call(this, t, o.handler, i),
                                (o.handler = void 0),
                                delete s[t]),
                              0 === Object.keys(s).length &&
                                delete r.__sentry_instrumentation_handlers__);
                          } catch (e) {}
                        return e.call(this, t, n, i);
                      };
                    }));
                });
            })();
            break;
          case "xhr":
            !(function () {
              if (!("XMLHttpRequest" in oe)) return;
              var e = XMLHttpRequest.prototype;
              V(e, "open", function (e) {
                return function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  var i = this,
                    r = t[1],
                    s = (i.__sentry_xhr__ = {
                      method: b(t[0]) ? t[0].toUpperCase() : t[0],
                      url: t[1],
                    });
                  b(r) &&
                    "POST" === s.method &&
                    r.match(/sentry_key/) &&
                    (i.__sentry_own_request__ = !0);
                  var o = function () {
                    if (4 === i.readyState) {
                      try {
                        s.status_code = i.status;
                      } catch (e) {}
                      he("xhr", {
                        args: t,
                        endTimestamp: Date.now(),
                        startTimestamp: Date.now(),
                        xhr: i,
                      });
                    }
                  };
                  return (
                    "onreadystatechange" in i &&
                    "function" == typeof i.onreadystatechange
                      ? V(i, "onreadystatechange", function (e) {
                          return function () {
                            for (var t = [], n = 0; n < arguments.length; n++)
                              t[n] = arguments[n];
                            return o(), e.apply(i, t);
                          };
                        })
                      : i.addEventListener("readystatechange", o),
                    e.apply(i, t)
                  );
                };
              }),
                V(e, "send", function (e) {
                  return function () {
                    for (var t = [], n = 0; n < arguments.length; n++)
                      t[n] = arguments[n];
                    return (
                      this.__sentry_xhr__ &&
                        void 0 !== t[0] &&
                        (this.__sentry_xhr__.body = t[0]),
                      he("xhr", {
                        args: t,
                        startTimestamp: Date.now(),
                        xhr: this,
                      }),
                      e.apply(this, t)
                    );
                  };
                });
            })();
            break;
          case "fetch":
            !(function () {
              if (
                !(function () {
                  if (!ne()) return !1;
                  var e = d();
                  if (ie(e.fetch)) return !0;
                  var t = !1,
                    n = e.document;
                  if (n && "function" == typeof n.createElement)
                    try {
                      var i = n.createElement("iframe");
                      (i.hidden = !0),
                        n.head.appendChild(i),
                        i.contentWindow &&
                          i.contentWindow.fetch &&
                          (t = ie(i.contentWindow.fetch)),
                        n.head.removeChild(i);
                    } catch (e) {
                      P &&
                        I.warn(
                          "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
                          e
                        );
                    }
                  return t;
                })()
              )
                return;
              V(oe, "fetch", function (e) {
                return function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  var i = {
                    args: t,
                    fetchData: { method: de(t), url: pe(t) },
                    startTimestamp: Date.now(),
                  };
                  return (
                    he("fetch", o({}, i)),
                    e.apply(oe, t).then(
                      function (e) {
                        return (
                          he(
                            "fetch",
                            o(o({}, i), {
                              endTimestamp: Date.now(),
                              response: e,
                            })
                          ),
                          e
                        );
                      },
                      function (e) {
                        throw (
                          (he(
                            "fetch",
                            o(o({}, i), { endTimestamp: Date.now(), error: e })
                          ),
                          e)
                        );
                      }
                    )
                  );
                };
              });
            })();
            break;
          case "history":
            !(function () {
              if (
                !(function () {
                  var e = d(),
                    t = e.chrome,
                    n = t && t.app && t.app.runtime,
                    i =
                      "history" in e &&
                      !!e.history.pushState &&
                      !!e.history.replaceState;
                  return !n && i;
                })()
              )
                return;
              var e = oe.onpopstate;
              function t(e) {
                return function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  var i = t.length > 2 ? t[2] : void 0;
                  if (i) {
                    var r = se,
                      s = String(i);
                    (se = s), he("history", { from: r, to: s });
                  }
                  return e.apply(this, t);
                };
              }
              (oe.onpopstate = function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                var i = oe.location.href,
                  r = se;
                if (((se = i), he("history", { from: r, to: i }), e))
                  try {
                    return e.apply(this, t);
                  } catch (e) {}
              }),
                V(oe.history, "pushState", t),
                V(oe.history, "replaceState", t);
            })();
            break;
          case "error":
            (ye = oe.onerror),
              (oe.onerror = function (e, t, n, i, r) {
                return (
                  he("error", { column: i, error: r, line: n, msg: e, url: t }),
                  !!ye && ye.apply(this, arguments)
                );
              });
            break;
          case "unhandledrejection":
            (ve = oe.onunhandledrejection),
              (oe.onunhandledrejection = function (e) {
                return (
                  he("unhandledrejection", e), !ve || ve.apply(this, arguments)
                );
              });
            break;
          default:
            return void (P && I.warn("unknown instrumentation type:", e));
        }
    }
    function ue(e, t) {
      (ae[e] = ae[e] || []), ae[e].push(t), ce(e);
    }
    function he(e, t) {
      var n, i;
      if (e && ae[e])
        try {
          for (var r = a(ae[e] || []), s = r.next(); !s.done; s = r.next()) {
            var o = s.value;
            try {
              o(t);
            } catch (t) {
              P &&
                I.error(
                  "Error while triggering instrumentation handler.\nType: " +
                    e +
                    "\nName: " +
                    te(o) +
                    "\nError:",
                  t
                );
            }
          }
        } catch (e) {
          n = { error: e };
        } finally {
          try {
            s && !s.done && (i = r.return) && i.call(r);
          } finally {
            if (n) throw n.error;
          }
        }
    }
    function de(e) {
      return (
        void 0 === e && (e = []),
        "Request" in oe && E(e[0], Request) && e[0].method
          ? String(e[0].method).toUpperCase()
          : e[1] && e[1].method
          ? String(e[1].method).toUpperCase()
          : "GET"
      );
    }
    function pe(e) {
      return (
        void 0 === e && (e = []),
        "string" == typeof e[0]
          ? e[0]
          : "Request" in oe && E(e[0], Request)
          ? e[0].url
          : String(e[0])
      );
    }
    var fe, me;
    function ge(e, t) {
      return (
        void 0 === t && (t = !1),
        function (n) {
          if (
            n &&
            me !== n &&
            !(function (e) {
              if ("keypress" !== e.type) return !1;
              try {
                var t = e.target;
                if (!t || !t.tagName) return !0;
                if (
                  "INPUT" === t.tagName ||
                  "TEXTAREA" === t.tagName ||
                  t.isContentEditable
                )
                  return !1;
              } catch (e) {}
              return !0;
            })(n)
          ) {
            var i = "keypress" === n.type ? "input" : n.type;
            (void 0 === fe ||
              (function (e, t) {
                if (!e) return !0;
                if (e.type !== t.type) return !0;
                try {
                  if (e.target !== t.target) return !0;
                } catch (e) {}
                return !1;
              })(me, n)) &&
              (e({ event: n, name: i, global: t }), (me = n)),
              clearTimeout(fe),
              (fe = oe.setTimeout(function () {
                fe = void 0;
              }, 1e3));
          }
        }
      );
    }
    var ye = null;
    var ve = null;
    function be() {
      var e = d(),
        t = e.crypto || e.msCrypto;
      if (void 0 !== t && t.getRandomValues) {
        var n = new Uint16Array(8);
        t.getRandomValues(n),
          (n[3] = (4095 & n[3]) | 16384),
          (n[4] = (16383 & n[4]) | 32768);
        var i = function (e) {
          for (var t = e.toString(16); t.length < 4; ) t = "0" + t;
          return t;
        };
        return (
          i(n[0]) +
          i(n[1]) +
          i(n[2]) +
          i(n[3]) +
          i(n[4]) +
          i(n[5]) +
          i(n[6]) +
          i(n[7])
        );
      }
      return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
        var t = (16 * Math.random()) | 0;
        return ("x" === e ? t : (3 & t) | 8).toString(16);
      });
    }
    function we(e) {
      if (!e) return {};
      var t = e.match(
        /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
      );
      if (!t) return {};
      var n = t[6] || "",
        i = t[8] || "";
      return { host: t[4], path: t[5], protocol: t[2], relative: t[5] + n + i };
    }
    function _e(e) {
      return e.exception && e.exception.values ? e.exception.values[0] : void 0;
    }
    function ke(e) {
      var t = e.message,
        n = e.event_id;
      if (t) return t;
      var i = _e(e);
      return i
        ? i.type && i.value
          ? i.type + ": " + i.value
          : i.type || i.value || n || "<unknown>"
        : n || "<unknown>";
    }
    function Te(e, t, n) {
      var i = (e.exception = e.exception || {}),
        r = (i.values = i.values || []),
        s = (r[0] = r[0] || {});
      s.value || (s.value = t || ""), s.type || (s.type = n || "Error");
    }
    function Ee(e, t) {
      var n = _e(e);
      if (n) {
        var i = n.mechanism;
        if (
          ((n.mechanism = o(o(o({}, { type: "generic", handled: !0 }), i), t)),
          t && "data" in t)
        ) {
          var r = o(o({}, i && i.data), t.data);
          n.mechanism.data = r;
        }
      }
    }
    function Se(e) {
      if (e && e.__sentry_captured__) return !0;
      try {
        z(e, "__sentry_captured__", !0);
      } catch (e) {}
      return !1;
    }
    function xe(e, t, n) {
      void 0 === t && (t = 1 / 0), void 0 === n && (n = 1 / 0);
      try {
        return Ae("", e, t, n);
      } catch (e) {
        return { ERROR: "**non-serializable** (" + e + ")" };
      }
    }
    function Ce(e, t, n) {
      void 0 === t && (t = 3), void 0 === n && (n = 102400);
      var i,
        r = xe(e, t);
      return (
        (i = r),
        (function (e) {
          return ~-encodeURI(e).split(/%..|./).length;
        })(JSON.stringify(i)) > n
          ? Ce(e, t - 1, n)
          : r
      );
    }
    function Ae(e, t, n, i, r) {
      var s, o;
      void 0 === n && (n = 1 / 0),
        void 0 === i && (i = 1 / 0),
        void 0 === r &&
          ((s = "function" == typeof WeakSet),
          (o = s ? new WeakSet() : []),
          (r = [
            function (e) {
              if (s) return !!o.has(e) || (o.add(e), !1);
              for (var t = 0; t < o.length; t++) if (o[t] === e) return !0;
              return o.push(e), !1;
            },
            function (e) {
              if (s) o.delete(e);
              else
                for (var t = 0; t < o.length; t++)
                  if (o[t] === e) {
                    o.splice(t, 1);
                    break;
                  }
            },
          ]));
      var a,
        c = l(r, 2),
        u = c[0],
        h = c[1],
        d = t;
      if (d && "function" == typeof d.toJSON)
        try {
          return d.toJSON();
        } catch (e) {}
      if (
        null === t ||
        (["number", "boolean", "string"].includes(typeof t) &&
          ("number" != typeof (a = t) || a == a))
      )
        return t;
      var p = (function (e, t) {
        try {
          return "domain" === e && t && "object" == typeof t && t._events
            ? "[Domain]"
            : "domainEmitter" === e
            ? "[DomainEmitter]"
            : "undefined" != typeof global && t === global
            ? "[Global]"
            : "undefined" != typeof window && t === window
            ? "[Window]"
            : "undefined" != typeof document && t === document
            ? "[Document]"
            : (function (e) {
                return (
                  _(e) &&
                  "nativeEvent" in e &&
                  "preventDefault" in e &&
                  "stopPropagation" in e
                );
              })(t)
            ? "[SyntheticEvent]"
            : "number" == typeof t && t != t
            ? "[NaN]"
            : void 0 === t
            ? "[undefined]"
            : "function" == typeof t
            ? "[Function: " + te(t) + "]"
            : "symbol" == typeof t
            ? "[" + String(t) + "]"
            : "bigint" == typeof t
            ? "[BigInt: " + String(t) + "]"
            : "[object " + Object.getPrototypeOf(t).constructor.name + "]";
        } catch (e) {
          return "**non-serializable** (" + e + ")";
        }
      })(e, t);
      if (!p.startsWith("[object ")) return p;
      if (0 === n) return p.replace("object ", "");
      if (u(t)) return "[Circular ~]";
      var f = Array.isArray(t) ? [] : {},
        g = 0,
        y = m(t) || k(t) ? Y(t) : t;
      for (var v in y)
        if (Object.prototype.hasOwnProperty.call(y, v)) {
          if (g >= i) {
            f[v] = "[MaxProperties ~]";
            break;
          }
          var b = y[v];
          (f[v] = Ae(v, b, n - 1, i, r)), (g += 1);
        }
      return h(t), f;
    }
    function Pe(e) {
      return new Ne(function (t) {
        t(e);
      });
    }
    function Oe(e) {
      return new Ne(function (t, n) {
        n(e);
      });
    }
    var Ne = (function () {
      function e(e) {
        var t = this;
        (this._state = 0),
          (this._handlers = []),
          (this._resolve = function (e) {
            t._setResult(1, e);
          }),
          (this._reject = function (e) {
            t._setResult(2, e);
          }),
          (this._setResult = function (e, n) {
            0 === t._state &&
              (T(n)
                ? n.then(t._resolve, t._reject)
                : ((t._state = e), (t._value = n), t._executeHandlers()));
          }),
          (this._executeHandlers = function () {
            if (0 !== t._state) {
              var e = t._handlers.slice();
              (t._handlers = []),
                e.forEach(function (e) {
                  e[0] ||
                    (1 === t._state && e[1](t._value),
                    2 === t._state && e[2](t._value),
                    (e[0] = !0));
                });
            }
          });
        try {
          e(this._resolve, this._reject);
        } catch (e) {
          this._reject(e);
        }
      }
      return (
        (e.prototype.then = function (t, n) {
          var i = this;
          return new e(function (e, r) {
            i._handlers.push([
              !1,
              function (n) {
                if (t)
                  try {
                    e(t(n));
                  } catch (e) {
                    r(e);
                  }
                else e(n);
              },
              function (t) {
                if (n)
                  try {
                    e(n(t));
                  } catch (e) {
                    r(e);
                  }
                else r(t);
              },
            ]),
              i._executeHandlers();
          });
        }),
        (e.prototype.catch = function (e) {
          return this.then(function (e) {
            return e;
          }, e);
        }),
        (e.prototype.finally = function (t) {
          var n = this;
          return new e(function (e, i) {
            var r, s;
            return n
              .then(
                function (e) {
                  (s = !1), (r = e), t && t();
                },
                function (e) {
                  (s = !0), (r = e), t && t();
                }
              )
              .then(function () {
                s ? i(r) : e(r);
              });
          });
        }),
        e
      );
    })();
    function Le(e) {
      var t = [];
      function n(e) {
        return t.splice(t.indexOf(e), 1)[0];
      }
      return {
        $: t,
        add: function (i) {
          if (!(void 0 === e || t.length < e))
            return Oe(new A("Not adding Promise due to buffer limit reached."));
          var r = i();
          return (
            -1 === t.indexOf(r) && t.push(r),
            r
              .then(function () {
                return n(r);
              })
              .then(null, function () {
                return n(r).then(null, function () {});
              }),
            r
          );
        },
        drain: function (e) {
          return new Ne(function (n, i) {
            var r = t.length;
            if (!r) return n(!0);
            var s = setTimeout(function () {
              e && e > 0 && n(!1);
            }, e);
            t.forEach(function (e) {
              Pe(e).then(function () {
                --r || (clearTimeout(s), n(!0));
              }, i);
            });
          });
        },
      };
    }
    function Me(e) {
      return "warn" === e
        ? s.Warning
        : (function (e) {
            return -1 !== j.indexOf(e);
          })(e)
        ? e
        : s.Log;
    }
    function Ie(e) {
      return e >= 200 && e < 300
        ? "success"
        : 429 === e
        ? "rate_limit"
        : e >= 400 && e < 500
        ? "invalid"
        : e >= 500
        ? "failed"
        : "unknown";
    }
    var je = {
      nowSeconds: function () {
        return Date.now() / 1e3;
      },
    };
    var Re = u()
        ? (function () {
            try {
              return ((e = module), (t = "perf_hooks"), e.require(t))
                .performance;
            } catch (e) {
              return;
            }
            var e, t;
          })()
        : (function () {
            var e = d().performance;
            if (e && e.now)
              return {
                now: function () {
                  return e.now();
                },
                timeOrigin: Date.now() - e.now(),
              };
          })(),
      De =
        void 0 === Re
          ? je
          : {
              nowSeconds: function () {
                return (Re.timeOrigin + Re.now()) / 1e3;
              },
            },
      qe = je.nowSeconds.bind(je),
      $e = De.nowSeconds.bind(De);
    function Ue(e, t) {
      return void 0 === t && (t = []), [e, t];
    }
    function Fe(e) {
      var t = l(e, 2),
        n = t[0],
        i = t[1],
        r = JSON.stringify(n);
      return i.reduce(function (e, t) {
        var n = l(t, 2),
          i = n[0],
          r = n[1],
          s = w(r) ? String(r) : JSON.stringify(r);
        return e + "\n" + JSON.stringify(i) + "\n" + s;
      }, r);
    }
    !(function () {
      var e = d().performance;
      if (e && e.now) {
        var t = 36e5,
          n = e.now(),
          i = Date.now(),
          r = e.timeOrigin ? Math.abs(e.timeOrigin + n - i) : t,
          s = r < t,
          o = e.timing && e.timing.navigationStart,
          a = "number" == typeof o ? Math.abs(o + n - i) : t;
        (s || a < t) && r <= a && e.timeOrigin;
      }
    })();
    function Be(e, t) {
      return e[t] || e.all || 0;
    }
    function He(e, t, n) {
      return void 0 === n && (n = Date.now()), Be(e, t) > n;
    }
    function Ve(e, t, n) {
      var i, r, s, l;
      void 0 === n && (n = Date.now());
      var c = o({}, e),
        u = t["x-sentry-rate-limits"],
        h = t["retry-after"];
      if (u)
        try {
          for (
            var d = a(u.trim().split(",")), p = d.next();
            !p.done;
            p = d.next()
          ) {
            var f = p.value.split(":", 2),
              m = parseInt(f[0], 10),
              g = 1e3 * (isNaN(m) ? 60 : m);
            if (f[1])
              try {
                for (
                  var y = ((s = void 0), a(f[1].split(";"))), v = y.next();
                  !v.done;
                  v = y.next()
                ) {
                  c[v.value] = n + g;
                }
              } catch (e) {
                s = { error: e };
              } finally {
                try {
                  v && !v.done && (l = y.return) && l.call(y);
                } finally {
                  if (s) throw s.error;
                }
              }
            else c.all = n + g;
          }
        } catch (e) {
          i = { error: e };
        } finally {
          try {
            p && !p.done && (r = d.return) && r.call(d);
          } finally {
            if (i) throw i.error;
          }
        }
      else
        h &&
          (c.all =
            n +
            (function (e, t) {
              void 0 === t && (t = Date.now());
              var n = parseInt("" + e, 10);
              if (!isNaN(n)) return 1e3 * n;
              var i = Date.parse("" + e);
              return isNaN(i) ? 6e4 : i - t;
            })(h, n));
      return c;
    }
    var ze = (function () {
      function e() {
        (this._notifyingListeners = !1),
          (this._scopeListeners = []),
          (this._eventProcessors = []),
          (this._breadcrumbs = []),
          (this._user = {}),
          (this._tags = {}),
          (this._extra = {}),
          (this._contexts = {}),
          (this._sdkProcessingMetadata = {});
      }
      return (
        (e.clone = function (t) {
          var n = new e();
          return (
            t &&
              ((n._breadcrumbs = c(t._breadcrumbs)),
              (n._tags = o({}, t._tags)),
              (n._extra = o({}, t._extra)),
              (n._contexts = o({}, t._contexts)),
              (n._user = t._user),
              (n._level = t._level),
              (n._span = t._span),
              (n._session = t._session),
              (n._transactionName = t._transactionName),
              (n._fingerprint = t._fingerprint),
              (n._eventProcessors = c(t._eventProcessors)),
              (n._requestSession = t._requestSession)),
            n
          );
        }),
        (e.prototype.addScopeListener = function (e) {
          this._scopeListeners.push(e);
        }),
        (e.prototype.addEventProcessor = function (e) {
          return this._eventProcessors.push(e), this;
        }),
        (e.prototype.setUser = function (e) {
          return (
            (this._user = e || {}),
            this._session && this._session.update({ user: e }),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.getUser = function () {
          return this._user;
        }),
        (e.prototype.getRequestSession = function () {
          return this._requestSession;
        }),
        (e.prototype.setRequestSession = function (e) {
          return (this._requestSession = e), this;
        }),
        (e.prototype.setTags = function (e) {
          return (
            (this._tags = o(o({}, this._tags), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setTag = function (e, t) {
          var n;
          return (
            (this._tags = o(o({}, this._tags), (((n = {})[e] = t), n))),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtras = function (e) {
          return (
            (this._extra = o(o({}, this._extra), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtra = function (e, t) {
          var n;
          return (
            (this._extra = o(o({}, this._extra), (((n = {})[e] = t), n))),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setFingerprint = function (e) {
          return (this._fingerprint = e), this._notifyScopeListeners(), this;
        }),
        (e.prototype.setLevel = function (e) {
          return (this._level = e), this._notifyScopeListeners(), this;
        }),
        (e.prototype.setTransactionName = function (e) {
          return (
            (this._transactionName = e), this._notifyScopeListeners(), this
          );
        }),
        (e.prototype.setTransaction = function (e) {
          return this.setTransactionName(e);
        }),
        (e.prototype.setContext = function (e, t) {
          var n;
          return (
            null === t
              ? delete this._contexts[e]
              : (this._contexts = o(
                  o({}, this._contexts),
                  (((n = {})[e] = t), n)
                )),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setSpan = function (e) {
          return (this._span = e), this._notifyScopeListeners(), this;
        }),
        (e.prototype.getSpan = function () {
          return this._span;
        }),
        (e.prototype.getTransaction = function () {
          var e = this.getSpan();
          return e && e.transaction;
        }),
        (e.prototype.setSession = function (e) {
          return (
            e ? (this._session = e) : delete this._session,
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.getSession = function () {
          return this._session;
        }),
        (e.prototype.update = function (t) {
          if (!t) return this;
          if ("function" == typeof t) {
            var n = t(this);
            return n instanceof e ? n : this;
          }
          return (
            t instanceof e
              ? ((this._tags = o(o({}, this._tags), t._tags)),
                (this._extra = o(o({}, this._extra), t._extra)),
                (this._contexts = o(o({}, this._contexts), t._contexts)),
                t._user &&
                  Object.keys(t._user).length &&
                  (this._user = t._user),
                t._level && (this._level = t._level),
                t._fingerprint && (this._fingerprint = t._fingerprint),
                t._requestSession && (this._requestSession = t._requestSession))
              : _(t) &&
                ((this._tags = o(o({}, this._tags), t.tags)),
                (this._extra = o(o({}, this._extra), t.extra)),
                (this._contexts = o(o({}, this._contexts), t.contexts)),
                t.user && (this._user = t.user),
                t.level && (this._level = t.level),
                t.fingerprint && (this._fingerprint = t.fingerprint),
                t.requestSession && (this._requestSession = t.requestSession)),
            this
          );
        }),
        (e.prototype.clear = function () {
          return (
            (this._breadcrumbs = []),
            (this._tags = {}),
            (this._extra = {}),
            (this._user = {}),
            (this._contexts = {}),
            (this._level = void 0),
            (this._transactionName = void 0),
            (this._fingerprint = void 0),
            (this._requestSession = void 0),
            (this._span = void 0),
            (this._session = void 0),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.addBreadcrumb = function (e, t) {
          var n = "number" == typeof t ? Math.min(t, 100) : 100;
          if (n <= 0) return this;
          var i = o({ timestamp: qe() }, e);
          return (
            (this._breadcrumbs = c(this._breadcrumbs, [i]).slice(-n)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.clearBreadcrumbs = function () {
          return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
        }),
        (e.prototype.applyToEvent = function (e, t) {
          if (
            (this._extra &&
              Object.keys(this._extra).length &&
              (e.extra = o(o({}, this._extra), e.extra)),
            this._tags &&
              Object.keys(this._tags).length &&
              (e.tags = o(o({}, this._tags), e.tags)),
            this._user &&
              Object.keys(this._user).length &&
              (e.user = o(o({}, this._user), e.user)),
            this._contexts &&
              Object.keys(this._contexts).length &&
              (e.contexts = o(o({}, this._contexts), e.contexts)),
            this._level && (e.level = this._level),
            this._transactionName && (e.transaction = this._transactionName),
            this._span)
          ) {
            e.contexts = o({ trace: this._span.getTraceContext() }, e.contexts);
            var n = this._span.transaction && this._span.transaction.name;
            n && (e.tags = o({ transaction: n }, e.tags));
          }
          return (
            this._applyFingerprint(e),
            (e.breadcrumbs = c(e.breadcrumbs || [], this._breadcrumbs)),
            (e.breadcrumbs = e.breadcrumbs.length > 0 ? e.breadcrumbs : void 0),
            (e.sdkProcessingMetadata = this._sdkProcessingMetadata),
            this._notifyEventProcessors(c(We(), this._eventProcessors), e, t)
          );
        }),
        (e.prototype.setSDKProcessingMetadata = function (e) {
          return (
            (this._sdkProcessingMetadata = o(
              o({}, this._sdkProcessingMetadata),
              e
            )),
            this
          );
        }),
        (e.prototype._notifyEventProcessors = function (e, t, n, i) {
          var r = this;
          return (
            void 0 === i && (i = 0),
            new Ne(function (s, a) {
              var l = e[i];
              if (null === t || "function" != typeof l) s(t);
              else {
                var c = l(o({}, t), n);
                T(c)
                  ? c
                      .then(function (t) {
                        return r._notifyEventProcessors(e, t, n, i + 1).then(s);
                      })
                      .then(null, a)
                  : r
                      ._notifyEventProcessors(e, c, n, i + 1)
                      .then(s)
                      .then(null, a);
              }
            })
          );
        }),
        (e.prototype._notifyScopeListeners = function () {
          var e = this;
          this._notifyingListeners ||
            ((this._notifyingListeners = !0),
            this._scopeListeners.forEach(function (t) {
              t(e);
            }),
            (this._notifyingListeners = !1));
        }),
        (e.prototype._applyFingerprint = function (e) {
          (e.fingerprint = e.fingerprint
            ? Array.isArray(e.fingerprint)
              ? e.fingerprint
              : [e.fingerprint]
            : []),
            this._fingerprint &&
              (e.fingerprint = e.fingerprint.concat(this._fingerprint)),
            e.fingerprint && !e.fingerprint.length && delete e.fingerprint;
        }),
        e
      );
    })();
    function We() {
      return p("globalEventProcessors", function () {
        return [];
      });
    }
    function Ke(e) {
      We().push(e);
    }
    var Ye = (function () {
        function e(e) {
          (this.errors = 0),
            (this.sid = be()),
            (this.duration = 0),
            (this.status = "ok"),
            (this.init = !0),
            (this.ignoreDuration = !1);
          var t = $e();
          (this.timestamp = t), (this.started = t), e && this.update(e);
        }
        return (
          (e.prototype.update = function (e) {
            if (
              (void 0 === e && (e = {}),
              e.user &&
                (!this.ipAddress &&
                  e.user.ip_address &&
                  (this.ipAddress = e.user.ip_address),
                this.did ||
                  e.did ||
                  (this.did = e.user.id || e.user.email || e.user.username)),
              (this.timestamp = e.timestamp || $e()),
              e.ignoreDuration && (this.ignoreDuration = e.ignoreDuration),
              e.sid && (this.sid = 32 === e.sid.length ? e.sid : be()),
              void 0 !== e.init && (this.init = e.init),
              !this.did && e.did && (this.did = "" + e.did),
              "number" == typeof e.started && (this.started = e.started),
              this.ignoreDuration)
            )
              this.duration = void 0;
            else if ("number" == typeof e.duration) this.duration = e.duration;
            else {
              var t = this.timestamp - this.started;
              this.duration = t >= 0 ? t : 0;
            }
            e.release && (this.release = e.release),
              e.environment && (this.environment = e.environment),
              !this.ipAddress && e.ipAddress && (this.ipAddress = e.ipAddress),
              !this.userAgent && e.userAgent && (this.userAgent = e.userAgent),
              "number" == typeof e.errors && (this.errors = e.errors),
              e.status && (this.status = e.status);
          }),
          (e.prototype.close = function (e) {
            e
              ? this.update({ status: e })
              : "ok" === this.status
              ? this.update({ status: "exited" })
              : this.update();
          }),
          (e.prototype.toJSON = function () {
            return Q({
              sid: "" + this.sid,
              init: this.init,
              started: new Date(1e3 * this.started).toISOString(),
              timestamp: new Date(1e3 * this.timestamp).toISOString(),
              status: this.status,
              errors: this.errors,
              did:
                "number" == typeof this.did || "string" == typeof this.did
                  ? "" + this.did
                  : void 0,
              duration: this.duration,
              attrs: {
                release: this.release,
                environment: this.environment,
                ip_address: this.ipAddress,
                user_agent: this.userAgent,
              },
            });
          }),
          e
        );
      })(),
      Je = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
      Xe = (function () {
        function e(e, t, n) {
          void 0 === t && (t = new ze()),
            void 0 === n && (n = 4),
            (this._version = n),
            (this._stack = [{}]),
            (this.getStackTop().scope = t),
            e && this.bindClient(e);
        }
        return (
          (e.prototype.isOlderThan = function (e) {
            return this._version < e;
          }),
          (e.prototype.bindClient = function (e) {
            (this.getStackTop().client = e),
              e && e.setupIntegrations && e.setupIntegrations();
          }),
          (e.prototype.pushScope = function () {
            var e = ze.clone(this.getScope());
            return (
              this.getStack().push({ client: this.getClient(), scope: e }), e
            );
          }),
          (e.prototype.popScope = function () {
            return !(this.getStack().length <= 1) && !!this.getStack().pop();
          }),
          (e.prototype.withScope = function (e) {
            var t = this.pushScope();
            try {
              e(t);
            } finally {
              this.popScope();
            }
          }),
          (e.prototype.getClient = function () {
            return this.getStackTop().client;
          }),
          (e.prototype.getScope = function () {
            return this.getStackTop().scope;
          }),
          (e.prototype.getStack = function () {
            return this._stack;
          }),
          (e.prototype.getStackTop = function () {
            return this._stack[this._stack.length - 1];
          }),
          (e.prototype.captureException = function (e, t) {
            var n = (this._lastEventId = t && t.event_id ? t.event_id : be()),
              i = t;
            if (!t) {
              var r = void 0;
              try {
                throw new Error("Sentry syntheticException");
              } catch (e) {
                r = e;
              }
              i = { originalException: e, syntheticException: r };
            }
            return (
              this._invokeClient(
                "captureException",
                e,
                o(o({}, i), { event_id: n })
              ),
              n
            );
          }),
          (e.prototype.captureMessage = function (e, t, n) {
            var i = (this._lastEventId = n && n.event_id ? n.event_id : be()),
              r = n;
            if (!n) {
              var s = void 0;
              try {
                throw new Error(e);
              } catch (e) {
                s = e;
              }
              r = { originalException: e, syntheticException: s };
            }
            return (
              this._invokeClient(
                "captureMessage",
                e,
                t,
                o(o({}, r), { event_id: i })
              ),
              i
            );
          }),
          (e.prototype.captureEvent = function (e, t) {
            var n = t && t.event_id ? t.event_id : be();
            return (
              "transaction" !== e.type && (this._lastEventId = n),
              this._invokeClient(
                "captureEvent",
                e,
                o(o({}, t), { event_id: n })
              ),
              n
            );
          }),
          (e.prototype.lastEventId = function () {
            return this._lastEventId;
          }),
          (e.prototype.addBreadcrumb = function (e, t) {
            var n = this.getStackTop(),
              i = n.scope,
              r = n.client;
            if (i && r) {
              var s = (r.getOptions && r.getOptions()) || {},
                a = s.beforeBreadcrumb,
                l = void 0 === a ? null : a,
                c = s.maxBreadcrumbs,
                u = void 0 === c ? 100 : c;
              if (!(u <= 0)) {
                var h = qe(),
                  d = o({ timestamp: h }, e),
                  p = l
                    ? $(function () {
                        return l(d, t);
                      })
                    : d;
                null !== p && i.addBreadcrumb(p, u);
              }
            }
          }),
          (e.prototype.setUser = function (e) {
            var t = this.getScope();
            t && t.setUser(e);
          }),
          (e.prototype.setTags = function (e) {
            var t = this.getScope();
            t && t.setTags(e);
          }),
          (e.prototype.setExtras = function (e) {
            var t = this.getScope();
            t && t.setExtras(e);
          }),
          (e.prototype.setTag = function (e, t) {
            var n = this.getScope();
            n && n.setTag(e, t);
          }),
          (e.prototype.setExtra = function (e, t) {
            var n = this.getScope();
            n && n.setExtra(e, t);
          }),
          (e.prototype.setContext = function (e, t) {
            var n = this.getScope();
            n && n.setContext(e, t);
          }),
          (e.prototype.configureScope = function (e) {
            var t = this.getStackTop(),
              n = t.scope,
              i = t.client;
            n && i && e(n);
          }),
          (e.prototype.run = function (e) {
            var t = Qe(this);
            try {
              e(this);
            } finally {
              Qe(t);
            }
          }),
          (e.prototype.getIntegration = function (e) {
            var t = this.getClient();
            if (!t) return null;
            try {
              return t.getIntegration(e);
            } catch (t) {
              return (
                Je &&
                  I.warn(
                    "Cannot retrieve integration " +
                      e.id +
                      " from the current Hub"
                  ),
                null
              );
            }
          }),
          (e.prototype.startSpan = function (e) {
            return this._callExtensionMethod("startSpan", e);
          }),
          (e.prototype.startTransaction = function (e, t) {
            return this._callExtensionMethod("startTransaction", e, t);
          }),
          (e.prototype.traceHeaders = function () {
            return this._callExtensionMethod("traceHeaders");
          }),
          (e.prototype.captureSession = function (e) {
            if ((void 0 === e && (e = !1), e)) return this.endSession();
            this._sendSessionUpdate();
          }),
          (e.prototype.endSession = function () {
            var e = this.getStackTop(),
              t = e && e.scope,
              n = t && t.getSession();
            n && n.close(), this._sendSessionUpdate(), t && t.setSession();
          }),
          (e.prototype.startSession = function (e) {
            var t = this.getStackTop(),
              n = t.scope,
              i = t.client,
              r = (i && i.getOptions()) || {},
              s = r.release,
              a = r.environment,
              l = (d().navigator || {}).userAgent,
              c = new Ye(
                o(
                  o(
                    o(
                      { release: s, environment: a },
                      n && { user: n.getUser() }
                    ),
                    l && { userAgent: l }
                  ),
                  e
                )
              );
            if (n) {
              var u = n.getSession && n.getSession();
              u && "ok" === u.status && u.update({ status: "exited" }),
                this.endSession(),
                n.setSession(c);
            }
            return c;
          }),
          (e.prototype._sendSessionUpdate = function () {
            var e = this.getStackTop(),
              t = e.scope,
              n = e.client;
            if (t) {
              var i = t.getSession && t.getSession();
              i && n && n.captureSession && n.captureSession(i);
            }
          }),
          (e.prototype._invokeClient = function (e) {
            for (var t, n = [], i = 1; i < arguments.length; i++)
              n[i - 1] = arguments[i];
            var r = this.getStackTop(),
              s = r.scope,
              o = r.client;
            o && o[e] && (t = o)[e].apply(t, c(n, [s]));
          }),
          (e.prototype._callExtensionMethod = function (e) {
            for (var t = [], n = 1; n < arguments.length; n++)
              t[n - 1] = arguments[n];
            var i = Ge(),
              r = i.__SENTRY__;
            if (r && r.extensions && "function" == typeof r.extensions[e])
              return r.extensions[e].apply(this, t);
            Je &&
              I.warn(
                "Extension method " + e + " couldn't be found, doing nothing."
              );
          }),
          e
        );
      })();
    function Ge() {
      var e = d();
      return (
        (e.__SENTRY__ = e.__SENTRY__ || { extensions: {}, hub: void 0 }), e
      );
    }
    function Qe(e) {
      var t = Ge(),
        n = tt(t);
      return nt(t, e), n;
    }
    function Ze() {
      var e = Ge();
      return (
        (et(e) && !tt(e).isOlderThan(4)) || nt(e, new Xe()),
        u()
          ? (function (e) {
              try {
                var t = Ge().__SENTRY__,
                  n =
                    t &&
                    t.extensions &&
                    t.extensions.domain &&
                    t.extensions.domain.active;
                if (!n) return tt(e);
                if (!et(n) || tt(n).isOlderThan(4)) {
                  var i = tt(e).getStackTop();
                  nt(n, new Xe(i.client, ze.clone(i.scope)));
                }
                return tt(n);
              } catch (t) {
                return tt(e);
              }
            })(e)
          : tt(e)
      );
    }
    function et(e) {
      return !!(e && e.__SENTRY__ && e.__SENTRY__.hub);
    }
    function tt(e) {
      return p(
        "hub",
        function () {
          return new Xe();
        },
        e
      );
    }
    function nt(e, t) {
      return !!e && (((e.__SENTRY__ = e.__SENTRY__ || {}).hub = t), !0);
    }
    function it(e) {
      for (var t = [], n = 1; n < arguments.length; n++)
        t[n - 1] = arguments[n];
      var i = Ze();
      if (i && i[e]) return i[e].apply(i, c(t));
      throw new Error(
        "No hub defined or " +
          e +
          " was not found on the hub, please open a bug report."
      );
    }
    function rt(e, t) {
      return it("captureException", e, {
        captureContext: t,
        originalException: e,
        syntheticException: new Error("Sentry syntheticException"),
      });
    }
    function st(e) {
      it("withScope", e);
    }
    function ot(e, t, n) {
      return { initDsn: e, metadata: t || {}, dsn: M(e), tunnel: n };
    }
    function at(e) {
      var t = e.protocol ? e.protocol + ":" : "",
        n = e.port ? ":" + e.port : "";
      return t + "//" + e.host + n + (e.path ? "/" + e.path : "") + "/api/";
    }
    function lt(e, t) {
      return "" + at(e) + e.projectId + "/" + t + "/";
    }
    function ct(e) {
      return (
        (t = { sentry_key: e.publicKey, sentry_version: "7" }),
        Object.keys(t)
          .map(function (e) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(t[e]);
          })
          .join("&")
      );
      var t;
    }
    function ut(e) {
      return (
        (function (e) {
          return lt(e, "store");
        })(e) +
        "?" +
        ct(e)
      );
    }
    function ht(e, t) {
      return (
        t ||
        (function (e) {
          return lt(e, "envelope");
        })(e) +
          "?" +
          ct(e)
      );
    }
    var dt = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
      pt = [];
    function ft(e) {
      return e.reduce(function (e, t) {
        return (
          e.every(function (e) {
            return t.name !== e.name;
          }) && e.push(t),
          e
        );
      }, []);
    }
    function mt(e) {
      var t = {};
      return (
        (function (e) {
          var t = (e.defaultIntegrations && c(e.defaultIntegrations)) || [],
            n = e.integrations,
            i = c(ft(t));
          Array.isArray(n)
            ? (i = c(
                i.filter(function (e) {
                  return n.every(function (t) {
                    return t.name !== e.name;
                  });
                }),
                ft(n)
              ))
            : "function" == typeof n &&
              ((i = n(i)), (i = Array.isArray(i) ? i : [i]));
          var r = i.map(function (e) {
              return e.name;
            }),
            s = "Debug";
          return (
            -1 !== r.indexOf(s) &&
              i.push.apply(i, c(i.splice(r.indexOf(s), 1))),
            i
          );
        })(e).forEach(function (e) {
          (t[e.name] = e),
            (function (e) {
              -1 === pt.indexOf(e.name) &&
                (e.setupOnce(Ke, Ze),
                pt.push(e.name),
                dt && I.log("Integration installed: " + e.name));
            })(e);
        }),
        z(t, "initialized", !0),
        t
      );
    }
    var gt = "Not capturing exception because it's already been captured.",
      yt = (function () {
        function e(e, t) {
          (this._integrations = {}),
            (this._numProcessing = 0),
            (this._backend = new e(t)),
            (this._options = t),
            t.dsn && (this._dsn = M(t.dsn));
        }
        return (
          (e.prototype.captureException = function (e, t, n) {
            var i = this;
            if (!Se(e)) {
              var r = t && t.event_id;
              return (
                this._process(
                  this._getBackend()
                    .eventFromException(e, t)
                    .then(function (e) {
                      return i._captureEvent(e, t, n);
                    })
                    .then(function (e) {
                      r = e;
                    })
                ),
                r
              );
            }
            dt && I.log(gt);
          }),
          (e.prototype.captureMessage = function (e, t, n, i) {
            var r = this,
              s = n && n.event_id,
              o = w(e)
                ? this._getBackend().eventFromMessage(String(e), t, n)
                : this._getBackend().eventFromException(e, n);
            return (
              this._process(
                o
                  .then(function (e) {
                    return r._captureEvent(e, n, i);
                  })
                  .then(function (e) {
                    s = e;
                  })
              ),
              s
            );
          }),
          (e.prototype.captureEvent = function (e, t, n) {
            if (!(t && t.originalException && Se(t.originalException))) {
              var i = t && t.event_id;
              return (
                this._process(
                  this._captureEvent(e, t, n).then(function (e) {
                    i = e;
                  })
                ),
                i
              );
            }
            dt && I.log(gt);
          }),
          (e.prototype.captureSession = function (e) {
            this._isEnabled()
              ? "string" != typeof e.release
                ? dt &&
                  I.warn(
                    "Discarded session because of missing or non-string release"
                  )
                : (this._sendSession(e), e.update({ init: !1 }))
              : dt && I.warn("SDK not enabled, will not capture session.");
          }),
          (e.prototype.getDsn = function () {
            return this._dsn;
          }),
          (e.prototype.getOptions = function () {
            return this._options;
          }),
          (e.prototype.getTransport = function () {
            return this._getBackend().getTransport();
          }),
          (e.prototype.flush = function (e) {
            var t = this;
            return this._isClientDoneProcessing(e).then(function (n) {
              return t
                .getTransport()
                .close(e)
                .then(function (e) {
                  return n && e;
                });
            });
          }),
          (e.prototype.close = function (e) {
            var t = this;
            return this.flush(e).then(function (e) {
              return (t.getOptions().enabled = !1), e;
            });
          }),
          (e.prototype.setupIntegrations = function () {
            this._isEnabled() &&
              !this._integrations.initialized &&
              (this._integrations = mt(this._options));
          }),
          (e.prototype.getIntegration = function (e) {
            try {
              return this._integrations[e.id] || null;
            } catch (t) {
              return (
                dt &&
                  I.warn(
                    "Cannot retrieve integration " +
                      e.id +
                      " from the current Client"
                  ),
                null
              );
            }
          }),
          (e.prototype._updateSessionFromEvent = function (e, t) {
            var n,
              i,
              r = !1,
              s = !1,
              l = t.exception && t.exception.values;
            if (l) {
              s = !0;
              try {
                for (var c = a(l), u = c.next(); !u.done; u = c.next()) {
                  var h = u.value.mechanism;
                  if (h && !1 === h.handled) {
                    r = !0;
                    break;
                  }
                }
              } catch (e) {
                n = { error: e };
              } finally {
                try {
                  u && !u.done && (i = c.return) && i.call(c);
                } finally {
                  if (n) throw n.error;
                }
              }
            }
            var d = "ok" === e.status;
            ((d && 0 === e.errors) || (d && r)) &&
              (e.update(
                o(o({}, r && { status: "crashed" }), {
                  errors: e.errors || Number(s || r),
                })
              ),
              this.captureSession(e));
          }),
          (e.prototype._sendSession = function (e) {
            this._getBackend().sendSession(e);
          }),
          (e.prototype._isClientDoneProcessing = function (e) {
            var t = this;
            return new Ne(function (n) {
              var i = 0,
                r = setInterval(function () {
                  0 == t._numProcessing
                    ? (clearInterval(r), n(!0))
                    : ((i += 1), e && i >= e && (clearInterval(r), n(!1)));
                }, 1);
            });
          }),
          (e.prototype._getBackend = function () {
            return this._backend;
          }),
          (e.prototype._isEnabled = function () {
            return !1 !== this.getOptions().enabled && void 0 !== this._dsn;
          }),
          (e.prototype._prepareEvent = function (e, t, n) {
            var i = this,
              r = this.getOptions(),
              s = r.normalizeDepth,
              a = void 0 === s ? 3 : s,
              l = r.normalizeMaxBreadth,
              c = void 0 === l ? 1e3 : l,
              u = o(o({}, e), {
                event_id: e.event_id || (n && n.event_id ? n.event_id : be()),
                timestamp: e.timestamp || qe(),
              });
            this._applyClientOptions(u), this._applyIntegrationsMetadata(u);
            var h = t;
            n && n.captureContext && (h = ze.clone(h).update(n.captureContext));
            var d = Pe(u);
            return (
              h && (d = h.applyToEvent(u, n)),
              d.then(function (e) {
                return (
                  e &&
                    (e.sdkProcessingMetadata = o(
                      o({}, e.sdkProcessingMetadata),
                      { normalizeDepth: xe(a) + " (" + typeof a + ")" }
                    )),
                  "number" == typeof a && a > 0 ? i._normalizeEvent(e, a, c) : e
                );
              })
            );
          }),
          (e.prototype._normalizeEvent = function (e, t, n) {
            if (!e) return null;
            var i = o(
              o(
                o(
                  o(
                    o({}, e),
                    e.breadcrumbs && {
                      breadcrumbs: e.breadcrumbs.map(function (e) {
                        return o(
                          o({}, e),
                          e.data && { data: xe(e.data, t, n) }
                        );
                      }),
                    }
                  ),
                  e.user && { user: xe(e.user, t, n) }
                ),
                e.contexts && { contexts: xe(e.contexts, t, n) }
              ),
              e.extra && { extra: xe(e.extra, t, n) }
            );
            return (
              e.contexts &&
                e.contexts.trace &&
                (i.contexts.trace = e.contexts.trace),
              (i.sdkProcessingMetadata = o(o({}, i.sdkProcessingMetadata), {
                baseClientNormalized: !0,
              })),
              i
            );
          }),
          (e.prototype._applyClientOptions = function (e) {
            var t = this.getOptions(),
              n = t.environment,
              i = t.release,
              r = t.dist,
              s = t.maxValueLength,
              o = void 0 === s ? 250 : s;
            "environment" in e ||
              (e.environment = "environment" in t ? n : "production"),
              void 0 === e.release && void 0 !== i && (e.release = i),
              void 0 === e.dist && void 0 !== r && (e.dist = r),
              e.message && (e.message = F(e.message, o));
            var a = e.exception && e.exception.values && e.exception.values[0];
            a && a.value && (a.value = F(a.value, o));
            var l = e.request;
            l && l.url && (l.url = F(l.url, o));
          }),
          (e.prototype._applyIntegrationsMetadata = function (e) {
            var t = Object.keys(this._integrations);
            t.length > 0 &&
              ((e.sdk = e.sdk || {}),
              (e.sdk.integrations = c(e.sdk.integrations || [], t)));
          }),
          (e.prototype._sendEvent = function (e) {
            this._getBackend().sendEvent(e);
          }),
          (e.prototype._captureEvent = function (e, t, n) {
            return this._processEvent(e, t, n).then(
              function (e) {
                return e.event_id;
              },
              function (e) {
                dt && I.error(e);
              }
            );
          }),
          (e.prototype._processEvent = function (e, t, n) {
            var i = this,
              r = this.getOptions(),
              s = r.beforeSend,
              o = r.sampleRate,
              a = this.getTransport();
            function l(e, t) {
              a.recordLostEvent && a.recordLostEvent(e, t);
            }
            if (!this._isEnabled())
              return Oe(new A("SDK not enabled, will not capture event."));
            var c = "transaction" === e.type;
            return !c && "number" == typeof o && Math.random() > o
              ? (l("sample_rate", "event"),
                Oe(
                  new A(
                    "Discarding event because it's not included in the random sample (sampling rate = " +
                      o +
                      ")"
                  )
                ))
              : this._prepareEvent(e, n, t)
                  .then(function (n) {
                    if (null === n)
                      throw (
                        (l("event_processor", e.type || "event"),
                        new A(
                          "An event processor returned null, will not send event."
                        ))
                      );
                    return (t && t.data && !0 === t.data.__sentry__) || c || !s
                      ? n
                      : (function (e) {
                          var t =
                            "`beforeSend` method has to return `null` or a valid event.";
                          if (T(e))
                            return e.then(
                              function (e) {
                                if (!_(e) && null !== e) throw new A(t);
                                return e;
                              },
                              function (e) {
                                throw new A("beforeSend rejected with " + e);
                              }
                            );
                          if (!_(e) && null !== e) throw new A(t);
                          return e;
                        })(s(n, t));
                  })
                  .then(function (t) {
                    if (null === t)
                      throw (
                        (l("before_send", e.type || "event"),
                        new A(
                          "`beforeSend` returned `null`, will not send event."
                        ))
                      );
                    var r = n && n.getSession && n.getSession();
                    return (
                      !c && r && i._updateSessionFromEvent(r, t),
                      i._sendEvent(t),
                      t
                    );
                  })
                  .then(null, function (e) {
                    if (e instanceof A) throw e;
                    throw (
                      (i.captureException(e, {
                        data: { __sentry__: !0 },
                        originalException: e,
                      }),
                      new A(
                        "Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " +
                          e
                      ))
                    );
                  });
          }),
          (e.prototype._process = function (e) {
            var t = this;
            (this._numProcessing += 1),
              e.then(
                function (e) {
                  return (t._numProcessing -= 1), e;
                },
                function (e) {
                  return (t._numProcessing -= 1), e;
                }
              );
          }),
          e
        );
      })();
    function vt(e) {
      if (e.metadata && e.metadata.sdk) {
        var t = e.metadata.sdk;
        return { name: t.name, version: t.version };
      }
    }
    function bt(e, t) {
      return t
        ? ((e.sdk = e.sdk || {}),
          (e.sdk.name = e.sdk.name || t.name),
          (e.sdk.version = e.sdk.version || t.version),
          (e.sdk.integrations = c(
            e.sdk.integrations || [],
            t.integrations || []
          )),
          (e.sdk.packages = c(e.sdk.packages || [], t.packages || [])),
          e)
        : e;
    }
    function wt(e, t) {
      var n = vt(t),
        i = "aggregates" in e ? "sessions" : "session";
      return [
        Ue(
          o(
            o({ sent_at: new Date().toISOString() }, n && { sdk: n }),
            !!t.tunnel && { dsn: N(t.dsn) }
          ),
          [[{ type: i }, e]]
        ),
        i,
      ];
    }
    var _t = (function () {
        function e() {}
        return (
          (e.prototype.sendEvent = function (e) {
            return Pe({
              reason:
                "NoopTransport: Event has been skipped because no Dsn is configured.",
              status: "skipped",
            });
          }),
          (e.prototype.close = function (e) {
            return Pe(!0);
          }),
          e
        );
      })(),
      kt = (function () {
        function e(e) {
          (this._options = e),
            this._options.dsn ||
              (dt && I.warn("No DSN provided, backend will not do anything.")),
            (this._transport = this._setupTransport());
        }
        return (
          (e.prototype.eventFromException = function (e, t) {
            throw new A("Backend has to implement `eventFromException` method");
          }),
          (e.prototype.eventFromMessage = function (e, t, n) {
            throw new A("Backend has to implement `eventFromMessage` method");
          }),
          (e.prototype.sendEvent = function (e) {
            if (
              this._newTransport &&
              this._options.dsn &&
              this._options._experiments &&
              this._options._experiments.newTransport
            ) {
              var t = (function (e, t) {
                var n = vt(t),
                  i = e.type || "event",
                  r = (e.sdkProcessingMetadata || {}).transactionSampling || {},
                  s = r.method,
                  a = r.rate;
                return (
                  bt(e, t.metadata.sdk),
                  (e.tags = e.tags || {}),
                  (e.extra = e.extra || {}),
                  (e.sdkProcessingMetadata &&
                    e.sdkProcessingMetadata.baseClientNormalized) ||
                    ((e.tags.skippedNormalization = !0),
                    (e.extra.normalizeDepth = e.sdkProcessingMetadata
                      ? e.sdkProcessingMetadata.normalizeDepth
                      : "unset")),
                  delete e.sdkProcessingMetadata,
                  Ue(
                    o(
                      o(
                        {
                          event_id: e.event_id,
                          sent_at: new Date().toISOString(),
                        },
                        n && { sdk: n }
                      ),
                      !!t.tunnel && { dsn: N(t.dsn) }
                    ),
                    [[{ type: i, sample_rates: [{ id: s, rate: a }] }, e]]
                  )
                );
              })(
                e,
                ot(
                  this._options.dsn,
                  this._options._metadata,
                  this._options.tunnel
                )
              );
              this._newTransport.send(t).then(null, function (e) {
                dt && I.error("Error while sending event:", e);
              });
            } else
              this._transport.sendEvent(e).then(null, function (e) {
                dt && I.error("Error while sending event:", e);
              });
          }),
          (e.prototype.sendSession = function (e) {
            if (this._transport.sendSession)
              if (
                this._newTransport &&
                this._options.dsn &&
                this._options._experiments &&
                this._options._experiments.newTransport
              ) {
                var t = l(
                  wt(
                    e,
                    ot(
                      this._options.dsn,
                      this._options._metadata,
                      this._options.tunnel
                    )
                  ),
                  1
                )[0];
                this._newTransport.send(t).then(null, function (e) {
                  dt && I.error("Error while sending session:", e);
                });
              } else
                this._transport.sendSession(e).then(null, function (e) {
                  dt && I.error("Error while sending session:", e);
                });
            else
              dt &&
                I.warn(
                  "Dropping session because custom transport doesn't implement sendSession"
                );
          }),
          (e.prototype.getTransport = function () {
            return this._transport;
          }),
          (e.prototype._setupTransport = function () {
            return new _t();
          }),
          e
        );
      })();
    function Tt(e, t, n) {
      void 0 === n && (n = Le(e.bufferSize || 30));
      var i = {};
      return {
        send: function (e) {
          var r = (function (e) {
              var t = l(e, 2),
                n = l(t[1], 1);
              return l(n[0], 1)[0].type;
            })(e),
            s = "event" === r ? "error" : r,
            o = { category: s, body: Fe(e) };
          return He(i, s)
            ? Oe({ status: "rate_limit", reason: Et(i, s) })
            : n.add(function () {
                return t(o).then(function (e) {
                  var t = e.body,
                    n = e.headers,
                    r = e.reason,
                    o = Ie(e.statusCode);
                  return (
                    n && (i = Ve(i, n)),
                    "success" === o
                      ? Pe({ status: o, reason: r })
                      : Oe({
                          status: o,
                          reason:
                            r ||
                            t ||
                            ("rate_limit" === o
                              ? Et(i, s)
                              : "Unknown transport error"),
                        })
                  );
                });
              });
        },
        flush: function (e) {
          return n.drain(e);
        },
      };
    }
    function Et(e, t) {
      return (
        "Too many " +
        t +
        " requests, backing off until: " +
        new Date(Be(e, t)).toISOString()
      );
    }
    var St,
      xt = "6.19.6",
      Ct = (function () {
        function e() {
          this.name = e.id;
        }
        return (
          (e.prototype.setupOnce = function () {
            (St = Function.prototype.toString),
              (Function.prototype.toString = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                var n = K(this) || this;
                return St.apply(n, e);
              });
          }),
          (e.id = "FunctionToString"),
          e
        );
      })(),
      At = [
        /^Script error\.?$/,
        /^Javascript error: Script error\.? on line 0$/,
      ],
      Pt = (function () {
        function e(t) {
          void 0 === t && (t = {}), (this._options = t), (this.name = e.id);
        }
        return (
          (e.prototype.setupOnce = function (t, n) {
            t(function (t) {
              var i = n();
              if (i) {
                var r = i.getIntegration(e);
                if (r) {
                  var s = i.getClient(),
                    o = s ? s.getOptions() : {},
                    a = (function (e, t) {
                      void 0 === e && (e = {});
                      void 0 === t && (t = {});
                      return {
                        allowUrls: c(
                          e.whitelistUrls || [],
                          e.allowUrls || [],
                          t.whitelistUrls || [],
                          t.allowUrls || []
                        ),
                        denyUrls: c(
                          e.blacklistUrls || [],
                          e.denyUrls || [],
                          t.blacklistUrls || [],
                          t.denyUrls || []
                        ),
                        ignoreErrors: c(
                          e.ignoreErrors || [],
                          t.ignoreErrors || [],
                          At
                        ),
                        ignoreInternal:
                          void 0 === e.ignoreInternal || e.ignoreInternal,
                      };
                    })(r._options, o);
                  return (function (e, t) {
                    if (
                      t.ignoreInternal &&
                      (function (e) {
                        try {
                          return "SentryError" === e.exception.values[0].type;
                        } catch (e) {}
                        return !1;
                      })(e)
                    )
                      return (
                        dt &&
                          I.warn(
                            "Event dropped due to being internal Sentry Error.\nEvent: " +
                              ke(e)
                          ),
                        !0
                      );
                    if (
                      (function (e, t) {
                        if (!t || !t.length) return !1;
                        return (function (e) {
                          if (e.message) return [e.message];
                          if (e.exception)
                            try {
                              var t =
                                  (e.exception.values &&
                                    e.exception.values[0]) ||
                                  {},
                                n = t.type,
                                i = void 0 === n ? "" : n,
                                r = t.value,
                                s = void 0 === r ? "" : r;
                              return ["" + s, i + ": " + s];
                            } catch (t) {
                              return (
                                dt &&
                                  I.error(
                                    "Cannot extract message for event " + ke(e)
                                  ),
                                []
                              );
                            }
                          return [];
                        })(e).some(function (e) {
                          return t.some(function (t) {
                            return H(e, t);
                          });
                        });
                      })(e, t.ignoreErrors)
                    )
                      return (
                        dt &&
                          I.warn(
                            "Event dropped due to being matched by `ignoreErrors` option.\nEvent: " +
                              ke(e)
                          ),
                        !0
                      );
                    if (
                      (function (e, t) {
                        if (!t || !t.length) return !1;
                        var n = Nt(e);
                        return (
                          !!n &&
                          t.some(function (e) {
                            return H(n, e);
                          })
                        );
                      })(e, t.denyUrls)
                    )
                      return (
                        dt &&
                          I.warn(
                            "Event dropped due to being matched by `denyUrls` option.\nEvent: " +
                              ke(e) +
                              ".\nUrl: " +
                              Nt(e)
                          ),
                        !0
                      );
                    if (
                      !(function (e, t) {
                        if (!t || !t.length) return !0;
                        var n = Nt(e);
                        return (
                          !n ||
                          t.some(function (e) {
                            return H(n, e);
                          })
                        );
                      })(e, t.allowUrls)
                    )
                      return (
                        dt &&
                          I.warn(
                            "Event dropped due to not being matched by `allowUrls` option.\nEvent: " +
                              ke(e) +
                              ".\nUrl: " +
                              Nt(e)
                          ),
                        !0
                      );
                    return !1;
                  })(t, a)
                    ? null
                    : t;
                }
              }
              return t;
            });
          }),
          (e.id = "InboundFilters"),
          e
        );
      })();
    function Ot(e) {
      void 0 === e && (e = []);
      for (var t = e.length - 1; t >= 0; t--) {
        var n = e[t];
        if (n && "<anonymous>" !== n.filename && "[native code]" !== n.filename)
          return n.filename || null;
      }
      return null;
    }
    function Nt(e) {
      try {
        if (e.stacktrace) return Ot(e.stacktrace.frames);
        var t;
        try {
          t = e.exception.values[0].stacktrace.frames;
        } catch (e) {}
        return t ? Ot(t) : null;
      } catch (t) {
        return dt && I.error("Cannot extract url for event " + ke(e)), null;
      }
    }
    var Lt = "?";
    function Mt(e, t, n, i) {
      var r = { filename: e, function: t, in_app: !0 };
      return void 0 !== n && (r.lineno = n), void 0 !== i && (r.colno = i), r;
    }
    var It =
        /^\s*at (?:(.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
      jt = /\((\S*)(?::(\d+))(?::(\d+))\)/,
      Rt = [
        30,
        function (e) {
          var t = It.exec(e);
          if (t) {
            if (t[2] && 0 === t[2].indexOf("eval")) {
              var n = jt.exec(t[2]);
              n && ((t[2] = n[1]), (t[3] = n[2]), (t[4] = n[3]));
            }
            var i = l(Wt(t[1] || Lt, t[2]), 2),
              r = i[0];
            return Mt(i[1], r, t[3] ? +t[3] : void 0, t[4] ? +t[4] : void 0);
          }
        },
      ],
      Dt =
        /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
      qt = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
      $t = [
        50,
        function (e) {
          var t,
            n = Dt.exec(e);
          if (n) {
            if (n[3] && n[3].indexOf(" > eval") > -1) {
              var i = qt.exec(n[3]);
              i &&
                ((n[1] = n[1] || "eval"),
                (n[3] = i[1]),
                (n[4] = i[2]),
                (n[5] = ""));
            }
            var r = n[3],
              s = n[1] || Lt;
            return (
              (s = (t = l(Wt(s, r), 2))[0]),
              Mt((r = t[1]), s, n[4] ? +n[4] : void 0, n[5] ? +n[5] : void 0)
            );
          }
        },
      ],
      Ut =
        /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
      Ft = [
        40,
        function (e) {
          var t = Ut.exec(e);
          return t
            ? Mt(t[2], t[1] || Lt, +t[3], t[4] ? +t[4] : void 0)
            : void 0;
        },
      ],
      Bt = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
      Ht = [
        10,
        function (e) {
          var t = Bt.exec(e);
          return t ? Mt(t[2], t[3] || Lt, +t[1]) : void 0;
        },
      ],
      Vt =
        / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i,
      zt = [
        20,
        function (e) {
          var t = Vt.exec(e);
          return t ? Mt(t[5], t[3] || t[4] || Lt, +t[1], +t[2]) : void 0;
        },
      ],
      Wt = function (e, t) {
        var n = -1 !== e.indexOf("safari-extension"),
          i = -1 !== e.indexOf("safari-web-extension");
        return n || i
          ? [
              -1 !== e.indexOf("@") ? e.split("@")[0] : Lt,
              n ? "safari-extension:" + t : "safari-web-extension:" + t,
            ]
          : [e, t];
      };
    function Kt(e) {
      var t = Jt(e),
        n = { type: e && e.name, value: Gt(e) };
      return (
        t.length && (n.stacktrace = { frames: t }),
        void 0 === n.type &&
          "" === n.value &&
          (n.value = "Unrecoverable error caught"),
        n
      );
    }
    function Yt(e) {
      return { exception: { values: [Kt(e)] } };
    }
    function Jt(e) {
      var t = e.stacktrace || e.stack || "",
        n = (function (e) {
          if (e) {
            if ("number" == typeof e.framesToPop) return e.framesToPop;
            if (Xt.test(e.message)) return 1;
          }
          return 0;
        })(e);
      try {
        return (function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          var n = e
            .sort(function (e, t) {
              return e[0] - t[0];
            })
            .map(function (e) {
              return e[1];
            });
          return function (e, t) {
            var i, r, s, o;
            void 0 === t && (t = 0);
            var l = [];
            try {
              for (
                var c = a(e.split("\n").slice(t)), u = c.next();
                !u.done;
                u = c.next()
              ) {
                var h = u.value;
                try {
                  for (
                    var d = ((s = void 0), a(n)), p = d.next();
                    !p.done;
                    p = d.next()
                  ) {
                    var f = (0, p.value)(h);
                    if (f) {
                      l.push(f);
                      break;
                    }
                  }
                } catch (e) {
                  s = { error: e };
                } finally {
                  try {
                    p && !p.done && (o = d.return) && o.call(d);
                  } finally {
                    if (s) throw s.error;
                  }
                }
              }
            } catch (e) {
              i = { error: e };
            } finally {
              try {
                u && !u.done && (r = c.return) && r.call(c);
              } finally {
                if (i) throw i.error;
              }
            }
            return Z(l);
          };
        })(
          Ht,
          zt,
          Rt,
          Ft,
          $t
        )(t, n);
      } catch (e) {}
      return [];
    }
    var Xt = /Minified React error #\d+;/i;
    function Gt(e) {
      var t = e && e.message;
      return t
        ? t.error && "string" == typeof t.error.message
          ? t.error.message
          : t
        : "No error message";
    }
    function Qt(e, t, n, i) {
      var r;
      if (y(e) && e.error) return Yt(e.error);
      if (v(e) || g(e, "DOMException")) {
        var s = e;
        if ("stack" in e) r = Yt(e);
        else {
          var a = s.name || (v(s) ? "DOMError" : "DOMException"),
            l = s.message ? a + ": " + s.message : a;
          Te((r = Zt(l, t, n)), l);
        }
        return (
          "code" in s &&
            (r.tags = o(o({}, r.tags), { "DOMException.code": "" + s.code })),
          r
        );
      }
      return m(e)
        ? Yt(e)
        : _(e) || k(e)
        ? ((r = (function (e, t, n) {
            var i = {
              exception: {
                values: [
                  {
                    type: k(e)
                      ? e.constructor.name
                      : n
                      ? "UnhandledRejection"
                      : "Error",
                    value:
                      "Non-Error " +
                      (n ? "promise rejection" : "exception") +
                      " captured with keys: " +
                      G(e),
                  },
                ],
              },
              extra: { __serialized__: Ce(e) },
            };
            if (t) {
              var r = Jt(t);
              r.length && (i.stacktrace = { frames: r });
            }
            return i;
          })(e, t, i)),
          Ee(r, { synthetic: !0 }),
          r)
        : (Te((r = Zt(e, t, n)), "" + e, void 0), Ee(r, { synthetic: !0 }), r);
    }
    function Zt(e, t, n) {
      var i = { message: e };
      if (n && t) {
        var r = Jt(t);
        r.length && (i.stacktrace = { frames: r });
      }
      return i;
    }
    var en,
      tn = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
      nn = d();
    function rn() {
      if (en) return en;
      if (ie(nn.fetch)) return (en = nn.fetch.bind(nn));
      var e = nn.document,
        t = nn.fetch;
      if (e && "function" == typeof e.createElement)
        try {
          var n = e.createElement("iframe");
          (n.hidden = !0), e.head.appendChild(n);
          var i = n.contentWindow;
          i && i.fetch && (t = i.fetch), e.head.removeChild(n);
        } catch (e) {
          tn &&
            I.warn(
              "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
              e
            );
        }
      return (en = t.bind(nn));
    }
    function sn(e, t) {
      if (
        "[object Navigator]" ===
          Object.prototype.toString.call(nn && nn.navigator) &&
        "function" == typeof nn.navigator.sendBeacon
      )
        return nn.navigator.sendBeacon.bind(nn.navigator)(e, t);
      if (ne()) {
        var n = rn();
        n(e, {
          body: t,
          method: "POST",
          credentials: "omit",
          keepalive: !0,
        }).then(null, function (e) {
          console.error(e);
        });
      } else;
    }
    function on(e) {
      return "event" === e ? "error" : e;
    }
    var an = d(),
      ln = (function () {
        function e(e) {
          var t = this;
          (this.options = e),
            (this._buffer = Le(30)),
            (this._rateLimits = {}),
            (this._outcomes = {}),
            (this._api = ot(e.dsn, e._metadata, e.tunnel)),
            (this.url = ut(this._api.dsn)),
            this.options.sendClientReports &&
              an.document &&
              an.document.addEventListener("visibilitychange", function () {
                "hidden" === an.document.visibilityState && t._flushOutcomes();
              });
        }
        return (
          (e.prototype.sendEvent = function (e) {
            return this._sendRequest(
              (function (e, t) {
                var n,
                  i = vt(t),
                  r = e.type || "event",
                  s = "transaction" === r || !!t.tunnel,
                  a = (e.sdkProcessingMetadata || {}).transactionSampling || {},
                  l = a.method,
                  c = a.rate;
                bt(e, t.metadata.sdk),
                  (e.tags = e.tags || {}),
                  (e.extra = e.extra || {}),
                  (e.sdkProcessingMetadata &&
                    e.sdkProcessingMetadata.baseClientNormalized) ||
                    ((e.tags.skippedNormalization = !0),
                    (e.extra.normalizeDepth = e.sdkProcessingMetadata
                      ? e.sdkProcessingMetadata.normalizeDepth
                      : "unset")),
                  delete e.sdkProcessingMetadata;
                try {
                  n = JSON.stringify(e);
                } catch (t) {
                  (e.tags.JSONStringifyError = !0),
                    (e.extra.JSONStringifyError = t);
                  try {
                    n = JSON.stringify(xe(e));
                  } catch (e) {
                    var u = e;
                    n = JSON.stringify({
                      message: "JSON.stringify error after renormalization",
                      extra: { message: u.message, stack: u.stack },
                    });
                  }
                }
                var h = {
                  body: n,
                  type: r,
                  url: s ? ht(t.dsn, t.tunnel) : ut(t.dsn),
                };
                if (s) {
                  var d = Ue(
                    o(
                      o(
                        {
                          event_id: e.event_id,
                          sent_at: new Date().toISOString(),
                        },
                        i && { sdk: i }
                      ),
                      !!t.tunnel && { dsn: N(t.dsn) }
                    ),
                    [[{ type: r, sample_rates: [{ id: l, rate: c }] }, h.body]]
                  );
                  h.body = Fe(d);
                }
                return h;
              })(e, this._api),
              e
            );
          }),
          (e.prototype.sendSession = function (e) {
            return this._sendRequest(
              (function (e, t) {
                var n = l(wt(e, t), 2),
                  i = n[0],
                  r = n[1];
                return { body: Fe(i), type: r, url: ht(t.dsn, t.tunnel) };
              })(e, this._api),
              e
            );
          }),
          (e.prototype.close = function (e) {
            return this._buffer.drain(e);
          }),
          (e.prototype.recordLostEvent = function (e, t) {
            var n;
            if (this.options.sendClientReports) {
              var i = on(t) + ":" + e;
              tn && I.log("Adding outcome: " + i),
                (this._outcomes[i] =
                  (null != (n = this._outcomes[i]) ? n : 0) + 1);
            }
          }),
          (e.prototype._flushOutcomes = function () {
            if (this.options.sendClientReports) {
              var e = this._outcomes;
              if (((this._outcomes = {}), Object.keys(e).length)) {
                tn &&
                  I.log("Flushing outcomes:\n" + JSON.stringify(e, null, 2));
                var t,
                  n,
                  i,
                  r = ht(this._api.dsn, this._api.tunnel),
                  s = Object.keys(e).map(function (t) {
                    var n = l(t.split(":"), 2),
                      i = n[0];
                    return { reason: n[1], category: i, quantity: e[t] };
                  }),
                  o =
                    ((t = s),
                    Ue(
                      (n = this._api.tunnel && N(this._api.dsn))
                        ? { dsn: n }
                        : {},
                      [
                        [
                          { type: "client_report" },
                          { timestamp: i || qe(), discarded_events: t },
                        ],
                      ]
                    ));
                try {
                  sn(r, Fe(o));
                } catch (e) {
                  tn && I.error(e);
                }
              } else tn && I.log("No outcomes to flush");
            }
          }),
          (e.prototype._handleResponse = function (e) {
            var t = e.requestType,
              n = e.response,
              i = e.headers,
              r = e.resolve,
              s = e.reject,
              o = Ie(n.status);
            (this._rateLimits = Ve(this._rateLimits, i)),
              this._isRateLimited(t) &&
                tn &&
                I.warn(
                  "Too many " +
                    t +
                    " requests, backing off until: " +
                    this._disabledUntil(t)
                ),
              "success" !== o ? s(n) : r({ status: o });
          }),
          (e.prototype._disabledUntil = function (e) {
            var t = on(e);
            return new Date(Be(this._rateLimits, t));
          }),
          (e.prototype._isRateLimited = function (e) {
            var t = on(e);
            return He(this._rateLimits, t);
          }),
          e
        );
      })(),
      cn = (function (e) {
        function t(t, n) {
          void 0 === n && (n = rn());
          var i = e.call(this, t) || this;
          return (i._fetch = n), i;
        }
        return (
          r(t, e),
          (t.prototype._sendRequest = function (e, t) {
            var n = this;
            if (this._isRateLimited(e.type))
              return (
                this.recordLostEvent("ratelimit_backoff", e.type),
                Promise.reject({
                  event: t,
                  type: e.type,
                  reason:
                    "Transport for " +
                    e.type +
                    " requests locked till " +
                    this._disabledUntil(e.type) +
                    " due to too many requests.",
                  status: 429,
                })
              );
            var i = {
              body: e.body,
              method: "POST",
              referrerPolicy: re() ? "origin" : "",
            };
            return (
              void 0 !== this.options.fetchParameters &&
                Object.assign(i, this.options.fetchParameters),
              void 0 !== this.options.headers &&
                (i.headers = this.options.headers),
              this._buffer
                .add(function () {
                  return new Ne(function (t, r) {
                    n._fetch(e.url, i)
                      .then(function (i) {
                        var s = {
                          "x-sentry-rate-limits": i.headers.get(
                            "X-Sentry-Rate-Limits"
                          ),
                          "retry-after": i.headers.get("Retry-After"),
                        };
                        n._handleResponse({
                          requestType: e.type,
                          response: i,
                          headers: s,
                          resolve: t,
                          reject: r,
                        });
                      })
                      .catch(r);
                  });
                })
                .then(void 0, function (t) {
                  throw (
                    (t instanceof A
                      ? n.recordLostEvent("queue_overflow", e.type)
                      : n.recordLostEvent("network_error", e.type),
                    t)
                  );
                })
            );
          }),
          t
        );
      })(ln),
      un = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          r(t, e),
          (t.prototype._sendRequest = function (e, t) {
            var n = this;
            return this._isRateLimited(e.type)
              ? (this.recordLostEvent("ratelimit_backoff", e.type),
                Promise.reject({
                  event: t,
                  type: e.type,
                  reason:
                    "Transport for " +
                    e.type +
                    " requests locked till " +
                    this._disabledUntil(e.type) +
                    " due to too many requests.",
                  status: 429,
                }))
              : this._buffer
                  .add(function () {
                    return new Ne(function (t, i) {
                      var r = new XMLHttpRequest();
                      for (var s in ((r.onreadystatechange = function () {
                        if (4 === r.readyState) {
                          var s = {
                            "x-sentry-rate-limits": r.getResponseHeader(
                              "X-Sentry-Rate-Limits"
                            ),
                            "retry-after": r.getResponseHeader("Retry-After"),
                          };
                          n._handleResponse({
                            requestType: e.type,
                            response: r,
                            headers: s,
                            resolve: t,
                            reject: i,
                          });
                        }
                      }),
                      r.open("POST", e.url),
                      n.options.headers))
                        Object.prototype.hasOwnProperty.call(
                          n.options.headers,
                          s
                        ) && r.setRequestHeader(s, n.options.headers[s]);
                      r.send(e.body);
                    });
                  })
                  .then(void 0, function (t) {
                    throw (
                      (t instanceof A
                        ? n.recordLostEvent("queue_overflow", e.type)
                        : n.recordLostEvent("network_error", e.type),
                      t)
                    );
                  });
          }),
          t
        );
      })(ln);
    var hn = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          r(t, e),
          (t.prototype.eventFromException = function (e, t) {
            return (function (e, t, n) {
              var i = Qt(e, (t && t.syntheticException) || void 0, n);
              return (
                Ee(i),
                (i.level = s.Error),
                t && t.event_id && (i.event_id = t.event_id),
                Pe(i)
              );
            })(e, t, this._options.attachStacktrace);
          }),
          (t.prototype.eventFromMessage = function (e, t, n) {
            return (
              void 0 === t && (t = s.Info),
              (function (e, t, n, i) {
                void 0 === t && (t = s.Info);
                var r = Zt(e, (n && n.syntheticException) || void 0, i);
                return (
                  (r.level = t),
                  n && n.event_id && (r.event_id = n.event_id),
                  Pe(r)
                );
              })(e, t, n, this._options.attachStacktrace)
            );
          }),
          (t.prototype._setupTransport = function () {
            if (!this._options.dsn)
              return e.prototype._setupTransport.call(this);
            var t,
              n,
              i = o(o({}, this._options.transportOptions), {
                dsn: this._options.dsn,
                tunnel: this._options.tunnel,
                sendClientReports: this._options.sendClientReports,
                _metadata: this._options._metadata,
              }),
              r = ot(i.dsn, i._metadata, i.tunnel),
              s = ht(r.dsn, r.tunnel);
            if (this._options.transport) return new this._options.transport(i);
            if (ne()) {
              var a = o({}, i.fetchParameters);
              return (
                (this._newTransport =
                  ((t = { requestOptions: a, url: s }),
                  void 0 === n && (n = rn()),
                  Tt({ bufferSize: t.bufferSize }, function (e) {
                    var i = o(
                      {
                        body: e.body,
                        method: "POST",
                        referrerPolicy: "origin",
                      },
                      t.requestOptions
                    );
                    return n(t.url, i).then(function (e) {
                      return e.text().then(function (t) {
                        return {
                          body: t,
                          headers: {
                            "x-sentry-rate-limits": e.headers.get(
                              "X-Sentry-Rate-Limits"
                            ),
                            "retry-after": e.headers.get("Retry-After"),
                          },
                          reason: e.statusText,
                          statusCode: e.status,
                        };
                      });
                    });
                  }))),
                new cn(i)
              );
            }
            return (
              (this._newTransport = (function (e) {
                return Tt({ bufferSize: e.bufferSize }, function (t) {
                  return new Ne(function (n, i) {
                    var r = new XMLHttpRequest();
                    for (var s in ((r.onreadystatechange = function () {
                      if (4 === r.readyState) {
                        var e = {
                          body: r.response,
                          headers: {
                            "x-sentry-rate-limits": r.getResponseHeader(
                              "X-Sentry-Rate-Limits"
                            ),
                            "retry-after": r.getResponseHeader("Retry-After"),
                          },
                          reason: r.statusText,
                          statusCode: r.status,
                        };
                        n(e);
                      }
                    }),
                    r.open("POST", e.url),
                    e.headers))
                      Object.prototype.hasOwnProperty.call(e.headers, s) &&
                        r.setRequestHeader(s, e.headers[s]);
                    r.send(t.body);
                  });
                });
              })({ url: s, headers: i.headers })),
              new un(i)
            );
          }),
          t
        );
      })(kt),
      dn = d(),
      pn = 0;
    function fn() {
      return pn > 0;
    }
    function mn() {
      (pn += 1),
        setTimeout(function () {
          pn -= 1;
        });
    }
    function gn(e, t, n) {
      if ((void 0 === t && (t = {}), "function" != typeof e)) return e;
      try {
        var i = e.__sentry_wrapped__;
        if (i) return i;
        if (K(e)) return e;
      } catch (t) {
        return e;
      }
      var r = function () {
        var i = Array.prototype.slice.call(arguments);
        try {
          n && "function" == typeof n && n.apply(this, arguments);
          var r = i.map(function (e) {
            return gn(e, t);
          });
          return e.apply(this, r);
        } catch (e) {
          throw (
            (mn(),
            st(function (n) {
              n.addEventProcessor(function (e) {
                return (
                  t.mechanism && (Te(e, void 0, void 0), Ee(e, t.mechanism)),
                  (e.extra = o(o({}, e.extra), { arguments: i })),
                  e
                );
              }),
                rt(e);
            }),
            e)
          );
        }
      };
      try {
        for (var s in e)
          Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
      } catch (e) {}
      W(r, e), z(e, "__sentry_wrapped__", r);
      try {
        Object.getOwnPropertyDescriptor(r, "name").configurable &&
          Object.defineProperty(r, "name", {
            get: function () {
              return e.name;
            },
          });
      } catch (e) {}
      return r;
    }
    function yn(e) {
      if ((void 0 === e && (e = {}), dn.document))
        if (e.eventId)
          if (e.dsn) {
            var t = dn.document.createElement("script");
            (t.async = !0),
              (t.src = (function (e, t) {
                var n = M(e),
                  i = at(n) + "embed/error-page/",
                  r = "dsn=" + N(n);
                for (var s in t)
                  if ("dsn" !== s)
                    if ("user" === s) {
                      if (!t.user) continue;
                      t.user.name &&
                        (r += "&name=" + encodeURIComponent(t.user.name)),
                        t.user.email &&
                          (r += "&email=" + encodeURIComponent(t.user.email));
                    } else
                      r +=
                        "&" +
                        encodeURIComponent(s) +
                        "=" +
                        encodeURIComponent(t[s]);
                return i + "?" + r;
              })(e.dsn, e)),
              e.onLoad && (t.onload = e.onLoad);
            var n = dn.document.head || dn.document.body;
            n && n.appendChild(t);
          } else tn && I.error("Missing dsn option in showReportDialog call");
        else tn && I.error("Missing eventId option in showReportDialog call");
    }
    var vn = (function () {
      function e(t) {
        (this.name = e.id),
          (this._installFunc = { onerror: bn, onunhandledrejection: wn }),
          (this._options = o({ onerror: !0, onunhandledrejection: !0 }, t));
      }
      return (
        (e.prototype.setupOnce = function () {
          Error.stackTraceLimit = 50;
          var e,
            t = this._options;
          for (var n in t) {
            var i = this._installFunc[n];
            i &&
              t[n] &&
              ((e = n),
              tn && I.log("Global Handler attached: " + e),
              i(),
              (this._installFunc[n] = void 0));
          }
        }),
        (e.id = "GlobalHandlers"),
        e
      );
    })();
    function bn() {
      ue("error", function (e) {
        var t = l(Tn(), 2),
          n = t[0],
          i = t[1];
        if (n.getIntegration(vn)) {
          var r = e.msg,
            o = e.url,
            a = e.line,
            c = e.column,
            u = e.error;
          if (!(fn() || (u && u.__sentry_own_request__))) {
            var h =
              void 0 === u && b(r)
                ? (function (e, t, n, i) {
                    var r =
                        /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i,
                      s = y(e) ? e.message : e,
                      o = "Error",
                      a = s.match(r);
                    a && ((o = a[1]), (s = a[2]));
                    return _n(
                      { exception: { values: [{ type: o, value: s }] } },
                      t,
                      n,
                      i
                    );
                  })(r, o, a, c)
                : _n(Qt(u || r, void 0, i, !1), o, a, c);
            (h.level = s.Error), kn(n, u, h, "onerror");
          }
        }
      });
    }
    function wn() {
      ue("unhandledrejection", function (e) {
        var t = l(Tn(), 2),
          n = t[0],
          i = t[1];
        if (n.getIntegration(vn)) {
          var r = e;
          try {
            "reason" in e
              ? (r = e.reason)
              : "detail" in e && "reason" in e.detail && (r = e.detail.reason);
          } catch (e) {}
          if (fn() || (r && r.__sentry_own_request__)) return !0;
          var o = w(r)
            ? {
                exception: {
                  values: [
                    {
                      type: "UnhandledRejection",
                      value:
                        "Non-Error promise rejection captured with value: " +
                        String(r),
                    },
                  ],
                },
              }
            : Qt(r, void 0, i, !0);
          (o.level = s.Error), kn(n, r, o, "onunhandledrejection");
        }
      });
    }
    function _n(e, t, n, i) {
      var r = (e.exception = e.exception || {}),
        s = (r.values = r.values || []),
        o = (s[0] = s[0] || {}),
        a = (o.stacktrace = o.stacktrace || {}),
        l = (a.frames = a.frames || []),
        c = isNaN(parseInt(i, 10)) ? void 0 : i,
        u = isNaN(parseInt(n, 10)) ? void 0 : n,
        h =
          b(t) && t.length > 0
            ? t
            : (function () {
                var e = d();
                try {
                  return e.document.location.href;
                } catch (e) {
                  return "";
                }
              })();
      return (
        0 === l.length &&
          l.push({
            colno: c,
            filename: h,
            function: "?",
            in_app: !0,
            lineno: u,
          }),
        e
      );
    }
    function kn(e, t, n, i) {
      Ee(n, { handled: !1, type: i }),
        e.captureEvent(n, { originalException: t });
    }
    function Tn() {
      var e = Ze(),
        t = e.getClient();
      return [e, t && t.getOptions().attachStacktrace];
    }
    var En = [
        "EventTarget",
        "Window",
        "Node",
        "ApplicationCache",
        "AudioTrackList",
        "ChannelMergerNode",
        "CryptoOperation",
        "EventSource",
        "FileReader",
        "HTMLUnknownElement",
        "IDBDatabase",
        "IDBRequest",
        "IDBTransaction",
        "KeyOperation",
        "MediaController",
        "MessagePort",
        "ModalWindow",
        "Notification",
        "SVGElementInstance",
        "Screen",
        "TextTrack",
        "TextTrackCue",
        "TextTrackList",
        "WebSocket",
        "WebSocketWorker",
        "Worker",
        "XMLHttpRequest",
        "XMLHttpRequestEventTarget",
        "XMLHttpRequestUpload",
      ],
      Sn = (function () {
        function e(t) {
          (this.name = e.id),
            (this._options = o(
              {
                XMLHttpRequest: !0,
                eventTarget: !0,
                requestAnimationFrame: !0,
                setInterval: !0,
                setTimeout: !0,
              },
              t
            ));
        }
        return (
          (e.prototype.setupOnce = function () {
            var e = d();
            this._options.setTimeout && V(e, "setTimeout", xn),
              this._options.setInterval && V(e, "setInterval", xn),
              this._options.requestAnimationFrame &&
                V(e, "requestAnimationFrame", Cn),
              this._options.XMLHttpRequest &&
                "XMLHttpRequest" in e &&
                V(XMLHttpRequest.prototype, "send", An);
            var t = this._options.eventTarget;
            t && (Array.isArray(t) ? t : En).forEach(Pn);
          }),
          (e.id = "TryCatch"),
          e
        );
      })();
    function xn(e) {
      return function () {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        var i = t[0];
        return (
          (t[0] = gn(i, {
            mechanism: {
              data: { function: te(e) },
              handled: !0,
              type: "instrument",
            },
          })),
          e.apply(this, t)
        );
      };
    }
    function Cn(e) {
      return function (t) {
        return e.apply(this, [
          gn(t, {
            mechanism: {
              data: { function: "requestAnimationFrame", handler: te(e) },
              handled: !0,
              type: "instrument",
            },
          }),
        ]);
      };
    }
    function An(e) {
      return function () {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        var i = this,
          r = ["onload", "onerror", "onprogress", "onreadystatechange"];
        return (
          r.forEach(function (e) {
            e in i &&
              "function" == typeof i[e] &&
              V(i, e, function (t) {
                var n = {
                    mechanism: {
                      data: { function: e, handler: te(t) },
                      handled: !0,
                      type: "instrument",
                    },
                  },
                  i = K(t);
                return i && (n.mechanism.data.handler = te(i)), gn(t, n);
              });
          }),
          e.apply(this, t)
        );
      };
    }
    function Pn(e) {
      var t = d(),
        n = t[e] && t[e].prototype;
      n &&
        n.hasOwnProperty &&
        n.hasOwnProperty("addEventListener") &&
        (V(n, "addEventListener", function (t) {
          return function (n, i, r) {
            try {
              "function" == typeof i.handleEvent &&
                (i.handleEvent = gn(i.handleEvent.bind(i), {
                  mechanism: {
                    data: {
                      function: "handleEvent",
                      handler: te(i),
                      target: e,
                    },
                    handled: !0,
                    type: "instrument",
                  },
                }));
            } catch (e) {}
            return t.apply(this, [
              n,
              gn(i, {
                mechanism: {
                  data: {
                    function: "addEventListener",
                    handler: te(i),
                    target: e,
                  },
                  handled: !0,
                  type: "instrument",
                },
              }),
              r,
            ]);
          };
        }),
        V(n, "removeEventListener", function (e) {
          return function (t, n, i) {
            var r = n;
            try {
              var s = r && r.__sentry_wrapped__;
              s && e.call(this, t, s, i);
            } catch (e) {}
            return e.call(this, t, r, i);
          };
        }));
    }
    var On = (function () {
      function e(t) {
        (this.name = e.id),
          (this._options = o(
            {
              console: !0,
              dom: !0,
              fetch: !0,
              history: !0,
              sentry: !0,
              xhr: !0,
            },
            t
          ));
      }
      return (
        (e.prototype.addSentryBreadcrumb = function (e) {
          this._options.sentry &&
            Ze().addBreadcrumb(
              {
                category:
                  "sentry." +
                  ("transaction" === e.type ? "transaction" : "event"),
                event_id: e.event_id,
                level: e.level,
                message: ke(e),
              },
              { event: e }
            );
        }),
        (e.prototype.setupOnce = function () {
          this._options.console && ue("console", Nn),
            this._options.dom &&
              ue(
                "dom",
                (function (e) {
                  function t(t) {
                    var n,
                      i = "object" == typeof e ? e.serializeAttribute : void 0;
                    "string" == typeof i && (i = [i]);
                    try {
                      n = t.event.target ? S(t.event.target, i) : S(t.event, i);
                    } catch (e) {
                      n = "<unknown>";
                    }
                    0 !== n.length &&
                      Ze().addBreadcrumb(
                        { category: "ui." + t.name, message: n },
                        { event: t.event, name: t.name, global: t.global }
                      );
                  }
                  return t;
                })(this._options.dom)
              ),
            this._options.xhr && ue("xhr", Ln),
            this._options.fetch && ue("fetch", Mn),
            this._options.history && ue("history", In);
        }),
        (e.id = "Breadcrumbs"),
        e
      );
    })();
    function Nn(e) {
      var t = {
        category: "console",
        data: { arguments: e.args, logger: "console" },
        level: Me(e.level),
        message: B(e.args, " "),
      };
      if ("assert" === e.level) {
        if (!1 !== e.args[0]) return;
        (t.message =
          "Assertion failed: " + (B(e.args.slice(1), " ") || "console.assert")),
          (t.data.arguments = e.args.slice(1));
      }
      Ze().addBreadcrumb(t, { input: e.args, level: e.level });
    }
    function Ln(e) {
      if (e.endTimestamp) {
        if (e.xhr.__sentry_own_request__) return;
        var t = e.xhr.__sentry_xhr__ || {},
          n = t.method,
          i = t.url,
          r = t.status_code,
          s = t.body;
        Ze().addBreadcrumb(
          {
            category: "xhr",
            data: { method: n, url: i, status_code: r },
            type: "http",
          },
          { xhr: e.xhr, input: s }
        );
      } else;
    }
    function Mn(e) {
      e.endTimestamp &&
        ((e.fetchData.url.match(/sentry_key/) &&
          "POST" === e.fetchData.method) ||
          (e.error
            ? Ze().addBreadcrumb(
                {
                  category: "fetch",
                  data: e.fetchData,
                  level: s.Error,
                  type: "http",
                },
                { data: e.error, input: e.args }
              )
            : Ze().addBreadcrumb(
                {
                  category: "fetch",
                  data: o(o({}, e.fetchData), {
                    status_code: e.response.status,
                  }),
                  type: "http",
                },
                { input: e.args, response: e.response }
              )));
    }
    function In(e) {
      var t = d(),
        n = e.from,
        i = e.to,
        r = we(t.location.href),
        s = we(n),
        o = we(i);
      s.path || (s = r),
        r.protocol === o.protocol && r.host === o.host && (i = o.relative),
        r.protocol === s.protocol && r.host === s.host && (n = s.relative),
        Ze().addBreadcrumb({
          category: "navigation",
          data: { from: n, to: i },
        });
    }
    var jn = (function () {
      function e(t) {
        void 0 === t && (t = {}),
          (this.name = e.id),
          (this._key = t.key || "cause"),
          (this._limit = t.limit || 5);
      }
      return (
        (e.prototype.setupOnce = function () {
          Ke(function (t, n) {
            var i = Ze().getIntegration(e);
            return i
              ? (function (e, t, n, i) {
                  if (
                    !(
                      n.exception &&
                      n.exception.values &&
                      i &&
                      E(i.originalException, Error)
                    )
                  )
                    return n;
                  var r = Rn(t, i.originalException, e);
                  return (n.exception.values = c(r, n.exception.values)), n;
                })(i._key, i._limit, t, n)
              : t;
          });
        }),
        (e.id = "LinkedErrors"),
        e
      );
    })();
    function Rn(e, t, n, i) {
      if ((void 0 === i && (i = []), !E(t[n], Error) || i.length + 1 >= e))
        return i;
      var r = Kt(t[n]);
      return Rn(e, t[n], n, c([r], i));
    }
    var Dn = d(),
      qn = (function () {
        function e() {
          this.name = e.id;
        }
        return (
          (e.prototype.setupOnce = function () {
            Ke(function (t) {
              if (Ze().getIntegration(e)) {
                if (!Dn.navigator && !Dn.location && !Dn.document) return t;
                var n =
                    (t.request && t.request.url) ||
                    (Dn.location && Dn.location.href),
                  i = (Dn.document || {}).referrer,
                  r = (Dn.navigator || {}).userAgent,
                  s = o(
                    o(
                      o({}, t.request && t.request.headers),
                      i && { Referer: i }
                    ),
                    r && { "User-Agent": r }
                  ),
                  a = o(o({}, n && { url: n }), { headers: s });
                return o(o({}, t), { request: a });
              }
              return t;
            });
          }),
          (e.id = "UserAgent"),
          e
        );
      })(),
      $n = (function () {
        function e() {
          this.name = e.id;
        }
        return (
          (e.prototype.setupOnce = function (t, n) {
            t(function (t) {
              var i = n().getIntegration(e);
              if (i) {
                try {
                  if (
                    (function (e, t) {
                      if (!t) return !1;
                      if (
                        (function (e, t) {
                          var n = e.message,
                            i = t.message;
                          if (!n && !i) return !1;
                          if ((n && !i) || (!n && i)) return !1;
                          if (n !== i) return !1;
                          if (!Fn(e, t)) return !1;
                          if (!Un(e, t)) return !1;
                          return !0;
                        })(e, t)
                      )
                        return !0;
                      if (
                        (function (e, t) {
                          var n = Bn(t),
                            i = Bn(e);
                          if (!n || !i) return !1;
                          if (n.type !== i.type || n.value !== i.value)
                            return !1;
                          if (!Fn(e, t)) return !1;
                          if (!Un(e, t)) return !1;
                          return !0;
                        })(e, t)
                      )
                        return !0;
                      return !1;
                    })(t, i._previousEvent)
                  )
                    return (
                      tn &&
                        I.warn(
                          "Event dropped due to being a duplicate of previously captured event."
                        ),
                      null
                    );
                } catch (e) {
                  return (i._previousEvent = t);
                }
                return (i._previousEvent = t);
              }
              return t;
            });
          }),
          (e.id = "Dedupe"),
          e
        );
      })();
    function Un(e, t) {
      var n = Hn(e),
        i = Hn(t);
      if (!n && !i) return !0;
      if ((n && !i) || (!n && i)) return !1;
      if (i.length !== n.length) return !1;
      for (var r = 0; r < i.length; r++) {
        var s = i[r],
          o = n[r];
        if (
          s.filename !== o.filename ||
          s.lineno !== o.lineno ||
          s.colno !== o.colno ||
          s.function !== o.function
        )
          return !1;
      }
      return !0;
    }
    function Fn(e, t) {
      var n = e.fingerprint,
        i = t.fingerprint;
      if (!n && !i) return !0;
      if ((n && !i) || (!n && i)) return !1;
      try {
        return !(n.join("") !== i.join(""));
      } catch (e) {
        return !1;
      }
    }
    function Bn(e) {
      return e.exception && e.exception.values && e.exception.values[0];
    }
    function Hn(e) {
      var t = e.exception;
      if (t)
        try {
          return t.values[0].stacktrace.frames;
        } catch (e) {
          return;
        }
      else if (e.stacktrace) return e.stacktrace.frames;
    }
    var Vn = (function (e) {
        function t(t) {
          void 0 === t && (t = {});
          return (
            (t._metadata = t._metadata || {}),
            (t._metadata.sdk = t._metadata.sdk || {
              name: "sentry.javascript.browser",
              packages: [{ name: "npm:@sentry/browser", version: xt }],
              version: xt,
            }),
            e.call(this, hn, t) || this
          );
        }
        return (
          r(t, e),
          (t.prototype.showReportDialog = function (e) {
            void 0 === e && (e = {}),
              d().document &&
                (this._isEnabled()
                  ? yn(o(o({}, e), { dsn: e.dsn || this.getDsn() }))
                  : tn &&
                    I.error(
                      "Trying to call showReportDialog with Sentry Client disabled"
                    ));
          }),
          (t.prototype._prepareEvent = function (t, n, i) {
            return (
              (t.platform = t.platform || "javascript"),
              e.prototype._prepareEvent.call(this, t, n, i)
            );
          }),
          (t.prototype._sendEvent = function (t) {
            var n = this.getIntegration(On);
            n && n.addSentryBreadcrumb(t), e.prototype._sendEvent.call(this, t);
          }),
          t
        );
      })(yt),
      zn = [
        new Pt(),
        new Ct(),
        new Sn(),
        new On(),
        new vn(),
        new jn(),
        new $n(),
        new qn(),
      ];
    function Wn(e) {
      if (
        (void 0 === e && (e = {}),
        void 0 === e.defaultIntegrations && (e.defaultIntegrations = zn),
        void 0 === e.release)
      ) {
        var t = d();
        t.SENTRY_RELEASE &&
          t.SENTRY_RELEASE.id &&
          (e.release = t.SENTRY_RELEASE.id);
      }
      void 0 === e.autoSessionTracking && (e.autoSessionTracking = !0),
        void 0 === e.sendClientReports && (e.sendClientReports = !0),
        (function (e, t) {
          !0 === t.debug &&
            (dt
              ? I.enable()
              : console.warn(
                  "[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."
                ));
          var n = Ze(),
            i = n.getScope();
          i && i.update(t.initialScope);
          var r = new e(t);
          n.bindClient(r);
        })(Vn, e),
        e.autoSessionTracking &&
          (function () {
            if (void 0 === d().document)
              return void (
                tn &&
                I.warn(
                  "Session tracking in non-browser environment with @sentry/browser is not supported."
                )
              );
            var e = Ze();
            if (!e.captureSession) return;
            Kn(e),
              ue("history", function (e) {
                var t = e.from,
                  n = e.to;
                void 0 !== t && t !== n && Kn(Ze());
              });
          })();
    }
    function Kn(e) {
      e.startSession({ ignoreDuration: !0 }), e.captureSession();
    }
    function Yn(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function Jn(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(e, i.key, i);
      }
    }
    function Xn(e, t, n) {
      return t && Jn(e.prototype, t), n && Jn(e, n), e;
    }
    function Gn(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function Qn(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var n = [],
            i = !0,
            r = !1,
            s = void 0;
          try {
            for (
              var o, a = e[Symbol.iterator]();
              !(i = (o = a.next()).done) &&
              (n.push(o.value), !t || n.length !== t);
              i = !0
            );
          } catch (e) {
            (r = !0), (s = e);
          } finally {
            try {
              i || null == a.return || a.return();
            } finally {
              if (r) throw s;
            }
          }
          return n;
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        })()
      );
    }
    var Zn = function (e) {
        return null != e ? e.constructor : null;
      },
      ei = function (e, t) {
        return !!(e && t && e instanceof t);
      },
      ti = function (e) {
        return null == e;
      },
      ni = function (e) {
        return Zn(e) === Object;
      },
      ii = function (e) {
        return Zn(e) === String;
      },
      ri = function (e) {
        return Array.isArray(e);
      },
      si = function (e) {
        return ei(e, NodeList);
      },
      oi = ti,
      ai = ni,
      li = function (e) {
        return Zn(e) === Number && !Number.isNaN(e);
      },
      ci = ii,
      ui = function (e) {
        return Zn(e) === Boolean;
      },
      hi = ri,
      di = si,
      pi = function (e) {
        return ei(e, Element);
      },
      fi = function (e) {
        return ei(e, Event);
      },
      mi = function (e) {
        return (
          ti(e) ||
          ((ii(e) || ri(e) || si(e)) && !e.length) ||
          (ni(e) && !Object.keys(e).length)
        );
      },
      gi = {
        facebook: {
          domain: "facebook.com",
          url: function (e) {
            return "https://graph.facebook.com/?id=".concat(
              e,
              "&fields=og_object{engagement}"
            );
          },
          shareCount: function (e) {
            return e.og_object.engagement.count;
          },
          popup: { width: 640, height: 360 },
        },
        twitter: {
          domain: "twitter.com",
          url: function () {
            return null;
          },
          shareCount: function () {
            return null;
          },
          popup: { width: 640, height: 240 },
        },
        pinterest: {
          domain: "pinterest.com",
          url: function (e) {
            return "https://widgets.pinterest.com/v1/urls/count.json?url=".concat(
              e
            );
          },
          shareCount: function (e) {
            return e.count;
          },
          popup: { width: 830, height: 700 },
        },
        github: {
          domain: "github.com",
          url: function (e, t) {
            return "https://api.github.com/repos/"
              .concat(e)
              .concat(ci(t) ? "?access_token=".concat(t) : "");
          },
          shareCount: function (e) {
            return e.data.stargazers_count;
          },
        },
        youtube: {
          domain: "youtube.com",
          url: function (e, t) {
            return "https://www.googleapis.com/youtube/v3/channels?part=statistics&id="
              .concat(e, "&key=")
              .concat(t);
          },
          shareCount: function (e) {
            if (!mi(e.error)) return null;
            var t = Qn(e.items, 1)[0];
            return mi(t) ? null : t.statistics.subscriberCount;
          },
        },
      },
      yi = {
        debug: !1,
        wrapper: { className: "shr" },
        count: {
          className: "shr__count",
          displayZero: !1,
          format: !0,
          position: "after",
          increment: !0,
        },
        tokens: { github: "", youtube: "" },
        storage: { enabled: !0, key: "shr", ttl: 3e5 },
      };
    function vi(e) {
      return new Promise(function (t, n) {
        var i = "jsonp_callback_".concat(Math.round(1e5 * Math.random())),
          r = document.createElement("script");
        r.addEventListener("error", function (e) {
          return n(e);
        }),
          (window[i] = function (e) {
            delete window[i], document.body.removeChild(r), t(e);
          });
        var s = new URL(e);
        s.searchParams.set("callback", i),
          r.setAttribute("src", s.toString()),
          document.body.appendChild(r);
      });
    }
    var bi = function () {},
      wi = (function () {
        function e() {
          var t =
            !!(0 < arguments.length && void 0 !== arguments[0]) && arguments[0];
          Yn(this, e),
            (this.enabled = window.console && t),
            this.enabled && this.log("Debugging enabled");
        }
        return (
          Xn(e, [
            {
              key: "log",
              get: function () {
                return this.enabled
                  ? Function.prototype.bind.call(console.log, console)
                  : bi;
              },
            },
            {
              key: "warn",
              get: function () {
                return this.enabled
                  ? Function.prototype.bind.call(console.warn, console)
                  : bi;
              },
            },
            {
              key: "error",
              get: function () {
                return this.enabled
                  ? Function.prototype.bind.call(console.error, console)
                  : bi;
              },
            },
          ]),
          e
        );
      })();
    function _i(e, t) {
      return function () {
        return Array.from(document.querySelectorAll(t)).includes(this);
      }.call(e, t);
    }
    function ki(e, t) {
      var n = e.length ? e : [e];
      Array.from(n)
        .reverse()
        .forEach(function (e, n) {
          var i = 0 < n ? t.cloneNode(!0) : t,
            r = e.parentNode,
            s = e.nextSibling;
          i.appendChild(e), s ? r.insertBefore(i, s) : r.appendChild(i);
        });
    }
    function Ti(e, t, n) {
      var i = document.createElement(e);
      return (
        ai(t) &&
          (function (e, t) {
            !pi(e) ||
              mi(t) ||
              Object.entries(t)
                .filter(function (e) {
                  var t = Qn(e, 2)[1];
                  return !oi(t);
                })
                .forEach(function (t) {
                  var n = Qn(t, 2),
                    i = n[0],
                    r = n[1];
                  return e.setAttribute(i, r);
                });
          })(i, t),
        ci(n) && (i.innerText = n),
        i
      );
    }
    function Ei(e) {
      var t = /\./.test((1.1).toLocaleString()) ? "." : ",",
        n = new RegExp("\\".concat(t, "\\d+$"));
      return Math.round(e).toLocaleString().replace(n, "");
    }
    function Si() {
      for (
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length,
          n = Array(1 < t ? t - 1 : 0),
          i = 1;
        i < t;
        i++
      )
        n[i - 1] = arguments[i];
      if (!n.length) return e;
      var r = n.shift();
      return ai(r)
        ? (Object.keys(r).forEach(function (t) {
            ai(r[t])
              ? (!Object.keys(e).includes(t) && Object.assign(e, Gn({}, t, {})),
                Si(e[t], r[t]))
              : Object.assign(e, Gn({}, t, r[t]));
          }),
          Si.apply(void 0, [e].concat(n)))
        : e;
    }
    var xi = (function () {
      function e(t, n) {
        var i =
          !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2];
        Yn(this, e),
          (this.enabled = i && e.supported),
          (this.key = t),
          (this.ttl = n);
      }
      return (
        Xn(
          e,
          [
            {
              key: "get",
              value: function (t) {
                if (!e.supported || !this.enabled) return null;
                var n = window.localStorage.getItem(this.key);
                if (mi(n)) return null;
                var i = window.localStorage.getItem(
                  "".concat(this.key, "_ttl")
                );
                if (mi(i) || i < Date.now()) return null;
                var r = JSON.parse(n);
                return ci(t) && t.length ? r[t] : r;
              },
            },
            {
              key: "set",
              value: function (t) {
                if (e.supported && this.enabled && ai(t)) {
                  var n = this.get();
                  mi(n) && (n = {}),
                    Si(n, t),
                    window.localStorage.setItem(this.key, JSON.stringify(n)),
                    window.localStorage.setItem(
                      "".concat(this.key, "_ttl"),
                      Date.now() + this.ttl
                    );
                }
              },
            },
          ],
          [
            {
              key: "supported",
              get: function () {
                try {
                  return (
                    "localStorage" in window &&
                    (window.localStorage.setItem("___test", "___test"),
                    window.localStorage.removeItem("___test"),
                    !0)
                  );
                } catch (e) {
                  return !1;
                }
              },
            },
          ]
        ),
        e
      );
    })();
    var Ci = (function () {
      function e(t, n) {
        var i = this;
        Yn(this, e),
          (this.elements = { count: null, trigger: null, popup: null }),
          pi(t)
            ? (this.elements.trigger = t)
            : ci(t) && (this.elements.trigger = document.querySelector(t)),
          pi(this.elements.trigger) &&
            mi(this.elements.trigger.shr) &&
            ((this.config = Si({}, yi, n, { networks: gi })),
            (this.console = new wi(this.config.debug)),
            (this.storage = new xi(
              this.config.storage.key,
              this.config.storage.ttl,
              this.config.storage.enabled
            )),
            this.getCount()
              .then(function (e) {
                return i.updateDisplay(e);
              })
              .catch(function () {}),
            this.listeners(!0),
            (this.elements.trigger.shr = this));
      }
      return (
        Xn(
          e,
          [
            {
              key: "destroy",
              value: function () {
                this.listeners(!1);
              },
            },
            {
              key: "listeners",
              value: function () {
                var e = this,
                  t =
                    0 < arguments.length &&
                    void 0 !== arguments[0] &&
                    arguments[0]
                      ? "addEventListener"
                      : "removeEventListener";
                this.elements.trigger[t](
                  "click",
                  function (t) {
                    return e.share(t);
                  },
                  !1
                );
              },
            },
            {
              key: "share",
              value: function (e) {
                var t = this;
                this.openPopup(e);
                var n = this.config.count.increment;
                this.getCount()
                  .then(function (e) {
                    return t.updateDisplay(e, n);
                  })
                  .catch(function () {});
              },
            },
            {
              key: "openPopup",
              value: function (e) {
                if (!mi(this.network) && this.networkConfig.popup) {
                  fi(e) && e.preventDefault();
                  var t = this.networkConfig.popup,
                    n = t.width,
                    i = t.height,
                    r = "shr-popup--".concat(this.network);
                  if (this.popup && !this.popup.closed)
                    this.popup.focus(), this.console.log("Popup re-focused.");
                  else {
                    var s =
                        void 0 === window.screenLeft
                          ? window.screen.left
                          : window.screenLeft,
                      o =
                        void 0 === window.screenTop
                          ? window.screen.top
                          : window.screenTop,
                      a = window.screen.width / 2 - n / 2 + s,
                      l = window.screen.height / 2 - i / 2 + o;
                    (this.popup = window.open(
                      this.href,
                      r,
                      "top="
                        .concat(l, ",left=")
                        .concat(a, ",width=")
                        .concat(n, ",height=")
                        .concat(i)
                    )),
                      this.popup && !this.popup.closed && ui(this.popup.closed)
                        ? (this.popup.focus(),
                          this.console.log("Popup opened."))
                        : this.console.error("Popup blocked.");
                  }
                }
              },
            },
            {
              key: "getCount",
              value: function () {
                var e = this,
                  t =
                    !(0 < arguments.length && void 0 !== arguments[0]) ||
                    arguments[0];
                return new Promise(function (n, i) {
                  var r = e.apiUrl;
                  if (mi(r))
                    i(
                      new Error("No URL available for ".concat(e.network, "."))
                    );
                  else {
                    if (t) {
                      var s = e.storage.get(e.target);
                      if (!mi(s) && Object.keys(s).includes(e.network)) {
                        var o = s[e.network];
                        return (
                          n(li(o) ? o : 0),
                          void e.console.log(
                            "getCount for '"
                              .concat(e.target, "' for '")
                              .concat(e.network, "' resolved from cache.")
                          )
                        );
                      }
                    }
                    vi(r)
                      .then(function (t) {
                        var i = 0,
                          r =
                            e.elements.trigger.getAttribute("data-shr-display");
                        (i = mi(r) ? e.networkConfig.shareCount(t) : t[r]),
                          mi(i)
                            ? (i = 0)
                            : ((i = parseInt(i, 10)), !li(i) && (i = 0)),
                          e.storage.set(Gn({}, e.target, Gn({}, e.network, i))),
                          n(i);
                      })
                      .catch(i);
                  }
                });
              },
            },
            {
              key: "updateDisplay",
              value: function (e) {
                var t =
                    !!(1 < arguments.length && void 0 !== arguments[1]) &&
                    arguments[1],
                  n = this.config,
                  i = n.count,
                  r = n.wrapper,
                  s = t ? e + 1 : e,
                  o = i.position.toLowerCase();
                if (0 < s || i.displayZero) {
                  var a = function (e) {
                      return Math.round((s / e) * 10) / 10;
                    },
                    l = Ei(s);
                  i.format &&
                    (1e6 < s
                      ? (l = "".concat(a(1e6), "M"))
                      : 1e3 < s && (l = "".concat(a(1e3), "K"))),
                    pi(this.elements.count)
                      ? (this.elements.count.textContent = l)
                      : (ki(
                          this.elements.trigger,
                          Ti("span", { class: r.className })
                        ),
                        (this.elements.count = Ti(
                          "span",
                          {
                            class: ""
                              .concat(i.className, " ")
                              .concat(i.className, "--")
                              .concat(o),
                          },
                          l
                        )),
                        this.elements.trigger.insertAdjacentElement(
                          "after" === o ? "afterend" : "beforebegin",
                          this.elements.count
                        ));
                }
              },
            },
            {
              key: "href",
              get: function () {
                return pi(this.elements.trigger)
                  ? this.elements.trigger.href
                  : null;
              },
            },
            {
              key: "network",
              get: function () {
                var e = this;
                if (!pi(this.elements.trigger)) return null;
                var t = this.config.networks;
                return Object.keys(t).find(function (n) {
                  return (
                    (function (e) {
                      var t = new URL(e).hostname,
                        n = t.split("."),
                        i = n.length;
                      return (
                        2 < i &&
                          ((t = "".concat(n[i - 2], ".").concat(n[i - 1])),
                          2 === n[i - 2].length &&
                            2 === n[i - 1].length &&
                            (t = "".concat(n[i - 3], ".").concat(t))),
                        t
                      );
                    })(e.href) === t[n].domain
                  );
                });
              },
            },
            {
              key: "networkConfig",
              get: function () {
                return mi(this.network)
                  ? null
                  : this.config.networks[this.network];
              },
            },
            {
              key: "target",
              get: function () {
                if (mi(this.network)) return null;
                var e = new URL(this.href);
                switch (this.network) {
                  case "facebook":
                    return e.searchParams.get("u");
                  case "github":
                    return e.pathname.substring(1);
                  case "youtube":
                    return e.pathname.split("/").pop();
                  default:
                    return e.searchParams.get("url");
                }
              },
            },
            {
              key: "apiUrl",
              get: function () {
                if (mi(this.network)) return null;
                var e = this.config.tokens;
                switch (this.network) {
                  case "github":
                    return this.networkConfig.url(this.target, e.github);
                  case "youtube":
                    return this.networkConfig.url(this.target, e.youtube);
                  default:
                    return this.networkConfig.url(
                      encodeURIComponent(this.target)
                    );
                }
              },
            },
          ],
          [
            {
              key: "setup",
              value: function (t) {
                var n =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  i = null;
                if (
                  (ci(t)
                    ? (i = Array.from(document.querySelectorAll(t)))
                    : pi(t)
                    ? (i = [t])
                    : di(t)
                    ? (i = Array.from(t))
                    : hi(t) && (i = t.filter(pi)),
                  mi(i))
                )
                  return null;
                var r = Object.assign({}, yi, n);
                return (
                  ci(t) &&
                    r.watch &&
                    new MutationObserver(function (n) {
                      Array.from(n).forEach(function (n) {
                        Array.from(n.addedNodes).forEach(function (n) {
                          pi(n) && _i(n, t) && new e(n, r);
                        });
                      });
                    }).observe(document.body, { childList: !0, subtree: !0 }),
                  i.map(function (t) {
                    return new e(t, n);
                  })
                );
              },
            },
          ]
        ),
        e
      );
    })();
    function Ai(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function Pi(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(e, i.key, i);
      }
    }
    function Oi(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function Ni(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        t &&
          (i = i.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, i);
      }
      return n;
    }
    function Li(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Ni(Object(n), !0).forEach(function (t) {
              Oi(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Ni(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var Mi = { addCSS: !0, thumbWidth: 15, watch: !0 };
    function Ii(e, t) {
      return function () {
        return Array.from(document.querySelectorAll(t)).includes(this);
      }.call(e, t);
    }
    var ji = function (e) {
        return null != e ? e.constructor : null;
      },
      Ri = function (e, t) {
        return !!(e && t && e instanceof t);
      },
      Di = function (e) {
        return null == e;
      },
      qi = function (e) {
        return ji(e) === Object;
      },
      $i = function (e) {
        return ji(e) === String;
      },
      Ui = function (e) {
        return Array.isArray(e);
      },
      Fi = function (e) {
        return Ri(e, NodeList);
      },
      Bi = $i,
      Hi = Ui,
      Vi = Fi,
      zi = function (e) {
        return Ri(e, Element);
      },
      Wi = function (e) {
        return Ri(e, Event);
      },
      Ki = function (e) {
        return (
          Di(e) ||
          (($i(e) || Ui(e) || Fi(e)) && !e.length) ||
          (qi(e) && !Object.keys(e).length)
        );
      };
    function Yi(e, t) {
      if (1 > t) {
        var n = (function (e) {
          var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
          return t
            ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0))
            : 0;
        })(t);
        return parseFloat(e.toFixed(n));
      }
      return Math.round(e / t) * t;
    }
    var Ji = (function () {
      function e(t, n) {
        (function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          zi(t)
            ? (this.element = t)
            : Bi(t) && (this.element = document.querySelector(t)),
          zi(this.element) &&
            Ki(this.element.rangeTouch) &&
            ((this.config = Li({}, Mi, {}, n)), this.init());
      }
      return (
        (function (e, t, n) {
          t && Pi(e.prototype, t), n && Pi(e, n);
        })(
          e,
          [
            {
              key: "init",
              value: function () {
                e.enabled &&
                  (this.config.addCSS &&
                    ((this.element.style.userSelect = "none"),
                    (this.element.style.webKitUserSelect = "none"),
                    (this.element.style.touchAction = "manipulation")),
                  this.listeners(!0),
                  (this.element.rangeTouch = this));
              },
            },
            {
              key: "destroy",
              value: function () {
                e.enabled &&
                  (this.config.addCSS &&
                    ((this.element.style.userSelect = ""),
                    (this.element.style.webKitUserSelect = ""),
                    (this.element.style.touchAction = "")),
                  this.listeners(!1),
                  (this.element.rangeTouch = null));
              },
            },
            {
              key: "listeners",
              value: function (e) {
                var t = this,
                  n = e ? "addEventListener" : "removeEventListener";
                ["touchstart", "touchmove", "touchend"].forEach(function (e) {
                  t.element[n](
                    e,
                    function (e) {
                      return t.set(e);
                    },
                    !1
                  );
                });
              },
            },
            {
              key: "get",
              value: function (t) {
                if (!e.enabled || !Wi(t)) return null;
                var n,
                  i = t.target,
                  r = t.changedTouches[0],
                  s = parseFloat(i.getAttribute("min")) || 0,
                  o = parseFloat(i.getAttribute("max")) || 100,
                  a = parseFloat(i.getAttribute("step")) || 1,
                  l = i.getBoundingClientRect(),
                  c = ((100 / l.width) * (this.config.thumbWidth / 2)) / 100;
                return (
                  0 > (n = (100 / l.width) * (r.clientX - l.left))
                    ? (n = 0)
                    : 100 < n && (n = 100),
                  50 > n
                    ? (n -= (100 - 2 * n) * c)
                    : 50 < n && (n += 2 * (n - 50) * c),
                  s + Yi((n / 100) * (o - s), a)
                );
              },
            },
            {
              key: "set",
              value: function (t) {
                e.enabled &&
                  Wi(t) &&
                  !t.target.disabled &&
                  (t.preventDefault(),
                  (t.target.value = this.get(t)),
                  (function (e, t) {
                    if (e && t) {
                      var n = new Event(t, { bubbles: !0 });
                      e.dispatchEvent(n);
                    }
                  })(t.target, "touchend" === t.type ? "change" : "input"));
              },
            },
          ],
          [
            {
              key: "setup",
              value: function (t) {
                var n =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  i = null;
                if (
                  (Ki(t) || Bi(t)
                    ? (i = Array.from(
                        document.querySelectorAll(
                          Bi(t) ? t : 'input[type="range"]'
                        )
                      ))
                    : zi(t)
                    ? (i = [t])
                    : Vi(t)
                    ? (i = Array.from(t))
                    : Hi(t) && (i = t.filter(zi)),
                  Ki(i))
                )
                  return null;
                var r = Li({}, Mi, {}, n);
                if (Bi(t) && r.watch) {
                  var s = new MutationObserver(function (n) {
                    Array.from(n).forEach(function (n) {
                      Array.from(n.addedNodes).forEach(function (n) {
                        zi(n) && Ii(n, t) && new e(n, r);
                      });
                    });
                  });
                  s.observe(document.body, { childList: !0, subtree: !0 });
                }
                return i.map(function (t) {
                  return new e(t, n);
                });
              },
            },
            {
              key: "enabled",
              get: function () {
                return "ontouchstart" in document.documentElement;
              },
            },
          ]
        ),
        e
      );
    })();
    const Xi = (e) => (null != e ? e.constructor : null),
      Gi = (e, t) => Boolean(e && t && e instanceof t),
      Qi = (e) => null == e,
      Zi = (e) => Xi(e) === Object,
      er = (e) => Xi(e) === String,
      tr = (e) => "function" == typeof e,
      nr = (e) => Array.isArray(e),
      ir = (e) => Gi(e, NodeList),
      rr = (e) =>
        Qi(e) ||
        ((er(e) || nr(e) || ir(e)) && !e.length) ||
        (Zi(e) && !Object.keys(e).length);
    var sr = Qi,
      or = Zi,
      ar = (e) => Xi(e) === Number && !Number.isNaN(e),
      lr = er,
      cr = (e) => Xi(e) === Boolean,
      ur = tr,
      hr = nr,
      dr = ir,
      pr = (e) =>
        null !== e &&
        "object" == typeof e &&
        1 === e.nodeType &&
        "object" == typeof e.style &&
        "object" == typeof e.ownerDocument,
      fr = (e) => Gi(e, Event),
      mr = (e) => Gi(e, KeyboardEvent),
      gr = (e) => Gi(e, TextTrack) || (!Qi(e) && er(e.kind)),
      yr = (e) => Gi(e, Promise) && tr(e.then),
      vr = (e) => {
        if (Gi(e, window.URL)) return !0;
        if (!er(e)) return !1;
        let t = e;
        (e.startsWith("http://") && e.startsWith("https://")) ||
          (t = `http://${e}`);
        try {
          return !rr(new URL(t).hostname);
        } catch (e) {
          return !1;
        }
      },
      br = rr;
    const wr = (() => {
      const e = document.createElement("span"),
        t = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        },
        n = Object.keys(t).find((t) => void 0 !== e.style[t]);
      return !!lr(n) && t[n];
    })();
    function _r(e, t) {
      setTimeout(() => {
        try {
          (e.hidden = !0), e.offsetHeight, (e.hidden = !1);
        } catch (e) {}
      }, t);
    }
    const kr = {
      isIE: Boolean(window.document.documentMode),
      isEdge: /Edge/g.test(navigator.userAgent),
      isWebkit:
        "WebkitAppearance" in document.documentElement.style &&
        !/Edge/g.test(navigator.userAgent),
      isIPhone:
        /iPhone|iPod/gi.test(navigator.userAgent) &&
        navigator.maxTouchPoints > 1,
      isIos:
        /iPad|iPhone|iPod/gi.test(navigator.userAgent) &&
        navigator.maxTouchPoints > 1,
    };
    function Tr(e, t) {
      return t.split(".").reduce((e, t) => e && e[t], e);
    }
    function Er(e = {}, ...t) {
      if (!t.length) return e;
      const n = t.shift();
      return or(n)
        ? (Object.keys(n).forEach((t) => {
            or(n[t])
              ? (Object.keys(e).includes(t) || Object.assign(e, { [t]: {} }),
                Er(e[t], n[t]))
              : Object.assign(e, { [t]: n[t] });
          }),
          Er(e, ...t))
        : e;
    }
    function Sr(e, t) {
      const n = e.length ? e : [e];
      Array.from(n)
        .reverse()
        .forEach((e, n) => {
          const i = n > 0 ? t.cloneNode(!0) : t,
            r = e.parentNode,
            s = e.nextSibling;
          i.appendChild(e), s ? r.insertBefore(i, s) : r.appendChild(i);
        });
    }
    function xr(e, t) {
      pr(e) &&
        !br(t) &&
        Object.entries(t)
          .filter(([, e]) => !sr(e))
          .forEach(([t, n]) => e.setAttribute(t, n));
    }
    function Cr(e, t, n) {
      const i = document.createElement(e);
      return or(t) && xr(i, t), lr(n) && (i.innerText = n), i;
    }
    function Ar(e, t, n, i) {
      pr(t) && t.appendChild(Cr(e, n, i));
    }
    function Pr(e) {
      dr(e) || hr(e)
        ? Array.from(e).forEach(Pr)
        : pr(e) && pr(e.parentNode) && e.parentNode.removeChild(e);
    }
    function Or(e) {
      if (!pr(e)) return;
      let { length: t } = e.childNodes;
      for (; t > 0; ) e.removeChild(e.lastChild), (t -= 1);
    }
    function Nr(e, t) {
      return pr(t) && pr(t.parentNode) && pr(e)
        ? (t.parentNode.replaceChild(e, t), e)
        : null;
    }
    function Lr(e, t) {
      if (!lr(e) || br(e)) return {};
      const n = {},
        i = Er({}, t);
      return (
        e.split(",").forEach((e) => {
          const t = e.trim(),
            r = t.replace(".", ""),
            s = t.replace(/[[\]]/g, "").split("="),
            [o] = s,
            a = s.length > 1 ? s[1].replace(/["']/g, "") : "";
          switch (t.charAt(0)) {
            case ".":
              lr(i.class) ? (n.class = `${i.class} ${r}`) : (n.class = r);
              break;
            case "#":
              n.id = t.replace("#", "");
              break;
            case "[":
              n[o] = a;
          }
        }),
        Er(i, n)
      );
    }
    function Mr(e, t) {
      if (!pr(e)) return;
      let n = t;
      cr(n) || (n = !e.hidden), (e.hidden = n);
    }
    function Ir(e, t, n) {
      if (dr(e)) return Array.from(e).map((e) => Ir(e, t, n));
      if (pr(e)) {
        let i = "toggle";
        return (
          void 0 !== n && (i = n ? "add" : "remove"),
          e.classList[i](t),
          e.classList.contains(t)
        );
      }
      return !1;
    }
    function jr(e, t) {
      return pr(e) && e.classList.contains(t);
    }
    function Rr(e, t) {
      const { prototype: n } = Element;
      return (
        n.matches ||
        n.webkitMatchesSelector ||
        n.mozMatchesSelector ||
        n.msMatchesSelector ||
        function () {
          return Array.from(document.querySelectorAll(t)).includes(this);
        }
      ).call(e, t);
    }
    function Dr(e) {
      return this.elements.container.querySelectorAll(e);
    }
    function qr(e) {
      return this.elements.container.querySelector(e);
    }
    function $r(e = null, t = !1) {
      pr(e) &&
        (e.focus({ preventScroll: !0 }),
        t && Ir(e, this.config.classNames.tabFocus));
    }
    const Ur = {
        "audio/ogg": "vorbis",
        "audio/wav": "1",
        "video/webm": "vp8, vorbis",
        "video/mp4": "avc1.42E01E, mp4a.40.2",
        "video/ogg": "theora",
      },
      Fr = {
        audio: "canPlayType" in document.createElement("audio"),
        video: "canPlayType" in document.createElement("video"),
        check(e, t, n) {
          const i = kr.isIPhone && n && Fr.playsinline,
            r = Fr[e] || "html5" !== t;
          return {
            api: r,
            ui: r && Fr.rangeInput && ("video" !== e || !kr.isIPhone || i),
          };
        },
        pip: !(
          kr.isIPhone ||
          (!ur(Cr("video").webkitSetPresentationMode) &&
            (!document.pictureInPictureEnabled ||
              Cr("video").disablePictureInPicture))
        ),
        airplay: ur(window.WebKitPlaybackTargetAvailabilityEvent),
        playsinline: "playsInline" in document.createElement("video"),
        mime(e) {
          if (br(e)) return !1;
          const [t] = e.split("/");
          let n = e;
          if (!this.isHTML5 || t !== this.type) return !1;
          Object.keys(Ur).includes(n) && (n += `; codecs="${Ur[e]}"`);
          try {
            return Boolean(n && this.media.canPlayType(n).replace(/no/, ""));
          } catch (e) {
            return !1;
          }
        },
        textTracks: "textTracks" in document.createElement("video"),
        rangeInput: (() => {
          const e = document.createElement("input");
          return (e.type = "range"), "range" === e.type;
        })(),
        touch: "ontouchstart" in document.documentElement,
        transitions: !1 !== wr,
        reducedMotion:
          "matchMedia" in window &&
          window.matchMedia("(prefers-reduced-motion)").matches,
      },
      Br = (() => {
        let e = !1;
        try {
          const t = Object.defineProperty({}, "passive", {
            get: () => ((e = !0), null),
          });
          window.addEventListener("test", null, t),
            window.removeEventListener("test", null, t);
        } catch (e) {}
        return e;
      })();
    function Hr(e, t, n, i = !1, r = !0, s = !1) {
      if (!e || !("addEventListener" in e) || br(t) || !ur(n)) return;
      const o = t.split(" ");
      let a = s;
      Br && (a = { passive: r, capture: s }),
        o.forEach((t) => {
          this &&
            this.eventListeners &&
            i &&
            this.eventListeners.push({
              element: e,
              type: t,
              callback: n,
              options: a,
            }),
            e[i ? "addEventListener" : "removeEventListener"](t, n, a);
        });
    }
    function Vr(e, t = "", n, i = !0, r = !1) {
      Hr.call(this, e, t, n, !0, i, r);
    }
    function zr(e, t = "", n, i = !0, r = !1) {
      Hr.call(this, e, t, n, !1, i, r);
    }
    function Wr(e, t = "", n, i = !0, r = !1) {
      const s = (...o) => {
        zr(e, t, s, i, r), n.apply(this, o);
      };
      Hr.call(this, e, t, s, !0, i, r);
    }
    function Kr(e, t = "", n = !1, i = {}) {
      if (!pr(e) || br(t)) return;
      const r = new CustomEvent(t, {
        bubbles: n,
        detail: { ...i, plyr: this },
      });
      e.dispatchEvent(r);
    }
    function Yr() {
      this &&
        this.eventListeners &&
        (this.eventListeners.forEach((e) => {
          const { element: t, type: n, callback: i, options: r } = e;
          t.removeEventListener(n, i, r);
        }),
        (this.eventListeners = []));
    }
    function Jr() {
      return new Promise((e) =>
        this.ready
          ? setTimeout(e, 0)
          : Vr.call(this, this.elements.container, "ready", e)
      ).then(() => {});
    }
    function Xr(e) {
      yr(e) && e.then(null, () => {});
    }
    function Gr(e) {
      return hr(e) ? e.filter((t, n) => e.indexOf(t) === n) : e;
    }
    function Qr(e, t) {
      return hr(e) && e.length
        ? e.reduce((e, n) => (Math.abs(n - t) < Math.abs(e - t) ? n : e))
        : null;
    }
    function Zr(e) {
      return !(!window || !window.CSS) && window.CSS.supports(e);
    }
    const es = [
      [1, 1],
      [4, 3],
      [3, 4],
      [5, 4],
      [4, 5],
      [3, 2],
      [2, 3],
      [16, 10],
      [10, 16],
      [16, 9],
      [9, 16],
      [21, 9],
      [9, 21],
      [32, 9],
      [9, 32],
    ].reduce((e, [t, n]) => ({ ...e, [t / n]: [t, n] }), {});
    function ts(e) {
      if (!(hr(e) || (lr(e) && e.includes(":")))) return !1;
      return (hr(e) ? e : e.split(":")).map(Number).every(ar);
    }
    function ns(e) {
      if (!hr(e) || !e.every(ar)) return null;
      const [t, n] = e,
        i = (e, t) => (0 === t ? e : i(t, e % t)),
        r = i(t, n);
      return [t / r, n / r];
    }
    function is(e) {
      const t = (e) => (ts(e) ? e.split(":").map(Number) : null);
      let n = t(e);
      if (
        (null === n && (n = t(this.config.ratio)),
        null === n &&
          !br(this.embed) &&
          hr(this.embed.ratio) &&
          ({ ratio: n } = this.embed),
        null === n && this.isHTML5)
      ) {
        const { videoWidth: e, videoHeight: t } = this.media;
        n = [e, t];
      }
      return ns(n);
    }
    function rs(e) {
      if (!this.isVideo) return {};
      const { wrapper: t } = this.elements,
        n = is.call(this, e);
      if (!hr(n)) return {};
      const [i, r] = ns(n),
        s = (100 / i) * r;
      if (
        (Zr(`aspect-ratio: ${i}/${r}`)
          ? (t.style.aspectRatio = `${i}/${r}`)
          : (t.style.paddingBottom = `${s}%`),
        this.isVimeo && !this.config.vimeo.premium && this.supported.ui)
      ) {
        const e =
            (100 / this.media.offsetWidth) *
            parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
          n = (e - s) / (e / 50);
        this.fullscreen.active
          ? (t.style.paddingBottom = null)
          : (this.media.style.transform = `translateY(-${n}%)`);
      } else
        this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);
      return { padding: s, ratio: n };
    }
    function ss(e, t, n = 0.05) {
      const i = e / t,
        r = Qr(Object.keys(es), i);
      return Math.abs(r - i) <= n ? es[r] : [e, t];
    }
    const os = {
      getSources() {
        if (!this.isHTML5) return [];
        return Array.from(this.media.querySelectorAll("source")).filter((e) => {
          const t = e.getAttribute("type");
          return !!br(t) || Fr.mime.call(this, t);
        });
      },
      getQualityOptions() {
        return this.config.quality.forced
          ? this.config.quality.options
          : os.getSources
              .call(this)
              .map((e) => Number(e.getAttribute("size")))
              .filter(Boolean);
      },
      setup() {
        if (!this.isHTML5) return;
        const e = this;
        (e.options.speed = e.config.speed.options),
          br(this.config.ratio) || rs.call(e),
          Object.defineProperty(e.media, "quality", {
            get() {
              const t = os.getSources
                .call(e)
                .find((t) => t.getAttribute("src") === e.source);
              return t && Number(t.getAttribute("size"));
            },
            set(t) {
              if (e.quality !== t) {
                if (e.config.quality.forced && ur(e.config.quality.onChange))
                  e.config.quality.onChange(t);
                else {
                  const n = os.getSources
                    .call(e)
                    .find((e) => Number(e.getAttribute("size")) === t);
                  if (!n) return;
                  const {
                    currentTime: i,
                    paused: r,
                    preload: s,
                    readyState: o,
                    playbackRate: a,
                  } = e.media;
                  (e.media.src = n.getAttribute("src")),
                    ("none" !== s || o) &&
                      (e.once("loadedmetadata", () => {
                        (e.speed = a), (e.currentTime = i), r || Xr(e.play());
                      }),
                      e.media.load());
                }
                Kr.call(e, e.media, "qualitychange", !1, { quality: t });
              }
            },
          });
      },
      cancelRequests() {
        this.isHTML5 &&
          (Pr(os.getSources.call(this)),
          this.media.setAttribute("src", this.config.blankVideo),
          this.media.load(),
          this.debug.log("Cancelled network requests"));
      },
    };
    function as(e, ...t) {
      return br(e)
        ? e
        : e.toString().replace(/{(\d+)}/g, (e, n) => t[n].toString());
    }
    const ls = (e = "", t = "", n = "") =>
        e.replace(
          new RegExp(
            t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"),
            "g"
          ),
          n.toString()
        ),
      cs = (e = "") =>
        e
          .toString()
          .replace(
            /\w\S*/g,
            (e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
          );
    function us(e = "") {
      let t = e.toString();
      return (
        (t = (function (e = "") {
          let t = e.toString();
          return (
            (t = ls(t, "-", " ")),
            (t = ls(t, "_", " ")),
            (t = cs(t)),
            ls(t, " ", "")
          );
        })(t)),
        t.charAt(0).toLowerCase() + t.slice(1)
      );
    }
    function hs(e) {
      const t = document.createElement("div");
      return t.appendChild(e), t.innerHTML;
    }
    const ds = {
        pip: "PIP",
        airplay: "AirPlay",
        html5: "HTML5",
        vimeo: "Vimeo",
        youtube: "YouTube",
      },
      ps = {
        get(e = "", t = {}) {
          if (br(e) || br(t)) return "";
          let n = Tr(t.i18n, e);
          if (br(n)) return Object.keys(ds).includes(e) ? ds[e] : "";
          const i = { "{seektime}": t.seekTime, "{title}": t.title };
          return (
            Object.entries(i).forEach(([e, t]) => {
              n = ls(n, e, t);
            }),
            n
          );
        },
      };
    class fs {
      constructor(e) {
        Ai(this, "get", (e) => {
          if (!fs.supported || !this.enabled) return null;
          const t = window.localStorage.getItem(this.key);
          if (br(t)) return null;
          const n = JSON.parse(t);
          return lr(e) && e.length ? n[e] : n;
        }),
          Ai(this, "set", (e) => {
            if (!fs.supported || !this.enabled) return;
            if (!or(e)) return;
            let t = this.get();
            br(t) && (t = {}), Er(t, e);
            try {
              window.localStorage.setItem(this.key, JSON.stringify(t));
            } catch (e) {}
          }),
          (this.enabled = e.config.storage.enabled),
          (this.key = e.config.storage.key);
      }
      static get supported() {
        try {
          if (!("localStorage" in window)) return !1;
          const e = "___test";
          return (
            window.localStorage.setItem(e, e),
            window.localStorage.removeItem(e),
            !0
          );
        } catch (e) {
          return !1;
        }
      }
    }
    function ms(e, t = "text") {
      return new Promise((n, i) => {
        try {
          const i = new XMLHttpRequest();
          if (!("withCredentials" in i)) return;
          i.addEventListener("load", () => {
            if ("text" === t)
              try {
                n(JSON.parse(i.responseText));
              } catch (e) {
                n(i.responseText);
              }
            else n(i.response);
          }),
            i.addEventListener("error", () => {
              throw new Error(i.status);
            }),
            i.open("GET", e, !0),
            (i.responseType = t),
            i.send();
        } catch (e) {
          i(e);
        }
      });
    }
    function gs(e, t) {
      if (!lr(e)) return;
      const n = lr(t);
      let i = !1;
      const r = () => null !== document.getElementById(t),
        s = (e, t) => {
          (e.innerHTML = t),
            (n && r()) || document.body.insertAdjacentElement("afterbegin", e);
        };
      if (!n || !r()) {
        const r = fs.supported,
          o = document.createElement("div");
        if ((o.setAttribute("hidden", ""), n && o.setAttribute("id", t), r)) {
          const e = window.localStorage.getItem(`cache-${t}`);
          if (((i = null !== e), i)) {
            const t = JSON.parse(e);
            s(o, t.content);
          }
        }
        ms(e)
          .then((e) => {
            if (!br(e)) {
              if (r)
                try {
                  window.localStorage.setItem(
                    `cache-${t}`,
                    JSON.stringify({ content: e })
                  );
                } catch (e) {}
              s(o, e);
            }
          })
          .catch(() => {});
      }
    }
    const ys = (e) => Math.trunc((e / 60 / 60) % 60, 10);
    function vs(e = 0, t = !1, n = !1) {
      if (!ar(e)) return vs(void 0, t, n);
      const i = (e) => `0${e}`.slice(-2);
      let r = ys(e);
      const s = ((o = e), Math.trunc((o / 60) % 60, 10));
      var o;
      const a = ((e) => Math.trunc(e % 60, 10))(e);
      return (
        (r = t || r > 0 ? `${r}:` : ""),
        `${n && e > 0 ? "-" : ""}${r}${i(s)}:${i(a)}`
      );
    }
    const bs = {
      getIconUrl() {
        const e = new URL(this.config.iconUrl, window.location),
          t = window.location.host
            ? window.location.host
            : window.top.location.host,
          n = e.host !== t || (kr.isIE && !window.svg4everybody);
        return { url: this.config.iconUrl, cors: n };
      },
      findElements() {
        try {
          return (
            (this.elements.controls = qr.call(
              this,
              this.config.selectors.controls.wrapper
            )),
            (this.elements.buttons = {
              play: Dr.call(this, this.config.selectors.buttons.play),
              pause: qr.call(this, this.config.selectors.buttons.pause),
              restart: qr.call(this, this.config.selectors.buttons.restart),
              rewind: qr.call(this, this.config.selectors.buttons.rewind),
              fastForward: qr.call(
                this,
                this.config.selectors.buttons.fastForward
              ),
              mute: qr.call(this, this.config.selectors.buttons.mute),
              pip: qr.call(this, this.config.selectors.buttons.pip),
              airplay: qr.call(this, this.config.selectors.buttons.airplay),
              settings: qr.call(this, this.config.selectors.buttons.settings),
              captions: qr.call(this, this.config.selectors.buttons.captions),
              fullscreen: qr.call(
                this,
                this.config.selectors.buttons.fullscreen
              ),
            }),
            (this.elements.progress = qr.call(
              this,
              this.config.selectors.progress
            )),
            (this.elements.inputs = {
              seek: qr.call(this, this.config.selectors.inputs.seek),
              volume: qr.call(this, this.config.selectors.inputs.volume),
            }),
            (this.elements.display = {
              buffer: qr.call(this, this.config.selectors.display.buffer),
              currentTime: qr.call(
                this,
                this.config.selectors.display.currentTime
              ),
              duration: qr.call(this, this.config.selectors.display.duration),
            }),
            pr(this.elements.progress) &&
              (this.elements.display.seekTooltip =
                this.elements.progress.querySelector(
                  `.${this.config.classNames.tooltip}`
                )),
            !0
          );
        } catch (e) {
          return (
            this.debug.warn(
              "It looks like there is a problem with your custom controls HTML",
              e
            ),
            this.toggleNativeControls(!0),
            !1
          );
        }
      },
      createIcon(e, t) {
        const n = "http://www.w3.org/2000/svg",
          i = bs.getIconUrl.call(this),
          r = `${i.cors ? "" : i.url}#${this.config.iconPrefix}`,
          s = document.createElementNS(n, "svg");
        xr(s, Er(t, { "aria-hidden": "true", focusable: "false" }));
        const o = document.createElementNS(n, "use"),
          a = `${r}-${e}`;
        return (
          "href" in o &&
            o.setAttributeNS("http://www.w3.org/1999/xlink", "href", a),
          o.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a),
          s.appendChild(o),
          s
        );
      },
      createLabel(e, t = {}) {
        const n = ps.get(e, this.config);
        return Cr(
          "span",
          {
            ...t,
            class: [t.class, this.config.classNames.hidden]
              .filter(Boolean)
              .join(" "),
          },
          n
        );
      },
      createBadge(e) {
        if (br(e)) return null;
        const t = Cr("span", { class: this.config.classNames.menu.value });
        return (
          t.appendChild(
            Cr("span", { class: this.config.classNames.menu.badge }, e)
          ),
          t
        );
      },
      createButton(e, t) {
        const n = Er({}, t);
        let i = us(e);
        const r = {
          element: "button",
          toggle: !1,
          label: null,
          icon: null,
          labelPressed: null,
          iconPressed: null,
        };
        switch (
          (["element", "icon", "label"].forEach((e) => {
            Object.keys(n).includes(e) && ((r[e] = n[e]), delete n[e]);
          }),
          "button" !== r.element ||
            Object.keys(n).includes("type") ||
            (n.type = "button"),
          Object.keys(n).includes("class")
            ? n.class
                .split(" ")
                .some((e) => e === this.config.classNames.control) ||
              Er(n, { class: `${n.class} ${this.config.classNames.control}` })
            : (n.class = this.config.classNames.control),
          e)
        ) {
          case "play":
            (r.toggle = !0),
              (r.label = "play"),
              (r.labelPressed = "pause"),
              (r.icon = "play"),
              (r.iconPressed = "pause");
            break;
          case "mute":
            (r.toggle = !0),
              (r.label = "mute"),
              (r.labelPressed = "unmute"),
              (r.icon = "volume"),
              (r.iconPressed = "muted");
            break;
          case "captions":
            (r.toggle = !0),
              (r.label = "enableCaptions"),
              (r.labelPressed = "disableCaptions"),
              (r.icon = "captions-off"),
              (r.iconPressed = "captions-on");
            break;
          case "fullscreen":
            (r.toggle = !0),
              (r.label = "enterFullscreen"),
              (r.labelPressed = "exitFullscreen"),
              (r.icon = "enter-fullscreen"),
              (r.iconPressed = "exit-fullscreen");
            break;
          case "play-large":
            (n.class += ` ${this.config.classNames.control}--overlaid`),
              (i = "play"),
              (r.label = "play"),
              (r.icon = "play");
            break;
          default:
            br(r.label) && (r.label = i), br(r.icon) && (r.icon = e);
        }
        const s = Cr(r.element);
        return (
          r.toggle
            ? (s.appendChild(
                bs.createIcon.call(this, r.iconPressed, {
                  class: "icon--pressed",
                })
              ),
              s.appendChild(
                bs.createIcon.call(this, r.icon, { class: "icon--not-pressed" })
              ),
              s.appendChild(
                bs.createLabel.call(this, r.labelPressed, {
                  class: "label--pressed",
                })
              ),
              s.appendChild(
                bs.createLabel.call(this, r.label, {
                  class: "label--not-pressed",
                })
              ))
            : (s.appendChild(bs.createIcon.call(this, r.icon)),
              s.appendChild(bs.createLabel.call(this, r.label))),
          Er(n, Lr(this.config.selectors.buttons[i], n)),
          xr(s, n),
          "play" === i
            ? (hr(this.elements.buttons[i]) || (this.elements.buttons[i] = []),
              this.elements.buttons[i].push(s))
            : (this.elements.buttons[i] = s),
          s
        );
      },
      createRange(e, t) {
        const n = Cr(
          "input",
          Er(
            Lr(this.config.selectors.inputs[e]),
            {
              type: "range",
              min: 0,
              max: 100,
              step: 0.01,
              value: 0,
              autocomplete: "off",
              role: "slider",
              "aria-label": ps.get(e, this.config),
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": 0,
            },
            t
          )
        );
        return (
          (this.elements.inputs[e] = n),
          bs.updateRangeFill.call(this, n),
          Ji.setup(n),
          n
        );
      },
      createProgress(e, t) {
        const n = Cr(
          "progress",
          Er(
            Lr(this.config.selectors.display[e]),
            {
              min: 0,
              max: 100,
              value: 0,
              role: "progressbar",
              "aria-hidden": !0,
            },
            t
          )
        );
        if ("volume" !== e) {
          n.appendChild(Cr("span", null, "0"));
          const t = { played: "played", buffer: "buffered" }[e],
            i = t ? ps.get(t, this.config) : "";
          n.innerText = `% ${i.toLowerCase()}`;
        }
        return (this.elements.display[e] = n), n;
      },
      createTime(e, t) {
        const n = Lr(this.config.selectors.display[e], t),
          i = Cr(
            "div",
            Er(n, {
              class: `${n.class ? n.class : ""} ${
                this.config.classNames.display.time
              } `.trim(),
              "aria-label": ps.get(e, this.config),
            }),
            "00:00"
          );
        return (this.elements.display[e] = i), i;
      },
      bindMenuItemShortcuts(e, t) {
        Vr.call(
          this,
          e,
          "keydown keyup",
          (n) => {
            if (
              !["Space", "ArrowUp", "ArrowDown", "ArrowRight"].includes(n.key)
            )
              return;
            if ((n.preventDefault(), n.stopPropagation(), "keydown" === n.type))
              return;
            const i = Rr(e, '[role="menuitemradio"]');
            if (!i && ["Space", "ArrowRight"].includes(n.key))
              bs.showMenuPanel.call(this, t, !0);
            else {
              let t;
              "Space" !== n.key &&
                ("ArrowDown" === n.key || (i && "ArrowRight" === n.key)
                  ? ((t = e.nextElementSibling),
                    pr(t) || (t = e.parentNode.firstElementChild))
                  : ((t = e.previousElementSibling),
                    pr(t) || (t = e.parentNode.lastElementChild)),
                $r.call(this, t, !0));
            }
          },
          !1
        ),
          Vr.call(this, e, "keyup", (e) => {
            "Return" === e.key && bs.focusFirstMenuItem.call(this, null, !0);
          });
      },
      createMenuItem({
        value: e,
        list: t,
        type: n,
        title: i,
        badge: r = null,
        checked: s = !1,
      }) {
        const o = Lr(this.config.selectors.inputs[n]),
          a = Cr(
            "button",
            Er(o, {
              type: "button",
              role: "menuitemradio",
              class: `${this.config.classNames.control} ${
                o.class ? o.class : ""
              }`.trim(),
              "aria-checked": s,
              value: e,
            })
          ),
          l = Cr("span");
        (l.innerHTML = i),
          pr(r) && l.appendChild(r),
          a.appendChild(l),
          Object.defineProperty(a, "checked", {
            enumerable: !0,
            get: () => "true" === a.getAttribute("aria-checked"),
            set(e) {
              e &&
                Array.from(a.parentNode.children)
                  .filter((e) => Rr(e, '[role="menuitemradio"]'))
                  .forEach((e) => e.setAttribute("aria-checked", "false")),
                a.setAttribute("aria-checked", e ? "true" : "false");
            },
          }),
          this.listeners.bind(
            a,
            "click keyup",
            (t) => {
              if (!mr(t) || "Space" === t.key) {
                switch (
                  (t.preventDefault(), t.stopPropagation(), (a.checked = !0), n)
                ) {
                  case "language":
                    this.currentTrack = Number(e);
                    break;
                  case "quality":
                    this.quality = e;
                    break;
                  case "speed":
                    this.speed = parseFloat(e);
                }
                bs.showMenuPanel.call(this, "home", mr(t));
              }
            },
            n,
            !1
          ),
          bs.bindMenuItemShortcuts.call(this, a, n),
          t.appendChild(a);
      },
      formatTime(e = 0, t = !1) {
        if (!ar(e)) return e;
        return vs(e, ys(this.duration) > 0, t);
      },
      updateTimeDisplay(e = null, t = 0, n = !1) {
        pr(e) && ar(t) && (e.innerText = bs.formatTime(t, n));
      },
      updateVolume() {
        this.supported.ui &&
          (pr(this.elements.inputs.volume) &&
            bs.setRange.call(
              this,
              this.elements.inputs.volume,
              this.muted ? 0 : this.volume
            ),
          pr(this.elements.buttons.mute) &&
            (this.elements.buttons.mute.pressed =
              this.muted || 0 === this.volume));
      },
      setRange(e, t = 0) {
        pr(e) && ((e.value = t), bs.updateRangeFill.call(this, e));
      },
      updateProgress(e) {
        if (!this.supported.ui || !fr(e)) return;
        let t = 0;
        const n = (e, t) => {
          const n = ar(t) ? t : 0,
            i = pr(e) ? e : this.elements.display.buffer;
          if (pr(i)) {
            i.value = n;
            const e = i.getElementsByTagName("span")[0];
            pr(e) && (e.childNodes[0].nodeValue = n);
          }
        };
        if (e)
          switch (e.type) {
            case "timeupdate":
            case "seeking":
            case "seeked":
              (i = this.currentTime),
                (r = this.duration),
                (t =
                  0 === i || 0 === r || Number.isNaN(i) || Number.isNaN(r)
                    ? 0
                    : ((i / r) * 100).toFixed(2)),
                "timeupdate" === e.type &&
                  bs.setRange.call(this, this.elements.inputs.seek, t);
              break;
            case "playing":
            case "progress":
              n(this.elements.display.buffer, 100 * this.buffered);
          }
        var i, r;
      },
      updateRangeFill(e) {
        const t = fr(e) ? e.target : e;
        if (pr(t) && "range" === t.getAttribute("type")) {
          if (Rr(t, this.config.selectors.inputs.seek)) {
            t.setAttribute("aria-valuenow", this.currentTime);
            const e = bs.formatTime(this.currentTime),
              n = bs.formatTime(this.duration),
              i = ps.get("seekLabel", this.config);
            t.setAttribute(
              "aria-valuetext",
              i.replace("{currentTime}", e).replace("{duration}", n)
            );
          } else if (Rr(t, this.config.selectors.inputs.volume)) {
            const e = 100 * t.value;
            t.setAttribute("aria-valuenow", e),
              t.setAttribute("aria-valuetext", `${e.toFixed(1)}%`);
          } else t.setAttribute("aria-valuenow", t.value);
          kr.isWebkit &&
            t.style.setProperty("--value", (t.value / t.max) * 100 + "%");
        }
      },
      updateSeekTooltip(e) {
        var t, n;
        if (
          !this.config.tooltips.seek ||
          !pr(this.elements.inputs.seek) ||
          !pr(this.elements.display.seekTooltip) ||
          0 === this.duration
        )
          return;
        const i = this.elements.display.seekTooltip,
          r = `${this.config.classNames.tooltip}--visible`,
          s = (e) => Ir(i, r, e);
        if (this.touch) return void s(!1);
        let o = 0;
        const a = this.elements.progress.getBoundingClientRect();
        if (fr(e)) o = (100 / a.width) * (e.pageX - a.left);
        else {
          if (!jr(i, r)) return;
          o = parseFloat(i.style.left, 10);
        }
        o < 0 ? (o = 0) : o > 100 && (o = 100);
        const l = (this.duration / 100) * o;
        i.innerText = bs.formatTime(l);
        const c =
          null === (t = this.config.markers) ||
          void 0 === t ||
          null === (n = t.points) ||
          void 0 === n
            ? void 0
            : n.find(({ time: e }) => e === Math.round(l));
        c && i.insertAdjacentHTML("afterbegin", `${c.label}<br>`),
          (i.style.left = `${o}%`),
          fr(e) &&
            ["mouseenter", "mouseleave"].includes(e.type) &&
            s("mouseenter" === e.type);
      },
      timeUpdate(e) {
        const t = !pr(this.elements.display.duration) && this.config.invertTime;
        bs.updateTimeDisplay.call(
          this,
          this.elements.display.currentTime,
          t ? this.duration - this.currentTime : this.currentTime,
          t
        ),
          (e && "timeupdate" === e.type && this.media.seeking) ||
            bs.updateProgress.call(this, e);
      },
      durationUpdate() {
        if (!this.supported.ui || (!this.config.invertTime && this.currentTime))
          return;
        if (this.duration >= 2 ** 32)
          return (
            Mr(this.elements.display.currentTime, !0),
            void Mr(this.elements.progress, !0)
          );
        pr(this.elements.inputs.seek) &&
          this.elements.inputs.seek.setAttribute(
            "aria-valuemax",
            this.duration
          );
        const e = pr(this.elements.display.duration);
        !e &&
          this.config.displayDuration &&
          this.paused &&
          bs.updateTimeDisplay.call(
            this,
            this.elements.display.currentTime,
            this.duration
          ),
          e &&
            bs.updateTimeDisplay.call(
              this,
              this.elements.display.duration,
              this.duration
            ),
          this.config.markers.enabled && bs.setMarkers.call(this),
          bs.updateSeekTooltip.call(this);
      },
      toggleMenuButton(e, t) {
        Mr(this.elements.settings.buttons[e], !t);
      },
      updateSetting(e, t, n) {
        const i = this.elements.settings.panels[e];
        let r = null,
          s = t;
        if ("captions" === e) r = this.currentTrack;
        else {
          if (
            ((r = br(n) ? this[e] : n),
            br(r) && (r = this.config[e].default),
            !br(this.options[e]) && !this.options[e].includes(r))
          )
            return void this.debug.warn(`Unsupported value of '${r}' for ${e}`);
          if (!this.config[e].options.includes(r))
            return void this.debug.warn(`Disabled value of '${r}' for ${e}`);
        }
        if ((pr(s) || (s = i && i.querySelector('[role="menu"]')), !pr(s)))
          return;
        this.elements.settings.buttons[e].querySelector(
          `.${this.config.classNames.menu.value}`
        ).innerHTML = bs.getLabel.call(this, e, r);
        const o = s && s.querySelector(`[value="${r}"]`);
        pr(o) && (o.checked = !0);
      },
      getLabel(e, t) {
        switch (e) {
          case "speed":
            return 1 === t ? ps.get("normal", this.config) : `${t}&times;`;
          case "quality":
            if (ar(t)) {
              const e = ps.get(`qualityLabel.${t}`, this.config);
              return e.length ? e : `${t}p`;
            }
            return cs(t);
          case "captions":
            return ks.getLabel.call(this);
          default:
            return null;
        }
      },
      setQualityMenu(e) {
        if (!pr(this.elements.settings.panels.quality)) return;
        const t = "quality",
          n =
            this.elements.settings.panels.quality.querySelector(
              '[role="menu"]'
            );
        hr(e) &&
          (this.options.quality = Gr(e).filter((e) =>
            this.config.quality.options.includes(e)
          ));
        const i = !br(this.options.quality) && this.options.quality.length > 1;
        if (
          (bs.toggleMenuButton.call(this, t, i),
          Or(n),
          bs.checkMenu.call(this),
          !i)
        )
          return;
        const r = (e) => {
          const t = ps.get(`qualityBadge.${e}`, this.config);
          return t.length ? bs.createBadge.call(this, t) : null;
        };
        this.options.quality
          .sort((e, t) => {
            const n = this.config.quality.options;
            return n.indexOf(e) > n.indexOf(t) ? 1 : -1;
          })
          .forEach((e) => {
            bs.createMenuItem.call(this, {
              value: e,
              list: n,
              type: t,
              title: bs.getLabel.call(this, "quality", e),
              badge: r(e),
            });
          }),
          bs.updateSetting.call(this, t, n);
      },
      setCaptionsMenu() {
        if (!pr(this.elements.settings.panels.captions)) return;
        const e = "captions",
          t =
            this.elements.settings.panels.captions.querySelector(
              '[role="menu"]'
            ),
          n = ks.getTracks.call(this),
          i = Boolean(n.length);
        if (
          (bs.toggleMenuButton.call(this, e, i),
          Or(t),
          bs.checkMenu.call(this),
          !i)
        )
          return;
        const r = n.map((e, n) => ({
          value: n,
          checked: this.captions.toggled && this.currentTrack === n,
          title: ks.getLabel.call(this, e),
          badge:
            e.language && bs.createBadge.call(this, e.language.toUpperCase()),
          list: t,
          type: "language",
        }));
        r.unshift({
          value: -1,
          checked: !this.captions.toggled,
          title: ps.get("disabled", this.config),
          list: t,
          type: "language",
        }),
          r.forEach(bs.createMenuItem.bind(this)),
          bs.updateSetting.call(this, e, t);
      },
      setSpeedMenu() {
        if (!pr(this.elements.settings.panels.speed)) return;
        const e = "speed",
          t =
            this.elements.settings.panels.speed.querySelector('[role="menu"]');
        this.options.speed = this.options.speed.filter(
          (e) => e >= this.minimumSpeed && e <= this.maximumSpeed
        );
        const n = !br(this.options.speed) && this.options.speed.length > 1;
        bs.toggleMenuButton.call(this, e, n),
          Or(t),
          bs.checkMenu.call(this),
          n &&
            (this.options.speed.forEach((n) => {
              bs.createMenuItem.call(this, {
                value: n,
                list: t,
                type: e,
                title: bs.getLabel.call(this, "speed", n),
              });
            }),
            bs.updateSetting.call(this, e, t));
      },
      checkMenu() {
        const { buttons: e } = this.elements.settings,
          t = !br(e) && Object.values(e).some((e) => !e.hidden);
        Mr(this.elements.settings.menu, !t);
      },
      focusFirstMenuItem(e, t = !1) {
        if (this.elements.settings.popup.hidden) return;
        let n = e;
        pr(n) ||
          (n = Object.values(this.elements.settings.panels).find(
            (e) => !e.hidden
          ));
        const i = n.querySelector('[role^="menuitem"]');
        $r.call(this, i, t);
      },
      toggleMenu(e) {
        const { popup: t } = this.elements.settings,
          n = this.elements.buttons.settings;
        if (!pr(t) || !pr(n)) return;
        const { hidden: i } = t;
        let r = i;
        if (cr(e)) r = e;
        else if (mr(e) && "Escape" === e.key) r = !1;
        else if (fr(e)) {
          const i = ur(e.composedPath) ? e.composedPath()[0] : e.target,
            s = t.contains(i);
          if (s || (!s && e.target !== n && r)) return;
        }
        n.setAttribute("aria-expanded", r),
          Mr(t, !r),
          Ir(this.elements.container, this.config.classNames.menu.open, r),
          r && mr(e)
            ? bs.focusFirstMenuItem.call(this, null, !0)
            : r || i || $r.call(this, n, mr(e));
      },
      getMenuSize(e) {
        const t = e.cloneNode(!0);
        (t.style.position = "absolute"),
          (t.style.opacity = 0),
          t.removeAttribute("hidden"),
          e.parentNode.appendChild(t);
        const n = t.scrollWidth,
          i = t.scrollHeight;
        return Pr(t), { width: n, height: i };
      },
      showMenuPanel(e = "", t = !1) {
        const n = this.elements.container.querySelector(
          `#plyr-settings-${this.id}-${e}`
        );
        if (!pr(n)) return;
        const i = n.parentNode,
          r = Array.from(i.children).find((e) => !e.hidden);
        if (Fr.transitions && !Fr.reducedMotion) {
          (i.style.width = `${r.scrollWidth}px`),
            (i.style.height = `${r.scrollHeight}px`);
          const e = bs.getMenuSize.call(this, n),
            t = (e) => {
              e.target === i &&
                ["width", "height"].includes(e.propertyName) &&
                ((i.style.width = ""),
                (i.style.height = ""),
                zr.call(this, i, wr, t));
            };
          Vr.call(this, i, wr, t),
            (i.style.width = `${e.width}px`),
            (i.style.height = `${e.height}px`);
        }
        Mr(r, !0), Mr(n, !1), bs.focusFirstMenuItem.call(this, n, t);
      },
      setDownloadUrl() {
        const e = this.elements.buttons.download;
        pr(e) && e.setAttribute("href", this.download);
      },
      create(e) {
        const {
          bindMenuItemShortcuts: t,
          createButton: n,
          createProgress: i,
          createRange: r,
          createTime: s,
          setQualityMenu: o,
          setSpeedMenu: a,
          showMenuPanel: l,
        } = bs;
        (this.elements.controls = null),
          hr(this.config.controls) &&
            this.config.controls.includes("play-large") &&
            this.elements.container.appendChild(n.call(this, "play-large"));
        const c = Cr("div", Lr(this.config.selectors.controls.wrapper));
        this.elements.controls = c;
        const u = { class: "plyr__controls__item" };
        return (
          Gr(hr(this.config.controls) ? this.config.controls : []).forEach(
            (o) => {
              if (
                ("restart" === o && c.appendChild(n.call(this, "restart", u)),
                "rewind" === o && c.appendChild(n.call(this, "rewind", u)),
                "play" === o && c.appendChild(n.call(this, "play", u)),
                "fast-forward" === o &&
                  c.appendChild(n.call(this, "fast-forward", u)),
                "progress" === o)
              ) {
                const t = Cr("div", {
                    class: `${u.class} plyr__progress__container`,
                  }),
                  n = Cr("div", Lr(this.config.selectors.progress));
                if (
                  (n.appendChild(
                    r.call(this, "seek", { id: `plyr-seek-${e.id}` })
                  ),
                  n.appendChild(i.call(this, "buffer")),
                  this.config.tooltips.seek)
                ) {
                  const e = Cr(
                    "span",
                    { class: this.config.classNames.tooltip },
                    "00:00"
                  );
                  n.appendChild(e), (this.elements.display.seekTooltip = e);
                }
                (this.elements.progress = n),
                  t.appendChild(this.elements.progress),
                  c.appendChild(t);
              }
              if (
                ("current-time" === o &&
                  c.appendChild(s.call(this, "currentTime", u)),
                "duration" === o && c.appendChild(s.call(this, "duration", u)),
                "mute" === o || "volume" === o)
              ) {
                let { volume: t } = this.elements;
                if (
                  ((pr(t) && c.contains(t)) ||
                    ((t = Cr(
                      "div",
                      Er({}, u, { class: `${u.class} plyr__volume`.trim() })
                    )),
                    (this.elements.volume = t),
                    c.appendChild(t)),
                  "mute" === o && t.appendChild(n.call(this, "mute")),
                  "volume" === o && !kr.isIos)
                ) {
                  const n = { max: 1, step: 0.05, value: this.config.volume };
                  t.appendChild(
                    r.call(this, "volume", Er(n, { id: `plyr-volume-${e.id}` }))
                  );
                }
              }
              if (
                ("captions" === o && c.appendChild(n.call(this, "captions", u)),
                "settings" === o && !br(this.config.settings))
              ) {
                const i = Cr(
                  "div",
                  Er({}, u, {
                    class: `${u.class} plyr__menu`.trim(),
                    hidden: "",
                  })
                );
                i.appendChild(
                  n.call(this, "settings", {
                    "aria-haspopup": !0,
                    "aria-controls": `plyr-settings-${e.id}`,
                    "aria-expanded": !1,
                  })
                );
                const r = Cr("div", {
                    class: "plyr__menu__container",
                    id: `plyr-settings-${e.id}`,
                    hidden: "",
                  }),
                  s = Cr("div"),
                  o = Cr("div", { id: `plyr-settings-${e.id}-home` }),
                  a = Cr("div", { role: "menu" });
                o.appendChild(a),
                  s.appendChild(o),
                  (this.elements.settings.panels.home = o),
                  this.config.settings.forEach((n) => {
                    const i = Cr(
                      "button",
                      Er(Lr(this.config.selectors.buttons.settings), {
                        type: "button",
                        class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
                        role: "menuitem",
                        "aria-haspopup": !0,
                        hidden: "",
                      })
                    );
                    t.call(this, i, n),
                      Vr.call(this, i, "click", () => {
                        l.call(this, n, !1);
                      });
                    const r = Cr("span", null, ps.get(n, this.config)),
                      o = Cr("span", {
                        class: this.config.classNames.menu.value,
                      });
                    (o.innerHTML = e[n]),
                      r.appendChild(o),
                      i.appendChild(r),
                      a.appendChild(i);
                    const c = Cr("div", {
                        id: `plyr-settings-${e.id}-${n}`,
                        hidden: "",
                      }),
                      u = Cr("button", {
                        type: "button",
                        class: `${this.config.classNames.control} ${this.config.classNames.control}--back`,
                      });
                    u.appendChild(
                      Cr("span", { "aria-hidden": !0 }, ps.get(n, this.config))
                    ),
                      u.appendChild(
                        Cr(
                          "span",
                          { class: this.config.classNames.hidden },
                          ps.get("menuBack", this.config)
                        )
                      ),
                      Vr.call(
                        this,
                        c,
                        "keydown",
                        (e) => {
                          "ArrowLeft" === e.key &&
                            (e.preventDefault(),
                            e.stopPropagation(),
                            l.call(this, "home", !0));
                        },
                        !1
                      ),
                      Vr.call(this, u, "click", () => {
                        l.call(this, "home", !1);
                      }),
                      c.appendChild(u),
                      c.appendChild(Cr("div", { role: "menu" })),
                      s.appendChild(c),
                      (this.elements.settings.buttons[n] = i),
                      (this.elements.settings.panels[n] = c);
                  }),
                  r.appendChild(s),
                  i.appendChild(r),
                  c.appendChild(i),
                  (this.elements.settings.popup = r),
                  (this.elements.settings.menu = i);
              }
              if (
                ("pip" === o && Fr.pip && c.appendChild(n.call(this, "pip", u)),
                "airplay" === o &&
                  Fr.airplay &&
                  c.appendChild(n.call(this, "airplay", u)),
                "download" === o)
              ) {
                const e = Er({}, u, {
                  element: "a",
                  href: this.download,
                  target: "_blank",
                });
                this.isHTML5 && (e.download = "");
                const { download: t } = this.config.urls;
                !vr(t) &&
                  this.isEmbed &&
                  Er(e, {
                    icon: `logo-${this.provider}`,
                    label: this.provider,
                  }),
                  c.appendChild(n.call(this, "download", e));
              }
              "fullscreen" === o &&
                c.appendChild(n.call(this, "fullscreen", u));
            }
          ),
          this.isHTML5 && o.call(this, os.getQualityOptions.call(this)),
          a.call(this),
          c
        );
      },
      inject() {
        if (this.config.loadSprite) {
          const e = bs.getIconUrl.call(this);
          e.cors && gs(e.url, "sprite-plyr");
        }
        this.id = Math.floor(1e4 * Math.random());
        let e = null;
        this.elements.controls = null;
        const t = {
          id: this.id,
          seektime: this.config.seekTime,
          title: this.config.title,
        };
        let n = !0;
        ur(this.config.controls) &&
          (this.config.controls = this.config.controls.call(this, t)),
          this.config.controls || (this.config.controls = []),
          pr(this.config.controls) || lr(this.config.controls)
            ? (e = this.config.controls)
            : ((e = bs.create.call(this, {
                id: this.id,
                seektime: this.config.seekTime,
                speed: this.speed,
                quality: this.quality,
                captions: ks.getLabel.call(this),
              })),
              (n = !1));
        let i;
        n &&
          lr(this.config.controls) &&
          (e = ((e) => {
            let n = e;
            return (
              Object.entries(t).forEach(([e, t]) => {
                n = ls(n, `{${e}}`, t);
              }),
              n
            );
          })(e)),
          lr(this.config.selectors.controls.container) &&
            (i = document.querySelector(
              this.config.selectors.controls.container
            )),
          pr(i) || (i = this.elements.container);
        if (
          (i[pr(e) ? "insertAdjacentElement" : "insertAdjacentHTML"](
            "afterbegin",
            e
          ),
          pr(this.elements.controls) || bs.findElements.call(this),
          !br(this.elements.buttons))
        ) {
          const e = (e) => {
            const t = this.config.classNames.controlPressed;
            e.setAttribute("aria-pressed", "false"),
              Object.defineProperty(e, "pressed", {
                configurable: !0,
                enumerable: !0,
                get: () => jr(e, t),
                set(n = !1) {
                  Ir(e, t, n),
                    e.setAttribute("aria-pressed", n ? "true" : "false");
                },
              });
          };
          Object.values(this.elements.buttons)
            .filter(Boolean)
            .forEach((t) => {
              hr(t) || dr(t) ? Array.from(t).filter(Boolean).forEach(e) : e(t);
            });
        }
        if ((kr.isEdge && _r(i), this.config.tooltips.controls)) {
          const { classNames: e, selectors: t } = this.config,
            n = `${t.controls.wrapper} ${t.labels} .${e.hidden}`,
            i = Dr.call(this, n);
          Array.from(i).forEach((e) => {
            Ir(e, this.config.classNames.hidden, !1),
              Ir(e, this.config.classNames.tooltip, !0);
          });
        }
      },
      setMediaMetadata() {
        try {
          "mediaSession" in navigator &&
            (navigator.mediaSession.metadata = new window.MediaMetadata({
              title: this.config.mediaMetadata.title,
              artist: this.config.mediaMetadata.artist,
              album: this.config.mediaMetadata.album,
              artwork: this.config.mediaMetadata.artwork,
            }));
        } catch (e) {}
      },
      setMarkers() {
        var e, t;
        if (!this.duration || this.elements.markers) return;
        const n =
          null === (e = this.config.markers) ||
          void 0 === e ||
          null === (t = e.points) ||
          void 0 === t
            ? void 0
            : t.filter(({ time: e }) => e > 0 && e < this.duration);
        if (null == n || !n.length) return;
        const i = document.createDocumentFragment(),
          r = document.createDocumentFragment();
        let s = null;
        const o = `${this.config.classNames.tooltip}--visible`,
          a = (e) => Ir(s, o, e);
        n.forEach((e) => {
          const t = Cr("span", { class: this.config.classNames.marker }, ""),
            n = (e.time / this.duration) * 100 + "%";
          s &&
            (t.addEventListener("mouseenter", () => {
              e.label || ((s.style.left = n), (s.innerHTML = e.label), a(!0));
            }),
            t.addEventListener("mouseleave", () => {
              a(!1);
            })),
            t.addEventListener("click", () => {
              this.currentTime = e.time;
            }),
            (t.style.left = n),
            r.appendChild(t);
        }),
          i.appendChild(r),
          this.config.tooltips.seek ||
            ((s = Cr("span", { class: this.config.classNames.tooltip }, "")),
            i.appendChild(s)),
          (this.elements.markers = { points: r, tip: s }),
          this.elements.progress.appendChild(i);
      },
    };
    function ws(e, t = !0) {
      let n = e;
      if (t) {
        const e = document.createElement("a");
        (e.href = n), (n = e.href);
      }
      try {
        return new URL(n);
      } catch (e) {
        return null;
      }
    }
    function _s(e) {
      const t = new URLSearchParams();
      return (
        or(e) &&
          Object.entries(e).forEach(([e, n]) => {
            t.set(e, n);
          }),
        t
      );
    }
    const ks = {
        setup() {
          if (!this.supported.ui) return;
          if (
            !this.isVideo ||
            this.isYouTube ||
            (this.isHTML5 && !Fr.textTracks)
          )
            return void (
              hr(this.config.controls) &&
              this.config.controls.includes("settings") &&
              this.config.settings.includes("captions") &&
              bs.setCaptionsMenu.call(this)
            );
          var e, t;
          if (
            (pr(this.elements.captions) ||
              ((this.elements.captions = Cr(
                "div",
                Lr(this.config.selectors.captions)
              )),
              this.elements.captions.setAttribute("dir", "auto"),
              (e = this.elements.captions),
              (t = this.elements.wrapper),
              pr(e) && pr(t) && t.parentNode.insertBefore(e, t.nextSibling)),
            kr.isIE && window.URL)
          ) {
            const e = this.media.querySelectorAll("track");
            Array.from(e).forEach((e) => {
              const t = e.getAttribute("src"),
                n = ws(t);
              null !== n &&
                n.hostname !== window.location.href.hostname &&
                ["http:", "https:"].includes(n.protocol) &&
                ms(t, "blob")
                  .then((t) => {
                    e.setAttribute("src", window.URL.createObjectURL(t));
                  })
                  .catch(() => {
                    Pr(e);
                  });
            });
          }
          const n = Gr(
            (
              navigator.languages || [
                navigator.language || navigator.userLanguage || "en",
              ]
            ).map((e) => e.split("-")[0])
          );
          let i = (
            this.storage.get("language") ||
            this.config.captions.language ||
            "auto"
          ).toLowerCase();
          "auto" === i && ([i] = n);
          let r = this.storage.get("captions");
          if (
            (cr(r) || ({ active: r } = this.config.captions),
            Object.assign(this.captions, {
              toggled: !1,
              active: r,
              language: i,
              languages: n,
            }),
            this.isHTML5)
          ) {
            const e = this.config.captions.update
              ? "addtrack removetrack"
              : "removetrack";
            Vr.call(this, this.media.textTracks, e, ks.update.bind(this));
          }
          setTimeout(ks.update.bind(this), 0);
        },
        update() {
          const e = ks.getTracks.call(this, !0),
            {
              active: t,
              language: n,
              meta: i,
              currentTrackNode: r,
            } = this.captions,
            s = Boolean(e.find((e) => e.language === n));
          this.isHTML5 &&
            this.isVideo &&
            e
              .filter((e) => !i.get(e))
              .forEach((e) => {
                this.debug.log("Track added", e),
                  i.set(e, { default: "showing" === e.mode }),
                  "showing" === e.mode && (e.mode = "hidden"),
                  Vr.call(this, e, "cuechange", () => ks.updateCues.call(this));
              }),
            ((s && this.language !== n) || !e.includes(r)) &&
              (ks.setLanguage.call(this, n), ks.toggle.call(this, t && s)),
            this.elements &&
              Ir(
                this.elements.container,
                this.config.classNames.captions.enabled,
                !br(e)
              ),
            hr(this.config.controls) &&
              this.config.controls.includes("settings") &&
              this.config.settings.includes("captions") &&
              bs.setCaptionsMenu.call(this);
        },
        toggle(e, t = !0) {
          if (!this.supported.ui) return;
          const { toggled: n } = this.captions,
            i = this.config.classNames.captions.active,
            r = sr(e) ? !n : e;
          if (r !== n) {
            if (
              (t ||
                ((this.captions.active = r), this.storage.set({ captions: r })),
              !this.language && r && !t)
            ) {
              const e = ks.getTracks.call(this),
                t = ks.findTrack.call(
                  this,
                  [this.captions.language, ...this.captions.languages],
                  !0
                );
              return (
                (this.captions.language = t.language),
                void ks.set.call(this, e.indexOf(t))
              );
            }
            this.elements.buttons.captions &&
              (this.elements.buttons.captions.pressed = r),
              Ir(this.elements.container, i, r),
              (this.captions.toggled = r),
              bs.updateSetting.call(this, "captions"),
              Kr.call(
                this,
                this.media,
                r ? "captionsenabled" : "captionsdisabled"
              );
          }
          setTimeout(() => {
            r &&
              this.captions.toggled &&
              (this.captions.currentTrackNode.mode = "hidden");
          });
        },
        set(e, t = !0) {
          const n = ks.getTracks.call(this);
          if (-1 !== e)
            if (ar(e))
              if (e in n) {
                if (this.captions.currentTrack !== e) {
                  this.captions.currentTrack = e;
                  const i = n[e],
                    { language: r } = i || {};
                  (this.captions.currentTrackNode = i),
                    bs.updateSetting.call(this, "captions"),
                    t ||
                      ((this.captions.language = r),
                      this.storage.set({ language: r })),
                    this.isVimeo && this.embed.enableTextTrack(r),
                    Kr.call(this, this.media, "languagechange");
                }
                ks.toggle.call(this, !0, t),
                  this.isHTML5 && this.isVideo && ks.updateCues.call(this);
              } else this.debug.warn("Track not found", e);
            else this.debug.warn("Invalid caption argument", e);
          else ks.toggle.call(this, !1, t);
        },
        setLanguage(e, t = !0) {
          if (!lr(e))
            return void this.debug.warn("Invalid language argument", e);
          const n = e.toLowerCase();
          this.captions.language = n;
          const i = ks.getTracks.call(this),
            r = ks.findTrack.call(this, [n]);
          ks.set.call(this, i.indexOf(r), t);
        },
        getTracks(e = !1) {
          return Array.from((this.media || {}).textTracks || [])
            .filter((t) => !this.isHTML5 || e || this.captions.meta.has(t))
            .filter((e) => ["captions", "subtitles"].includes(e.kind));
        },
        findTrack(e, t = !1) {
          const n = ks.getTracks.call(this),
            i = (e) => Number((this.captions.meta.get(e) || {}).default),
            r = Array.from(n).sort((e, t) => i(t) - i(e));
          let s;
          return (
            e.every((e) => ((s = r.find((t) => t.language === e)), !s)),
            s || (t ? r[0] : void 0)
          );
        },
        getCurrentTrack() {
          return ks.getTracks.call(this)[this.currentTrack];
        },
        getLabel(e) {
          let t = e;
          return (
            !gr(t) &&
              Fr.textTracks &&
              this.captions.toggled &&
              (t = ks.getCurrentTrack.call(this)),
            gr(t)
              ? br(t.label)
                ? br(t.language)
                  ? ps.get("enabled", this.config)
                  : e.language.toUpperCase()
                : t.label
              : ps.get("disabled", this.config)
          );
        },
        updateCues(e) {
          if (!this.supported.ui) return;
          if (!pr(this.elements.captions))
            return void this.debug.warn("No captions element to render to");
          if (!sr(e) && !Array.isArray(e))
            return void this.debug.warn("updateCues: Invalid input", e);
          let t = e;
          if (!t) {
            const e = ks.getCurrentTrack.call(this);
            t = Array.from((e || {}).activeCues || [])
              .map((e) => e.getCueAsHTML())
              .map(hs);
          }
          const n = t.map((e) => e.trim()).join("\n");
          if (n !== this.elements.captions.innerHTML) {
            Or(this.elements.captions);
            const e = Cr("span", Lr(this.config.selectors.caption));
            (e.innerHTML = n),
              this.elements.captions.appendChild(e),
              Kr.call(this, this.media, "cuechange");
          }
        },
      },
      Ts = {
        enabled: !0,
        title: "",
        debug: !1,
        autoplay: !1,
        autopause: !0,
        playsinline: !0,
        seekTime: 10,
        volume: 1,
        muted: !1,
        duration: null,
        displayDuration: !0,
        invertTime: !0,
        toggleInvert: !0,
        ratio: null,
        clickToPlay: !0,
        hideControls: !0,
        resetOnEnd: !1,
        disableContextMenu: !0,
        loadSprite: !0,
        iconPrefix: "plyr",
        iconUrl: "https://cdn.plyr.io/3.7.3/plyr.svg",
        blankVideo: "https://cdn.plyr.io/static/blank.mp4",
        quality: {
          default: 576,
          options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
          forced: !1,
          onChange: null,
        },
        loop: { active: !1 },
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] },
        keyboard: { focused: !0, global: !1 },
        tooltips: { controls: !1, seek: !0 },
        captions: { active: !1, language: "auto", update: !1 },
        fullscreen: { enabled: !0, fallback: !0, iosNative: !1 },
        storage: { enabled: !0, key: "plyr" },
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ],
        settings: ["captions", "quality", "speed"],
        i18n: {
          restart: "Restart",
          rewind: "Rewind {seektime}s",
          play: "Play",
          pause: "Pause",
          fastForward: "Forward {seektime}s",
          seek: "Seek",
          seekLabel: "{currentTime} of {duration}",
          played: "Played",
          buffered: "Buffered",
          currentTime: "Current time",
          duration: "Duration",
          volume: "Volume",
          mute: "Mute",
          unmute: "Unmute",
          enableCaptions: "Enable captions",
          disableCaptions: "Disable captions",
          download: "Download",
          enterFullscreen: "Enter fullscreen",
          exitFullscreen: "Exit fullscreen",
          frameTitle: "Player for {title}",
          captions: "Captions",
          settings: "Settings",
          pip: "PIP",
          menuBack: "Go back to previous menu",
          speed: "Speed",
          normal: "Normal",
          quality: "Quality",
          loop: "Loop",
          start: "Start",
          end: "End",
          all: "All",
          reset: "Reset",
          disabled: "Disabled",
          enabled: "Enabled",
          advertisement: "Ad",
          qualityBadge: {
            2160: "4K",
            1440: "HD",
            1080: "HD",
            720: "HD",
            576: "SD",
            480: "SD",
          },
        },
        urls: {
          download: null,
          vimeo: {
            sdk: "https://player.vimeo.com/api/player.js",
            iframe: "https://player.vimeo.com/video/{0}?{1}",
            api: "https://vimeo.com/api/oembed.json?url={0}",
          },
          youtube: {
            sdk: "https://www.youtube.com/iframe_api",
            api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}",
          },
          googleIMA: {
            sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js",
          },
        },
        listeners: {
          seek: null,
          play: null,
          pause: null,
          restart: null,
          rewind: null,
          fastForward: null,
          mute: null,
          volume: null,
          captions: null,
          download: null,
          fullscreen: null,
          pip: null,
          airplay: null,
          speed: null,
          quality: null,
          loop: null,
          language: null,
        },
        events: [
          "ended",
          "progress",
          "stalled",
          "playing",
          "waiting",
          "canplay",
          "canplaythrough",
          "loadstart",
          "loadeddata",
          "loadedmetadata",
          "timeupdate",
          "volumechange",
          "play",
          "pause",
          "error",
          "seeking",
          "seeked",
          "emptied",
          "ratechange",
          "cuechange",
          "download",
          "enterfullscreen",
          "exitfullscreen",
          "captionsenabled",
          "captionsdisabled",
          "languagechange",
          "controlshidden",
          "controlsshown",
          "ready",
          "statechange",
          "qualitychange",
          "adsloaded",
          "adscontentpause",
          "adscontentresume",
          "adstarted",
          "adsmidpoint",
          "adscomplete",
          "adsallcomplete",
          "adsimpression",
          "adsclick",
        ],
        selectors: {
          editable: "input, textarea, select, [contenteditable]",
          container: ".plyr",
          controls: { container: null, wrapper: ".plyr__controls" },
          labels: "[data-plyr]",
          buttons: {
            play: '[data-plyr="play"]',
            pause: '[data-plyr="pause"]',
            restart: '[data-plyr="restart"]',
            rewind: '[data-plyr="rewind"]',
            fastForward: '[data-plyr="fast-forward"]',
            mute: '[data-plyr="mute"]',
            captions: '[data-plyr="captions"]',
            download: '[data-plyr="download"]',
            fullscreen: '[data-plyr="fullscreen"]',
            pip: '[data-plyr="pip"]',
            airplay: '[data-plyr="airplay"]',
            settings: '[data-plyr="settings"]',
            loop: '[data-plyr="loop"]',
          },
          inputs: {
            seek: '[data-plyr="seek"]',
            volume: '[data-plyr="volume"]',
            speed: '[data-plyr="speed"]',
            language: '[data-plyr="language"]',
            quality: '[data-plyr="quality"]',
          },
          display: {
            currentTime: ".plyr__time--current",
            duration: ".plyr__time--duration",
            buffer: ".plyr__progress__buffer",
            loop: ".plyr__progress__loop",
            volume: ".plyr__volume--display",
          },
          progress: ".plyr__progress",
          captions: ".plyr__captions",
          caption: ".plyr__caption",
        },
        classNames: {
          type: "plyr--{0}",
          provider: "plyr--{0}",
          video: "plyr__video-wrapper",
          embed: "plyr__video-embed",
          videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
          embedContainer: "plyr__video-embed__container",
          poster: "plyr__poster",
          posterEnabled: "plyr__poster-enabled",
          ads: "plyr__ads",
          control: "plyr__control",
          controlPressed: "plyr__control--pressed",
          playing: "plyr--playing",
          paused: "plyr--paused",
          stopped: "plyr--stopped",
          loading: "plyr--loading",
          hover: "plyr--hover",
          tooltip: "plyr__tooltip",
          cues: "plyr__cues",
          marker: "plyr__progress__marker",
          hidden: "plyr__sr-only",
          hideControls: "plyr--hide-controls",
          isIos: "plyr--is-ios",
          isTouch: "plyr--is-touch",
          uiSupported: "plyr--full-ui",
          noTransition: "plyr--no-transition",
          display: { time: "plyr__time" },
          menu: {
            value: "plyr__menu__value",
            badge: "plyr__badge",
            open: "plyr--menu-open",
          },
          captions: {
            enabled: "plyr--captions-enabled",
            active: "plyr--captions-active",
          },
          fullscreen: {
            enabled: "plyr--fullscreen-enabled",
            fallback: "plyr--fullscreen-fallback",
          },
          pip: { supported: "plyr--pip-supported", active: "plyr--pip-active" },
          airplay: {
            supported: "plyr--airplay-supported",
            active: "plyr--airplay-active",
          },
          tabFocus: "plyr__tab-focus",
          previewThumbnails: {
            thumbContainer: "plyr__preview-thumb",
            thumbContainerShown: "plyr__preview-thumb--is-shown",
            imageContainer: "plyr__preview-thumb__image-container",
            timeContainer: "plyr__preview-thumb__time-container",
            scrubbingContainer: "plyr__preview-scrubbing",
            scrubbingContainerShown: "plyr__preview-scrubbing--is-shown",
          },
        },
        attributes: {
          embed: {
            provider: "data-plyr-provider",
            id: "data-plyr-embed-id",
            hash: "data-plyr-embed-hash",
          },
        },
        ads: { enabled: !1, publisherId: "", tagUrl: "" },
        previewThumbnails: { enabled: !1, src: "" },
        vimeo: {
          byline: !1,
          portrait: !1,
          title: !1,
          speed: !0,
          transparent: !1,
          customControls: !0,
          referrerPolicy: null,
          premium: !1,
        },
        youtube: {
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          customControls: !0,
          noCookie: !1,
        },
        mediaMetadata: { title: "", artist: "", album: "", artwork: [] },
        markers: { enabled: !1, points: [] },
      },
      Es = "picture-in-picture",
      Ss = "inline",
      xs = { html5: "html5", youtube: "youtube", vimeo: "vimeo" },
      Cs = "audio",
      As = "video";
    const Ps = () => {};
    class Os {
      constructor(e = !1) {
        (this.enabled = window.console && e),
          this.enabled && this.log("Debugging enabled");
      }
      get log() {
        return this.enabled
          ? Function.prototype.bind.call(console.log, console)
          : Ps;
      }
      get warn() {
        return this.enabled
          ? Function.prototype.bind.call(console.warn, console)
          : Ps;
      }
      get error() {
        return this.enabled
          ? Function.prototype.bind.call(console.error, console)
          : Ps;
      }
    }
    class Ns {
      constructor(e) {
        Ai(this, "onChange", () => {
          if (!this.enabled) return;
          const e = this.player.elements.buttons.fullscreen;
          pr(e) && (e.pressed = this.active);
          const t =
            this.target === this.player.media
              ? this.target
              : this.player.elements.container;
          Kr.call(
            this.player,
            t,
            this.active ? "enterfullscreen" : "exitfullscreen",
            !0
          );
        }),
          Ai(this, "toggleFallback", (e = !1) => {
            if (
              (e
                ? (this.scrollPosition = {
                    x: window.scrollX || 0,
                    y: window.scrollY || 0,
                  })
                : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y),
              (document.body.style.overflow = e ? "hidden" : ""),
              Ir(
                this.target,
                this.player.config.classNames.fullscreen.fallback,
                e
              ),
              kr.isIos)
            ) {
              let t = document.head.querySelector('meta[name="viewport"]');
              const n = "viewport-fit=cover";
              t ||
                ((t = document.createElement("meta")),
                t.setAttribute("name", "viewport"));
              const i = lr(t.content) && t.content.includes(n);
              e
                ? ((this.cleanupViewport = !i), i || (t.content += `,${n}`))
                : this.cleanupViewport &&
                  (t.content = t.content
                    .split(",")
                    .filter((e) => e.trim() !== n)
                    .join(","));
            }
            this.onChange();
          }),
          Ai(this, "trapFocus", (e) => {
            if (kr.isIos || !this.active || "Tab" !== e.key) return;
            const t = document.activeElement,
              n = Dr.call(
                this.player,
                "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"
              ),
              [i] = n,
              r = n[n.length - 1];
            t !== r || e.shiftKey
              ? t === i && e.shiftKey && (r.focus(), e.preventDefault())
              : (i.focus(), e.preventDefault());
          }),
          Ai(this, "update", () => {
            if (this.enabled) {
              let e;
              (e = this.forceFallback
                ? "Fallback (forced)"
                : Ns.native
                ? "Native"
                : "Fallback"),
                this.player.debug.log(`${e} fullscreen enabled`);
            } else
              this.player.debug.log(
                "Fullscreen not supported and fallback disabled"
              );
            Ir(
              this.player.elements.container,
              this.player.config.classNames.fullscreen.enabled,
              this.enabled
            );
          }),
          Ai(this, "enter", () => {
            this.enabled &&
              (kr.isIos && this.player.config.fullscreen.iosNative
                ? this.player.isVimeo
                  ? this.player.embed.requestFullscreen()
                  : this.target.webkitEnterFullscreen()
                : !Ns.native || this.forceFallback
                ? this.toggleFallback(!0)
                : this.prefix
                ? br(this.prefix) ||
                  this.target[`${this.prefix}Request${this.property}`]()
                : this.target.requestFullscreen({ navigationUI: "hide" }));
          }),
          Ai(this, "exit", () => {
            if (this.enabled)
              if (kr.isIos && this.player.config.fullscreen.iosNative)
                this.target.webkitExitFullscreen(), Xr(this.player.play());
              else if (!Ns.native || this.forceFallback)
                this.toggleFallback(!1);
              else if (this.prefix) {
                if (!br(this.prefix)) {
                  const e = "moz" === this.prefix ? "Cancel" : "Exit";
                  document[`${this.prefix}${e}${this.property}`]();
                }
              } else
                (document.cancelFullScreen || document.exitFullscreen).call(
                  document
                );
          }),
          Ai(this, "toggle", () => {
            this.active ? this.exit() : this.enter();
          }),
          (this.player = e),
          (this.prefix = Ns.prefix),
          (this.property = Ns.property),
          (this.scrollPosition = { x: 0, y: 0 }),
          (this.forceFallback = "force" === e.config.fullscreen.fallback),
          (this.player.elements.fullscreen =
            e.config.fullscreen.container &&
            (function (e, t) {
              const { prototype: n } = Element;
              return (
                n.closest ||
                function () {
                  let e = this;
                  do {
                    if (Rr.matches(e, t)) return e;
                    e = e.parentElement || e.parentNode;
                  } while (null !== e && 1 === e.nodeType);
                  return null;
                }
              ).call(e, t);
            })(this.player.elements.container, e.config.fullscreen.container)),
          Vr.call(
            this.player,
            document,
            "ms" === this.prefix
              ? "MSFullscreenChange"
              : `${this.prefix}fullscreenchange`,
            () => {
              this.onChange();
            }
          ),
          Vr.call(
            this.player,
            this.player.elements.container,
            "dblclick",
            (e) => {
              (pr(this.player.elements.controls) &&
                this.player.elements.controls.contains(e.target)) ||
                this.player.listeners.proxy(e, this.toggle, "fullscreen");
            }
          ),
          Vr.call(this, this.player.elements.container, "keydown", (e) =>
            this.trapFocus(e)
          ),
          this.update();
      }
      static get native() {
        return !!(
          document.fullscreenEnabled ||
          document.webkitFullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.msFullscreenEnabled
        );
      }
      get usingNative() {
        return Ns.native && !this.forceFallback;
      }
      static get prefix() {
        if (ur(document.exitFullscreen)) return "";
        let e = "";
        return (
          ["webkit", "moz", "ms"].some(
            (t) =>
              !(
                !ur(document[`${t}ExitFullscreen`]) &&
                !ur(document[`${t}CancelFullScreen`])
              ) && ((e = t), !0)
          ),
          e
        );
      }
      static get property() {
        return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
      }
      get enabled() {
        return (
          (Ns.native || this.player.config.fullscreen.fallback) &&
          this.player.config.fullscreen.enabled &&
          this.player.supported.ui &&
          this.player.isVideo
        );
      }
      get active() {
        if (!this.enabled) return !1;
        if (!Ns.native || this.forceFallback)
          return jr(
            this.target,
            this.player.config.classNames.fullscreen.fallback
          );
        const e = this.prefix
          ? this.target.getRootNode()[`${this.prefix}${this.property}Element`]
          : this.target.getRootNode().fullscreenElement;
        return e && e.shadowRoot
          ? e === this.target.getRootNode().host
          : e === this.target;
      }
      get target() {
        return kr.isIos && this.player.config.fullscreen.iosNative
          ? this.player.media
          : this.player.elements.fullscreen || this.player.elements.container;
      }
    }
    function Ls(e, t = 1) {
      return new Promise((n, i) => {
        const r = new Image(),
          s = () => {
            delete r.onload, delete r.onerror, (r.naturalWidth >= t ? n : i)(r);
          };
        Object.assign(r, { onload: s, onerror: s, src: e });
      });
    }
    const Ms = {
      addStyleHook() {
        Ir(
          this.elements.container,
          this.config.selectors.container.replace(".", ""),
          !0
        ),
          Ir(
            this.elements.container,
            this.config.classNames.uiSupported,
            this.supported.ui
          );
      },
      toggleNativeControls(e = !1) {
        e && this.isHTML5
          ? this.media.setAttribute("controls", "")
          : this.media.removeAttribute("controls");
      },
      build() {
        if ((this.listeners.media(), !this.supported.ui))
          return (
            this.debug.warn(
              `Basic support only for ${this.provider} ${this.type}`
            ),
            void Ms.toggleNativeControls.call(this, !0)
          );
        pr(this.elements.controls) ||
          (bs.inject.call(this), this.listeners.controls()),
          Ms.toggleNativeControls.call(this),
          this.isHTML5 && ks.setup.call(this),
          (this.volume = null),
          (this.muted = null),
          (this.loop = null),
          (this.quality = null),
          (this.speed = null),
          bs.updateVolume.call(this),
          bs.timeUpdate.call(this),
          bs.durationUpdate.call(this),
          Ms.checkPlaying.call(this),
          Ir(
            this.elements.container,
            this.config.classNames.pip.supported,
            Fr.pip && this.isHTML5 && this.isVideo
          ),
          Ir(
            this.elements.container,
            this.config.classNames.airplay.supported,
            Fr.airplay && this.isHTML5
          ),
          Ir(this.elements.container, this.config.classNames.isIos, kr.isIos),
          Ir(
            this.elements.container,
            this.config.classNames.isTouch,
            this.touch
          ),
          (this.ready = !0),
          setTimeout(() => {
            Kr.call(this, this.media, "ready");
          }, 0),
          Ms.setTitle.call(this),
          this.poster &&
            Ms.setPoster.call(this, this.poster, !1).catch(() => {}),
          this.config.duration && bs.durationUpdate.call(this),
          this.config.mediaMetadata && bs.setMediaMetadata.call(this);
      },
      setTitle() {
        let e = ps.get("play", this.config);
        if (
          (lr(this.config.title) &&
            !br(this.config.title) &&
            (e += `, ${this.config.title}`),
          Array.from(this.elements.buttons.play || []).forEach((t) => {
            t.setAttribute("aria-label", e);
          }),
          this.isEmbed)
        ) {
          const e = qr.call(this, "iframe");
          if (!pr(e)) return;
          const t = br(this.config.title) ? "video" : this.config.title,
            n = ps.get("frameTitle", this.config);
          e.setAttribute("title", n.replace("{title}", t));
        }
      },
      togglePoster(e) {
        Ir(this.elements.container, this.config.classNames.posterEnabled, e);
      },
      setPoster(e, t = !0) {
        return t && this.poster
          ? Promise.reject(new Error("Poster already set"))
          : (this.media.setAttribute("data-poster", e),
            this.elements.poster.removeAttribute("hidden"),
            Jr.call(this)
              .then(() => Ls(e))
              .catch((t) => {
                throw (e === this.poster && Ms.togglePoster.call(this, !1), t);
              })
              .then(() => {
                if (e !== this.poster)
                  throw new Error(
                    "setPoster cancelled by later call to setPoster"
                  );
              })
              .then(
                () => (
                  Object.assign(this.elements.poster.style, {
                    backgroundImage: `url('${e}')`,
                    backgroundSize: "",
                  }),
                  Ms.togglePoster.call(this, !0),
                  e
                )
              ));
      },
      checkPlaying(e) {
        Ir(
          this.elements.container,
          this.config.classNames.playing,
          this.playing
        ),
          Ir(
            this.elements.container,
            this.config.classNames.paused,
            this.paused
          ),
          Ir(
            this.elements.container,
            this.config.classNames.stopped,
            this.stopped
          ),
          Array.from(this.elements.buttons.play || []).forEach((e) => {
            Object.assign(e, { pressed: this.playing }),
              e.setAttribute(
                "aria-label",
                ps.get(this.playing ? "pause" : "play", this.config)
              );
          }),
          (fr(e) && "timeupdate" === e.type) || Ms.toggleControls.call(this);
      },
      checkLoading(e) {
        (this.loading = ["stalled", "waiting"].includes(e.type)),
          clearTimeout(this.timers.loading),
          (this.timers.loading = setTimeout(
            () => {
              Ir(
                this.elements.container,
                this.config.classNames.loading,
                this.loading
              ),
                Ms.toggleControls.call(this);
            },
            this.loading ? 250 : 0
          ));
      },
      toggleControls(e) {
        const { controls: t } = this.elements;
        if (t && this.config.hideControls) {
          const n = this.touch && this.lastSeekTime + 2e3 > Date.now();
          this.toggleControls(
            Boolean(
              e || this.loading || this.paused || t.pressed || t.hover || n
            )
          );
        }
      },
      migrateStyles() {
        Object.values({ ...this.media.style })
          .filter((e) => !br(e) && lr(e) && e.startsWith("--plyr"))
          .forEach((e) => {
            this.elements.container.style.setProperty(
              e,
              this.media.style.getPropertyValue(e)
            ),
              this.media.style.removeProperty(e);
          }),
          br(this.media.style) && this.media.removeAttribute("style");
      },
    };
    class Is {
      constructor(e) {
        Ai(this, "firstTouch", () => {
          const { player: e } = this,
            { elements: t } = e;
          (e.touch = !0), Ir(t.container, e.config.classNames.isTouch, !0);
        }),
          Ai(this, "setTabFocus", (e) => {
            const { player: t } = this,
              { elements: n } = t,
              { key: i, type: r, timeStamp: s } = e;
            if ((clearTimeout(this.focusTimer), "keydown" === r && "Tab" !== i))
              return;
            "keydown" === r && (this.lastKeyDown = s);
            const o = s - this.lastKeyDown <= 20;
            ("focus" !== r || o) &&
              ((() => {
                const e = t.config.classNames.tabFocus;
                Ir(Dr.call(t, `.${e}`), e, !1);
              })(),
              "focusout" !== r &&
                (this.focusTimer = setTimeout(() => {
                  const e = document.activeElement;
                  n.container.contains(e) &&
                    Ir(
                      document.activeElement,
                      t.config.classNames.tabFocus,
                      !0
                    );
                }, 10)));
          }),
          Ai(this, "global", (e = !0) => {
            const { player: t } = this;
            t.config.keyboard.global &&
              Hr.call(t, window, "keydown keyup", this.handleKey, e, !1),
              Hr.call(t, document.body, "click", this.toggleMenu, e),
              Wr.call(t, document.body, "touchstart", this.firstTouch),
              Hr.call(
                t,
                document.body,
                "keydown focus blur focusout",
                this.setTabFocus,
                e,
                !1,
                !0
              );
          }),
          Ai(this, "container", () => {
            const { player: e } = this,
              { config: t, elements: n, timers: i } = e;
            !t.keyboard.global &&
              t.keyboard.focused &&
              Vr.call(e, n.container, "keydown keyup", this.handleKey, !1),
              Vr.call(
                e,
                n.container,
                "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen",
                (t) => {
                  const { controls: r } = n;
                  r &&
                    "enterfullscreen" === t.type &&
                    ((r.pressed = !1), (r.hover = !1));
                  let s = 0;
                  ["touchstart", "touchmove", "mousemove"].includes(t.type) &&
                    (Ms.toggleControls.call(e, !0), (s = e.touch ? 3e3 : 2e3)),
                    clearTimeout(i.controls),
                    (i.controls = setTimeout(
                      () => Ms.toggleControls.call(e, !1),
                      s
                    ));
                }
              );
            const r = () => {
                if (!e.isVimeo || e.config.vimeo.premium) return;
                const t = n.wrapper,
                  { active: i } = e.fullscreen,
                  [r, s] = is.call(e),
                  o = Zr(`aspect-ratio: ${r} / ${s}`);
                if (!i)
                  return void (o
                    ? ((t.style.width = null), (t.style.height = null))
                    : ((t.style.maxWidth = null), (t.style.margin = null)));
                const [a, l] = [
                    Math.max(
                      document.documentElement.clientWidth || 0,
                      window.innerWidth || 0
                    ),
                    Math.max(
                      document.documentElement.clientHeight || 0,
                      window.innerHeight || 0
                    ),
                  ],
                  c = a / l > r / s;
                o
                  ? ((t.style.width = c ? "auto" : "100%"),
                    (t.style.height = c ? "100%" : "auto"))
                  : ((t.style.maxWidth = c ? (l / s) * r + "px" : null),
                    (t.style.margin = c ? "0 auto" : null));
              },
              s = () => {
                clearTimeout(i.resized), (i.resized = setTimeout(r, 50));
              };
            Vr.call(e, n.container, "enterfullscreen exitfullscreen", (t) => {
              const { target: i } = e.fullscreen;
              if (i !== n.container) return;
              if (!e.isEmbed && br(e.config.ratio)) return;
              r();
              ("enterfullscreen" === t.type ? Vr : zr).call(
                e,
                window,
                "resize",
                s
              );
            });
          }),
          Ai(this, "media", () => {
            const { player: e } = this,
              { elements: t } = e;
            if (
              (Vr.call(e, e.media, "timeupdate seeking seeked", (t) =>
                bs.timeUpdate.call(e, t)
              ),
              Vr.call(
                e,
                e.media,
                "durationchange loadeddata loadedmetadata",
                (t) => bs.durationUpdate.call(e, t)
              ),
              Vr.call(e, e.media, "ended", () => {
                e.isHTML5 &&
                  e.isVideo &&
                  e.config.resetOnEnd &&
                  (e.restart(), e.pause());
              }),
              Vr.call(e, e.media, "progress playing seeking seeked", (t) =>
                bs.updateProgress.call(e, t)
              ),
              Vr.call(e, e.media, "volumechange", (t) =>
                bs.updateVolume.call(e, t)
              ),
              Vr.call(
                e,
                e.media,
                "playing play pause ended emptied timeupdate",
                (t) => Ms.checkPlaying.call(e, t)
              ),
              Vr.call(e, e.media, "waiting canplay seeked playing", (t) =>
                Ms.checkLoading.call(e, t)
              ),
              e.supported.ui && e.config.clickToPlay && !e.isAudio)
            ) {
              const n = qr.call(e, `.${e.config.classNames.video}`);
              if (!pr(n)) return;
              Vr.call(e, t.container, "click", (i) => {
                ([t.container, n].includes(i.target) || n.contains(i.target)) &&
                  ((e.touch && e.config.hideControls) ||
                    (e.ended
                      ? (this.proxy(i, e.restart, "restart"),
                        this.proxy(
                          i,
                          () => {
                            Xr(e.play());
                          },
                          "play"
                        ))
                      : this.proxy(
                          i,
                          () => {
                            Xr(e.togglePlay());
                          },
                          "play"
                        )));
              });
            }
            e.supported.ui &&
              e.config.disableContextMenu &&
              Vr.call(
                e,
                t.wrapper,
                "contextmenu",
                (e) => {
                  e.preventDefault();
                },
                !1
              ),
              Vr.call(e, e.media, "volumechange", () => {
                e.storage.set({ volume: e.volume, muted: e.muted });
              }),
              Vr.call(e, e.media, "ratechange", () => {
                bs.updateSetting.call(e, "speed"),
                  e.storage.set({ speed: e.speed });
              }),
              Vr.call(e, e.media, "qualitychange", (t) => {
                bs.updateSetting.call(e, "quality", null, t.detail.quality);
              }),
              Vr.call(e, e.media, "ready qualitychange", () => {
                bs.setDownloadUrl.call(e);
              });
            const n = e.config.events.concat(["keyup", "keydown"]).join(" ");
            Vr.call(e, e.media, n, (n) => {
              let { detail: i = {} } = n;
              "error" === n.type && (i = e.media.error),
                Kr.call(e, t.container, n.type, !0, i);
            });
          }),
          Ai(this, "proxy", (e, t, n) => {
            const { player: i } = this,
              r = i.config.listeners[n];
            let s = !0;
            ur(r) && (s = r.call(i, e)), !1 !== s && ur(t) && t.call(i, e);
          }),
          Ai(this, "bind", (e, t, n, i, r = !0) => {
            const { player: s } = this,
              o = s.config.listeners[i],
              a = ur(o);
            Vr.call(s, e, t, (e) => this.proxy(e, n, i), r && !a);
          }),
          Ai(this, "controls", () => {
            const { player: e } = this,
              { elements: t } = e,
              n = kr.isIE ? "change" : "input";
            if (
              (t.buttons.play &&
                Array.from(t.buttons.play).forEach((t) => {
                  this.bind(
                    t,
                    "click",
                    () => {
                      Xr(e.togglePlay());
                    },
                    "play"
                  );
                }),
              this.bind(t.buttons.restart, "click", e.restart, "restart"),
              this.bind(
                t.buttons.rewind,
                "click",
                () => {
                  (e.lastSeekTime = Date.now()), e.rewind();
                },
                "rewind"
              ),
              this.bind(
                t.buttons.fastForward,
                "click",
                () => {
                  (e.lastSeekTime = Date.now()), e.forward();
                },
                "fastForward"
              ),
              this.bind(
                t.buttons.mute,
                "click",
                () => {
                  e.muted = !e.muted;
                },
                "mute"
              ),
              this.bind(t.buttons.captions, "click", () => e.toggleCaptions()),
              this.bind(
                t.buttons.download,
                "click",
                () => {
                  Kr.call(e, e.media, "download");
                },
                "download"
              ),
              this.bind(
                t.buttons.fullscreen,
                "click",
                () => {
                  e.fullscreen.toggle();
                },
                "fullscreen"
              ),
              this.bind(
                t.buttons.pip,
                "click",
                () => {
                  e.pip = "toggle";
                },
                "pip"
              ),
              this.bind(t.buttons.airplay, "click", e.airplay, "airplay"),
              this.bind(
                t.buttons.settings,
                "click",
                (t) => {
                  t.stopPropagation(),
                    t.preventDefault(),
                    bs.toggleMenu.call(e, t);
                },
                null,
                !1
              ),
              this.bind(
                t.buttons.settings,
                "keyup",
                (t) => {
                  ["Space", "Enter"].includes(t.key) &&
                    ("Enter" !== t.key
                      ? (t.preventDefault(),
                        t.stopPropagation(),
                        bs.toggleMenu.call(e, t))
                      : bs.focusFirstMenuItem.call(e, null, !0));
                },
                null,
                !1
              ),
              this.bind(t.settings.menu, "keydown", (t) => {
                "Escape" === t.key && bs.toggleMenu.call(e, t);
              }),
              this.bind(t.inputs.seek, "mousedown mousemove", (e) => {
                const n = t.progress.getBoundingClientRect(),
                  i = (100 / n.width) * (e.pageX - n.left);
                e.currentTarget.setAttribute("seek-value", i);
              }),
              this.bind(
                t.inputs.seek,
                "mousedown mouseup keydown keyup touchstart touchend",
                (t) => {
                  const n = t.currentTarget,
                    i = "play-on-seeked";
                  if (mr(t) && !["ArrowLeft", "ArrowRight"].includes(t.key))
                    return;
                  e.lastSeekTime = Date.now();
                  const r = n.hasAttribute(i),
                    s = ["mouseup", "touchend", "keyup"].includes(t.type);
                  r && s
                    ? (n.removeAttribute(i), Xr(e.play()))
                    : !s && e.playing && (n.setAttribute(i, ""), e.pause());
                }
              ),
              kr.isIos)
            ) {
              const t = Dr.call(e, 'input[type="range"]');
              Array.from(t).forEach((e) =>
                this.bind(e, n, (e) => _r(e.target))
              );
            }
            this.bind(
              t.inputs.seek,
              n,
              (t) => {
                const n = t.currentTarget;
                let i = n.getAttribute("seek-value");
                br(i) && (i = n.value),
                  n.removeAttribute("seek-value"),
                  (e.currentTime = (i / n.max) * e.duration);
              },
              "seek"
            ),
              this.bind(t.progress, "mouseenter mouseleave mousemove", (t) =>
                bs.updateSeekTooltip.call(e, t)
              ),
              this.bind(t.progress, "mousemove touchmove", (t) => {
                const { previewThumbnails: n } = e;
                n && n.loaded && n.startMove(t);
              }),
              this.bind(t.progress, "mouseleave touchend click", () => {
                const { previewThumbnails: t } = e;
                t && t.loaded && t.endMove(!1, !0);
              }),
              this.bind(t.progress, "mousedown touchstart", (t) => {
                const { previewThumbnails: n } = e;
                n && n.loaded && n.startScrubbing(t);
              }),
              this.bind(t.progress, "mouseup touchend", (t) => {
                const { previewThumbnails: n } = e;
                n && n.loaded && n.endScrubbing(t);
              }),
              kr.isWebkit &&
                Array.from(Dr.call(e, 'input[type="range"]')).forEach((t) => {
                  this.bind(t, "input", (t) =>
                    bs.updateRangeFill.call(e, t.target)
                  );
                }),
              e.config.toggleInvert &&
                !pr(t.display.duration) &&
                this.bind(t.display.currentTime, "click", () => {
                  0 !== e.currentTime &&
                    ((e.config.invertTime = !e.config.invertTime),
                    bs.timeUpdate.call(e));
                }),
              this.bind(
                t.inputs.volume,
                n,
                (t) => {
                  e.volume = t.target.value;
                },
                "volume"
              ),
              this.bind(t.controls, "mouseenter mouseleave", (n) => {
                t.controls.hover = !e.touch && "mouseenter" === n.type;
              }),
              t.fullscreen &&
                Array.from(t.fullscreen.children)
                  .filter((e) => !e.contains(t.container))
                  .forEach((n) => {
                    this.bind(n, "mouseenter mouseleave", (n) => {
                      t.controls &&
                        (t.controls.hover =
                          !e.touch && "mouseenter" === n.type);
                    });
                  }),
              this.bind(
                t.controls,
                "mousedown mouseup touchstart touchend touchcancel",
                (e) => {
                  t.controls.pressed = ["mousedown", "touchstart"].includes(
                    e.type
                  );
                }
              ),
              this.bind(t.controls, "focusin", () => {
                const { config: n, timers: i } = e;
                Ir(t.controls, n.classNames.noTransition, !0),
                  Ms.toggleControls.call(e, !0),
                  setTimeout(() => {
                    Ir(t.controls, n.classNames.noTransition, !1);
                  }, 0);
                const r = this.touch ? 3e3 : 4e3;
                clearTimeout(i.controls),
                  (i.controls = setTimeout(
                    () => Ms.toggleControls.call(e, !1),
                    r
                  ));
              }),
              this.bind(
                t.inputs.volume,
                "wheel",
                (t) => {
                  const n = t.webkitDirectionInvertedFromDevice,
                    [i, r] = [t.deltaX, -t.deltaY].map((e) => (n ? -e : e)),
                    s = Math.sign(Math.abs(i) > Math.abs(r) ? i : r);
                  e.increaseVolume(s / 50);
                  const { volume: o } = e.media;
                  ((1 === s && o < 1) || (-1 === s && o > 0)) &&
                    t.preventDefault();
                },
                "volume",
                !1
              );
          }),
          (this.player = e),
          (this.lastKey = null),
          (this.focusTimer = null),
          (this.lastKeyDown = null),
          (this.handleKey = this.handleKey.bind(this)),
          (this.toggleMenu = this.toggleMenu.bind(this)),
          (this.setTabFocus = this.setTabFocus.bind(this)),
          (this.firstTouch = this.firstTouch.bind(this));
      }
      handleKey(e) {
        const { player: t } = this,
          { elements: n } = t,
          {
            key: i,
            type: r,
            altKey: s,
            ctrlKey: o,
            metaKey: a,
            shiftKey: l,
          } = e,
          c = "keydown" === r,
          u = c && i === this.lastKey;
        if (s || o || a || l) return;
        if (!i) return;
        if (c) {
          const r = document.activeElement;
          if (pr(r)) {
            const { editable: i } = t.config.selectors,
              { seek: s } = n.inputs;
            if (r !== s && Rr(r, i)) return;
            if ("Space" === e.key && Rr(r, 'button, [role^="menuitem"]'))
              return;
          }
          switch (
            ([
              "Space",
              "ArrowLeft",
              "ArrowUp",
              "ArrowRight",
              "ArrowDown",
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "c",
              "f",
              "k",
              "l",
              "m",
            ].includes(i) && (e.preventDefault(), e.stopPropagation()),
            i)
          ) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              u ||
                ((h = parseInt(i, 10)),
                (t.currentTime = (t.duration / 10) * h));
              break;
            case "Space":
            case "k":
              u || Xr(t.togglePlay());
              break;
            case "ArrowUp":
              t.increaseVolume(0.1);
              break;
            case "ArrowDown":
              t.decreaseVolume(0.1);
              break;
            case "m":
              u || (t.muted = !t.muted);
              break;
            case "ArrowRight":
              t.forward();
              break;
            case "ArrowLeft":
              t.rewind();
              break;
            case "f":
              t.fullscreen.toggle();
              break;
            case "c":
              u || t.toggleCaptions();
              break;
            case "l":
              t.loop = !t.loop;
          }
          "Escape" === i &&
            !t.fullscreen.usingNative &&
            t.fullscreen.active &&
            t.fullscreen.toggle(),
            (this.lastKey = i);
        } else this.lastKey = null;
        var h;
      }
      toggleMenu(e) {
        bs.toggleMenu.call(this.player, e);
      }
    }
    var js = (function (e, t) {
      return e((t = { exports: {} }), t.exports), t.exports;
    })(function (e, t) {
      e.exports = (function () {
        var e = function () {},
          t = {},
          n = {},
          i = {};
        function r(e, t) {
          e = e.push ? e : [e];
          var r,
            s,
            o,
            a = [],
            l = e.length,
            c = l;
          for (
            r = function (e, n) {
              n.length && a.push(e), --c || t(a);
            };
            l--;

          )
            (s = e[l]), (o = n[s]) ? r(s, o) : (i[s] = i[s] || []).push(r);
        }
        function s(e, t) {
          if (e) {
            var r = i[e];
            if (((n[e] = t), r)) for (; r.length; ) r[0](e, t), r.splice(0, 1);
          }
        }
        function o(t, n) {
          t.call && (t = { success: t }),
            n.length ? (t.error || e)(n) : (t.success || e)(t);
        }
        function a(t, n, i, r) {
          var s,
            o,
            l = document,
            c = i.async,
            u = (i.numRetries || 0) + 1,
            h = i.before || e,
            d = t.replace(/[\?|#].*$/, ""),
            p = t.replace(/^(css|img)!/, "");
          (r = r || 0),
            /(^css!|\.css$)/.test(d)
              ? (((o = l.createElement("link")).rel = "stylesheet"),
                (o.href = p),
                (s = "hideFocus" in o) &&
                  o.relList &&
                  ((s = 0), (o.rel = "preload"), (o.as = "style")))
              : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d)
              ? ((o = l.createElement("img")).src = p)
              : (((o = l.createElement("script")).src = t),
                (o.async = void 0 === c || c)),
            (o.onload =
              o.onerror =
              o.onbeforeload =
                function (e) {
                  var l = e.type[0];
                  if (s)
                    try {
                      o.sheet.cssText.length || (l = "e");
                    } catch (e) {
                      18 != e.code && (l = "e");
                    }
                  if ("e" == l) {
                    if ((r += 1) < u) return a(t, n, i, r);
                  } else if ("preload" == o.rel && "style" == o.as)
                    return (o.rel = "stylesheet");
                  n(t, l, e.defaultPrevented);
                }),
            !1 !== h(t, o) && l.head.appendChild(o);
        }
        function l(e, t, n) {
          var i,
            r,
            s = (e = e.push ? e : [e]).length,
            o = s,
            l = [];
          for (
            i = function (e, n, i) {
              if (("e" == n && l.push(e), "b" == n)) {
                if (!i) return;
                l.push(e);
              }
              --s || t(l);
            },
              r = 0;
            r < o;
            r++
          )
            a(e[r], i, n);
        }
        function c(e, n, i) {
          var r, a;
          if ((n && n.trim && (r = n), (a = (r ? i : n) || {}), r)) {
            if (r in t) throw "LoadJS";
            t[r] = !0;
          }
          function c(t, n) {
            l(
              e,
              function (e) {
                o(a, e), t && o({ success: t, error: n }, e), s(r, e);
              },
              a
            );
          }
          if (a.returnPromise) return new Promise(c);
          c();
        }
        return (
          (c.ready = function (e, t) {
            return (
              r(e, function (e) {
                o(t, e);
              }),
              c
            );
          }),
          (c.done = function (e) {
            s(e, []);
          }),
          (c.reset = function () {
            (t = {}), (n = {}), (i = {});
          }),
          (c.isDefined = function (e) {
            return e in t;
          }),
          c
        );
      })();
    });
    function Rs(e) {
      return new Promise((t, n) => {
        js(e, { success: t, error: n });
      });
    }
    function Ds(e) {
      e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0),
        this.media.paused === e &&
          ((this.media.paused = !e),
          Kr.call(this, this.media, e ? "play" : "pause"));
    }
    const qs = {
      setup() {
        const e = this;
        Ir(e.elements.wrapper, e.config.classNames.embed, !0),
          (e.options.speed = e.config.speed.options),
          rs.call(e),
          or(window.Vimeo)
            ? qs.ready.call(e)
            : Rs(e.config.urls.vimeo.sdk)
                .then(() => {
                  qs.ready.call(e);
                })
                .catch((t) => {
                  e.debug.warn("Vimeo SDK (player.js) failed to load", t);
                });
      },
      ready() {
        const e = this,
          t = e.config.vimeo,
          { premium: n, referrerPolicy: i, ...r } = t;
        let s = e.media.getAttribute("src"),
          o = "";
        br(s)
          ? ((s = e.media.getAttribute(e.config.attributes.embed.id)),
            (o = e.media.getAttribute(e.config.attributes.embed.hash)))
          : (o = (function (e) {
              const t = e.match(
                /^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/
              );
              return t && 5 === t.length ? t[4] : null;
            })(s));
        const a = o ? { h: o } : {};
        n && Object.assign(r, { controls: !1, sidedock: !1 });
        const l = _s({
            loop: e.config.loop.active,
            autoplay: e.autoplay,
            muted: e.muted,
            gesture: "media",
            playsinline: !this.config.fullscreen.iosNative,
            ...a,
            ...r,
          }),
          c = br((u = s))
            ? null
            : ar(Number(u))
            ? u
            : u.match(/^.*(vimeo.com\/|video\/)(\d+).*/)
            ? RegExp.$2
            : u;
        var u;
        const h = Cr("iframe"),
          d = as(e.config.urls.vimeo.iframe, c, l);
        if (
          (h.setAttribute("src", d),
          h.setAttribute("allowfullscreen", ""),
          h.setAttribute(
            "allow",
            [
              "autoplay",
              "fullscreen",
              "picture-in-picture",
              "encrypted-media",
              "accelerometer",
              "gyroscope",
            ].join("; ")
          ),
          br(i) || h.setAttribute("referrerPolicy", i),
          n || !t.customControls)
        )
          h.setAttribute("data-poster", e.poster), (e.media = Nr(h, e.media));
        else {
          const t = Cr("div", {
            class: e.config.classNames.embedContainer,
            "data-poster": e.poster,
          });
          t.appendChild(h), (e.media = Nr(t, e.media));
        }
        t.customControls ||
          ms(as(e.config.urls.vimeo.api, d)).then((t) => {
            !br(t) &&
              t.thumbnail_url &&
              Ms.setPoster.call(e, t.thumbnail_url).catch(() => {});
          }),
          (e.embed = new window.Vimeo.Player(h, {
            autopause: e.config.autopause,
            muted: e.muted,
          })),
          (e.media.paused = !0),
          (e.media.currentTime = 0),
          e.supported.ui && e.embed.disableTextTrack(),
          (e.media.play = () => (Ds.call(e, !0), e.embed.play())),
          (e.media.pause = () => (Ds.call(e, !1), e.embed.pause())),
          (e.media.stop = () => {
            e.pause(), (e.currentTime = 0);
          });
        let { currentTime: p } = e.media;
        Object.defineProperty(e.media, "currentTime", {
          get: () => p,
          set(t) {
            const { embed: n, media: i, paused: r, volume: s } = e,
              o = r && !n.hasPlayed;
            (i.seeking = !0),
              Kr.call(e, i, "seeking"),
              Promise.resolve(o && n.setVolume(0))
                .then(() => n.setCurrentTime(t))
                .then(() => o && n.pause())
                .then(() => o && n.setVolume(s))
                .catch(() => {});
          },
        });
        let f = e.config.speed.selected;
        Object.defineProperty(e.media, "playbackRate", {
          get: () => f,
          set(t) {
            e.embed
              .setPlaybackRate(t)
              .then(() => {
                (f = t), Kr.call(e, e.media, "ratechange");
              })
              .catch(() => {
                e.options.speed = [1];
              });
          },
        });
        let { volume: m } = e.config;
        Object.defineProperty(e.media, "volume", {
          get: () => m,
          set(t) {
            e.embed.setVolume(t).then(() => {
              (m = t), Kr.call(e, e.media, "volumechange");
            });
          },
        });
        let { muted: g } = e.config;
        Object.defineProperty(e.media, "muted", {
          get: () => g,
          set(t) {
            const n = !!cr(t) && t;
            e.embed.setVolume(n ? 0 : e.config.volume).then(() => {
              (g = n), Kr.call(e, e.media, "volumechange");
            });
          },
        });
        let y,
          { loop: v } = e.config;
        Object.defineProperty(e.media, "loop", {
          get: () => v,
          set(t) {
            const n = cr(t) ? t : e.config.loop.active;
            e.embed.setLoop(n).then(() => {
              v = n;
            });
          },
        }),
          e.embed
            .getVideoUrl()
            .then((t) => {
              (y = t), bs.setDownloadUrl.call(e);
            })
            .catch((e) => {
              this.debug.warn(e);
            }),
          Object.defineProperty(e.media, "currentSrc", { get: () => y }),
          Object.defineProperty(e.media, "ended", {
            get: () => e.currentTime === e.duration,
          }),
          Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then(
            (t) => {
              const [n, i] = t;
              (e.embed.ratio = ss(n, i)), rs.call(this);
            }
          ),
          e.embed.setAutopause(e.config.autopause).then((t) => {
            e.config.autopause = t;
          }),
          e.embed.getVideoTitle().then((t) => {
            (e.config.title = t), Ms.setTitle.call(this);
          }),
          e.embed.getCurrentTime().then((t) => {
            (p = t), Kr.call(e, e.media, "timeupdate");
          }),
          e.embed.getDuration().then((t) => {
            (e.media.duration = t), Kr.call(e, e.media, "durationchange");
          }),
          e.embed.getTextTracks().then((t) => {
            (e.media.textTracks = t), ks.setup.call(e);
          }),
          e.embed.on("cuechange", ({ cues: t = [] }) => {
            const n = t.map((e) =>
              (function (e) {
                const t = document.createDocumentFragment(),
                  n = document.createElement("div");
                return (
                  t.appendChild(n), (n.innerHTML = e), t.firstChild.innerText
                );
              })(e.text)
            );
            ks.updateCues.call(e, n);
          }),
          e.embed.on("loaded", () => {
            if (
              (e.embed.getPaused().then((t) => {
                Ds.call(e, !t), t || Kr.call(e, e.media, "playing");
              }),
              pr(e.embed.element) && e.supported.ui)
            ) {
              e.embed.element.setAttribute("tabindex", -1);
            }
          }),
          e.embed.on("bufferstart", () => {
            Kr.call(e, e.media, "waiting");
          }),
          e.embed.on("bufferend", () => {
            Kr.call(e, e.media, "playing");
          }),
          e.embed.on("play", () => {
            Ds.call(e, !0), Kr.call(e, e.media, "playing");
          }),
          e.embed.on("pause", () => {
            Ds.call(e, !1);
          }),
          e.embed.on("timeupdate", (t) => {
            (e.media.seeking = !1),
              (p = t.seconds),
              Kr.call(e, e.media, "timeupdate");
          }),
          e.embed.on("progress", (t) => {
            (e.media.buffered = t.percent),
              Kr.call(e, e.media, "progress"),
              1 === parseInt(t.percent, 10) &&
                Kr.call(e, e.media, "canplaythrough"),
              e.embed.getDuration().then((t) => {
                t !== e.media.duration &&
                  ((e.media.duration = t),
                  Kr.call(e, e.media, "durationchange"));
              });
          }),
          e.embed.on("seeked", () => {
            (e.media.seeking = !1), Kr.call(e, e.media, "seeked");
          }),
          e.embed.on("ended", () => {
            (e.media.paused = !0), Kr.call(e, e.media, "ended");
          }),
          e.embed.on("error", (t) => {
            (e.media.error = t), Kr.call(e, e.media, "error");
          }),
          t.customControls && setTimeout(() => Ms.build.call(e), 0);
      },
    };
    function $s(e) {
      e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0),
        this.media.paused === e &&
          ((this.media.paused = !e),
          Kr.call(this, this.media, e ? "play" : "pause"));
    }
    function Us(e) {
      return e.noCookie
        ? "https://www.youtube-nocookie.com"
        : "http:" === window.location.protocol
        ? "http://www.youtube.com"
        : void 0;
    }
    const Fs = {
        setup() {
          if (
            (Ir(this.elements.wrapper, this.config.classNames.embed, !0),
            or(window.YT) && ur(window.YT.Player))
          )
            Fs.ready.call(this);
          else {
            const e = window.onYouTubeIframeAPIReady;
            (window.onYouTubeIframeAPIReady = () => {
              ur(e) && e(), Fs.ready.call(this);
            }),
              Rs(this.config.urls.youtube.sdk).catch((e) => {
                this.debug.warn("YouTube API failed to load", e);
              });
          }
        },
        getTitle(e) {
          ms(as(this.config.urls.youtube.api, e))
            .then((e) => {
              if (or(e)) {
                const { title: t, height: n, width: i } = e;
                (this.config.title = t),
                  Ms.setTitle.call(this),
                  (this.embed.ratio = ss(i, n));
              }
              rs.call(this);
            })
            .catch(() => {
              rs.call(this);
            });
        },
        ready() {
          const e = this,
            t = e.config.youtube,
            n = e.media && e.media.getAttribute("id");
          if (!br(n) && n.startsWith("youtube-")) return;
          let i = e.media.getAttribute("src");
          br(i) && (i = e.media.getAttribute(this.config.attributes.embed.id));
          const r = br((s = i))
            ? null
            : s.match(
                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
              )
            ? RegExp.$2
            : s;
          var s;
          const o = Cr("div", {
            id: `${e.provider}-${Math.floor(1e4 * Math.random())}`,
            "data-poster": t.customControls ? e.poster : void 0,
          });
          if (((e.media = Nr(o, e.media)), t.customControls)) {
            const t = (e) => `https://i.ytimg.com/vi/${r}/${e}default.jpg`;
            Ls(t("maxres"), 121)
              .catch(() => Ls(t("sd"), 121))
              .catch(() => Ls(t("hq")))
              .then((t) => Ms.setPoster.call(e, t.src))
              .then((t) => {
                t.includes("maxres") ||
                  (e.elements.poster.style.backgroundSize = "cover");
              })
              .catch(() => {});
          }
          e.embed = new window.YT.Player(e.media, {
            videoId: r,
            host: Us(t),
            playerVars: Er(
              {},
              {
                autoplay: e.config.autoplay ? 1 : 0,
                hl: e.config.hl,
                controls: e.supported.ui && t.customControls ? 0 : 1,
                disablekb: 1,
                playsinline: e.config.fullscreen.iosNative ? 0 : 1,
                cc_load_policy: e.captions.active ? 1 : 0,
                cc_lang_pref: e.config.captions.language,
                widget_referrer: window ? window.location.href : null,
              },
              t
            ),
            events: {
              onError(t) {
                if (!e.media.error) {
                  const n = t.data,
                    i =
                      {
                        2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                        5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                        100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                        101: "The owner of the requested video does not allow it to be played in embedded players.",
                        150: "The owner of the requested video does not allow it to be played in embedded players.",
                      }[n] || "An unknown error occured";
                  (e.media.error = { code: n, message: i }),
                    Kr.call(e, e.media, "error");
                }
              },
              onPlaybackRateChange(t) {
                const n = t.target;
                (e.media.playbackRate = n.getPlaybackRate()),
                  Kr.call(e, e.media, "ratechange");
              },
              onReady(n) {
                if (ur(e.media.play)) return;
                const i = n.target;
                Fs.getTitle.call(e, r),
                  (e.media.play = () => {
                    $s.call(e, !0), i.playVideo();
                  }),
                  (e.media.pause = () => {
                    $s.call(e, !1), i.pauseVideo();
                  }),
                  (e.media.stop = () => {
                    i.stopVideo();
                  }),
                  (e.media.duration = i.getDuration()),
                  (e.media.paused = !0),
                  (e.media.currentTime = 0),
                  Object.defineProperty(e.media, "currentTime", {
                    get: () => Number(i.getCurrentTime()),
                    set(t) {
                      e.paused && !e.embed.hasPlayed && e.embed.mute(),
                        (e.media.seeking = !0),
                        Kr.call(e, e.media, "seeking"),
                        i.seekTo(t);
                    },
                  }),
                  Object.defineProperty(e.media, "playbackRate", {
                    get: () => i.getPlaybackRate(),
                    set(e) {
                      i.setPlaybackRate(e);
                    },
                  });
                let { volume: s } = e.config;
                Object.defineProperty(e.media, "volume", {
                  get: () => s,
                  set(t) {
                    (s = t),
                      i.setVolume(100 * s),
                      Kr.call(e, e.media, "volumechange");
                  },
                });
                let { muted: o } = e.config;
                Object.defineProperty(e.media, "muted", {
                  get: () => o,
                  set(t) {
                    const n = cr(t) ? t : o;
                    (o = n),
                      i[n ? "mute" : "unMute"](),
                      i.setVolume(100 * s),
                      Kr.call(e, e.media, "volumechange");
                  },
                }),
                  Object.defineProperty(e.media, "currentSrc", {
                    get: () => i.getVideoUrl(),
                  }),
                  Object.defineProperty(e.media, "ended", {
                    get: () => e.currentTime === e.duration,
                  });
                const a = i.getAvailablePlaybackRates();
                (e.options.speed = a.filter((t) =>
                  e.config.speed.options.includes(t)
                )),
                  e.supported.ui &&
                    t.customControls &&
                    e.media.setAttribute("tabindex", -1),
                  Kr.call(e, e.media, "timeupdate"),
                  Kr.call(e, e.media, "durationchange"),
                  clearInterval(e.timers.buffering),
                  (e.timers.buffering = setInterval(() => {
                    (e.media.buffered = i.getVideoLoadedFraction()),
                      (null === e.media.lastBuffered ||
                        e.media.lastBuffered < e.media.buffered) &&
                        Kr.call(e, e.media, "progress"),
                      (e.media.lastBuffered = e.media.buffered),
                      1 === e.media.buffered &&
                        (clearInterval(e.timers.buffering),
                        Kr.call(e, e.media, "canplaythrough"));
                  }, 200)),
                  t.customControls && setTimeout(() => Ms.build.call(e), 50);
              },
              onStateChange(n) {
                const i = n.target;
                clearInterval(e.timers.playing);
                switch (
                  (e.media.seeking &&
                    [1, 2].includes(n.data) &&
                    ((e.media.seeking = !1), Kr.call(e, e.media, "seeked")),
                  n.data)
                ) {
                  case -1:
                    Kr.call(e, e.media, "timeupdate"),
                      (e.media.buffered = i.getVideoLoadedFraction()),
                      Kr.call(e, e.media, "progress");
                    break;
                  case 0:
                    $s.call(e, !1),
                      e.media.loop
                        ? (i.stopVideo(), i.playVideo())
                        : Kr.call(e, e.media, "ended");
                    break;
                  case 1:
                    t.customControls &&
                    !e.config.autoplay &&
                    e.media.paused &&
                    !e.embed.hasPlayed
                      ? e.media.pause()
                      : ($s.call(e, !0),
                        Kr.call(e, e.media, "playing"),
                        (e.timers.playing = setInterval(() => {
                          Kr.call(e, e.media, "timeupdate");
                        }, 50)),
                        e.media.duration !== i.getDuration() &&
                          ((e.media.duration = i.getDuration()),
                          Kr.call(e, e.media, "durationchange")));
                    break;
                  case 2:
                    e.muted || e.embed.unMute(), $s.call(e, !1);
                    break;
                  case 3:
                    Kr.call(e, e.media, "waiting");
                }
                Kr.call(e, e.elements.container, "statechange", !1, {
                  code: n.data,
                });
              },
            },
          });
        },
      },
      Bs = {
        setup() {
          this.media
            ? (Ir(
                this.elements.container,
                this.config.classNames.type.replace("{0}", this.type),
                !0
              ),
              Ir(
                this.elements.container,
                this.config.classNames.provider.replace("{0}", this.provider),
                !0
              ),
              this.isEmbed &&
                Ir(
                  this.elements.container,
                  this.config.classNames.type.replace("{0}", "video"),
                  !0
                ),
              this.isVideo &&
                ((this.elements.wrapper = Cr("div", {
                  class: this.config.classNames.video,
                })),
                Sr(this.media, this.elements.wrapper),
                (this.elements.poster = Cr("div", {
                  class: this.config.classNames.poster,
                })),
                this.elements.wrapper.appendChild(this.elements.poster)),
              this.isHTML5
                ? os.setup.call(this)
                : this.isYouTube
                ? Fs.setup.call(this)
                : this.isVimeo && qs.setup.call(this))
            : this.debug.warn("No media element found!");
        },
      };
    class Hs {
      constructor(e) {
        Ai(this, "load", () => {
          this.enabled &&
            (or(window.google) && or(window.google.ima)
              ? this.ready()
              : Rs(this.player.config.urls.googleIMA.sdk)
                  .then(() => {
                    this.ready();
                  })
                  .catch(() => {
                    this.trigger(
                      "error",
                      new Error("Google IMA SDK failed to load")
                    );
                  }));
        }),
          Ai(this, "ready", () => {
            var e;
            this.enabled ||
              ((e = this).manager && e.manager.destroy(),
              e.elements.displayContainer &&
                e.elements.displayContainer.destroy(),
              e.elements.container.remove()),
              this.startSafetyTimer(12e3, "ready()"),
              this.managerPromise.then(() => {
                this.clearSafetyTimer("onAdsManagerLoaded()");
              }),
              this.listeners(),
              this.setupIMA();
          }),
          Ai(this, "setupIMA", () => {
            (this.elements.container = Cr("div", {
              class: this.player.config.classNames.ads,
            })),
              this.player.elements.container.appendChild(
                this.elements.container
              ),
              google.ima.settings.setVpaidMode(
                google.ima.ImaSdkSettings.VpaidMode.ENABLED
              ),
              google.ima.settings.setLocale(this.player.config.ads.language),
              google.ima.settings.setDisableCustomPlaybackForIOS10Plus(
                this.player.config.playsinline
              ),
              (this.elements.displayContainer =
                new google.ima.AdDisplayContainer(
                  this.elements.container,
                  this.player.media
                )),
              (this.loader = new google.ima.AdsLoader(
                this.elements.displayContainer
              )),
              this.loader.addEventListener(
                google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
                (e) => this.onAdsManagerLoaded(e),
                !1
              ),
              this.loader.addEventListener(
                google.ima.AdErrorEvent.Type.AD_ERROR,
                (e) => this.onAdError(e),
                !1
              ),
              this.requestAds();
          }),
          Ai(this, "requestAds", () => {
            const { container: e } = this.player.elements;
            try {
              const t = new google.ima.AdsRequest();
              (t.adTagUrl = this.tagUrl),
                (t.linearAdSlotWidth = e.offsetWidth),
                (t.linearAdSlotHeight = e.offsetHeight),
                (t.nonLinearAdSlotWidth = e.offsetWidth),
                (t.nonLinearAdSlotHeight = e.offsetHeight),
                (t.forceNonLinearFullSlot = !1),
                t.setAdWillPlayMuted(!this.player.muted),
                this.loader.requestAds(t);
            } catch (e) {
              this.onAdError(e);
            }
          }),
          Ai(this, "pollCountdown", (e = !1) => {
            if (!e)
              return (
                clearInterval(this.countdownTimer),
                void this.elements.container.removeAttribute("data-badge-text")
              );
            this.countdownTimer = setInterval(() => {
              const e = vs(Math.max(this.manager.getRemainingTime(), 0)),
                t = `${ps.get("advertisement", this.player.config)} - ${e}`;
              this.elements.container.setAttribute("data-badge-text", t);
            }, 100);
          }),
          Ai(this, "onAdsManagerLoaded", (e) => {
            if (!this.enabled) return;
            const t = new google.ima.AdsRenderingSettings();
            (t.restoreCustomPlaybackStateOnAdBreakComplete = !0),
              (t.enablePreloading = !0),
              (this.manager = e.getAdsManager(this.player, t)),
              (this.cuePoints = this.manager.getCuePoints()),
              this.manager.addEventListener(
                google.ima.AdErrorEvent.Type.AD_ERROR,
                (e) => this.onAdError(e)
              ),
              Object.keys(google.ima.AdEvent.Type).forEach((e) => {
                this.manager.addEventListener(google.ima.AdEvent.Type[e], (e) =>
                  this.onAdEvent(e)
                );
              }),
              this.trigger("loaded");
          }),
          Ai(this, "addCuePoints", () => {
            br(this.cuePoints) ||
              this.cuePoints.forEach((e) => {
                if (0 !== e && -1 !== e && e < this.player.duration) {
                  const t = this.player.elements.progress;
                  if (pr(t)) {
                    const n = (100 / this.player.duration) * e,
                      i = Cr("span", {
                        class: this.player.config.classNames.cues,
                      });
                    (i.style.left = `${n.toString()}%`), t.appendChild(i);
                  }
                }
              });
          }),
          Ai(this, "onAdEvent", (e) => {
            const { container: t } = this.player.elements,
              n = e.getAd(),
              i = e.getAdData();
            switch (
              (((e) => {
                Kr.call(
                  this.player,
                  this.player.media,
                  `ads${e.replace(/_/g, "").toLowerCase()}`
                );
              })(e.type),
              e.type)
            ) {
              case google.ima.AdEvent.Type.LOADED:
                this.trigger("loaded"),
                  this.pollCountdown(!0),
                  n.isLinear() ||
                    ((n.width = t.offsetWidth), (n.height = t.offsetHeight));
                break;
              case google.ima.AdEvent.Type.STARTED:
                this.manager.setVolume(this.player.volume);
                break;
              case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                this.player.ended
                  ? this.loadAds()
                  : this.loader.contentComplete();
                break;
              case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                this.pauseContent();
                break;
              case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                this.pollCountdown(), this.resumeContent();
                break;
              case google.ima.AdEvent.Type.LOG:
                i.adError &&
                  this.player.debug.warn(
                    `Non-fatal ad error: ${i.adError.getMessage()}`
                  );
            }
          }),
          Ai(this, "onAdError", (e) => {
            this.cancel(), this.player.debug.warn("Ads error", e);
          }),
          Ai(this, "listeners", () => {
            const { container: e } = this.player.elements;
            let t;
            this.player.on("canplay", () => {
              this.addCuePoints();
            }),
              this.player.on("ended", () => {
                this.loader.contentComplete();
              }),
              this.player.on("timeupdate", () => {
                t = this.player.currentTime;
              }),
              this.player.on("seeked", () => {
                const e = this.player.currentTime;
                br(this.cuePoints) ||
                  this.cuePoints.forEach((n, i) => {
                    t < n &&
                      n < e &&
                      (this.manager.discardAdBreak(),
                      this.cuePoints.splice(i, 1));
                  });
              }),
              window.addEventListener("resize", () => {
                this.manager &&
                  this.manager.resize(
                    e.offsetWidth,
                    e.offsetHeight,
                    google.ima.ViewMode.NORMAL
                  );
              });
          }),
          Ai(this, "play", () => {
            const { container: e } = this.player.elements;
            this.managerPromise || this.resumeContent(),
              this.managerPromise
                .then(() => {
                  this.manager.setVolume(this.player.volume),
                    this.elements.displayContainer.initialize();
                  try {
                    this.initialized ||
                      (this.manager.init(
                        e.offsetWidth,
                        e.offsetHeight,
                        google.ima.ViewMode.NORMAL
                      ),
                      this.manager.start()),
                      (this.initialized = !0);
                  } catch (e) {
                    this.onAdError(e);
                  }
                })
                .catch(() => {});
          }),
          Ai(this, "resumeContent", () => {
            (this.elements.container.style.zIndex = ""),
              (this.playing = !1),
              Xr(this.player.media.play());
          }),
          Ai(this, "pauseContent", () => {
            (this.elements.container.style.zIndex = 3),
              (this.playing = !0),
              this.player.media.pause();
          }),
          Ai(this, "cancel", () => {
            this.initialized && this.resumeContent(),
              this.trigger("error"),
              this.loadAds();
          }),
          Ai(this, "loadAds", () => {
            this.managerPromise
              .then(() => {
                this.manager && this.manager.destroy(),
                  (this.managerPromise = new Promise((e) => {
                    this.on("loaded", e), this.player.debug.log(this.manager);
                  })),
                  (this.initialized = !1),
                  this.requestAds();
              })
              .catch(() => {});
          }),
          Ai(this, "trigger", (e, ...t) => {
            const n = this.events[e];
            hr(n) &&
              n.forEach((e) => {
                ur(e) && e.apply(this, t);
              });
          }),
          Ai(
            this,
            "on",
            (e, t) => (
              hr(this.events[e]) || (this.events[e] = []),
              this.events[e].push(t),
              this
            )
          ),
          Ai(this, "startSafetyTimer", (e, t) => {
            this.player.debug.log(`Safety timer invoked from: ${t}`),
              (this.safetyTimer = setTimeout(() => {
                this.cancel(), this.clearSafetyTimer("startSafetyTimer()");
              }, e));
          }),
          Ai(this, "clearSafetyTimer", (e) => {
            sr(this.safetyTimer) ||
              (this.player.debug.log(`Safety timer cleared from: ${e}`),
              clearTimeout(this.safetyTimer),
              (this.safetyTimer = null));
          }),
          (this.player = e),
          (this.config = e.config.ads),
          (this.playing = !1),
          (this.initialized = !1),
          (this.elements = { container: null, displayContainer: null }),
          (this.manager = null),
          (this.loader = null),
          (this.cuePoints = null),
          (this.events = {}),
          (this.safetyTimer = null),
          (this.countdownTimer = null),
          (this.managerPromise = new Promise((e, t) => {
            this.on("loaded", e), this.on("error", t);
          })),
          this.load();
      }
      get enabled() {
        const { config: e } = this;
        return (
          this.player.isHTML5 &&
          this.player.isVideo &&
          e.enabled &&
          (!br(e.publisherId) || vr(e.tagUrl))
        );
      }
      get tagUrl() {
        const { config: e } = this;
        if (vr(e.tagUrl)) return e.tagUrl;
        return `https://go.aniview.com/api/adserver6/vast/?${_s({
          AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
          AV_CHANNELID: "5a0458dc28a06145e4519d21",
          AV_URL: window.location.hostname,
          cb: Date.now(),
          AV_WIDTH: 640,
          AV_HEIGHT: 480,
          AV_CDIM2: e.publisherId,
        })}`;
      }
    }
    function Vs(e = 0, t = 0, n = 255) {
      return Math.min(Math.max(e, t), n);
    }
    const zs = (e) => {
        const t = [];
        return (
          e.split(/\r\n\r\n|\n\n|\r\r/).forEach((e) => {
            const n = {};
            e.split(/\r\n|\n|\r/).forEach((e) => {
              if (ar(n.startTime)) {
                if (!br(e.trim()) && br(n.text)) {
                  const t = e.trim().split("#xywh=");
                  ([n.text] = t),
                    t[1] && ([n.x, n.y, n.w, n.h] = t[1].split(","));
                }
              } else {
                const t = e.match(
                  /([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/
                );
                t &&
                  ((n.startTime =
                    60 * Number(t[1] || 0) * 60 +
                    60 * Number(t[2]) +
                    Number(t[3]) +
                    Number(`0.${t[4]}`)),
                  (n.endTime =
                    60 * Number(t[6] || 0) * 60 +
                    60 * Number(t[7]) +
                    Number(t[8]) +
                    Number(`0.${t[9]}`)));
              }
            }),
              n.text && t.push(n);
          }),
          t
        );
      },
      Ws = (e, t) => {
        const n = {};
        return (
          e > t.width / t.height
            ? ((n.width = t.width), (n.height = (1 / e) * t.width))
            : ((n.height = t.height), (n.width = e * t.height)),
          n
        );
      };
    class Ks {
      constructor(e) {
        Ai(this, "load", () => {
          this.player.elements.display.seekTooltip &&
            (this.player.elements.display.seekTooltip.hidden = this.enabled),
            this.enabled &&
              this.getThumbnails().then(() => {
                this.enabled &&
                  (this.render(),
                  this.determineContainerAutoSizing(),
                  (this.loaded = !0));
              });
        }),
          Ai(
            this,
            "getThumbnails",
            () =>
              new Promise((e) => {
                const { src: t } = this.player.config.previewThumbnails;
                if (br(t))
                  throw new Error(
                    "Missing previewThumbnails.src config attribute"
                  );
                const n = () => {
                  this.thumbnails.sort((e, t) => e.height - t.height),
                    this.player.debug.log(
                      "Preview thumbnails",
                      this.thumbnails
                    ),
                    e();
                };
                if (ur(t))
                  t((e) => {
                    (this.thumbnails = e), n();
                  });
                else {
                  const e = (lr(t) ? [t] : t).map((e) => this.getThumbnail(e));
                  Promise.all(e).then(n);
                }
              })
          ),
          Ai(
            this,
            "getThumbnail",
            (e) =>
              new Promise((t) => {
                ms(e).then((n) => {
                  const i = { frames: zs(n), height: null, urlPrefix: "" };
                  i.frames[0].text.startsWith("/") ||
                    i.frames[0].text.startsWith("http://") ||
                    i.frames[0].text.startsWith("https://") ||
                    (i.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
                  const r = new Image();
                  (r.onload = () => {
                    (i.height = r.naturalHeight),
                      (i.width = r.naturalWidth),
                      this.thumbnails.push(i),
                      t();
                  }),
                    (r.src = i.urlPrefix + i.frames[0].text);
                });
              })
          ),
          Ai(this, "startMove", (e) => {
            if (
              this.loaded &&
              fr(e) &&
              ["touchmove", "mousemove"].includes(e.type) &&
              this.player.media.duration
            ) {
              if ("touchmove" === e.type)
                this.seekTime =
                  this.player.media.duration *
                  (this.player.elements.inputs.seek.value / 100);
              else {
                var t, n;
                const i = this.player.elements.progress.getBoundingClientRect(),
                  r = (100 / i.width) * (e.pageX - i.left);
                (this.seekTime = this.player.media.duration * (r / 100)),
                  this.seekTime < 0 && (this.seekTime = 0),
                  this.seekTime > this.player.media.duration - 1 &&
                    (this.seekTime = this.player.media.duration - 1),
                  (this.mousePosX = e.pageX),
                  (this.elements.thumb.time.innerText = vs(this.seekTime));
                const s =
                  null === (t = this.player.config.markers) ||
                  void 0 === t ||
                  null === (n = t.points) ||
                  void 0 === n
                    ? void 0
                    : n.find(({ time: e }) => e === Math.round(this.seekTime));
                s &&
                  this.elements.thumb.time.insertAdjacentHTML(
                    "afterbegin",
                    `${s.label}<br>`
                  );
              }
              this.showImageAtCurrentTime();
            }
          }),
          Ai(this, "endMove", () => {
            this.toggleThumbContainer(!1, !0);
          }),
          Ai(this, "startScrubbing", (e) => {
            (sr(e.button) || !1 === e.button || 0 === e.button) &&
              ((this.mouseDown = !0),
              this.player.media.duration &&
                (this.toggleScrubbingContainer(!0),
                this.toggleThumbContainer(!1, !0),
                this.showImageAtCurrentTime()));
          }),
          Ai(this, "endScrubbing", () => {
            (this.mouseDown = !1),
              Math.ceil(this.lastTime) ===
              Math.ceil(this.player.media.currentTime)
                ? this.toggleScrubbingContainer(!1)
                : Wr.call(this.player, this.player.media, "timeupdate", () => {
                    this.mouseDown || this.toggleScrubbingContainer(!1);
                  });
          }),
          Ai(this, "listeners", () => {
            this.player.on("play", () => {
              this.toggleThumbContainer(!1, !0);
            }),
              this.player.on("seeked", () => {
                this.toggleThumbContainer(!1);
              }),
              this.player.on("timeupdate", () => {
                this.lastTime = this.player.media.currentTime;
              });
          }),
          Ai(this, "render", () => {
            (this.elements.thumb.container = Cr("div", {
              class:
                this.player.config.classNames.previewThumbnails.thumbContainer,
            })),
              (this.elements.thumb.imageContainer = Cr("div", {
                class:
                  this.player.config.classNames.previewThumbnails
                    .imageContainer,
              })),
              this.elements.thumb.container.appendChild(
                this.elements.thumb.imageContainer
              );
            const e = Cr("div", {
              class:
                this.player.config.classNames.previewThumbnails.timeContainer,
            });
            (this.elements.thumb.time = Cr("span", {}, "00:00")),
              e.appendChild(this.elements.thumb.time),
              this.elements.thumb.imageContainer.appendChild(e),
              pr(this.player.elements.progress) &&
                this.player.elements.progress.appendChild(
                  this.elements.thumb.container
                ),
              (this.elements.scrubbing.container = Cr("div", {
                class:
                  this.player.config.classNames.previewThumbnails
                    .scrubbingContainer,
              })),
              this.player.elements.wrapper.appendChild(
                this.elements.scrubbing.container
              );
          }),
          Ai(this, "destroy", () => {
            this.elements.thumb.container &&
              this.elements.thumb.container.remove(),
              this.elements.scrubbing.container &&
                this.elements.scrubbing.container.remove();
          }),
          Ai(this, "showImageAtCurrentTime", () => {
            this.mouseDown
              ? this.setScrubbingContainerSize()
              : this.setThumbContainerSizeAndPos();
            const e = this.thumbnails[0].frames.findIndex(
                (e) =>
                  this.seekTime >= e.startTime && this.seekTime <= e.endTime
              ),
              t = e >= 0;
            let n = 0;
            this.mouseDown || this.toggleThumbContainer(t),
              t &&
                (this.thumbnails.forEach((t, i) => {
                  this.loadedImages.includes(t.frames[e].text) && (n = i);
                }),
                e !== this.showingThumb &&
                  ((this.showingThumb = e), this.loadImage(n)));
          }),
          Ai(this, "loadImage", (e = 0) => {
            const t = this.showingThumb,
              n = this.thumbnails[e],
              { urlPrefix: i } = n,
              r = n.frames[t],
              s = n.frames[t].text,
              o = i + s;
            if (
              this.currentImageElement &&
              this.currentImageElement.dataset.filename === s
            )
              this.showImage(this.currentImageElement, r, e, t, s, !1),
                (this.currentImageElement.dataset.index = t),
                this.removeOldImages(this.currentImageElement);
            else {
              this.loadingImage &&
                this.usingSprites &&
                (this.loadingImage.onload = null);
              const n = new Image();
              (n.src = o),
                (n.dataset.index = t),
                (n.dataset.filename = s),
                (this.showingThumbFilename = s),
                this.player.debug.log(`Loading image: ${o}`),
                (n.onload = () => this.showImage(n, r, e, t, s, !0)),
                (this.loadingImage = n),
                this.removeOldImages(n);
            }
          }),
          Ai(this, "showImage", (e, t, n, i, r, s = !0) => {
            this.player.debug.log(
              `Showing thumb: ${r}. num: ${i}. qual: ${n}. newimg: ${s}`
            ),
              this.setImageSizeAndOffset(e, t),
              s &&
                (this.currentImageContainer.appendChild(e),
                (this.currentImageElement = e),
                this.loadedImages.includes(r) || this.loadedImages.push(r)),
              this.preloadNearby(i, !0)
                .then(this.preloadNearby(i, !1))
                .then(this.getHigherQuality(n, e, t, r));
          }),
          Ai(this, "removeOldImages", (e) => {
            Array.from(this.currentImageContainer.children).forEach((t) => {
              if ("img" !== t.tagName.toLowerCase()) return;
              const n = this.usingSprites ? 500 : 1e3;
              if (t.dataset.index !== e.dataset.index && !t.dataset.deleting) {
                t.dataset.deleting = !0;
                const { currentImageContainer: e } = this;
                setTimeout(() => {
                  e.removeChild(t),
                    this.player.debug.log(
                      `Removing thumb: ${t.dataset.filename}`
                    );
                }, n);
              }
            });
          }),
          Ai(
            this,
            "preloadNearby",
            (e, t = !0) =>
              new Promise((n) => {
                setTimeout(() => {
                  const i = this.thumbnails[0].frames[e].text;
                  if (this.showingThumbFilename === i) {
                    let r;
                    r = t
                      ? this.thumbnails[0].frames.slice(e)
                      : this.thumbnails[0].frames.slice(0, e).reverse();
                    let s = !1;
                    r.forEach((e) => {
                      const t = e.text;
                      if (t !== i && !this.loadedImages.includes(t)) {
                        (s = !0),
                          this.player.debug.log(
                            `Preloading thumb filename: ${t}`
                          );
                        const { urlPrefix: e } = this.thumbnails[0],
                          i = e + t,
                          r = new Image();
                        (r.src = i),
                          (r.onload = () => {
                            this.player.debug.log(
                              `Preloaded thumb filename: ${t}`
                            ),
                              this.loadedImages.includes(t) ||
                                this.loadedImages.push(t),
                              n();
                          });
                      }
                    }),
                      s || n();
                  }
                }, 300);
              })
          ),
          Ai(this, "getHigherQuality", (e, t, n, i) => {
            if (e < this.thumbnails.length - 1) {
              let r = t.naturalHeight;
              this.usingSprites && (r = n.h),
                r < this.thumbContainerHeight &&
                  setTimeout(() => {
                    this.showingThumbFilename === i &&
                      (this.player.debug.log(
                        `Showing higher quality thumb for: ${i}`
                      ),
                      this.loadImage(e + 1));
                  }, 300);
            }
          }),
          Ai(this, "toggleThumbContainer", (e = !1, t = !1) => {
            const n =
              this.player.config.classNames.previewThumbnails
                .thumbContainerShown;
            this.elements.thumb.container.classList.toggle(n, e),
              !e &&
                t &&
                ((this.showingThumb = null),
                (this.showingThumbFilename = null));
          }),
          Ai(this, "toggleScrubbingContainer", (e = !1) => {
            const t =
              this.player.config.classNames.previewThumbnails
                .scrubbingContainerShown;
            this.elements.scrubbing.container.classList.toggle(t, e),
              e ||
                ((this.showingThumb = null),
                (this.showingThumbFilename = null));
          }),
          Ai(this, "determineContainerAutoSizing", () => {
            (this.elements.thumb.imageContainer.clientHeight > 20 ||
              this.elements.thumb.imageContainer.clientWidth > 20) &&
              (this.sizeSpecifiedInCSS = !0);
          }),
          Ai(this, "setThumbContainerSizeAndPos", () => {
            const { imageContainer: e } = this.elements.thumb;
            if (this.sizeSpecifiedInCSS) {
              if (e.clientHeight > 20 && e.clientWidth < 20) {
                const t = Math.floor(e.clientHeight * this.thumbAspectRatio);
                e.style.width = `${t}px`;
              } else if (e.clientHeight < 20 && e.clientWidth > 20) {
                const t = Math.floor(e.clientWidth / this.thumbAspectRatio);
                e.style.height = `${t}px`;
              }
            } else {
              const t = Math.floor(
                this.thumbContainerHeight * this.thumbAspectRatio
              );
              (e.style.height = `${this.thumbContainerHeight}px`),
                (e.style.width = `${t}px`);
            }
            this.setThumbContainerPos();
          }),
          Ai(this, "setThumbContainerPos", () => {
            const e = this.player.elements.progress.getBoundingClientRect(),
              t = this.player.elements.container.getBoundingClientRect(),
              { container: n } = this.elements.thumb,
              i = t.left - e.left + 10,
              r = t.right - e.left - n.clientWidth - 10,
              s = this.mousePosX - e.left - n.clientWidth / 2,
              o = Vs(s, i, r);
            (n.style.left = `${o}px`),
              n.style.setProperty("--preview-arrow-offset", s - o + "px");
          }),
          Ai(this, "setScrubbingContainerSize", () => {
            const { width: e, height: t } = Ws(this.thumbAspectRatio, {
              width: this.player.media.clientWidth,
              height: this.player.media.clientHeight,
            });
            (this.elements.scrubbing.container.style.width = `${e}px`),
              (this.elements.scrubbing.container.style.height = `${t}px`);
          }),
          Ai(this, "setImageSizeAndOffset", (e, t) => {
            if (!this.usingSprites) return;
            const n = this.thumbContainerHeight / t.h;
            (e.style.height = e.naturalHeight * n + "px"),
              (e.style.width = e.naturalWidth * n + "px"),
              (e.style.left = `-${t.x * n}px`),
              (e.style.top = `-${t.y * n}px`);
          }),
          (this.player = e),
          (this.thumbnails = []),
          (this.loaded = !1),
          (this.lastMouseMoveTime = Date.now()),
          (this.mouseDown = !1),
          (this.loadedImages = []),
          (this.elements = { thumb: {}, scrubbing: {} }),
          this.load();
      }
      get enabled() {
        return (
          this.player.isHTML5 &&
          this.player.isVideo &&
          this.player.config.previewThumbnails.enabled
        );
      }
      get currentImageContainer() {
        return this.mouseDown
          ? this.elements.scrubbing.container
          : this.elements.thumb.imageContainer;
      }
      get usingSprites() {
        return Object.keys(this.thumbnails[0].frames[0]).includes("w");
      }
      get thumbAspectRatio() {
        return this.usingSprites
          ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h
          : this.thumbnails[0].width / this.thumbnails[0].height;
      }
      get thumbContainerHeight() {
        if (this.mouseDown) {
          const { height: e } = Ws(this.thumbAspectRatio, {
            width: this.player.media.clientWidth,
            height: this.player.media.clientHeight,
          });
          return e;
        }
        return this.sizeSpecifiedInCSS
          ? this.elements.thumb.imageContainer.clientHeight
          : Math.floor(
              this.player.media.clientWidth / this.thumbAspectRatio / 4
            );
      }
      get currentImageElement() {
        return this.mouseDown
          ? this.currentScrubbingImageElement
          : this.currentThumbnailImageElement;
      }
      set currentImageElement(e) {
        this.mouseDown
          ? (this.currentScrubbingImageElement = e)
          : (this.currentThumbnailImageElement = e);
      }
    }
    const Ys = {
      insertElements(e, t) {
        lr(t)
          ? Ar(e, this.media, { src: t })
          : hr(t) &&
            t.forEach((t) => {
              Ar(e, this.media, t);
            });
      },
      change(e) {
        Tr(e, "sources.length")
          ? (os.cancelRequests.call(this),
            this.destroy.call(
              this,
              () => {
                (this.options.quality = []),
                  Pr(this.media),
                  (this.media = null),
                  pr(this.elements.container) &&
                    this.elements.container.removeAttribute("class");
                const { sources: t, type: n } = e,
                  [{ provider: i = xs.html5, src: r }] = t,
                  s = "html5" === i ? n : "div",
                  o = "html5" === i ? {} : { src: r };
                Object.assign(this, {
                  provider: i,
                  type: n,
                  supported: Fr.check(n, i, this.config.playsinline),
                  media: Cr(s, o),
                }),
                  this.elements.container.appendChild(this.media),
                  cr(e.autoplay) && (this.config.autoplay = e.autoplay),
                  this.isHTML5 &&
                    (this.config.crossorigin &&
                      this.media.setAttribute("crossorigin", ""),
                    this.config.autoplay &&
                      this.media.setAttribute("autoplay", ""),
                    br(e.poster) || (this.poster = e.poster),
                    this.config.loop.active &&
                      this.media.setAttribute("loop", ""),
                    this.config.muted && this.media.setAttribute("muted", ""),
                    this.config.playsinline &&
                      this.media.setAttribute("playsinline", "")),
                  Ms.addStyleHook.call(this),
                  this.isHTML5 && Ys.insertElements.call(this, "source", t),
                  (this.config.title = e.title),
                  Bs.setup.call(this),
                  this.isHTML5 &&
                    Object.keys(e).includes("tracks") &&
                    Ys.insertElements.call(this, "track", e.tracks),
                  (this.isHTML5 || (this.isEmbed && !this.supported.ui)) &&
                    Ms.build.call(this),
                  this.isHTML5 && this.media.load(),
                  br(e.previewThumbnails) ||
                    (Object.assign(
                      this.config.previewThumbnails,
                      e.previewThumbnails
                    ),
                    this.previewThumbnails &&
                      this.previewThumbnails.loaded &&
                      (this.previewThumbnails.destroy(),
                      (this.previewThumbnails = null)),
                    this.config.previewThumbnails.enabled &&
                      (this.previewThumbnails = new Ks(this))),
                  this.fullscreen.update();
              },
              !0
            ))
          : this.debug.warn("Invalid source format");
      },
    };
    class Js {
      constructor(e, t) {
        if (
          (Ai(this, "play", () =>
            ur(this.media.play)
              ? (this.ads &&
                  this.ads.enabled &&
                  this.ads.managerPromise
                    .then(() => this.ads.play())
                    .catch(() => Xr(this.media.play())),
                this.media.play())
              : null
          ),
          Ai(this, "pause", () =>
            this.playing && ur(this.media.pause) ? this.media.pause() : null
          ),
          Ai(this, "togglePlay", (e) =>
            (cr(e) ? e : !this.playing) ? this.play() : this.pause()
          ),
          Ai(this, "stop", () => {
            this.isHTML5
              ? (this.pause(), this.restart())
              : ur(this.media.stop) && this.media.stop();
          }),
          Ai(this, "restart", () => {
            this.currentTime = 0;
          }),
          Ai(this, "rewind", (e) => {
            this.currentTime -= ar(e) ? e : this.config.seekTime;
          }),
          Ai(this, "forward", (e) => {
            this.currentTime += ar(e) ? e : this.config.seekTime;
          }),
          Ai(this, "increaseVolume", (e) => {
            const t = this.media.muted ? 0 : this.volume;
            this.volume = t + (ar(e) ? e : 0);
          }),
          Ai(this, "decreaseVolume", (e) => {
            this.increaseVolume(-e);
          }),
          Ai(this, "airplay", () => {
            Fr.airplay && this.media.webkitShowPlaybackTargetPicker();
          }),
          Ai(this, "toggleControls", (e) => {
            if (this.supported.ui && !this.isAudio) {
              const t = jr(
                  this.elements.container,
                  this.config.classNames.hideControls
                ),
                n = void 0 === e ? void 0 : !e,
                i = Ir(
                  this.elements.container,
                  this.config.classNames.hideControls,
                  n
                );
              if (
                (i &&
                  hr(this.config.controls) &&
                  this.config.controls.includes("settings") &&
                  !br(this.config.settings) &&
                  bs.toggleMenu.call(this, !1),
                i !== t)
              ) {
                const e = i ? "controlshidden" : "controlsshown";
                Kr.call(this, this.media, e);
              }
              return !i;
            }
            return !1;
          }),
          Ai(this, "on", (e, t) => {
            Vr.call(this, this.elements.container, e, t);
          }),
          Ai(this, "once", (e, t) => {
            Wr.call(this, this.elements.container, e, t);
          }),
          Ai(this, "off", (e, t) => {
            zr(this.elements.container, e, t);
          }),
          Ai(this, "destroy", (e, t = !1) => {
            if (!this.ready) return;
            const n = () => {
              (document.body.style.overflow = ""),
                (this.embed = null),
                t
                  ? (Object.keys(this.elements).length &&
                      (Pr(this.elements.buttons.play),
                      Pr(this.elements.captions),
                      Pr(this.elements.controls),
                      Pr(this.elements.wrapper),
                      (this.elements.buttons.play = null),
                      (this.elements.captions = null),
                      (this.elements.controls = null),
                      (this.elements.wrapper = null)),
                    ur(e) && e())
                  : (Yr.call(this),
                    os.cancelRequests.call(this),
                    Nr(this.elements.original, this.elements.container),
                    Kr.call(this, this.elements.original, "destroyed", !0),
                    ur(e) && e.call(this.elements.original),
                    (this.ready = !1),
                    setTimeout(() => {
                      (this.elements = null), (this.media = null);
                    }, 200));
            };
            this.stop(),
              clearTimeout(this.timers.loading),
              clearTimeout(this.timers.controls),
              clearTimeout(this.timers.resized),
              this.isHTML5
                ? (Ms.toggleNativeControls.call(this, !0), n())
                : this.isYouTube
                ? (clearInterval(this.timers.buffering),
                  clearInterval(this.timers.playing),
                  null !== this.embed &&
                    ur(this.embed.destroy) &&
                    this.embed.destroy(),
                  n())
                : this.isVimeo &&
                  (null !== this.embed && this.embed.unload().then(n),
                  setTimeout(n, 200));
          }),
          Ai(this, "supports", (e) => Fr.mime.call(this, e)),
          (this.timers = {}),
          (this.ready = !1),
          (this.loading = !1),
          (this.failed = !1),
          (this.touch = Fr.touch),
          (this.media = e),
          lr(this.media) &&
            (this.media = document.querySelectorAll(this.media)),
          ((window.jQuery && this.media instanceof jQuery) ||
            dr(this.media) ||
            hr(this.media)) &&
            (this.media = this.media[0]),
          (this.config = Er(
            {},
            Ts,
            Js.defaults,
            t || {},
            (() => {
              try {
                return JSON.parse(this.media.getAttribute("data-plyr-config"));
              } catch (e) {
                return {};
              }
            })()
          )),
          (this.elements = {
            container: null,
            fullscreen: null,
            captions: null,
            buttons: {},
            display: {},
            progress: {},
            inputs: {},
            settings: { popup: null, menu: null, panels: {}, buttons: {} },
          }),
          (this.captions = {
            active: null,
            currentTrack: -1,
            meta: new WeakMap(),
          }),
          (this.fullscreen = { active: !1 }),
          (this.options = { speed: [], quality: [] }),
          (this.debug = new Os(this.config.debug)),
          this.debug.log("Config", this.config),
          this.debug.log("Support", Fr),
          sr(this.media) || !pr(this.media))
        )
          return void this.debug.error(
            "Setup failed: no suitable element passed"
          );
        if (this.media.plyr)
          return void this.debug.warn("Target already setup");
        if (!this.config.enabled)
          return void this.debug.error("Setup failed: disabled by config");
        if (!Fr.check().api)
          return void this.debug.error("Setup failed: no support");
        const n = this.media.cloneNode(!0);
        (n.autoplay = !1), (this.elements.original = n);
        const i = this.media.tagName.toLowerCase();
        let r = null,
          s = null;
        switch (i) {
          case "div":
            if (((r = this.media.querySelector("iframe")), pr(r))) {
              if (
                ((s = ws(r.getAttribute("src"))),
                (this.provider = (function (e) {
                  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
                    e
                  )
                    ? xs.youtube
                    : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(
                        e
                      )
                    ? xs.vimeo
                    : null;
                })(s.toString())),
                (this.elements.container = this.media),
                (this.media = r),
                (this.elements.container.className = ""),
                s.search.length)
              ) {
                const e = ["1", "true"];
                e.includes(s.searchParams.get("autoplay")) &&
                  (this.config.autoplay = !0),
                  e.includes(s.searchParams.get("loop")) &&
                    (this.config.loop.active = !0),
                  this.isYouTube
                    ? ((this.config.playsinline = e.includes(
                        s.searchParams.get("playsinline")
                      )),
                      (this.config.youtube.hl = s.searchParams.get("hl")))
                    : (this.config.playsinline = !0);
              }
            } else
              (this.provider = this.media.getAttribute(
                this.config.attributes.embed.provider
              )),
                this.media.removeAttribute(
                  this.config.attributes.embed.provider
                );
            if (br(this.provider) || !Object.values(xs).includes(this.provider))
              return void this.debug.error("Setup failed: Invalid provider");
            this.type = As;
            break;
          case "video":
          case "audio":
            (this.type = i),
              (this.provider = xs.html5),
              this.media.hasAttribute("crossorigin") &&
                (this.config.crossorigin = !0),
              this.media.hasAttribute("autoplay") &&
                (this.config.autoplay = !0),
              (this.media.hasAttribute("playsinline") ||
                this.media.hasAttribute("webkit-playsinline")) &&
                (this.config.playsinline = !0),
              this.media.hasAttribute("muted") && (this.config.muted = !0),
              this.media.hasAttribute("loop") && (this.config.loop.active = !0);
            break;
          default:
            return void this.debug.error("Setup failed: unsupported type");
        }
        (this.supported = Fr.check(
          this.type,
          this.provider,
          this.config.playsinline
        )),
          this.supported.api
            ? ((this.eventListeners = []),
              (this.listeners = new Is(this)),
              (this.storage = new fs(this)),
              (this.media.plyr = this),
              pr(this.elements.container) ||
                ((this.elements.container = Cr("div", { tabindex: 0 })),
                Sr(this.media, this.elements.container)),
              Ms.migrateStyles.call(this),
              Ms.addStyleHook.call(this),
              Bs.setup.call(this),
              this.config.debug &&
                Vr.call(
                  this,
                  this.elements.container,
                  this.config.events.join(" "),
                  (e) => {
                    this.debug.log(`event: ${e.type}`);
                  }
                ),
              (this.fullscreen = new Ns(this)),
              (this.isHTML5 || (this.isEmbed && !this.supported.ui)) &&
                Ms.build.call(this),
              this.listeners.container(),
              this.listeners.global(),
              this.config.ads.enabled && (this.ads = new Hs(this)),
              this.isHTML5 &&
                this.config.autoplay &&
                this.once("canplay", () => Xr(this.play())),
              (this.lastSeekTime = 0),
              this.config.previewThumbnails.enabled &&
                (this.previewThumbnails = new Ks(this)))
            : this.debug.error("Setup failed: no support");
      }
      get isHTML5() {
        return this.provider === xs.html5;
      }
      get isEmbed() {
        return this.isYouTube || this.isVimeo;
      }
      get isYouTube() {
        return this.provider === xs.youtube;
      }
      get isVimeo() {
        return this.provider === xs.vimeo;
      }
      get isVideo() {
        return this.type === As;
      }
      get isAudio() {
        return this.type === Cs;
      }
      get playing() {
        return Boolean(this.ready && !this.paused && !this.ended);
      }
      get paused() {
        return Boolean(this.media.paused);
      }
      get stopped() {
        return Boolean(this.paused && 0 === this.currentTime);
      }
      get ended() {
        return Boolean(this.media.ended);
      }
      set currentTime(e) {
        if (!this.duration) return;
        const t = ar(e) && e > 0;
        (this.media.currentTime = t ? Math.min(e, this.duration) : 0),
          this.debug.log(`Seeking to ${this.currentTime} seconds`);
      }
      get currentTime() {
        return Number(this.media.currentTime);
      }
      get buffered() {
        const { buffered: e } = this.media;
        return ar(e)
          ? e
          : e && e.length && this.duration > 0
          ? e.end(0) / this.duration
          : 0;
      }
      get seeking() {
        return Boolean(this.media.seeking);
      }
      get duration() {
        const e = parseFloat(this.config.duration),
          t = (this.media || {}).duration,
          n = ar(t) && t !== 1 / 0 ? t : 0;
        return e || n;
      }
      set volume(e) {
        let t = e;
        lr(t) && (t = Number(t)),
          ar(t) || (t = this.storage.get("volume")),
          ar(t) || ({ volume: t } = this.config),
          t > 1 && (t = 1),
          t < 0 && (t = 0),
          (this.config.volume = t),
          (this.media.volume = t),
          !br(e) && this.muted && t > 0 && (this.muted = !1);
      }
      get volume() {
        return Number(this.media.volume);
      }
      set muted(e) {
        let t = e;
        cr(t) || (t = this.storage.get("muted")),
          cr(t) || (t = this.config.muted),
          (this.config.muted = t),
          (this.media.muted = t);
      }
      get muted() {
        return Boolean(this.media.muted);
      }
      get hasAudio() {
        return (
          !this.isHTML5 ||
          !!this.isAudio ||
          Boolean(this.media.mozHasAudio) ||
          Boolean(this.media.webkitAudioDecodedByteCount) ||
          Boolean(this.media.audioTracks && this.media.audioTracks.length)
        );
      }
      set speed(e) {
        let t = null;
        ar(e) && (t = e),
          ar(t) || (t = this.storage.get("speed")),
          ar(t) || (t = this.config.speed.selected);
        const { minimumSpeed: n, maximumSpeed: i } = this;
        (t = Vs(t, n, i)),
          (this.config.speed.selected = t),
          setTimeout(() => {
            this.media && (this.media.playbackRate = t);
          }, 0);
      }
      get speed() {
        return Number(this.media.playbackRate);
      }
      get minimumSpeed() {
        return this.isYouTube
          ? Math.min(...this.options.speed)
          : this.isVimeo
          ? 0.5
          : 0.0625;
      }
      get maximumSpeed() {
        return this.isYouTube
          ? Math.max(...this.options.speed)
          : this.isVimeo
          ? 2
          : 16;
      }
      set quality(e) {
        const t = this.config.quality,
          n = this.options.quality;
        if (!n.length) return;
        let i = [
            !br(e) && Number(e),
            this.storage.get("quality"),
            t.selected,
            t.default,
          ].find(ar),
          r = !0;
        if (!n.includes(i)) {
          const e = Qr(n, i);
          this.debug.warn(
            `Unsupported quality option: ${i}, using ${e} instead`
          ),
            (i = e),
            (r = !1);
        }
        (t.selected = i),
          (this.media.quality = i),
          r && this.storage.set({ quality: i });
      }
      get quality() {
        return this.media.quality;
      }
      set loop(e) {
        const t = cr(e) ? e : this.config.loop.active;
        (this.config.loop.active = t), (this.media.loop = t);
      }
      get loop() {
        return Boolean(this.media.loop);
      }
      set source(e) {
        Ys.change.call(this, e);
      }
      get source() {
        return this.media.currentSrc;
      }
      get download() {
        const { download: e } = this.config.urls;
        return vr(e) ? e : this.source;
      }
      set download(e) {
        vr(e) &&
          ((this.config.urls.download = e), bs.setDownloadUrl.call(this));
      }
      set poster(e) {
        this.isVideo
          ? Ms.setPoster.call(this, e, !1).catch(() => {})
          : this.debug.warn("Poster can only be set for video");
      }
      get poster() {
        return this.isVideo
          ? this.media.getAttribute("poster") ||
              this.media.getAttribute("data-poster")
          : null;
      }
      get ratio() {
        if (!this.isVideo) return null;
        const e = ns(is.call(this));
        return hr(e) ? e.join(":") : e;
      }
      set ratio(e) {
        this.isVideo
          ? lr(e) && ts(e)
            ? ((this.config.ratio = ns(e)), rs.call(this))
            : this.debug.error(`Invalid aspect ratio specified (${e})`)
          : this.debug.warn("Aspect ratio can only be set for video");
      }
      set autoplay(e) {
        this.config.autoplay = cr(e) ? e : this.config.autoplay;
      }
      get autoplay() {
        return Boolean(this.config.autoplay);
      }
      toggleCaptions(e) {
        ks.toggle.call(this, e, !1);
      }
      set currentTrack(e) {
        ks.set.call(this, e, !1), ks.setup.call(this);
      }
      get currentTrack() {
        const { toggled: e, currentTrack: t } = this.captions;
        return e ? t : -1;
      }
      set language(e) {
        ks.setLanguage.call(this, e, !1);
      }
      get language() {
        return (ks.getCurrentTrack.call(this) || {}).language;
      }
      set pip(e) {
        if (!Fr.pip) return;
        const t = cr(e) ? e : !this.pip;
        ur(this.media.webkitSetPresentationMode) &&
          this.media.webkitSetPresentationMode(t ? Es : Ss),
          ur(this.media.requestPictureInPicture) &&
            (!this.pip && t
              ? this.media.requestPictureInPicture()
              : this.pip && !t && document.exitPictureInPicture());
      }
      get pip() {
        return Fr.pip
          ? br(this.media.webkitPresentationMode)
            ? this.media === document.pictureInPictureElement
            : this.media.webkitPresentationMode === Es
          : null;
      }
      setPreviewThumbnails(e) {
        this.previewThumbnails &&
          this.previewThumbnails.loaded &&
          (this.previewThumbnails.destroy(), (this.previewThumbnails = null)),
          Object.assign(this.config.previewThumbnails, e),
          this.config.previewThumbnails.enabled &&
            (this.previewThumbnails = new Ks(this));
      }
      static supported(e, t, n) {
        return Fr.check(e, t, n);
      }
      static loadSprite(e, t) {
        return gs(e, t);
      }
      static setup(e, t = {}) {
        let n = null;
        return (
          lr(e)
            ? (n = Array.from(document.querySelectorAll(e)))
            : dr(e)
            ? (n = Array.from(e))
            : hr(e) && (n = e.filter(pr)),
          br(n) ? null : n.map((e) => new Js(e, t))
        );
      }
    }
    var Xs;
    Js.defaults = ((Xs = Ts), JSON.parse(JSON.stringify(Xs)));
    const Gs = {
        video: {
          type: "video",
          title: "View From A Blue Moon",
          sources: [
            {
              src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
              type: "video/mp4",
              size: 576,
            },
            {
              src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
              type: "video/mp4",
              size: 720,
            },
            {
              src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
              type: "video/mp4",
              size: 1080,
            },
            {
              src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4",
              type: "video/mp4",
              size: 1440,
            },
          ],
          poster:
            "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
          tracks: [
            {
              kind: "captions",
              label: "English",
              srclang: "en",
              src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt",
              default: !0,
            },
            {
              kind: "captions",
              label: "French",
              srclang: "fr",
              src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt",
            },
          ],
          previewThumbnails: {
            src: [
              "https://cdn.plyr.io/static/demo/thumbs/100p.vtt",
              "https://cdn.plyr.io/static/demo/thumbs/240p.vtt",
            ],
          },
        },
        audio: {
          type: "audio",
          title: "Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;",
          sources: [
            {
              src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3",
              type: "audio/mp3",
            },
            {
              src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg",
              type: "audio/ogg",
            },
          ],
        },
        youtube: {
          type: "video",
          sources: [
            {
              src: "https://youtube.com/watch?v=bTqVqk7FSmY",
              provider: "youtube",
            },
          ],
        },
        vimeo: {
          type: "video",
          sources: [{ src: "https://vimeo.com/40648169", provider: "vimeo" }],
        },
      },
      Qs = (e, t = "", n = !1) => e && e.classList[n ? "add" : "remove"](t);
    (() => {
      const e = "plyr.io";
      window.location.host.includes(e) &&
        Wn({
          dsn: "https://d4ad9866ad834437a4754e23937071e4@sentry.io/305555",
          whitelistUrls: [e].map(
            (e) => new RegExp(`https://(([a-z0-9])+(.))*${e}`)
          ),
        }),
        document.addEventListener("DOMContentLoaded", () => {
          Ci.setup(".js-shr", {
            count: { className: "button__count" },
            wrapper: { className: "button--with-count" },
          });
          const e = new Js("#player", {
            debug: !0,
            title: "View From A Blue Moon",
            iconUrl: "https://cdn.plyr.io/3.7.3/demo.svg",
            keyboard: { global: !0 },
            tooltips: { controls: !0 },
            captions: { active: !0 },
            previewThumbnails: {
              enabled: !0,
              src: [
                "https://cdn.plyr.io/static/demo/thumbs/100p.vtt",
                "https://cdn.plyr.io/static/demo/thumbs/240p.vtt",
              ],
            },
            vimeo: { referrerPolicy: "no-referrer" },
            mediaMetadata: {
              title: "View From A Blue Moon",
              album: "Sports",
              artist: "Brainfarm",
              artwork: [
                {
                  src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
                  type: "image/jpeg",
                },
              ],
            },
            markers: {
              enabled: !0,
              points: [
                { time: 10, label: "first marker" },
                { time: 40, label: "second marker" },
                { time: 120, label: "<strong>third</strong> marker" },
              ],
            },
          });
          window.player = e;
          const t = document.querySelectorAll("[data-source]"),
            n = Object.keys(Gs),
            i = Boolean(window.history && window.history.pushState);
          let r = window.location.hash.substring(1);
          const s = r.length;
          function o(e) {
            Array.from(t).forEach((e) => Qs(e.parentElement, "active", !1)),
              Qs(document.querySelector(`[data-source="${e}"]`), "active", !0),
              Array.from(document.querySelectorAll(".plyr__cite")).forEach(
                (e) => {
                  e.hidden = !0;
                }
              ),
              (document.querySelector(`.plyr__cite--${e}`).hidden = !1);
          }
          function a(t, i) {
            !n.includes(t) ||
              (!i && t === r) ||
              (!r.length && "video" === t) ||
              ((e.source = Gs[t]), (r = t), o(t));
          }
          Array.from(t).forEach((e) => {
            e.addEventListener("click", () => {
              const t = e.getAttribute("data-source");
              a(t), i && window.history.pushState({ type: t }, "", `#${t}`);
            });
          }),
            window.addEventListener("popstate", (e) => {
              e.state &&
                Object.keys(e.state).includes("type") &&
                a(e.state.type);
            }),
            s || (r = "video"),
            i &&
              n.includes(r) &&
              window.history.replaceState({ type: r }, "", s ? `#${r}` : ""),
            "video" !== r && a(r, !0),
            o(r);
        });
    })();
  })();
