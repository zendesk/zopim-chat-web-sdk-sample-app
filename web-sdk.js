/*!
 * Copyright Zendesk, Inc.
 * 
 * By downloading or accessing this software, You agree to the Zendesk Terms of Service (https://www.zendesk.com/company/terms) and Application Developer and API License Agreement (https://www.zendesk.com/company/application-developer-and-api-license-agreement) and acknowledge that such terms govern Your use of and access to the software.
 * 
 */
!function(e, t) {
"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.zChat = t() : e.zChat = t();
}(this, function() {
return function(e) {
function t(i) {
if (n[i]) return n[i].exports;
var o = n[i] = {
exports: {},
id: i,
loaded: !1
};
e[i].call(o.exports, o, o.exports, t);
o.loaded = !0;
return o.exports;
}
var n = {};
t.c = n;
return t(0);
}([ function(e, t, n) {
(function(t) {
e.exports = function() {
var e = n(2), i = e;
t(i, "web_sdk");
return i;
}();
}).call(t, n(1));
}, function(e, t) {
function n(e, t) {
if ("function" == typeof e && e.prototype && !e.__jx__no_fqname) {
e.prototype.__jx__fqname_chain = (e.prototype.__jx__fqname_chain || "") + " " + t;
e.prototype.__jx__fqname = t;
}
}
e.exports = n;
}, function(e, t, n) {
(function(t, i, o, r, s, a) {
e.exports = function() {
function e(e) {
if (pe || me) ne(new Error("Zendesk Chat Web SDK has already been initialized. Please ensure that zChat.init() is only called once in your code")); else {
var t = Ne.obj({
account_key: Ne.type("string").ok(),
suppress_console_error: Ne.type("boolean"),
override_proxy: Ne.type("string").ok()
}, {
requiredKeys: [ "account_key" ]
});
if (!ie([ t ], [ e ], "init()")) {
var n = new be("root"), i = new be("root");
Ie() && n.$("livechat").$("ui").$("mobile$bool").update(!0);
c(e, $e, n, i);
}
}
}
function c(e, t, n, i) {
de = t;
pe = n;
me = i;
K();
ge = function(e) {
Te.fire(e.type, e.detail);
};
De.on("data", ge);
_e = function(e) {
var t = e.path ? me.descend(e.path) : me;
t.update(e.update);
};
de.on("message", _e);
ye.ACCOUNT_KEY = e.account_key;
ve = e.suppress_console_error || !1;
Oe.init();
de.init({
root: pe,
overrideProxy: e.override_proxy,
isCookieDenied: function() {
return !1;
},
source: "web_sdk",
lastHost: Oe.DOM.getVariable("web_sdk_last_host"),
source_ver: "1.1.4"
});
pe.$("connection").$("server$string").bindValue(function(e) {
e && Oe.DOM.saveVariable("web_sdk_last_host", e);
});
ke.init(pe, de);
Ee.init(pe);
}
function u() {
de.reconnect();
}
function l() {
return De;
}
function f() {
return qe(me.$("livechat").$("profile").getValue());
}
function h(e, t) {
var n = "setVisitorInfo()", i = Ne.obj({
display_name: Ne.any([ Ne.equal(""), Ne.type("string").regex(Pe) ]),
email: Ne.any([ Ne.equal(""), Ne.type("string").regex(Ae.email) ]),
phone: Ne.any([ Ne.equal(""), Ne.type("string").regex(Re) ])
});
if (!ie([ i, je ], [ e, t ], n)) {
var o = {};
t = t || Le;
"display_name" in e && (o.display_name$string = e.display_name);
"email" in e && (o.email$string = e.email);
"phone" in e && (o.phone$string = e.phone);
pe.$("livechat").$("profile").write(o, se(t));
}
}
function d(e, t) {
var n = "sendChatMsg()", i = Ne.type("string").regex(Pe);
if (!ie([ i, je ], [ e, t ], n)) {
t = t || Le;
ke.sendChatMsg({
msg: e.trim()
}, null, se(t));
}
}
function p(e, t) {
var n = "sendFile()", i = Ne.chain(oe);
ie([ i, je ], [ e, t ], n) || m(e, t);
}
function m(e, t) {
t = t || Le;
$e.reconnectIfServerRetired(function() {
ke.sendFileWithCallback(e, t);
});
}
function g(e) {
var t = "getDepartment()", n = Ne.type("number");
if (!ie([ n ], [ e ], t)) return _(e);
}
function _(e) {
var t = me.$("livechat").$("departments").$(e).getValue();
if (t) return Be(t, e);
}
function v() {
return J(me.$("livechat").$("departments").getValue(), Be);
}
function w() {
var e = me.$("livechat").$("profile").$("department_id$int"), t = e.getValue();
return i(t) ? t : void 0;
}
function b(e, t) {
var n = "setVisitorDefaultDepartment()", i = Ne.type("number").chain(re);
if (!ie([ i, je ], [ e, t ], n)) {
t = t || Le;
pe.$("livechat").$("profile").write({
department_id$int: e
}, se(t));
}
}
function y(e) {
var t = "clearVisitorDefaultDepartment()";
if (!ie([ je ], [ e ], t)) {
e = e || Le;
pe.$("livechat").$("profile").write({
department_id$int: null
}, se(e));
}
}
function $(e, t) {
k("added$string", e, "addTag()", t);
}
function E(e, t) {
k("removed$string", e, "removeTag()", t);
}
function k(e, t, n, i) {
var o = Ne.type("string").regex(Pe).regex(/[^,]/);
if (!ie([ o, je ], [ t, i ], n)) {
i = i || Le;
var r = {};
r[e] = t.trim();
pe.$("livechat").$("channel").$("tags").write(r, se(i));
}
}
function S(e, t) {
var n = "sendVisitorPath()", i = Ne.obj({
title: Ne.type("string").regex(Pe),
url: Ne.type("string").regex(Me)
}, {
requiredKeys: [ "title", "url" ]
});
if (!ie([ i, je ], [ e, t ], n)) {
t = t || Le;
pe.$("livechat").$("session").$("page_path").write({
url$string: e.url,
title$string: e.title
}, se(t));
}
}
function x() {
var e = me.$("livechat").$("channel").$("rating$string").getValue(), t = me.$("livechat").$("channel").$("comment$string").getValue(), n = {};
o(e) || (n.rating = e);
o(t) || (n.comment = t);
return n;
}
function A(e, t) {
var n = "sendChatRating()", i = Ne.any([ Ne.equal(null), Ne.equal("good"), Ne.equal("bad") ]);
if (!ie([ i, je ], [ e, t ], n)) {
t = t || Le;
pe.$("livechat").$("channel").write({
rating$string: e
}, se(t));
}
}
function O(e, t) {
var n = "sendChatComment()", i = Ne.type("string");
if (!ie([ i, je ], [ e, t ], n)) {
t = t || Le;
pe.$("livechat").$("channel").write({
comment$string: e
}, se(t));
}
}
function C(e) {
var t = "endChat()", n = pe.$("livechat").$("channel");
if (!ie([ je ], [ e ], t)) {
e = e || Le;
n.write({
chatting$bool: !1
}, se(e));
}
}
function I() {
return me.$("livechat").$("channel").$("chatting$bool").getValue() || !1;
}
function T() {
return J(me.$("livechat").$("agents").getValue(), We);
}
function D(e) {
return We(me.$("livechat").$("agents").$(e).getValue(), e);
}
function L() {
var e = me.$("livechat"), t = e.$("settings"), n = t.$("operating_hours");
if (t.hasKey("operating_hours")) {
var i = n.$("type$string").getValue(), o = {
enabled: n.$("enabled$bool").getValue(),
type: i,
timezone: t.$("timezone$string").getValue() || "UTC"
};
"account" == i ? o.account_schedule = ae(n.$("schedule").getValue() || {}) : "department" == i && (o.department_schedule = ce(n.$("schedules").getValue(), e.$("departments").getKeys()));
return o;
}
}
function N(e, t) {
var n = "sendOfflineMsg()", i = Ne.obj({
name: Ne.type("string").regex(Pe),
email: Ne.type("string").regex(Ae.email),
message: Ne.type("string").regex(Pe)
}, {
requiredKeys: [ "name", "email", "message" ]
});
if (!ie([ i, je ], [ e, t ], n)) {
t = t || Le;
var o = {
name: {
name$string: "name",
value$string: e.name
},
email: {
name$string: "email",
value$string: e.email
},
message: {
name$string: "message",
value$string: e.message
}
};
"department" in e && (o.department = {
name$string: "department_id",
value$string: e.department
});
pe.$("livechat").$("settings").$("forms").$("offline_form").$("form_submitted").write(o, se(t));
}
}
function R(e, t) {
var n = "sendTyping()", i = Ne.type("boolean");
if (!ie([ i, je ], [ e, t ], n)) {
t = t || Le;
pe.$("livechat").$("channel").$("typing").write({
typing$bool: e
}, se(t));
}
}
function M(e, t) {
var n = "sendEmailTranscript()", i = Ne.type("string").regex(Ae.email);
if (!ie([ i, je ], [ e, t ], n)) {
t = t || Le;
pe.$("livechat").$("channel").write({
email_transcript$string: e
}, se(t));
}
}
function P(e, t) {
return {
id: parseInt(t, 10)
};
}
function j(e) {
var t = e.hasOwnProperty("typing$bool");
return t ? {
type: "typing"
} : null;
}
function U(e) {
var t = e.hasOwnProperty("typing$bool"), n = {
type: "typing",
nick: "agent:trigger"
};
return t ? n : null;
}
function V(e) {
return 0 === e.indexOf("visitor:") ? "visitor" : e;
}
function F(e) {
if (!e.type$string) return null;
if (!e.nick$string) return null;
var t = {
nick: V(e.nick$string),
type: e.type$string
}, n = e.msg$string;
switch (e.type$string) {
case "chat.msg":
if (Ae.file_upload.test(n)) {
if (e.unverified$bool === !0) return null;
var i = /uploaded: (.+)\nURL: (.+)\nType: (.+)\nSize: (.+)(\nThumb: (.+))?/i, o = i.exec(n);
if (!o) return null;
var r = {
mime_type: o[3],
name: o[1],
size: parseInt(o[4], 10),
url: o[2]
};
return we.extend(t, {
type: "chat.file",
display_name: e.display_name$string,
attachment: r
});
}
return we.extend(t, {
display_name: e.display_name$string,
msg: n,
options: e.options$string ? e.options$string.split("/") : []
});

case "chat.rating":
return we.extend(t, {
display_name: e.display_name$string,
new_rating: e.new_rating$string,
rating: e.rating$string
});

case "chat.comment":
return we.extend(t, {
display_name: e.display_name$string,
comment: e.comment$string,
new_comment: e.new_comment$string
});

case "chat.memberjoin":
case "chat.memberleave":
case "chat.request.rating":
return we.extend(t, {
display_name: e.display_name$string
});

case "chat.event":
var s, a = /Please wait while our agents attend to you. There are currently (\d+) visitor\(s\) waiting to be served\./;
return "agent:system" === e.nick$string && (s = a.exec(n)) ? {
type: "chat.wait_queue",
nick: "system.queue",
wait_queue: parseInt(s[1], 10)
} : null;

case "chat.join":
var c = e.history;
if (c && c[0]) {
var u = we.extend({}, c[0]), l = u.timestamp$int;
u.type$string = u.__type$string;
u.display_name$string = u.name$string;
l *= 1e3;
u.timestamp$int = l;
return F(u);
}
return null;

case "chat.file.update":
return null;

default:
return null;
}
}
function z() {
var e, t, n, i = [ "type$string", "timestamp$int" ], o = me.$("livechat").$("channel").$("log").getValue(), r = [];
for (var s in o) if (o.hasOwnProperty(s)) {
if (o[s].type$string) e = o[s]; else {
e = pe.$("livechat").$("channel").$("log").$(s).getValue();
if ("chat.msg" === e.type$string && (e.unverified$bool === !0 || e.failed$bool === !0)) continue;
}
var a = F(e);
if (null === a) continue;
for (var c = 0; c < i.length; c++) {
t = i[c];
n = ee(t);
n in a || (a[n] = e[t]);
}
r.push(a);
}
return r;
}
function q() {
var e = me.$("connection").$("status$string").getValue();
return Fe(e)[0];
}
function B() {
var e = me.$("livechat").$("account").$("status$string").getValue();
return ze(e)[0];
}
function W(e, t, n) {
return function(i, o) {
if (null === i) return {};
for (var a = {}, c = 0, u = e.length; c < u; c++) {
var l = e[c];
l in i && (a[ee(l)] = i[l]);
}
r(t) && Object.keys(a).length && (a[t] = o);
if (s(n)) {
var f = n(i, o);
return null === f ? {} : we.extend(a, f);
}
return a;
};
}
function G(e, t, n) {
me.descend(t).bindValue(function(t) {
var i = n(t);
i.forEach(function(t) {
H(e, t);
});
});
}
function H(e, t) {
if (t) {
if (t instanceof Error) {
if (!t.message) return;
} else if ("object" == typeof t && !Object.keys(t).length) return;
De.fire("data", {
type: e,
detail: t
});
}
}
function K() {
G("connection_update", "connection.status$string", Y(Ue));
G("account_status", "livechat.account.status$string", Y(Ve));
G("visitor_update", "livechat.profile", Z([ "email$string", "phone$string", "display_name$string" ], f));
G("department_update", "livechat.departments", Q([ "name$string", "status$string" ], _));
G("agent_update", "livechat.agents", Q([ "avatar_path$string", "display_name$string", "title$string" ], D));
G("chat", "livechat.channel.log", X(Ke));
G("chat", "livechat.agents", X(Ge));
G("chat", "livechat.triggers.agents", X(He));
}
function Y(e) {
return function(t) {
return void 0 === t ? [ null ] : [ e[t] || null ];
};
}
function X(e) {
return function(t) {
return J(t, e);
};
}
function J(e, t) {
var n = [];
for (var i in e) e.hasOwnProperty(i) && n.push(t(e[i], i));
return n;
}
function Z(e, t) {
return function(n) {
return e.some(function(e) {
return n && e in n;
}) ? [ t() ] : [ null ];
};
}
function Q(e, t) {
return function(n) {
var i = [];
for (var o in n) if (n.hasOwnProperty(o)) {
var r = n[o], s = e.some(function(e) {
return r && e in r;
});
s && i.push(t(o));
}
return i;
};
}
function ee(e) {
return e.split("$")[0];
}
function te(e) {
if (!e || "object" != typeof e) return e;
var t = {};
for (var n in e) if (e.hasOwnProperty(n)) {
var i = ee(n), o = te(e[n]);
t[i] = o;
}
return t;
}
function ne(e, t) {
t = t ? t + ": " : "";
e = new Error("Zendesk Chat Web SDK: Error: " + t + e.message);
ve || window.console && window.console.error && console.error(e.message);
H("error", e);
}
function ie(e, t, n) {
for (var i = 0; i < e.length; i++) {
var o = e[i], r = o(t[i]);
if (r) {
ne(r, n);
return !0;
}
}
return !1;
}
function oe(e) {
var t = Object.prototype.toString.call(e);
if ("[object File]" !== t) return new Error("Expect a File object");
}
function re(e) {
var t = g(e);
if (!t) return new Error("Expect a valid department id");
}
function se(e) {
return function(t) {
var n = "ok" === t.raw.__status ? null : new window.Error("Failed");
e(n);
};
}
function ae(e) {
for (var t, n, i = 7, o = {}, r = 0; r < i; r++) {
var s = e[r] || {};
if (s.enabled$bool) {
t = [];
n = s.periods;
for (var a in n) n.hasOwnProperty(a) && t.push({
start: n[a].start$int,
end: n[a].end$int
});
o[r] = fe(t);
} else o[r] = [];
}
return o;
}
function ce(e, t) {
var n, i = 7, o = {}, r = le(e), s = ue(e, t);
t.forEach(function(e) {
var t = s[e];
o[e] = {};
for (n = 0; n < i; n++) o[e][n] = [];
t.forEach(function(t) {
for (var n in r[t]) r[t].hasOwnProperty(n) && Array.prototype.push.apply(o[e][n], r[t][n]);
});
for (n = 0; n < i; n++) {
var a = o[e][n];
a.length > 1 && (o[e][n] = fe(a));
}
});
return o;
}
function ue(e, t) {
var n, i = {};
t.forEach(function(e) {
i[e] = [];
});
for (var o in e) if (e.hasOwnProperty(o)) {
n = e[o];
for (var r in n.departments) if (n.departments.hasOwnProperty(r)) {
if (!n.departments[r]) continue;
var s = ee(r);
if (!i[s]) continue;
i[s].push(o);
}
}
return i;
}
function le(e) {
var t, n, i = 7, o = {};
for (var r in e) if (e.hasOwnProperty(r)) {
n = e[r];
if (n.hasOwnProperty("deleted_ts$int")) continue;
if (!n.departments) continue;
if (!n.enabled$bool) continue;
t = {};
for (var s = 0; s < i; s++) {
var a = n[s], c = [];
if (a.enabled$bool && a.periods) {
var u = a.periods;
for (var l in u) u.hasOwnProperty(l) && c.push({
start: u[l].start$int,
end: u[l].end$int
});
c.length && (t[s] = c);
}
}
Object.keys(t).length && (o[r] = t);
}
return o;
}
function fe(e) {
function t(e) {
var t, n = [], i = 0;
e.forEach(function(e, o) {
e > 0 && !t && (t = o);
if (e) {
i += e;
if (0 === i) {
n.push({
start: t,
end: o
});
t = void 0;
}
}
});
return n;
}
if (e.length <= 1) return e;
var n = [];
e.forEach(function(e) {
n[e.start] = void 0 !== n[e.start] ? n[e.start] + 1 : 1;
n[e.end] = void 0 !== n[e.end] ? n[e.end] - 1 : -1;
});
return t(n);
}
function he() {
var e = me.$("livechat").$("settings"), t = e.getValue(), n = we.clone(Ce.livechat.settings), i = xe.fullyExtend(n, t), o = Ye(i);
return te(o);
}
var de, pe, me, ge, _e, ve, we = n(10), be = n(11), ye = n(12), $e = n(14), Ee = n(61), ke = n(47), Se = n(62), xe = n(22), Ae = n(59), Oe = n(15), Ce = n(46), Ie = n(32), Te = t.extend({
init: e,
reconnect: u,
getFirehose: l,
setVisitorInfo: h,
getVisitorInfo: f,
setVisitorDefaultDepartment: b,
getVisitorDefaultDepartment: w,
getAllDepartments: v,
getDepartment: g,
clearVisitorDefaultDepartment: y,
addTag: $,
removeTag: E,
sendChatMsg: d,
sendFile: p,
sendVisitorPath: S,
sendChatComment: O,
sendChatRating: A,
getChatInfo: x,
endChat: C,
isChatting: I,
getServingAgentsInfo: T,
sendOfflineMsg: N,
sendTyping: R,
sendEmailTranscript: M,
getChatLog: z,
getConnectionStatus: q,
getAccountStatus: B,
getOperatingHours: L,
_getAccountSettings: he
}), De = t.extend({}), Le = function() {}, Ne = Se, Re = /[0-9]+/, Me = /^(https?|ftps?):\/\//i, Pe = /\S/, je = Ne.any([ Ne.equal(void 0), Ne.type("function") ]), Ue = {
reattached: "connected",
connected: "connecting",
registered: null,
idle_disconnect: "closed",
shutdown: "closed",
error: "closed"
}, Ve = {
online: "online",
offline: "offline",
away: "away",
invalid_account_key: null,
banned: null
}, Fe = Y(Ue), ze = Y(Ve), qe = W([ "email$string", "phone$string", "display_name$string" ]), Be = W([ "name$string", "status$string" ], "id", P), We = W([ "avatar_path$string", "display_name$string", "title$string" ], "nick"), Ge = W([ "typing$bool" ], "nick", j), He = W([ "typing$bool" ], "display_name", U), Ke = W([ "timestamp$int" ], null, F), Ye = W([ "banner", "behavior", "bubble", "chat_button", "chat_window", "concierge", "file_sending", "forms", "greetings", "language", "login", "rating", "sound", "theme", "timezone$string" ]);
a(Te, "meshim_widget_controllers_WebSDKAPI");
return Te;
}();
}).call(t, n(3), n(8), n(7), n(9), n(6), n(1));
}, function(e, t, n) {
(function(t, n) {
e.exports = function() {
function e(e, n) {
var i = {}, o = {}, r = function(n) {
return !e.nodeType && e != window && e != document || ("FORM" != e.tagName || "submit" != n) && (!t.isCustomEvents && (t.isFF && t.isFF < 9 ? !document.createEvent("event")[n.toUpperCase()] : "undefined" == typeof e["on" + n]));
}, s = function(t, n, o) {
if (!t && "function" != typeof n) throw "bad arguments to on / addEventListener";
if (!(t in i)) {
i[t] = [];
r(t) || a(t);
}
i[t].push(n);
return e;
}, a = function(n) {
if (!(n in o)) {
o[n] = function(o) {
o && (o.stopPropagation || d(o));
var r, s = i[n], a = s.length, c = !0;
s._active = !0;
for (r = 0; r < a; r++) try {
if (!s[r]) continue;
s[r].call(e, t.isCustomEvents && o instanceof t.CustomEvent ? o.detail : o) === !1 && (c = !1);
} catch (e) {
f.fire("error", e);
}
s._active = !1;
if (s._dirty) {
for (r = 0; r < a; r++) if (!s[r]) {
r == a - 1 ? s.pop() : s[r--] = s.pop();
a--;
}
s._dirty = !1;
}
if (c === !1) {
if (o) {
o.preventDefault();
o.returnValue = !1;
}
return !1;
}
};
e.attachEvent ? e.attachEvent("on" + n, o[n]) : e.addEventListener && e.addEventListener(n, o[n], !1);
}
}, c = function(t) {
var n = o[t];
if (n) {
e.attachEvent ? e.detachEvent("on" + t, n) : e.addEventListener && e.removeEventListener(t, n, !1);
delete o[t];
delete i[t];
}
}, u = function(t, n) {
var r = i[t];
if (r) {
for (var s = 0, a = r.length; s < a; s++) if (r[s] === n) {
1 == r.length ? o[t] ? c(t) : delete i[t] : r._active ? (r[s] = null, r._dirty = !0) : s == a - 1 ? r.pop() : r[s] = r.pop();
break;
}
return e;
}
}, l = function() {
if (i && o) {
for (var e in o) o.hasOwnProperty(e) && c(e);
i = o = null;
}
}, h = function(n, o) {
if (!t.isCustomEvents || r(n)) {
var s = i[n], a = !0;
if (s && s.length) {
s._active = !0;
var c, u, l;
for (c = 0, u = s.length; c < u; c++) try {
if (!s[c]) continue;
l = s[c].call(e, o);
l === !1 && (a = !1);
} catch (e) {
f.fire("error", e);
}
s._active = !1;
if (s._dirty) {
for (c = 0; c < u; c++) if (!s[c]) {
c == u - 1 ? s.pop() : s[c--] = s.pop();
u--;
}
s._dirty = !1;
}
}
return a;
}
return e.dispatchEvent(new t.CustomEvent(n, {
bubbles: !1,
cancelable: !0,
detail: o
}));
}, d = function(e) {
e.preventDefault = d.preventDefault;
e.stopPropagation = d.stopPropagation;
e.target = e.srcElement;
};
d.preventDefault = function() {
this.returnValue = !1;
};
d.stopPropagation = function() {
this.cancelBubble = !0;
};
var p = {
fire: h,
on: s,
un: u,
unextendEvents: l
};
if (n) return p;
for (var m in p) p.hasOwnProperty(m) && (e[m] = p[m]);
t.bugs.leaksMemory && t.bugs.leaksMemory(function() {
for (var t in p) p.hasOwnProperty(t) && (e[t] = null);
});
return e;
}
function i(e) {
s(0, e);
}
function o(e) {
s(1, e);
}
function r(e) {
s(2, e);
}
function s(e, t) {
e <= h ? t() : d[e].push(t);
}
function a(e) {
for (;h < e; ) {
h++;
for (var t = 0; t < d[h].length; t++) d[h][t]();
d[h] = null;
}
}
function c() {
h > 0 || (document.body && document.body.firstChild ? a(1) : window.setTimeout(c, 200));
}
function u() {
a(2);
}
function l() {
var e;
if (t.isSafari) e = window.setInterval(function() {
if (/loaded|complete/i.test(document.readyState)) {
window.clearInterval(e);
u();
}
}, 20); else if (document.addEventListener) /loaded|complete/i.test(document.readyState) ? u() : document.addEventListener("DOMContentLoaded", u, !1); else if (t.isIE) {
window.attachEvent("onload", u);
var n = document.createElement("document:ready");
e = window.setInterval(function() {
if (/loaded|complete/i.test(document.readyState)) {
n = null;
window.clearInterval(e);
u();
} else {
try {
n.doScroll("left");
} catch (e) {
return;
}
n = null;
window.clearInterval(e);
u();
}
}, 200);
}
}
var f = {
extend: e,
body: e(document.body, !0),
window: e(window, !0),
document: e(document, !0),
runAfterScriptReady: i,
runAfterFirstChildReady: o,
runAfterDomReady: r
};
f.extend(f);
var h = 0, d = [ [], [], [], [] ];
c();
l();
n(f, "jx_core_Events");
return f;
}();
}).call(t, n(4), n(1));
}, function(module, exports, __webpack_require__) {
(function(Assert, isUndefined, $jxml_extends) {
module.exports = function() {
function sniffBrowser() {
function secureURL(e) {
return e.replace(/^http:/, isSecure ? "https:" : "http:");
}
function getWindowClientHeight() {
if (void 0 !== window.innerHeight) return window.innerHeight;
if (document.documentElement) return document.documentElement.offsetHeight;
var e = document.getElementsByTagName("body");
return e.length ? e[0].clientHeight : 0;
}
function getWindowClientWidth() {
if (void 0 !== window.innerWidth) return window.innerWidth;
if (document.documentElement) return document.documentElement.offsetWidth;
var e = document.getElementsByTagName("body");
return e.length ? e[0].clientWidth : 0;
}
function getFlashVersion() {
var e, t = nav.plugins && nav.plugins[FLASH];
if (t) {
e = nav.mimeTypes && nav.mimeTypes[FLASH_MIME_TYPE];
return e && !e.enabledPlugin ? null : t.description;
}
if (window.ActiveXObject) try {
t = new window.ActiveXObject(FLASH_AX);
t.AllowScriptAccess = "always";
return t.GetVariable("$version");
} catch (e) {}
}
function getJavaVersion() {
var e = nav.mimeTypes;
return isIE ? !isWP7 && ("javaEnabled" in nav && nav.javaEnabled()) : e && (e = e[JAVA_MIME_TYPE]) && (e = e.enabledPlugin) ? e.name : void 0;
}
function getScrollbarSize() {
if (!isUndefined(scrollbar_size)) return scrollbar_size;
var e = document.createElement("div"), t = document.createElement("div"), n = e.style, i = t.style;
n.overflow = "auto";
n.width = n.height = "100px";
n.position = "absolute";
n.top = "-1000px";
i.width = "100%";
i.height = "200px";
e.appendChild(t);
document.body.appendChild(e);
scrollbar_size = e.offsetWidth - e.clientWidth;
document.body.removeChild(e);
return scrollbar_size;
}
function detectCSP() {
try {
return eval("false");
} catch (e) {
return !0;
}
}
function checkIE() {
for (var e = 3, t = document.createElement("div"), n = t.getElementsByTagName("i"); t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->", 
n[0]; ) ;
return e > 4 ? e : document.documentMode;
}
var nav = navigator, ua = nav.userAgent.toLowerCase(), isNewIE = +(/trident.*rv:? *([0-9]+)/.exec(ua) || [])[1] || !1, isIE = checkIE(), isIE8 = 8 === isIE, isIE7 = 7 === isIE, isIE6 = 6 === isIE, isOpera = !!window.opera && "[object Opera]" === Object.prototype.toString.call(window.opera), isEdge = ua.indexOf("edge") > -1, isChrome = "Google Inc." === nav.vendor, isSafari = "Apple Computer, Inc." === nav.vendor, isWebKit = !isEdge && !isIE && !isOpera && (isChrome || isSafari || /webkit|khtml/.test(ua)), isFF = +/\d+/.exec(/firefox\/\d+/i.exec(nav.userAgent) || ""), isIPhone = ua.indexOf("iphone") !== -1, isIPod = ua.indexOf("ipod") !== -1, isIPad = ua.indexOf("ipad") !== -1, isIOS = isIPhone || isIPad || isIPod, isAndroid = ua.indexOf("android") !== -1, isWP7 = ua.indexOf("wp7") !== -1, isMobile = isIOS || isAndroid || isWP7, scrollbar_size, browser = isIE && "msie" || isFF && "firefox" || isOpera && "opera" || isChrome && "chrome" || isSafari && "safari", version, isStrict = "CSS1Compat" === document.compatMode, isQuirks = !isStrict, isIE5Quirks = isIE && isQuirks && document.documentElement && !!document.documentElement.style.setExpression, engineIE = document.documentMode || isIE, isWindows = ua.indexOf("windows") !== -1 || ua.indexOf("win32") !== -1, isMac = ua.indexOf("macintosh") !== -1 || ua.indexOf("mac os x") !== -1, isSecure = "https:" === document.location.protocol, language = nav.language || nav.browserLanguage || nav.userLanguage || nav.systemLanguage, bugs = {
noBoxSizing: engineIE <= 7,
ie: {
cssBottomRight: isIE6,
cssFixed: isIE6 || isIE5Quirks,
buggyCSS: isIE6 || isIE5Quirks
}
}, isTextContent = "textContent" in document.createElement("div"), isCustomEvents = !1, CustomEvent = null;
try {
if (window.CustomEvent && /\[native code\]|\[object CustomEventConstructor\]/.test(window.CustomEvent.toString())) {
new window.CustomEvent("testevent", {
bubbles: !1,
cancelable: !0,
detail: !0
});
isCustomEvents = !0;
CustomEvent = window.CustomEvent;
}
} catch (e) {}
switch (browser) {
case "msie":
case "firefox":
case "chrome":
version = +/\d+/.exec(new RegExp(browser + "[ /]\\d+").exec(ua) || "");
break;

default:
version = +/\d+/.exec(/version[ \/]\d+/.exec(ua) || "");
}
if (isIE6) {
var cleanupCallbacks = [];
bugs.leaksMemory = function(e) {
Assert.isFunction(e);
cleanupCallbacks.push(e);
};
var cleanup = function() {
for (var e = 0; e < cleanupCallbacks.length; e++) cleanupCallbacks[e]();
};
bugs.leaksMemory.remove = function(e) {
for (var t = cleanupCallbacks.length - 1; t >= 0; t--) e == cleanupCallbacks[t] && cleanupCallbacks.splice(t, 1);
};
window.attachEvent("onunload", cleanup);
}
var FLASH = "Shockwave Flash", FLASH_AX = "ShockwaveFlash.ShockwaveFlash", FLASH_MIME_TYPE = "application/x-shockwave-flash", JAVA_MIME_TYPE = "application/x-java-vm";
return {
browser: browser,
version: version,
isStrict: isStrict,
isQuirks: isQuirks,
isOpera: isOpera,
isSafari: isSafari,
isWebKit: isWebKit,
isChrome: isChrome,
isAndroid: isAndroid,
isIPhone: isIPhone,
isIPod: isIPod,
isIPad: isIPad,
isIOS: isIOS,
isWP7: isWP7,
isMobile: isMobile,
isNewIE: isNewIE,
isEdge: isEdge,
isIE: isIE,
isIE6: isIE6,
isIE7: isIE7,
isIE8: isIE8,
isFF: isFF,
isCustomEvents: isCustomEvents,
CustomEvent: CustomEvent,
engineIE: engineIE,
bugs: bugs,
isWindows: isWindows,
isMac: isMac,
isSecure: isSecure,
secureURL: secureURL,
hasFlash: getFlashVersion(),
hasJava: getJavaVersion(),
language: language,
getScrollbarSize: getScrollbarSize,
getWindowClientHeight: getWindowClientHeight,
getWindowClientWidth: getWindowClientWidth,
isTextContent: isTextContent,
hasCSP: detectCSP()
};
}
var Browser = sniffBrowser();
Browser.sniffBrowser = sniffBrowser;
$jxml_extends(Browser, "jx_core_Browser");
return Browser;
}();
}).call(exports, __webpack_require__(5), __webpack_require__(7), __webpack_require__(1));
}, function(e, t, n) {
(function(t, n) {
e.exports = function() {
function e(e, t) {
e || i.log(t);
}
var i = {
ok: e,
isFunction: function(n, i) {
e(t(n), i);
}
};
i.log = function() {};
n(i, "jx_core_Assert");
return i;
}();
}).call(t, n(6), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
return "function" == typeof e;
}
t(e, "jx_core_globals_isFunction");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
var e = function(e) {
return function(t, n) {
return n ? null == t : t === e;
};
}();
t(e, "jx_core_globals_isUndefined");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
return "number" == typeof e;
}
t(e, "jx_core_globals_isNumber");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
return "string" == typeof e;
}
t(e, "jx_core_globals_isString");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
var e = function(e, t) {
return e === t || e && t && "object" == typeof e && "object" == typeof t && n(e, t);
}, n = function(t, n) {
var i;
for (i in t) if (!e(t[i], n[i])) return !1;
for (i in n) if (!e(t[i], n[i])) return !1;
return !0;
}, i = function(e) {
if ("object" != typeof e || !e) return e;
var t = {};
for (var n in e) e.hasOwnProperty(n) && (t[n] = i(e[n]));
return t;
}, o = function(e) {
if (e) for (var t = 1, n = arguments.length; t < n; t++) {
var i = arguments[t];
if (i) for (var o in i) i.hasOwnProperty(o) && (e[o] = i[o]);
}
return e;
}, r = {
equal: e,
clone: i,
extend: o
};
t(r, "jx_core_ObjectUtil");
return r;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(n) {
e.exports = function() {
function e(e, t) {
this.name = e;
this.leaf = /\$[a-z]+$/.test(e);
this.parentNode = t;
this.listeners_value = [];
this.listeners_write = [];
if (!this.leaf) {
this.deleted = !1;
this.listeners_keys = [];
this.childNodes = {};
this.keys = {};
}
}
function i(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}
function o(e) {
for (var t = "", n = 0; n < e.length; n++) t += /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(e[n]) ? "." + e[n] : "[" + JSON.stringify(e[n]) + "]";
return t.substr(1);
}
e.prototype.fqname = function() {
return o(this.path());
};
e.prototype.path = function() {
for (var e = this, t = [ this.name ]; e = e.parentNode; ) t.unshift(e.name);
return t;
};
e.prototype.descend = function(t) {
var n, o, r, s = this;
"string" == typeof t && (t = t.split("."));
for (o = 0, r = t.length; o < r; o++) {
n = t[o];
i(s.childNodes, n) || (s.childNodes[n] = new e(n, s));
s = s.childNodes[n];
}
return s;
};
e.prototype.$$ = e.prototype.descend;
e.prototype.$ = function(t, n, o, r, s, a, c, u, l) {
var f = i(this.childNodes, t) ? this.childNodes[t] : this.childNodes[t] = new e(t, this);
return n ? f.$(n, o, r, s, a, c, u, l) : f;
};
e.prototype.update = function(e, t) {
var n, i, o, r, s;
null != e && this.undeleteParents();
if (this.leaf) {
if (this.value !== e) {
this.value = e;
r = !0;
this.notifyListeners(e, t);
}
} else if (null == e) {
if (!this.deleted) {
r = null;
this.deleted = !0;
for (n in this.childNodes) this.childNodes.hasOwnProperty(n) && this.childNodes[n].update(null, !0);
this.notifyListeners(r, t);
}
} else {
if (this.deleted) {
this.deleted = !1;
r = e;
for (n in e) e.hasOwnProperty(n) && this.$(n).update(e[n], !0);
} else for (n in e) if (e.hasOwnProperty(n)) {
o = this.$(n);
i = e[n];
if (o.leaf) {
if (o.update(i, !0)) {
r || (r = {});
r[n] = i;
}
} else if (void 0 !== (s = o.update(i, !0))) {
r || (r = {});
r[n] = s;
}
}
r && this.notifyListeners(r, t);
}
return r;
};
e.prototype.replace = function(e, t) {
var n, o, r, s, a;
null != e && this.undeleteParents();
if (this.leaf) {
if (this.value !== e) {
this.value = e;
s = !0;
this.notifyListeners(e, t);
}
} else if (null == e) {
if (!this.deleted) {
s = null;
this.deleted = !0;
for (n in this.childNodes) this.childNodes.hasOwnProperty(n) && this.childNodes[n].replace(null, !0);
this.notifyListeners(s, t);
}
} else {
if (this.deleted) {
this.deleted = !1;
s = e;
for (n in e) e.hasOwnProperty(n) && this.$(n).replace(e[n], !0);
} else {
for (n in this.childNodes) if (this.childNodes.hasOwnProperty(n)) {
if (i(e, n)) continue;
r = this.childNodes[n];
if (r.leaf) {
if (r.replace(null, !0)) {
s || (s = {});
s[n] = null;
}
} else if (void 0 !== (a = r.replace(null, !0))) {
s || (s = {});
s[n] = null;
}
}
for (n in e) if (e.hasOwnProperty(n)) {
r = this.$(n);
o = e[n];
if (r.leaf) {
if (r.replace(o, !0)) {
s || (s = {});
s[n] = o;
}
} else if (void 0 !== (a = r.replace(o, !0))) {
s || (s = {});
s[n] = a;
}
}
}
s && this.notifyListeners(s, t);
}
return s;
};
e.prototype.undeleteParents = function() {
for (var e = this.parentNode; e && e.deleted; ) {
e.deleted = !1;
e = e.parentNode;
}
};
e.prototype.write = function(e, t, n) {
if ("function" == typeof t) {
n = t;
t = !1;
}
var i = {
path: this.path(),
value: e
};
"function" == typeof n && (i.func = n);
this.update(e, t || !1);
for (var o = this; o.parentNode; ) o = o.parentNode;
o.notifyWriteListeners(i);
};
e.prototype.bindWrite = function(e) {
this.listeners_write.push(e);
};
e.prototype.bindValue = function(e) {
this.listeners_value.push(e);
try {
e.call(this, this.getValue());
} catch (e) {}
};
e.prototype.bindKeys = function(e) {
if (!this.leaf) {
this.listeners_keys.push(e);
try {
e.call(this, this.getKeys(), []);
} catch (e) {}
}
};
e.prototype.unbindValue = function(e) {
for (var t = 0; t < this.listeners_value.length; t++) if (this.listeners_value[t] == e) {
this.listeners_value.splice(t, 1);
return;
}
};
e.prototype.unbindKeys = function(e) {
if (!this.leaf) for (var t = 0; t < this.listeners_keys.length; t++) if (this.listeners_keys[t] == e) {
this.listeners_keys.splice(t, 1);
return;
}
};
e.prototype.on = function(e, t) {
switch (e) {
case "value":
this.bindValue(t);
break;

case "keys":
this.bindKeys(t);
}
};
e.prototype.un = function(e, t) {
switch (e) {
case "value":
this.unbindValue(t);
break;

case "keys":
this.unbindKeys(t);
}
};
e.prototype.addListener = function(e, t) {
this.listeners[e].push(t);
};
e.prototype.removeListener = function(e, t) {
for (var n = this.listeners[e], i = n.length; i-- > 0; ) n[i] == t && n.splice(i, 1);
};
e.prototype.notifyListeners = function(e, t) {
var n, o, r, s;
if (!this.leaf) if (e) {
for (n in e) if (e.hasOwnProperty(n)) if (null != e[n]) {
if (!i(this.keys, n)) {
this.keys[n] = 1;
o || (o = []);
o.push(n);
}
} else if (i(this.keys, n)) {
delete this.keys[n];
r || (r = []);
r.push(n);
}
} else for (n in this.keys) if (this.keys.hasOwnProperty(n)) {
delete this.keys[n];
r || (r = []);
r.push(n);
}
s = this.listeners_value.concat();
for (var a = 0, c = s.length; a < c; a++) try {
s[a](e);
} catch (e) {}
if (!this.leaf) {
if (o || r) {
s = this.listeners_keys.concat();
for (a = 0, c = s.length; a < c; a++) try {
s[a](o || [], r || []);
} catch (e) {}
}
if (!t && this.parentNode) {
var u = {};
u[this.name] = e;
this.parentNode.notifyListeners(u, t);
}
}
};
e.prototype.notifyWriteListeners = function(e) {
for (var t = this.listeners_write.concat(), n = 0; n < this.listeners_write.length; n++) try {
t[n].call(this, e);
} catch (e) {}
};
e.prototype.getValue = function(e) {
if (e) return this.descend(e).getValue();
if (this.leaf) return this.value;
if (this.deleted) return null;
var t, n, i = {};
for (var o in this.childNodes) if (this.childNodes.hasOwnProperty(o) && null != (n = this.childNodes[o].getValue())) {
i[o] = n;
t = !0;
}
return t ? i : null;
};
e.prototype.hasKey = function(e) {
return i(this.keys, e);
};
e.prototype.getKeys = function() {
if (this.leaf) return null;
var e = [];
for (var t in this.keys) this.keys.hasOwnProperty(t) && e.push(t);
return e;
};
e.prototype.gc = function() {
if (this.leaf) throw new TypeError("Leaf nodes cannot be collected");
var e = !0;
for (var t in this.childNodes) if (this.childNodes.hasOwnProperty(t)) {
var n = this.childNodes[t];
e = n.leaf ? !n.listeners_value.length && null == n.value && (delete this.keys[t], 
delete this.childNodes[t]) && e : n.gc() && (delete this.keys[t], delete this.childNodes[t]) && e;
}
return e && this.deleted && !this.listeners_keys.length && !this.listeners_value.length;
};
t.DataNode = e;
n(e, "jx_data_DataNode");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n, i, o) {
e.exports = function() {
function e() {
for (var e = r(), t = [ /\/?[?]/, /\/livechat\// ], n = [], i = 0; i < t.length; i++) {
n = e.split(t[i]);
if (n.length) break;
}
var o = n[1], s = n[0], a = /^(https?:)?\/\/[^\/]+/.exec(s), c = s.replace(/^(https?:)?\/\//i, "").split("/")[0], u = c.replace(/(.+\.)(?=.+\..+)/, ""), l = n[0].split("/");
l = l.pop() == c ? n[0] : l.join("/");
a = a && "zopim.com" !== c ? a[0] : "https://v2.zopim.com";
return {
accountKey: o,
brandDomain: u,
baseURL: l,
rootURL: a
};
}
function r() {
if (window.$zopim && window.$zopim.s) return window.$zopim.s.src;
for (var e, t = document.getElementsByTagName("script"), n = /.*zopim.(com|net)\//, i = 0, o = t.length; i < o; i++) {
e = t[i].src || "";
if (n.test(e)) return e;
}
return "";
}
function s() {
var e = '<!--# echo var="http_cf_ipcountry" default="geo" -->'.toUpperCase();
"<" == e.charAt(0) && (e = "geo");
return e;
}
var a = e(), c = "https://v2.zopim.com/widget", u = c + "/images", l = c + "/sounds", f = c + "/fonts";
t(n.baseURL, !0) && (n.baseURL = i.secureURL(a.baseURL));
var h = {
ASSETS_URL: c,
IMAGES_URL: u,
SOUNDS_URL: l,
FONTS_URL: f,
ASSETS_LEGACY: document.location.protocol + "//cdn.zopim.com/assets",
BRANDING_URL: "https://www.zopim.com",
AVATARS: {
CONCIERGE: u + "/avatar_simple_agent.png",
AGENT: u + "/avatar_simple_agent.png",
VISITOR: u + "/avatar_simple_visitor.png",
DEFAULT: u + "/avatar_simple_visitor.png"
},
ACCOUNT_KEY: a.accountKey,
BRAND_DOMAIN: a.brandDomain,
COUNTRY_CODE: s(),
AUTH_URL: "https://www.zopim.com/auth/$NAME/$KEY-$MID",
AUTH_LOGOUT_URL: "https://www.zopim.com/auth/logout/$KEY-$MID",
IS_POPOUT: window.$zopim_popout,
POPOUT_WINDOW_PREFIX: "zlivechatpopout_",
POPOUT_URL: a.rootURL + "/widget/livechat.html",
CALLBACK_FILE_UPLOAD_PATH: "/client/widget/upload",
FILE_UPLOAD_PATH: "/client/widget/uploads",
FILE_UPLOAD_MAX: 20971520,
RESEND_MSG_TIMEOUT: 5e3,
FILE_REPLACE_SOURCE: /^(\s*https?\:\/\/v2(?:assets|uploads)\.zopim\.)com(\/)/i,
FILE_REPLACE_RESULT: "$1io$2",
CHAT_LOG_REMEMBER_COUNT: 10
};
o(h, "meshim_widget_Config");
return h;
}();
}).call(t, n(7), n(13), n(4), n(1));
}, function(e, t) {
var n = {
build_number: "20170802.003870",
git_commit: "fd65bf4daf306b756e66fde8a954b86e7c1e6724",
release_tag: "!ERR"
};
e.exports = n;
}, function(e, t, n) {
(function(t, i, o, r, s) {
e.exports = function() {
function e(e) {
function t() {
if ("prerender" != document.visibilityState) {
document.removeEventListener("visibilitychange", t);
Oe.connect();
}
}
ne = e.isCookieDenied;
ie = e.overrideProxy;
oe = e.source;
re = e.lastHost;
se = e.source_ver;
B = e.root;
K = B.$("tmp").$("api_settings");
Y = B.$("tmp").$("server_settings");
X = B.$("livechat").$("settings").$("cached$bool");
W = B.$("connection");
J = W.$("server_retired$bool");
Q = W.$("server_ready$bool");
Q.bindValue(l);
J.bindValue(u);
H = B.$("livechat").$("ui").$("mockup$bool").getValue();
if (H) W.$("status$string").update("reattached"); else {
B.$("livechat").$("profile").bindValue(c);
W.$("status$string").bindValue(a);
W.$("socket_status$string").bindValue(I);
B.bindWrite(P);
W.$("reconnect$bool").bindValue(v);
if (window.__z_sdk) z = !0; else {
z = !1;
"visibilityState" in document && "prerender" == document.visibilityState ? document.addEventListener("visibilitychange", t) : Oe.connect();
}
}
}
function a(e) {
ye = "reattached" == e;
ye && P();
ye && z === !1 && T();
if ("idle_disconnect" == e || "shutdown" == e || "error" == e) {
var t = B.$("livechat").$("account").$("status$string").getValue(), n = B.$("connection").$("backoff"), i = n.$("active$int").getValue() || 0, o = n.$("max_seconds$int").getValue();
"invalid_account_key" == t ? fe.warnBadEmbed() : "widget_v2" == oe && "shutdown" == e && i && o && g(o);
p();
}
I();
}
function c(e) {
e && (ne() || ce.IS_POPOUT || e.mid$string && ue.setIdentity(e.mid$string));
}
function u(e) {
Z = e === !0;
}
function l(e) {
ee = e !== !1;
if (ee) {
ke = !1;
f();
}
}
function f() {
for (var e = 0, n = Ee.length; e < n; e++) {
var i = Ee[e];
t(i) && i();
}
Ee = [];
}
function h(e) {
if (!ee || Z) {
W.update({
server_ready$bool: !1
});
Ee.push(e);
if (!ke) {
ke = !0;
G.reconnect();
}
} else e();
}
function d(e) {
G && G.send(e);
}
function p(e) {
G && G.close();
q = !e;
G = null;
be = "";
}
function m() {
window.clearTimeout(Oe.reconnectTimer);
p(!0);
Oe.connect();
}
function g(e) {
window.clearTimeout(Oe.reconnectTimer);
Oe.reconnectTimer = window.setTimeout(function() {
Oe.reconnect();
}, 1e3 * e);
}
function _() {
W.update({
status$string: "idle_disconnect"
});
}
function v(e) {
e && m();
}
function w(e) {
var t = ae || new he(e, "W", null, ge);
t.on("open", function() {
E(e, t);
});
return t;
}
function b() {
var e = y();
try {
te = ve.getGeoAccess(ie, e, 3, 2);
} catch (e) {
window.console && window.console.log("Unable to compute host list");
return;
}
$(_e);
}
function y() {
return re || W.$("server$string").getValue() || "";
}
function $(e) {
function t() {
clearTimeout(o);
i.un("close", t);
$(e);
}
if (!G && !q) {
var n = te.getNextHost();
if (n) {
Se++;
var i = w(n);
we.push(i);
if (te.hasNext()) {
var o = setTimeout(t, e);
i.on("close", t);
}
}
}
}
function E(e, t) {
if (!H) if (G) t.close(); else {
W.update({
socket_status$string: null
});
be = e;
le.increment("conn", [ "tries:" + Se ]);
Se = 0;
le.start("conn_open", t.starttime);
le.end("conn_open", .25, [ "proxy:" + e ]);
G = t;
G.on("break", S);
G.on("message", k);
G.on("reopen", A);
G.on("resume", x);
G.on("error", function() {
var e = this.connect_attempts, t = this.recv_messages;
if (e > 3 && 0 == t) {
p(!0);
$(_e);
}
});
O();
}
}
function k(e) {
if (e) {
if (e.raw && e.raw.__messageID in Ae) {
var t = Ae[e.raw.__messageID];
delete Ae[e.raw.__messageID];
t(e);
}
var n = B;
if ("update" in e) {
if (/^livechat.account/.test(e.path)) {
var i = e.path.split(".");
i.splice(0, 2);
i = i.join(".");
(i ? Y.$("account").descend(i) : Y.$("account")).update(e.update);
fe.fullyExtend(e.update, K.getValue("account"));
}
if (/^livechat/.test(e.path) && "account" in e.update) {
Y.$("account").update(e.update.account);
fe.fullyExtend(e.update.account, K.getValue("account"));
}
if (/^livechat.settings/.test(e.path)) {
var o = e.path.split(".");
o.splice(0, 2);
o = o.join(".");
(o ? Y.$("settings").descend(o) : Y.$("settings")).update(e.update);
fe.fullyExtend(e.update, K.getValue("settings"));
}
e.path && (n = n.descend(e.path));
n.update(e.update);
Oe.fire("message", e);
}
}
}
function S() {
W.update({
socket_status$string: "break"
});
}
function x() {
W.update({
socket_status$string: "resume"
});
}
function A() {
W.update({
socket_status$string: "reconnect"
});
ye = !1;
O();
}
function O() {
if (ce.ACCOUNT_KEY) {
G || Oe.connect();
var e = ue.getIdentity(), t = ne(), n = B.$("livechat").$("ui").getValue("mobile$bool") ? "mobile" : "desktop", o = B.$("livechat").$("settings").$("theme").getValue("name$string"), r = {
__type: "register",
accountKey: ce.ACCOUNT_KEY,
mID: e,
ua: window.navigator.userAgent,
dt: n,
theme: o,
cookie_law: t,
rev: i.git_commit,
source: oe,
source_ver: se
};
if (B.$("livechat").$("ui").$("popout$bool").getValue()) r.popout = !0; else {
r.title = document.title;
r.url = window.location.href;
r.ref = window.document.referrer;
}
var s = Oe._register;
if (s) for (var a in s) s.hasOwnProperty(a) && (r[a] = s[a]);
G.send(r);
}
}
function C() {
return !!X.getValue();
}
function I() {
var e = W.getValue("status$string"), t = W.getValue("socket_status$string");
window.clearTimeout(D.timer);
if ("error" != e) if ("break" == t) if ("idle_disconnect" == e) W.update({
message$string: "idle_disconnect"
}); else {
W.update({
message$string: "reconnecting"
});
D.timer = window.setTimeout(D, 6e4);
} else if (null === t && "registered" == e) W.update({
message$string: "resuming"
}); else if (o(e) && o(t)) {
var n = C() ? "fast_init" : "first_init";
W.update({
message$string: n
});
} else W.update({
message$string: null
}); else D.timer = window.setTimeout(D, 5e3);
}
function T() {
G && B.$("livechat").$("profile").write({
disconnect_timeout$int: U(G.rtt)
});
}
function D() {
W.update({
message$string: "disconnected"
});
}
function L() {
var e = G;
return e ? {
connect_attempts: e.connect_attempts,
connections: e.connections,
disconnects: e.disconnects,
timeout_server: e.timeout_server,
timeout_response_soft: e.timeout_response_soft,
timeout_response_hard: e.timeout_response_hard,
sent_bytes: e.sent_bytes,
recv_bytes: e.recv_bytes,
sent_messages: e.sent_messages,
recv_messages: e.recv_messages,
sent_frames: e.sent_frames,
recv_frames: e.recv_frames,
lost_frames: e.lost_frames,
ooo_frames: e.ooo_frames,
bytes_at_connect: e.bytes_at_connect,
rtt: e.rtt,
clock_skew: e.clock_skew,
reconnect_delay: e.reconnect_delay,
quality: e.quality,
host: e.host,
status: e.status,
zone: window.__$__GEO,
last_frame_time: e.last_frame_time,
local_time: +new Date()
} : {
status: "not connected"
};
}
function N() {
return be;
}
function R() {
return +new Date() - (G ? G.clock_skew : 0);
}
function M(e) {
xe += 1;
Ae[xe] = e;
return xe;
}
function P(e) {
if (e) {
var n = {};
n.path = e.path;
n.value = e.value;
t(e.func) && (n.__messageID = M(e.func));
$e.push(n);
}
if (G && ye) for (;$e.length; ) G.send($e.shift());
}
function j(e) {
return e ? Y.getValue(e) : Y.getValue();
}
function U(e) {
function t(e) {
return e;
}
var n, i, o = 10 * me.SECOND, r = 1 * me.SECOND, s = 120 * me.SECOND, a = 20 * me.SECOND;
e = Math.round(e) || 0;
e = Math.max(r, Math.min(e, o));
n = (e - r) / (o - r);
i = a + t(n) * (s - a);
return Math.floor(i / 1e3);
}
function V(e) {
ae = e;
}
function F() {
Q.unbindValue(l);
J.unbindValue(u);
B.$("livechat").$("profile").unbindValue(c);
W.$("status$string").unbindValue(a);
W.$("socket_status$string").unbindValue(I);
W.$("reconnect$bool").unbindValue(v);
p();
we.forEach(function(e) {
e.close();
e.fire("close");
});
D.timer = clearTimeout(D.timer);
we = [], be = "", ye = !1, $e = [], Ee = [], ke = !1, Se = 0, xe = 0, Ae = {}, z = q = B = W = G = H = K = Y = X = J = Z = Q = ee = te = ne = ie = oe = re = se = ae = null;
}
var z, q, B, W, G, H, K, Y, X, J, Z, Q, ee, te, ne, ie, oe, re, se, ae, ce = n(12), ue = n(15), le = n(29), fe = n(22), he = n(50), de = n(55), pe = n(56), me = n(60), ge = {
FLUSH_DELAY_MS: 0,
RECONNECT_DELAY_MS: 1e4
}, _e = 3e3, ve = new pe(de), we = [], be = "", ye = !1, $e = [], Ee = [], ke = !1, Se = 0, xe = 0, Ae = {}, Oe = r.extend({
init: e,
send: d,
connect: b,
reconnect: m,
disconnect: _,
getConnectionStats: L,
getHost: N,
getServerTime: R,
getServerSettings: j,
reconnectIfServerRetired: h,
registerCallback: M,
getDCTimeoutValue: U,
setSocket: V,
reset: F
});
s(Oe, "meshim_widget_controllers_ConnectionController");
return Oe;
}();
}).call(t, n(6), n(13), n(7), n(3), n(1));
}, function(e, t, n) {
(function(t, i) {
e.exports = function() {
function e() {
$ = w.ACCOUNT_KEY;
}
function o() {
if (w.IS_POPOUT) return v.get(S) || g().get("mid");
var e = l();
return e ? e : v.get(k) || "";
}
function r(e) {
v.set(k, e, {
path: "/",
ttl: 365,
domain: m
});
}
function s() {
var e = f();
if ("boolean" == typeof e) return e;
var t = v.get(x);
t = parseInt(t, 10);
return 0 !== t && (1 === t || void 0);
}
function a() {
v.remove(x, {
path: "/",
domain: m
});
}
function c(e) {
e = t(e);
e = e ? 1 : 0;
v.set(x, e, {
path: "/",
ttl: 365,
domain: m
});
}
function u() {
v.remove(k, {
path: "/",
domain: m
});
_.remove(E);
}
function l() {
var e = v.getJSONCookie("__zlcid");
v.remove("__zlcid", {
path: "/"
});
if (e.mID) return e.mID;
var t = h("__zlcstore");
v.remove("__zlcstore", {
path: "/",
domain: m
});
return t && t.mID ? t.mID : void 0;
}
function f() {
var e, t = h("__zlcprivacy");
if ("boolean" == typeof t) {
e = t;
c(t);
}
return e;
}
function h(e) {
var t = v.getJSONCookie(e);
return t[$];
}
function d(e, t) {
var n = _.get(E) || {};
n[$] || (n[$] = {});
var i = n[$];
i[e] = t;
i.timestamp = +new Date();
_.set(E, n);
}
function p(e) {
var t = _.get(E) || {};
if (!t[$]) return {};
var n = t[$];
if (!n.timestamp) return n[e] || {};
var i = +new Date();
return i - n.timestamp > y ? {} : n[e];
}
var m, g = n(17), _ = n(19), v = n(21), w = n(12), b = n(22), y = 48e4, $ = w.ACCOUNT_KEY, E = "__zlcstore", k = "__zlcmid", S = "__zlcpomid", x = "__zlcprivacy", A = window.location.hostname;
m = /\b(?:\d{1,3}\.){3}\d{1,3}/.test(A) ? A : b.getEffectiveTLD(A);
var O = {
init: e,
DOM: {
saveVariable: d,
getVariable: p
},
Cookie: v,
clearAll: u,
setIdentity: r,
getIdentity: o,
clearAllowCookieLaw: a,
getAllowCookieLaw: s,
setAllowCookieLaw: c
};
i(O, "meshim_widget_controllers_StorageController");
return O;
}();
}).call(t, n(16), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
return !!e && "false" != e;
}
t(e, "jx_core_globals_parseBoolean");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n) {
e.exports = function() {
function e(t) {
if (!(this instanceof e)) {
s || e._initSingleton(window);
return s;
}
if (t) return e.parseQuery(t);
this.store = {};
}
function i(e, t, n) {
if (void 0 === t && void 0 === n) return e;
void 0 === t && (t = "string");
if (!(t in r)) throw "invalid type requested";
return void 0 === e ? void 0 !== n ? n : r[t] : "boolean" === t ? o.test(e) : "integer" === t ? e === !0 ? 1 : parseInt(e, 10) : "float" === t ? e === !0 ? 1 : parseFloat(e) : e;
}
var o = /^(1|on|true)$/i, r = {
boolean: !1,
integer: 0,
float: 0,
string: ""
}, s = null;
e._initSingleton = function(t) {
s = new e(t.location.search);
};
e.buildQuery = function(e) {
var n, i, o, r, s, a, c = [], u = [];
for (s in e) e.hasOwnProperty(s) && c.push(s);
c.sort();
for (n = 0, o = c.length; n < o; n++) {
s = c[n];
a = e[s];
s = window.encodeURIComponent(s);
if (t(a)) if (1 !== a.length || a[0] !== !0) for (i = 0, r = a.length; i < r; i++) u.push(s + "=" + window.encodeURIComponent(a[i] + "")); else u.push(s); else u.push(s + "=" + window.encodeURIComponent(a + ""));
}
return u.join("&");
};
e.parseQuery = function(t) {
var n, i, o = new e();
t = t.replace(/^\?|\/+$/g, "");
var r, s, a = t.split("&");
for (n = 0, i = a.length; n < i; n++) {
var c = a[n];
if (c.length) {
var u = c.indexOf("=");
if (u <= -1) {
r = c;
s = !0;
} else {
r = c.slice(0, u);
s = window.decodeURIComponent(c.slice(u + 1));
}
o.add(window.decodeURIComponent(r), s);
}
}
return o;
};
e.getHash = function(t, n) {
var i = n || window.location.hash;
return e.parseQuery(i.replace(/^#/, "")).get(t);
};
var a = e.prototype;
a.add = function(e, t) {
this.has(e) ? this.store[e].push(t) : this.store[e] = [ t ];
};
a.has = function(e) {
return this.store.hasOwnProperty(e);
};
a.getLast = function(e, t, n) {
return this.has(e) ? this.getAt(e, this.store[e].length - 1, t, n) : i(void 0, t, n);
};
a.getFirst = function(e, t, n) {
return this.getAt(e, 0, t, n);
};
a.getAt = function(e, t, n, o) {
return i(this.has(e) ? this.store[e][t] : void 0, n, o);
};
a.getRaw = function(e) {
return this.has(e) ? this.store[e].concat() : [];
};
a.get = a.getLast;
a.toString = function() {
return e.buildQuery(this.store);
};
n(e, "meshim_common_QueryString");
return e;
}();
}).call(t, n(18), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
return "[object Array]" == Object.prototype.toString.call(e);
}
t(e, "jx_core_globals_isArray");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e() {
try {
return l in c && c[l];
} catch (e) {
return !1;
}
}
function i(e) {
return function() {
try {
var t = Array.prototype.slice.call(arguments, 0);
t.unshift(r);
h.appendChild(r);
r.addBehavior("#default#userData");
r.load(l);
var n = e.apply(a, t);
h.removeChild(r);
return n;
} catch (e) {}
};
}
function o(e) {
return e.replace(p, "___");
}
var r, s = n(20), a = {}, c = window, u = c.document, l = "localStorage", f = "__storejs__";
a.disabled = !1;
a.set = function() {};
a.get = function() {};
a.remove = function() {};
a.clear = function() {};
a.transact = function(e, t, n) {
var i = a.get(e);
if (null == n) {
n = t;
t = null;
}
"undefined" == typeof i && (i = t || {});
n(i);
a.set(e, i);
};
a.getAll = function() {};
a.serialize = function(e) {
return s.stringify(e);
};
a.deserialize = function(e) {
if ("string" == typeof e) try {
return s.parse(e);
} catch (t) {
return e || void 0;
}
};
if (e()) {
r = c[l];
a.set = function(e, t) {
if (void 0 === t) return a.remove(e);
r.setItem(e, a.serialize(t));
return t;
};
a.get = function(e) {
return a.deserialize(r.getItem(e));
};
a.remove = function(e) {
r.removeItem(e);
};
a.clear = function() {
r.clear();
};
a.getAll = function() {
for (var e = {}, t = 0; t < r.length; ++t) {
var n = r.key(t);
e[n] = a.get(n);
}
return e;
};
} else if (u.documentElement.addBehavior) {
var h, d;
try {
d = new window.ActiveXObject("htmlfile");
d.open();
d.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>');
d.close();
h = d.w.frames[0].document;
r = h.createElement("div");
} catch (e) {
r = u.createElement("div");
h = u.body;
}
var p = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
a.set = i(function(e, t, n) {
t = o(t);
if (void 0 === n) return a.remove(t);
e.setAttribute(t, a.serialize(n));
e.save(l);
return n;
});
a.get = i(function(e, t) {
t = o(t);
return a.deserialize(e.getAttribute(t));
});
a.remove = i(function(e, t) {
t = o(t);
e.removeAttribute(t);
e.save(l);
});
a.clear = i(function(e) {
var t = e.XMLDocument.documentElement.attributes;
e.load(l);
for (var n, i = 0; n = t[i]; i++) e.removeAttribute(n.name);
e.save(l);
});
a.getAll = i(function(e) {
for (var t, n = e.XMLDocument.documentElement.attributes, i = {}, r = 0; t = n[r]; ++r) {
var s = o(t.name);
i[t.name] = a.deserialize(e.getAttribute(s));
}
return i;
});
}
try {
a.set(f, f);
a.get(f) != f && (a.disabled = !0);
a.remove(f);
} catch (e) {
a.disabled = !0;
}
a.enabled = !a.disabled;
var m = a;
t(m, "meshim_common_DOMStorage");
return m;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n, i) {
e.exports = function() {
function e(e) {
return '"' + e.replace(u, o) + '"';
}
function o(e) {
return l[e] || "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}
function r(t) {
switch (typeof t) {
case "string":
return e(t);

case "number":
return isFinite(t) ? t.toString() : "null";

case "boolean":
return String(t);

case "object":
if (!t) return "null";
var i, o, s = [];
if (n(t)) {
for (i = 0, o = t.length; i < o; i++) s[i] = r(t[i]) || "null";
return "[" + s.join(",") + "]";
}
var a, c, u = [];
for (a in t) t.hasOwnProperty(a) && u.push(a);
u.sort();
for (i = 0, o = u.length; i < o; i++) {
a = u[i];
c = r(t[a]);
c && s.push(e(a) + ":" + c);
}
if (s.length) return "{" + s.join(",") + "}";
}
}
function s(e, t, n) {
return t ? g[t] : String.fromCharCode(parseInt(n, 16));
}
function a(e) {
var t, n, i, o, r, a = e.match(p), c = a.length, u = a[0];
"{" == u ? (t = {}, r = 1) : "[" == u ? (t = [], r = 1) : (t = [], r = 0, n = !0);
var l = [ t ];
for (c = a.length; r < c; ++r) {
u = a[r];
switch (u.charCodeAt(0)) {
case 91:
o = l[0];
l.unshift(o[i || o.length] = []);
i = void 0;
break;

case 93:
l.shift();
break;

case 123:
o = l[0];
l.unshift(o[i || o.length] = {});
i = void 0;
break;

case 125:
l.shift();
break;

case 102:
o = l[0];
o[i || o.length] = !1;
i = void 0;
break;

case 110:
o = l[0];
o[i || o.length] = null;
i = void 0;
break;

case 116:
o = l[0];
o[i || o.length] = !0;
i = void 0;
break;

case 34:
u = u.substring(1, u.length - 1);
u.indexOf(v) !== -1 && (u = u.replace(m, s));
o = l[0];
if (void 0 == i) {
if (!(o instanceof Array)) {
i = u || _;
break;
}
i = o.length;
}
o[i] = u;
i = void 0;
break;

default:
o = l[0];
o[i || o.length] = +u;
i = void 0;
}
}
if (n) {
if (1 == l.length) return t[0];
} else if (!l.length) return t;
throw "error";
}
var c = !t(window) && window.JSON || {
parse: a,
stringify: r
}, u = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, l = {
"\b": "\\b",
"\t": "\\t",
"\n": "\\n",
"\f": "\\f",
"\r": "\\r",
"\\": "\\\\",
'"': '\\"'
}, f = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)", h = '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))', d = '(?:"' + h + '*")', p = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|" + f + "|" + d + ")", "g"), m = new RegExp("\\\\(?:([^u])|u(.{4}))", "g"), g = {
'"': '"',
"/": "/",
"\\": "\\",
b: "\b",
f: "\f",
n: "\n",
r: "\r",
t: "\t"
}, _ = new String(""), v = "\\";
i(c, "jx_data_JSON");
return c;
}();
}).call(t, n(7), n(18), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
return "string" == typeof e && "" != e;
}
function i() {
var e, t, n, i, o = document.cookie, r = {};
if (!o || "string" != typeof o) return {};
o = o.split(/;\s/);
for (e = o.length; e--; ) try {
t = o[e].match(/^([^=]+)(=(.*))?$/);
if (!t) continue;
n = h(t[1]);
i = h(t[3] || "");
r[n] = i;
} catch (e) {}
return r;
}
function o(t) {
return e(t) ? i()[t] || null : null;
}
function r(e) {
var t = o(e), n = {};
try {
n = u.parse(t);
} catch (e) {}
return n && "object" == typeof n ? n : {};
}
function s(e, t, n) {
n = n || {};
var i = f(e) + "=" + f(t);
if ("ttl" in n) {
var o = new Date(), r = 24 * n.ttl * 60 * 60 * 1e3;
o.setTime(o.getTime() + r);
i += "; expires=" + o.toGMTString();
}
"path" in n && (i += "; path=" + n.path);
"domain" in n && (i += "; domain=" + n.domain);
n.secure && (i += "; secure");
document.cookie = i;
}
function a(e, t, n) {
"object" != typeof t && (t = {});
s(e, u.stringify(t), n);
}
function c(e, t) {
t = t || {};
t.ttl = -1;
s(e, "", t);
}
var u = n(20), l = {
set: s,
get: o,
getJSONCookie: r,
setJSONCookie: a,
remove: c
}, f = window.encodeURIComponent, h = window.decodeURIComponent;
t(l, "meshim_common_Cookie");
return l;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, i, o, r) {
e.exports = function() {
function e() {
var e = document.documentElement;
return e.compareDocumentPosition ? function(e, t) {
e = e.dom || e;
t = t.dom || t;
return !!(16 & e.compareDocumentPosition(t));
} : e.contains ? function(e, t) {
e = e.dom || e;
t = t.dom || t;
var n = 9 === e.nodeType ? e.documentElement : e, i = t.parentNode;
return e === i || !!(i && 1 === i.nodeType && n.contains && n.contains(i));
} : function(e, t) {
e = e.dom || e;
t = t.dom || t;
for (;t = t.parentNode; ) if (t === e) return !0;
return !1;
};
}
function s(e, t) {
for (var n, i = document.createElement("div"), o = 0, r = M.length; o < r; o++) if (void 0 !== i.style[M[o]]) {
n = t[o];
break;
}
return n ? e ? function(e, t, i) {
e.autobind(t, n, i);
} : function(e, t, i) {
P && e.autounbind(t, n, i);
} : function() {};
}
function a() {
function e(e) {
for (var t = e.charAt(0).toUpperCase() + e.slice(1), i = (e + " " + R.join(t + " ") + t).split(" "), o = 0; o < i.length; o++) if (void 0 !== n[i[o]]) return !0;
return !1;
}
var t = document.createElement("div"), n = t.style;
return e;
}
function c(e, t) {
for (var n = {}, i = 0, o = t.length; i < o; i++) {
var r = t[i];
r in e && (n[r] = e[r]);
}
return n;
}
function u() {
for (var e, t, n = arguments.length, i = 1, o = arguments[0] || {}; i < n; i++) if (null != (e = arguments[i])) for (t in e) e.hasOwnProperty(t) && o !== e[t] && (o[t] = e[t]);
return o;
}
function l(e, t) {
for (var n in t) if (t.hasOwnProperty(n)) if (t[n] && t[n].constructor && t[n].constructor === Object) {
e[n] = e[n] || {};
l(e[n], t[n]);
} else e[n] = t[n];
return e;
}
function f(e, t) {
for (var n in t) if (t.hasOwnProperty(n)) {
if (!(n in e)) continue;
t[n] && t[n].constructor && t[n].constructor === Object ? f(e[n], t[n]) : delete e[n];
}
return e;
}
function h() {
if (void 0 === T) try {
T = d();
} catch (e) {}
return T;
}
function d() {
if (!window.getComputedStyle) return !1;
var e = document.createElement("div"), t = "border-box";
document.body.appendChild(e);
e.style.height = "10px";
e.style.padding = "5px";
e.style.boxSizing = t;
e.style.webkitBoxSizing = t;
e.style.mozBoxSizing = t;
var n = parseInt(window.getComputedStyle(e).height, 10);
document.body.removeChild(e);
return 10 != n;
}
function p(e) {
var t = e.getComputedStyle();
if ("auto" == t.height) return e.getHeight();
var n = parseInt(t.height, 10) || 0;
U.computedHeightBoxSizingBug() && (n += (parseInt(t.paddingTop, 10) || 0) + (parseInt(t.paddingBottom, 10) || 0) + (parseInt(t.borderTopWidth, 10) || 0) + (parseInt(t.borderBottomWidth, 10) || 0));
return n + "px";
}
function m(e) {
function n() {
this.addClass("hover");
}
function i() {
this.removeClass("hover");
}
if (t.bugs.noBoxSizing) {
e.on("mouseover", n);
e.on("mouseout", i);
}
}
function g(e, t) {
for (var n, o = t.split("."); o.length; ) {
n = o.shift();
i(e[n], !0) && (e[n] = {});
e = e[n];
}
return e;
}
function _(e, t, n) {
e = e.split(".");
var i = e.pop();
if (i) {
for (var o = 0, r = e.length; o < r; o++) {
e[o] in n || (n[e[o]] = {});
n = n[e[o]];
}
n[i] = t;
}
}
function v(e) {
for (var t = "zte2095", n = e.split("."), i = "." + n.splice(n.length - 2, 2).join("."); n.length; ) {
var o = {
domain: i,
path: "/"
};
D.set(t, "1", o);
if ("1" == D.get(t)) {
D.remove(t, o);
break;
}
i = "." + n.pop() + i;
}
return i;
}
function w(e) {
return F.test(e);
}
function b(e) {
return V.test(e);
}
function y(e) {
if (e && "object" == typeof e) {
var t = [];
for (var n in e) e.hasOwnProperty(n) && t.push(n);
return t;
}
}
function $(e) {
if (window.Image) try {
var t = new window.Image();
t.onload = t.onerror = function() {
e(!(1 != this.width || 1 != this.height));
};
t.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
} catch (t) {
e();
} else e();
}
function E() {
return t.isIE || /Trident\//.test(window.navigator.userAgent);
}
function k(e, t) {
e = parseInt(e, 10);
isNaN(e) && (e = 0);
var n = e < 0;
e = Math.abs(e).toString().split("");
for (var i = Math.max(t - e.length, 0); i--; ) e.unshift("0");
n && e.unshift("-");
return e.join("");
}
function S(e, t) {
function n(e, t, n) {
return n.replace("<hours>", e).replace("<minutes>", t);
}
function i(e, t) {
return e - Math[e > 0 ? "floor" : "ceil"](e / t) * t;
}
var r = o("<hours>:<minutes>"), s = o("<hours>:<minutes> am"), a = o("<hours>:<minutes> pm"), c = "24" === t ? 24 : 12, u = i(Math[e > 0 ? "floor" : "ceil"](e / 60), c), l = U.pad(Math.abs(e) % 60, 2);
if (24 === c) return n(U.pad(u, 2), l, r);
var f = 0 === u ? 12 : u;
return Math.abs(e / 60) % 24 < 12 ? n(f, l, s) : n(f, l, a);
}
function x(e) {
return e && e.replace(L.FILE_REPLACE_SOURCE, L.FILE_REPLACE_RESULT);
}
function A(e, t) {
t = parseInt(t, 10);
if (!t) return e.getValue();
var n = e.getKeys(), i = n.length, o = {};
if (i <= t) return e.getValue() || o;
for (var r = 0; r < i; r++) n[r] = parseInt(n[r], 10);
n = n.sort().slice(-t);
var s, a = e.getValue();
if (!a) return o;
for (r = 0, i = n.length; r < i; r++) {
s = n[r];
o[s] = a[s];
}
return o;
}
function O(e, t) {
var n;
if (e.leaf && e.parentNode) {
n = {};
n[e.name] = t;
e.parentNode.write(n);
} else e.write(t);
}
function C() {
if (t.isNewIE) try {
"body" !== document.activeElement.nodeName.toLowerCase() && document.activeElement.focus();
} catch (e) {}
}
function I() {
window.console && window.console.warn && window.console.warn("The Zopim widget embed code is invalid. Please email chat@zendesk.com with your account key: " + L.ACCOUNT_KEY);
}
var T, D = n(21), L = n(12), N = "-webkit- -moz- -o- -ms- ".split(" "), R = "webkit Moz O ms ".split(" "), M = [ "transition", "MozTransition", "OTransition", "WebkitTransition" ], P = [ "transitionend", "transitionend", "otransitionend", "webkitTransitionEnd" ], j = [ "animationend", "animationend", "oanimationend", "webkitAnimationEnd" ], U = {
contains: e(),
onTransitionEnd: s(!0, P),
unTransitionEnd: s(!1, P),
onAnimationEnd: s(!0, j),
unAnimationEnd: s(!1, j),
css_prefixes: N,
cssom_prefixes: R,
isStyleSupported: a(),
pick: c,
shallowExtend: u,
fullyExtend: l,
fullyDelete: f,
computedHeightBoxSizingBug: h,
getComputedHeight: p,
hoverFix: m,
getEffectiveTLD: v,
descendsObj: g,
insertObj: _,
isDefaultName: b,
getKeys: y,
supportsDataURI: $,
isIE: E(),
pad: k,
formatMinutesAsHours: S,
replaceFileHostname: x,
getLastLogEntries: A,
writeNode: O,
isAgentNick: w,
refocusActiveElement: C,
warnBadEmbed: I
}, V = /^Visitor [0-9]{3,}$/, F = /^agent:[0-9]+/i;
r(U, "meshim_widget_utils_Utils");
return U;
}();
}).call(t, n(4), n(7), n(23), n(1));
}, function(e, t, n) {
(function(t, n, i, o, r) {
e.exports = function() {
function e(e, t) {
if (isNaN(e)) {
var n = new s();
n.add("_", e);
return n;
}
e == -1 && (e = g.length);
var i = g[e];
i || (g[e] = i = new s());
if ("string" == typeof t) i.add("_", t); else for (var o in t) t.hasOwnProperty(o) && i.add(o, t[o]);
return i;
}
function s() {
function e(e, t) {
l[e] = t;
}
function t(e) {
a(e, h);
}
function n(e) {
f.push(e);
}
function i() {
return o();
}
function o(e) {
return l[e || _] || l._;
}
function r(e) {
var t, n = o(e);
for (t = 0; t < f.length; t++) f[t](n);
}
function c(e, t) {
var n, i = new s();
g[l._] = i;
for (var o in l) if (l.hasOwnProperty(o)) {
n = l[o];
if ("string" != typeof n) continue;
n = n[e].apply(n, t);
i.add(o, n);
}
return i;
}
function u(e) {
return function() {
return c(e, arguments);
};
}
for (var l = {}, f = [], h = {
add: e,
bind: t,
onTranslate: n,
toJSON: i,
toString: o,
update: r
}, d = [ "concat", "replace", "toLowerCase", "toUpperCase" ], p = 0; p < d.length; p++) h[d[p]] = u(d[p]);
return h;
}
function a(e, t) {
for (var n = 0; n < v.length; n++) if (v[n] == e) {
w[n] = t;
return;
}
v.push(e);
w.push(t);
}
function c(e) {
for (var t = 0; t < v.length; t++) if (v[t] == e) {
v.splice(t, 1);
w.splice(t, 1);
return;
}
}
function u(e) {
e = e.split(/-|_/).slice(0, 2);
var t = e[0] = e[0].toLowerCase();
e[1] && (e[1] = e[1].toUpperCase());
e = e.join("_");
return n.languages ? e in n.languages ? e : t in n.languages ? t : null : null;
}
function l(t) {
var r, s, a, c, l, h;
t = u(t);
if (t) {
l = n.languages[t];
if (l) {
h = i[n.languages[t]];
if (h) {
e.language = _ = t;
o.ensureLoaded(h, function(e) {
e && f(t);
if (t == _) {
for (r = 0, s = g.length; r < s; r++) g[r].update instanceof Function && g[r].update(t);
for (r = 0, s = v.length; r < s; r++) {
a = v[r];
c = w[r].toString();
if (y) a.textContent = c; else if ("string" == typeof a.innerText) a.innerText = c; else if ("string" == typeof a.nodeValue) try {
a.data = c;
} catch (e) {}
}
b._active = !0;
s = b.length;
for (r = 0; r < s; r++) try {
b[r] && b[r](t);
} catch (e) {}
b._active = !1;
if (b._dirty) {
for (r = 0; r < s; r++) if (!b[r]) {
r == s - 1 ? b.pop() : b[r--] = b.pop();
s--;
}
b._dirty = !1;
}
}
});
}
}
}
}
function f(e) {
var t, o = i[n.languages[e]];
for (t = 0; t < o.length; t++) 0 !== o[t] && g[t].add(e, o[t]);
}
function h(e) {
b.push(e);
}
function d(e) {
for (var t = 0, n = b.length; t < n; t++) if (b[t] == e) {
b._active ? (b[t] = null, b._dirty = !0) : t == n - 1 ? b.pop() : b[t] = b.pop();
break;
}
}
function p() {
return !(_.search($) == -1);
}
function m(e) {
return p() ? e.replace(/left/, "%left%").replace(/right/, "left").replace(/%left%/, "right").replace(/ltr/, "%ltr%").replace(/rtl/, "ltr").replace(/%ltr%/, "rtl") : e;
}
var g = [], _ = "_", v = [], w = [], b = [], y = t.isTextContent, $ = /^ar|^fa|^he|^ku|^ur/, E = n.strings;
if (E) for (var k = 0; k < E.length; k++) e(k, E[k]);
e.bind = a;
e.flip = m;
e.onLanguage = h;
e.unLanguage = d;
e.update = l;
e.unbind = c;
e.rtl = p;
e.findClosestLanguage = u;
r(e, "jx_core__");
return e;
}();
}).call(t, n(4), n(13), n(24), n(25), n(1));
}, function(e, t, n) {
(function(t, n) {
var i = {};
i.Module = t;
i.$Data = n;
e.exports = i;
}).call(t, n(25), n(13));
}, function(e, t, n) {
(function(t, i, o) {
e.exports = function() {
function e(e, n) {
var i = t[e];
i.module_function = new Function("$Modules", n.toString().replace(l, "$1"));
i.ready();
}
function r(e) {
var t, n, i, o;
for (t = u.length - 1; t >= 0; t--) {
i = u[t];
o = i.dependencies;
for (n = o.length - 1; n >= 0; n--) if (o[n] == e) {
o.splice(n, 1);
break;
}
i.ready();
}
}
function s() {
var e = Array.prototype.slice.call(arguments), t = e.shift();
this.fqname = t;
this.name = t.split(".").pop();
this.callbacks = [];
this.dependencies = e;
u.push(this);
}
function a(e) {
e();
}
var c = n(26), u = [], l = /^function *\( *\) *{ *([\s\S]*) *}$/;
s.ensureLoaded = function(e, t) {
e instanceof s ? e.ensureLoaded(t) : t();
};
s.prototype.ensureLoaded = function(e) {
this.ifLoaded(e);
this.load();
};
s.prototype.ifLoaded = function(e) {
this.callbacks.push(e);
};
s.prototype.load = function() {
function n(t) {
e(t[0], t[1]);
}
var o, r, s = this.getDependencies();
for (o = 0; o < s.length; o++) {
r = s[o];
r.loader || (r.loader = new c(i.baseURL + "/lib/" + i.build_number + "/" + r.fqname + ".js", t, n));
}
};
s.prototype.getDependencies = function() {
var e, n = this.dependencies, i = [ this ];
for (e = 0; e < n.length; e++) {
var o = t[n[e]];
i = i.concat(o.getDependencies());
}
return i;
};
s.prototype.ready = function() {
if (!this.dependencies.length && this.module_function) {
for (e = u.length - 1; e >= 0; e--) if (u[e] == this) {
u.splice(e, 1);
break;
}
this.module_function(t);
var e, n = t[this.fqname];
n.ifLoaded = n.ensureLoaded = a;
for (e = 0; e < this.callbacks.length; e++) this.callbacks[e](n);
r(this.fqname);
delete this.callbacks;
delete this.fqname;
delete this.name;
delete this.dependencies;
delete this.loader;
}
};
o(s, "jx_core_Module");
return s;
}();
}).call(t, n(24), n(13), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e, t, n) {
var r = this;
i.extend(r);
var s = new o();
t = t || {};
s.setScope(t);
s.on("success", n);
s.on("error", function(e) {
r.onError(e);
});
s.load(e);
}
var i = n(3), o = n(27);
e.prototype.onError = function(e) {};
t(e, "jx_io_ScriptLoader");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n, i) {
e.exports = function() {
function e(e) {
var i, o, r = t.extend(this);
try {
i = new window.ActiveXObject("htmlfile");
i.open();
i.write("<script>document.win = window</script>");
i.close();
o = i.win;
} catch (e) {}
if (!o) {
var s = this.iframe = document.createElement("iframe"), a = s.style;
r.allowTransparency = "true";
r.frameBorder = "0";
a.backgroundColor = "transparent";
a.position = "absolute";
a.width = a.height = "1px";
a.left = a.top = "-9999px";
a.border = 0;
document.body.appendChild(s);
try {
o = s.contentWindow;
i = o.document;
i.open();
i.close();
} catch (e) {
r.fire("error");
r.destroy();
return;
}
}
r.doc = i;
r.win = o;
r.$Loader = {
cleanup: function() {
n(function() {
r.$Loader.payload ? r.fire("success", r.$Loader.payload) : r.fire("error");
r.$Loader.payload = null;
e || r.destroy();
});
}
};
r.reusable = e;
}
function o(e) {
return e && e.replace(r, function(e) {
return "&#" + e.charCodeAt(0) + ";";
});
}
e.prototype.setScope = function(e) {
this.scope = e;
};
var r = /[&<>"']/g;
e.prototype.load = function(e) {
var t = /^(?:https?:)?\/\//i;
if (t.test(e)) {
e = o(e);
try {
this.doc.open();
this.win.$Loader = this.$Loader;
this.win.$Loader.scope = this.scope || {};
this.doc.write('<html><head><script src="' + e + '"></script></head><body onload="try { $Loader.cleanup() } catch(e) {}"></body></html>');
this.doc.close();
} catch (e) {
this.$Loader.cleanup();
}
} else this.$Loader.cleanup();
};
e.prototype.destroy = function() {
try {
this.iframe && document.body.removeChild(this.iframe);
this.doc = this.win = this.iframe = this.win.$Loader = null;
} catch (e) {}
};
i(e, "jx_io_DataIFrame");
return e;
}();
}).call(t, n(3), n(28), n(1));
}, function(e, t, n) {
(function(t, n, i) {
e.exports = function() {
function e(e, n, i) {
t.ok("function" == typeof e, "1st argument to nextTick must be a function");
if (i) for (var s = a.length; s-- > 0; ) if (a[s][0] === e && a[s][1] === n) return;
a.push([ e, n ]);
r || (r = setTimeout(o, 0));
}
function o() {
var e = +new Date() + s, t = a;
a = [];
r && (r = clearTimeout(r));
for (var i = 0, c = t.length; i < c; i++) {
try {
t[i][0].apply(t[i][1]);
} catch (e) {
n.fire("error", e);
}
if (+new Date() > e) {
if (i < c - 1) {
t.splice(0, i + 1);
if (a.length) a = t.concat(a); else {
a = t;
r = setTimeout(o, 0);
}
}
break;
}
}
}
var r, s = 100, a = [];
e.tick = o;
i(e, "jx_core_globals_nextTick");
return e;
}();
}).call(t, n(5), n(3), n(1));
}, function(e, t, n) {
(function(t, i, o, r) {
e.exports = function() {
function e() {
l = new h();
l.setTags(u());
l.bindToConnectionStatus = s;
l.flush = c;
}
function s(e) {
e.bindValue(a);
}
function a(e) {
if ("registered" == e || "reattached" == e || "cookie_law" == e) {
f = !0;
l.flush();
} else f = !1;
}
function c() {
if (f && this.queue.length) {
p.root.$("livechat").$("ui").$("mockup$bool").getValue() || t(l.send) && l.send({
__type: "instrumentation",
metrics: this.queue
});
this.queue = [];
}
}
function u() {
var e = [];
e.push("client_country_code:" + m.COUNTRY_CODE);
e.push("browser:" + i.browser);
var t, n;
if (d.isMobileBrowser) {
t = d.isMobileTablet ? "tablet" : "mobile";
n = d.isAndroid ? "android" : d.isIOS ? "ios" : d.isWP ? "wp" : "other";
} else {
t = "desktop";
n = i.isWindows ? "win" : i.isMac ? "mac" : "other";
}
e.push("device:" + t);
e.push("platform:" + n);
e.push("rev:" + o.git_commit);
return e;
}
var l, f, h = n(30), d = n(31), p = n(33), m = n(12);
e();
r(l, "meshim_widget_controllers_InstrumentationController");
return l;
}();
}).call(t, n(6), n(4), n(13), n(1));
}, function(e, t, n) {
(function(t, n, i, o) {
e.exports = function() {
function e() {
var e = +new Date(), t = e - h, n = Math.abs(t - u);
n > l && s();
h = e;
}
function r() {
for (var e = p.length; e--; ) {
for (var t = p[e], n = t.queue.length; n--; ) {
var i = t.queue[n];
"histogram" === i.method && t.queue.splice(n, 1);
}
t.start_ts = {};
}
}
function s() {
d = clearInterval(d);
f = !1;
r();
}
function a() {
this.ref_ts = null;
this.from_ref_ts = {};
this.start_ts = {};
this.tags = [];
this.queue = [];
p.push(this);
}
function c(e) {
}
var u = 15e3, l = .2 * u, f = !0, h = +new Date(), d = setInterval(e, u), p = [], m = a.prototype;
m.flush = function() {};
m.setTags = function(e) {
t(e) && (this.tags = e.concat());
};
m.addTag = function(e) {
n(e) && e && this.tags.push(e);
};
m.setRefTime = function(e) {
i(this.ref_ts) ? c("Global start time has already been set - ignoring") : i(e) ? this.ref_ts = e : c("Invalid ref time - ignoring");
};
m.fromRefTime = function(e, t, o) {
if (f) if (i(this.ref_ts)) if (n(e) && e) if (this.from_ref_ts[e]) c(e + " has already been tracked - ignoring"); else {
this.from_ref_ts[e] = !0;
var r = +new Date();
r < this.ref_ts ? s() : this.histogram(e, (r - this.ref_ts) / 1e3, t, o);
} else c("Event name is not provided or invalid"); else c("Global start time has not been set - ignoring");
};
m.start = function(e, t) {
f && (n(e) && e ? e in this.start_ts ? c("Start time of " + e + " has already been set - ignoring") : this.start_ts[e] = i(t) ? t : +new Date() : c("Event name is not provided or invalid"));
};
m.end = function(e, t, i) {
if (f) if (n(e) && e) if (e in this.start_ts) {
var o = +new Date();
if (o < this.start_ts[e]) s(); else {
this.histogram(e, (o - this.start_ts[e]) / 1e3, t, i);
delete this.start_ts[e];
}
} else c("Start time of " + e + " has not been set - ignoring"); else c("Event name is not provided or invalid");
};
m.restart = function(e, t) {
delete this.start_ts[e];
this.start(e, t);
};
m.increment = function(e, t, n) {
this._queue("increment", e, 1, t, n);
this.flush();
};
m.histogram = function(e, t, n, i) {
this._queue("histogram", e, t, n, i);
this.flush();
};
m._queue = function(e, n, o, r, s) {
if (t(r)) {
s = r;
r = void 0;
}
var a = {
method: e,
name: n,
value: o,
tags: this.tags.concat(s || [])
};
i(r) && (a.sample_rate = r);
this.queue.push(a);
};
o(a, "meshim_common_Instrumentation");
return a;
}();
}).call(t, n(18), n(9), n(8), n(1));
}, function(e, t, n) {
(function(t, i, o) {
e.exports = function() {
function e() {
for (var e, t = [ /(android [2-9])|(iemobile\/(?![5-9]))|(ucbrowser)|(Webkit.+Chrome)|(ipod|iphone|ipad).+applewebkit.+(CriOS|Version\/[5-9]|Mobile)/i ], n = 0, i = t.length; n < i; n++) if (t[n].test(x)) {
e = !0;
break;
}
/android.+ucbrowser/i.test(x) && (e = !1);
return e;
}
function r() {
var e, t = window.document.documentElement.clientWidth;
e = s() ? t > I : t > T;
return e;
}
function s() {
return window.document.documentElement.clientWidth > window.document.documentElement.clientHeight;
}
function a(e) {
}
function c() {
return O && b.test(A);
}
function u() {
return O && $.test(A);
}
function l() {
return O && /(iemobile|windows phone)/i.test(x);
}
function f() {
return O && b.test(A) && y.test(x);
}
function h() {
return O && b.test(A) && !y.test(x);
}
function d() {
return O && /ucbrowser/i.test(x);
}
function p() {
return O && /(opera|opr).*android|android.*(opera|opr)/i.test(x);
}
function m() {
return O && $.test(A) && !E.test(x);
}
function g() {
return O && $.test(A) && E.test(x);
}
function _() {
var e = window.document.documentElement.clientWidth, n = window.document.documentElement.clientHeight, i = e / n > S, o = window.screen.width, r = window.screen.height, s = !1;
if (i && o < r) {
s = !0;
o = window.screen.height;
r = window.screen.width;
}
var a = window.innerWidth, c = e / o;
window.devicePixelRatio && h() && !t.isIOS ? c *= window.devicePixelRatio : l() && (c *= 1.5);
var u = e / a / c;
u = (u / C.MOBILE_ZOOM_ADDITIONAL).toFixed(2);
return u;
}
function v() {
var e = window, t = e.document.documentElement, n = e.document.body, o = null, r = {
top: 0,
left: 0
};
i(t.getBoundingClientRect) && (i(e.getComputedStyle) ? "relative" == e.getComputedStyle(n).position ? o = n : "relative" == e.getComputedStyle(t).position && (o = t) : n.currentStyle ? "relative" == n.currentStyle.position ? o = n : "relative" == t.currentStyle.position && (o = t) : "relative" == n.style.position ? o = n : "relative" == t.style.position && (o = t));
if (o) {
var s = o.getBoundingClientRect();
r.top = s.top + e.pageYOffset - t.clientTop;
r.left = s.left + e.pageXOffset - t.clientLeft;
}
return r;
}
var w = n(32), b = /google inc\./i, y = /chrome/i, $ = /apple computer, inc\./i, E = /crios/i, k = 1.2, S = 1.45, x = window.navigator.userAgent || "", A = window.navigator.vendor || "", O = w(), C = {
isMobileBrowser: O,
isMobileWhitelist: e(),
isMobileTablet: r(),
isAndroid: c(),
isIOS: u(),
isWP: l(),
isIEMobile: l(),
isChromeIOSMobile: g(),
isSafariIOSMobile: m(),
isChromeAndroidMobile: f(),
isOperaAndroidMobile: p(),
isNativeAndroidMobile: h(),
isUCBrowserMobile: d(),
hideVirtualKeyboard: a,
checkLandscape: s,
getZoomLevel: _,
getOffset: v,
MOBILE_ZOOM_ADDITIONAL: k
}, I = 640, T = 320;
o(C, "meshim_widget_utils_Mobile");
return C;
}();
}).call(t, n(4), n(6), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e() {
var e = window.navigator.userAgent || "", t = window.navigator.vendor || "", n = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i, i = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i, o = e || t || window.opera, r = n.test(o) || i.test(o.substr(0, 4));
return r;
}
t(e, "meshim_widget_utils_isMobileBrowser");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, i, o, r, s, a, c) {
e.exports = function() {
function e(e, n, i) {
M = !0;
V.root = $ = e instanceof S ? e : new S("root");
k = i;
if (x.ACCOUNT_KEY || n) {
if (n) {
E = n;
$.$$("livechat.ui.mockup$bool").update(!0);
}
if (T.isMobileBrowser) {
$.$$("livechat.ui.mobile$bool").update(!0);
T.isMobileWhitelist && $.$$("livechat.ui.mobile_whitelist$bool").update(!0);
T.isMobileTablet && $.$$("livechat.ui.tablet$bool").update(!0);
}
window.$zopim_popout ? $.$$("livechat.ui.popout$bool").update(!0) : n || t.setIFrameOnly(!0);
var s, a = y(A);
if (!E) for (var c in L) if (L.hasOwnProperty(c)) {
var u = O.DOM.getVariable(c);
"log" == c && u && "object" == typeof u && $.$("livechat").$("temp").update({
prev_log: u
});
"settings" == c && u && I.getKeys(u).length && $.$("livechat").$("settings").update({
cached$bool: !0
});
if ("object" == typeof u) {
s = I.getKeys(u);
s && s.length && I.fullyExtend(I.descendsObj(a, L[c]), u);
} else I.insertObj(L[c], u, a);
}
$.update(a);
if (!E && !w()) {
var l = o.isIOS ? "unload" : "beforeunload";
r.window.on(l, function() {
try {
b();
} catch (e) {}
});
}
var f = O.getAllowCookieLaw();
"boolean" == typeof f && $.$$("livechat.profile").update({
allow_cookies$bool: f
});
$.$$("livechat.settings.package").on("value", function(e) {
if (e) {
"color_customization_enabled$int" in e && e.color_customization_enabled$int && (R = 1);
"widget_customization_enabled$int" in e && e.widget_customization_enabled$int && (R = 2);
}
});
V.fire("init");
}
}
function i(e) {
s(e) && (M ? e() : V.on("init", e));
}
function u(e, t) {
C.sendChatMsg(e, t);
}
function l(e) {
var t = parseInt(k.getServerTime().toFixed(0), 10), n = t + "";
$.$("livechat").$("channel").$("log").$(n).write({
timestamp$int: t,
nick$string: $.$("livechat").$("profile").$("nick$string").getValue() || "",
display_name$string: $.$("livechat").$("profile").$("display_name$string").getValue() || "",
type$string: "chat.file.upload",
file_name$string: e.file_name || "",
file_type$string: e.file_type || "",
file_size$int: e.file_size || 0,
unverified$bool: !0,
__client$bool: !0
});
return t;
}
function f(e) {
if (e) {
var t = {};
"name" in e && (t.display_name$string = e.name + "");
"email" in e && (t.email$string = e.email + "");
"phone" in e && (t.phone$string = e.phone + "");
"department_id" in e && (t.department_id$int = e.department_id);
$.$$("livechat.profile").write(t);
return !0;
}
}
function h() {
O.clearAll();
$.$("livechat").$("ui").$("chat_button").$("unread_count$int").update(0);
$.$$("livechat.channel").update(null);
$.$$("profile").update(null);
}
function d() {
var e = $.$$("livechat.settings.cookie_law.enabled$bool").getValue(), t = $.$$("livechat.profile.allow_cookies$bool").getValue();
return !e || t !== !1;
}
function p() {
$.$$("connection").update({
reconnect$bool: !0
});
}
function m(e) {
if (!E) {
var t = $.$$("livechat.account.key$string").getValue(), n = $.$$("livechat.profile.mid$string").getValue();
e && t && n && window.open(x.AUTH_URL.replace("$NAME", e).replace("$KEY", t).replace("$MID", n), j + t, $.$$("livechat.ui.mobile$bool").getValue() ? "" : U);
}
}
function g() {
if ($.$$("livechat.profile.auth.type$string").getValue()) {
$.$$("livechat.profile.auth").write({
type$string: null
});
$.$$("livechat.profile").update({
display_name$string: "",
email$string: ""
});
} else $.$$("livechat.profile").write({
display_name$string: "",
email$string: ""
});
}
function _() {
$.$$("livechat.channel").write({
chatting$bool: !1
});
}
function v() {
return $.$$("livechat.ui.mockup$bool").getValue() ? 100 : R;
}
function w() {
var e = $.$("livechat").$("account").$("status$string").getValue();
return a(e, D) > -1;
}
function b() {
if (P.canStoreCookie()) {
var e = new S("root");
e.update($.getValue());
for (var t = 0, n = N.length; t < n; t++) e.$$(N[t]).update(null);
var i, o;
for (i in L) if (L.hasOwnProperty(i)) {
switch (i) {
case "settings":
o = k.getServerSettings("settings");
break;

case "log":
o = e.$("livechat").$("channel").$("chatting$bool").getValue() ? I.getLastLogEntries($.$$(L[i]), x.CHAT_LOG_REMEMBER_COUNT) : null;
break;

default:
o = e.$$(L[i]).getValue();
}
O.DOM.saveVariable(i, o);
}
e = null;
}
}
function y(e) {
if ("object" != typeof e || !e) return e;
var t = {};
for (var n in e) e.hasOwnProperty(n) && (t[n] = y(e[n]));
e.hasOwnProperty(F) && (t[F] = y(e[F]));
return t;
}
var $, E, k, S = n(11), x = n(12), A = n(46), O = n(15), C = n(47), I = n(22), T = n(31), D = [ "banned", "invalid_account_key" ], L = {
last_host: "connection.server$string",
chatting: "livechat.channel.chatting$bool",
account_status: "livechat.account.status$string",
settings: "livechat.settings",
ui: "livechat.ui",
notification: "livechat.profile.notification",
departments: "livechat.departments",
log: "livechat.channel.log",
read: "livechat.channel.read",
features: "livechat.features"
}, N = [ "livechat.settings.cached$bool", "livechat.ui.chat_window.menu_stack_name$string", "livechat.ui.chat_window.pre_chat_form.submitted$bool", "livechat.ui.post_chat_form.stack_index$int", "livechat.ui.offline_form.stack_index$int", "livechat.ui.theme_reload$bool", "livechat.ui.theme_loaded$bool", "livechat.ui.popout$bool", "livechat.ui.mobile$bool", "livechat.ui.mobile_overlay$bool", "livechat.ui.mobile_notifications$bool", "livechat.ui.chat_window.chat_panel.file_toast.error$string", "livechat.ui.departments.filter_enabled$bool" ], R = 0, M = !1, P = {
sendChatMsg: u,
sendFile: l,
updateProfile: f,
clearAll: h,
reconnect: p,
canStoreCookie: d,
doExternalLogin: m,
doExternalLogout: g,
endChat: _,
getLimit: v,
isAccountError: w
}, j = "zlivechatexternallogin_", U = "width=500,height=500,menubar=no,toolbar=no,location=no,personalbar=no,status=no,resizable=yes,scrollbars=no", V = r.extend({
init: e,
root: $,
livechat: P,
afterInit: i
}), F = "toString";
c(V, "meshim_widget_controllers_DataController");
return V;
}();
}).call(t, n(34), n(45), n(4), n(3), n(6), n(42), n(1));
}, function(e, t, n) {
(function(t, n, i, o, r, s, a, c, u) {
e.exports = function() {
var e = t.REGEX, l = {};
n.extend(l);
l.generateAll = i.generateAll;
l.generate = i.generate;
l.writeChanges = i.writeChanges;
l.setPalette = o.setPalette;
l.delPalette = o.delPalette;
l.delPalettes = o.delPalettes;
l.appendPalette = o.appendPalette;
l.getPalette = o.getPalette;
o.initDefaultPalette();
l.setIFrameOnly = r.setIFrameOnly;
l.bindIFrame = r.bindIFrame;
l.unbindIFrame = r.unbindIFrame;
l.transform2CSS = s;
l.getVariable = function(t) {
for (var n = a.palettes, i = a.priorities, o = i.length - 1; o >= 0; o--) if (i[o] && n[i[o]] && (n[i[o]][t] || c(n[i[o]][t]))) return e.isVariable.test(n[i[o]][t]) ? l.getVariable(n[i[o]][t].toString().slice(2)) : n[i[o]][t];
};
l.reload = function() {
l.writeChanges(!0);
};
u(l, "jx_core_JCSS");
return l;
}();
}).call(t, n(35), n(3), n(36), n(44), n(37), n(43), n(38), n(8), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
return e.join("");
}
var n = {
space: / /g,
repeatingLinearGradient: /^\s*repeating-linear-gradient/,
prependFQName: /^(\*\*self|)(?!.+?keyframes)/,
prePrependFQName: /^(?!\*\*self)/g,
replacePseudo: /\:\:\:([A-Za-z_\-.]+)/g,
replaceAppend: / +?&/g,
placeholder: /::placeholder$/,
replaceVariables: /(?:(?:([A-Za-z\-]+):)??(?:& *:)?\$\$([A-Za-z_\.]+))(?=;)/g,
replaceLeftovers: /(?:(?:[A-Za-z\-]+:)??(?:& *:)?(\$\$[A-Za-z_\.]*?)??)(?=;)/g,
replaceMedia: /(.*)(@media.*)@mediaend(.*)/,
commaStart: /^,/,
selectorCase: /([A-Z]+)/g,
removePrefix: /^\$\$/,
isVariable: /\$\$[A-Za-z_]+/
}, i = {
REGEX: n,
join: e
};
t(i, "jx_core_jcss_modules_JCSSUtils");
return i;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n, i, o, r, s, a, c, u, l, f) {
e.exports = function() {
function e(e) {
var t;
for (var n in i) if (i.hasOwnProperty(n)) {
t = i[n];
if (t && t.prototype && t.__jx__jcss && !t.__jx__jcss_generated) {
h.call(this, null, t.prototype.__jx__fqname, t.__jx__jcss, null, t);
t.__jx__jcss_generated = !0;
}
}
e || d.call(this);
}
function h(e, t, n, i, s, a) {
if (n && (e || s)) {
var c;
t = t ? "." + t.trim().replace(v.space, ".") : "";
n = n || {};
i = "_" + (i || "");
s = s || e.__jx__constructor;
c = g(s).replace(/\*\*self/g, t);
o.cache[i] = o.cache[i] || [];
y[i] = y[i] || [];
o.cache[i].push(c);
y[i].push(c);
$[i] = !!a;
_ || (_ = r.schedule(d, this));
}
}
function d(e) {
_ && (_ = r.clearSchedule(_));
var t, i, a = e ? o.cache : y;
m();
for (i in a) if (a.hasOwnProperty(i)) {
if (!a[i]) continue;
var c = a[i].join("\n");
t = c.replace(v.replaceVariables, p);
n.getIFrameOnly() || s.setStyleSheet(document, "jcss" + i, t, e || $[i]);
for (var u = 0; u < E.length; u++) s.setStyleSheet(E[u].idoc, "jcss" + i, t, e || $[i]);
o.cache_replaced[i] = e ? t : (o.cache_replaced[i] || "") + t;
$[i] = !1;
}
y = {};
this.fire("write", t);
}
function p(e, t, n) {
for (;b[n] || a(b[n]); ) n = b[n].toString().replace(v.removePrefix, "");
return t ? c.toStyle(t, n) : n || "";
}
function m() {
var e, t, n, i = {};
b = {};
for (t in o.palettes) if (o.palettes.hasOwnProperty(t)) {
n = u(t, o.priorities);
for (e in o.palettes[t]) if (o.palettes[t].hasOwnProperty(e) && (isNaN(i[e]) || n > i[e]) && (o.palettes[t][e] || a(o.palettes[t][e]))) {
b[e] = o.palettes[t][e];
i[e] = n;
}
}
}
function g(e) {
var t = e.prototype.__jx__fqname;
if (o.cached_fqname[t]) return o.cached_fqname[t];
o.cached_fqname[t] = {};
var n = [], i = e.__jx__jcss || {}, r = l(i, "", "**self", !0).join("\n");
e && e.prototype.__jx__super && n.push(g(e.prototype.__jx__super));
n.push(r);
o.cached_fqname[t] = n.join("\n");
return o.cached_fqname[t];
}
var _, v = t.REGEX, w = {
generateAll: e,
generate: h,
writeChanges: d
}, b = {}, y = {}, $ = {}, E = n.getIFrames();
f(w, "jx_core_jcss_modules_JCSSGenerator");
return w;
}();
}).call(t, n(35), n(37), n(24), n(38), n(40), n(39), n(8), n(41), n(42), n(43), n(1));
}, function(e, t, n) {
(function(t, n, i, o) {
e.exports = function() {
function e(e) {
for (var i = 0, o = f.length; i < o; i++) if (e === f[i]) return;
f.push(e);
for (var r in t.cache) t.cache.hasOwnProperty(r) && n.setStyleSheet(e.idoc, "jcss" + r, t.cache_replaced[r]);
}
function r(e) {
for (var t = 0, n = f.length; t < n; t++) e === f[t] && f.splice(t, 1);
}
function s(e) {
u = i(e);
}
function a() {
return u;
}
function c() {
return f;
}
var u, l = {
bindIFrame: e,
unbindIFrame: r,
setIFrameOnly: s,
getIFrameOnly: a,
getIFrames: c
}, f = [];
o(l, "jx_core_jcss_modules_JCSSIFrame");
return l;
}();
}).call(t, n(38), n(39), n(16), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
var e = {
cached_fqname: {},
cache: {},
cache_replaced: {},
palettes: {},
priorities: []
};
t(e, "jx_core_jcss_modules_JCSSStore");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n) {
e.exports = function() {
function e(e, t, n, o) {
e || (e = document);
var s = i(e, t);
if (s) if (o) s.styleSheet ? s.styleSheet.cssText = n : s[r ? "textContent" : "innerText"] = n; else if (s.styleSheet) s.styleSheet.cssText = [ s.styleSheet.cssText, n ].join(""); else {
var a = document.createTextNode(n);
s.appendChild(a);
} else {
s = e.createElement("style");
e.getElementsByTagName("head")[0].appendChild(s);
s.type = "text/css";
t && s.setAttribute("__jx__stylesheet_id", t);
if (void 0 !== s.styleSheet) {
if (!s.styleSheet) {
e.getElementsByTagName("head")[0].removeChild(s);
s = null;
return;
}
s.styleSheet.cssText = n;
} else s[r ? "textContent" : "innerText"] = n;
}
}
function i(e, t) {
if (t) {
e || (e = document);
for (var n = 0, i = e.styleSheets.length; n < i; n++) if ((e.styleSheets[n].ownerNode && e.styleSheets[n].ownerNode.getAttribute("__jx__stylesheet_id") || e.styleSheets[n].owningElement && e.styleSheets[n].owningElement.getAttribute("__jx__stylesheet_id")) == t) return e.styleSheets[n].ownerNode && e.styleSheets[n].ownerNode || e.styleSheets[n].owningElement && e.styleSheets[n].owningElement;
}
}
var o = {
setStyleSheet: e
}, r = t.isTextContent;
n(o, "jx_core_jcss_modules_JCSSStyleSheet");
return o;
}();
}).call(t, n(4), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e() {
if (d) {
var e = new d(s);
c = document.createTextNode("");
e.observe(c, {
characterData: !0
});
u = o;
} else u = r;
}
function n(e, t) {
if ("function" == typeof e) {
var n = m++;
h.push({
cb: e,
self: t,
id: n
});
if (!f) {
u();
f = !0;
}
return n;
}
}
function i(e) {
for (var t = h.length - 1; t >= 0; t--) h[t].id === e && (h[t].cb = a);
}
function o() {
p = -p;
c.data = p;
}
function r() {
setTimeout(s, 0);
}
function s() {
for (var e = 0; e < h.length; e++) {
var t = h[e], n = t.cb, i = t.self;
n.call(i);
}
h = [];
f = !1;
}
function a() {}
var c, u, l = {
schedule: n,
clearSchedule: i
}, f = !1, h = [], d = window.MutationObserver || window.WebKitMutationObserver, p = 1, m = 1;
e();
t(l, "jx_core_jcss_modules_JCSSAsap");
return l;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n, i) {
e.exports = function() {
function e() {
function t(e) {
if (e in i) return e;
for (var t = e.charAt(0).toUpperCase() + e.slice(1), r = n.length; r--; ) {
var s = n[r] + t;
if (s in i) return "-" + n[r].toLowerCase() + "-" + o(e);
}
return e;
}
e = function() {};
for (var n = [ "Moz", "webkit", "ms" ], i = document.createElement("div").style, r = p.length; r--; ) {
var s = p[r];
m[s] = t(s);
}
}
function o(e) {
return e.replace(h.selectorCase, "-$1").replace(h.commaStart, "").toLowerCase();
}
function r(t, i) {
e();
var r;
i += "";
if (h.isVariable.test(i)) return t + ":" + i + ";";
if ("!important" === i.substr(-10)) {
r = !0;
i = i.substr(0, i.length - 10).trim();
}
switch (!0) {
case "background" === t:
return a(i, r);

case "display" === t:
return n.bugs.noBoxSizing && "inline-block" == i ? "" + s("display", "inline", r) + s("zoom", "1", r) : s("display", i, r);

case t in m:
return s(m[t], i, r);

default:
return s(o(t), i, r);
}
}
function s(e, t, n) {
return e + ":" + t + (n ? "!important;" : ";");
}
function a(e, t) {
var n, i = [];
n = e.split(" ");
switch (n[0]) {
case "linear-gradient":
n.splice(0, 1);
e = n.join(" ");
i.push(s("background", "-webkit-linear-gradient" + e, t), s("background", "-o-linear-gradient" + e, t), s("background", "-moz-linear-gradient" + e, t), s("background", "-ms-linear-gradient" + e, t), s("background", "-linear-gradient" + e, t));
break;

case "gradient":
var o, r;
i.push(s("background", c(n[2], n[3]), t));
"top" == n[1] && (o = "bottom");
"left" == n[1] && (o = "right");
"right" == n[1] && (o = "left");
"bottom" == n[1] && (o = "top");
r = g([ "(", n[1], ",", n[2], ",", n[3], ")" ]);
i.push(s("background", "-o-linear-gradient" + r, t), s("background", "-moz-linear-gradient" + r, t), s("background", "-ms-linear-gradient" + r, t), s("background", "linear-gradient" + r, t));
if ("left" == n[1] || "right" == n[1]) {
i.push(s("background", g([ "-webkit-gradient(linear,", n[1], " center,", o, " center,", "from(", n[2], "),to(", n[3], "))" ])));
r = g([ "progid:DXImageTransform.Microsoft.gradient(startColorstr=", u(n[2]), ", endColorstr=", u(n[3]), ", GradientType=1)" ]);
i.push(s("filter", r, t), s("-ms-filter", r, t));
} else {
i.push(s("background", g([ "-webkit-gradient(linear,", "center ", n[1], ",", "center ", o, ",", "from(", n[2], "),to(", n[3], "))" ])));
r = g([ "progid:DXImageTransform.Microsoft.gradient(startColorstr=", u(n[2]), ", endColorstr=", u(n[3]), ")" ]);
i.push(s("filter", r, t), s("-ms-filter", r, t));
}
break;

default:
i.push(s("background", e, t));
}
return i.join("");
}
function c(e, t) {
function n(n) {
return (16 * Math.round((parseInt(e.substring(n, n + 2), 16) + parseInt(t.substring(n, n + 2), 16)) / 32)).toString(16);
}
"rgb" == e.slice(0, 3) && (e = l(e, !0));
"rgb" == t.slice(0, 3) && (t = l(t, !0));
e = u(e).substring(1);
t = u(t).substring(1);
var i = n(0), o = n(2), r = n(4);
return "#" + i + o + r;
}
function u(e) {
if ("string" != typeof e) return "";
var t;
t = "#" == e.charAt(0) ? e.substring(1) : e;
if ("rgb" == t.slice(0, 3)) return l(t);
3 == t.length && (t = t.charAt(0) + t.charAt(0) + t.charAt(1) + t.charAt(1) + t.charAt(2) + t.charAt(2));
return "#" + t;
}
function l(e, t) {
e = e.slice(5, -1);
e = e.split(",");
if (3 == e.length || t) return "#" + f(e[0]) + f(e[1]) + f(e[2]);
e[3] = (255 * parseFloat(e[3], 10)).toFixed();
return "#" + f(e[3]) + f(e[0]) + f(e[1]) + f(e[2]);
}
function f(e) {
e = parseInt(e, 10).toString(16);
1 == e.length && (e = "0" + e);
return e;
}
var h = t.REGEX, d = {
toStyle: r
}, p = [ "animation", "userSelect", "appearance", "transform", "transformOrigin" ], m = {}, g = t.join;
i(d, "jx_core_jcss_modules_JCSSConverter");
return d;
}();
}).call(t, n(35), n(4), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
"use strict";
if (null == this) throw new TypeError();
var t = Object(this), n = t.length >>> 0;
if (0 === n) return -1;
var i = 0;
if (arguments.length > 0) {
i = Number(arguments[1]);
i != i ? i = 0 : 0 != i && i != 1 / 0 && i != -(1 / 0) && (i = (i > 0 || -1) * Math.floor(Math.abs(i)));
}
if (i >= n) return -1;
for (var o = i >= 0 ? i : Math.max(n - Math.abs(i), 0); o < n; o++) if (o in t && t[o] === e) return o;
return -1;
}
function n(e, t, n) {
return i.call(t, e, n);
}
var i = Array.prototype.indexOf;
"function" == typeof i && /\[native code\]/.test(i.toString()) || (i = e);
t(n, "jx_core_globals_indexOf");
return n;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n, i, o, r) {
e.exports = function() {
function e(t, r, u, l, f) {
var h, d, p, m, g, _, v = [], w = [];
for (h in t) if (t.hasOwnProperty(h)) {
d = t[h];
p = void 0;
if ("@keyframes" == h) {
for (var b in d) if (d.hasOwnProperty(b)) {
_ = b + " { " + e(d[b]).join(" ") + " } ";
w.push("@-webkit-keyframes " + _, "@-moz-keyframes " + _, "@-ms-keyframes " + _, "@-o-keyframes " + _, "@keyframes " + _);
}
continue;
}
"@media" == h.slice(0, 6) && (h = [ h, "@mediaend" ].join(""));
switch (typeof d) {
case "boolean":
case "number":
case "string":
p = h.split(",");
for (m = 0, g = p.length; m < g; m++) v.push(n.toStyle(p[m], d));
break;

default:
if (i(d)) {
for (m = 0, g = d.length; m < g; m++) v.push(n.toStyle(h, d[m]));
break;
}
if (s.placeholder.test(h)) {
_ = h.replace(s.placeholder, "");
p = [];
for (m = 0, g = a.placeholder.length; m < g; m++) p.push(c([ _, a.placeholder[m] ]));
}
i(p) || (p = h.split(","));
for (m = 0, g = p.length; m < g; m++) w = w.concat(e(d, p[m].trim()));
}
}
if (v.length) {
if (!f) {
v.unshift("{");
v.push("}");
}
w.push(v.join(""));
}
if (r || u || l && !(o.isIE < 9)) for (m = 0, g = w.length; m < g; m++) {
r && (w[m] = [ r.replace(s.replacePseudo, ".$1"), " ", w[m] ].join(""));
u && (w[m] = w[m].replace(s.prePrependFQName, " ").replace(s.prependFQName, u));
l && (w[m] = w[m].replace(s.replaceAppend, ""));
l && w[m].indexOf("@media") !== -1 && (w[m] = w[m].replace(s.replaceMedia, "$2 { $1 $3 }"));
}
return w;
}
var s = t.REGEX, a = {
placeholder: [ "::-webkit-input-placeholder", ":-moz-placeholder", "::-moz-placeholder", ":-ms-input-placeholder", ".placeholder" ]
}, c = t.join;
r(e, "jx_core_jcss_modules_transform2CSS");
return e;
}();
}).call(t, n(35), n(41), n(18), n(4), n(1));
}, function(e, t, n) {
(function(t, n, i, o) {
e.exports = function() {
function e(e, i, o) {
e = l(e) || {};
i = i || f;
o = parseInt(o, 10);
if ((t.palettes[i] || !isNaN(o)) && (isNaN(o) || !(o < 0)) && (i != f || isNaN(o) || o == h) && (!t.priorities[o] || t.priorities[o] == i)) {
t.palettes[i] = e;
if (!isNaN(o)) {
var r = n(i, t.priorities);
r != -1 && (t.priorities[r] = void 0);
t.priorities[o] = i;
}
}
}
function r(e) {
if (e) {
var o;
if (i(e)) {
if (!t.priorities[e]) return;
delete t.palettes[t.priorities[e]];
t.priorities[e] = void 0;
} else {
if (!t.palettes[e]) return;
o = n(e, t.priorities);
delete t.palettes[e];
t.priorities[o] = void 0;
}
}
}
function s() {
t.palettes = {};
t.priorities.length = 0;
a();
}
function a() {
e({}, f, h);
}
function c() {}
function u(e) {
e = e || f;
return t.palettes[e] || {};
}
function l(e, t, n) {
if (e) {
t || (t = {});
n ? n += "." : n = "";
for (var i in e) e.hasOwnProperty(i) && ("object" == typeof e[i] ? l(e[i], t, n + i) : t[n + i] = e[i]);
return t;
}
}
var f = "__jcss__default", h = 0, d = {
initDefaultPalette: a,
setPalette: e,
delPalette: r,
delPalettes: s,
appendPalette: c,
getPalette: u
};
o(d, "jx_core_jcss_modules_JCSSPalette");
return d;
}();
}).call(t, n(38), n(42), n(8), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e() {}
function n(t) {
e.prototype = t;
return new e();
}
t(n, "jx_core_globals_clone");
return n;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n) {
e.exports = function() {
var e = {
livechat: {
timestamp$int: +new Date(),
settings: {
behavior: {
do_not_display$bool: !1
},
theme: {
name$string: "simple",
message_type$string: "bubble_avatar",
colors: {
placeholder$string: "_"
},
chat_button: {
position$string: "br",
position_mobile$string: "br"
},
chat_window: {
position$string: "br",
size$string: "medium",
profile_card: {
display_avatar$bool: !0,
display_rating$bool: !0,
display_title_name$bool: !0
},
use_banner$bool: !0,
title_bar: {
hide_minimize$bool: !1,
hide_popout$bool: !1
}
},
branding: {
type$string: "icon_font_zopim"
}
},
greetings: {
online$string: t("Chat With Us"),
offline$string: t("Leave a Message")
},
banner: {
enabled$bool: !0,
layout$string: "image_right",
text$string: t("Chat with us"),
image_path$string: "",
image_data$string: ""
},
chat_button: {
hide_when_offline$bool: !1
},
chat_window: {
mobile_mode$string: "popout",
title_bar: {
title$string: t("support"),
status_messages: {
online$string: t("We're online."),
away$string: t("We're away."),
offline$string: t("We're offline.")
}
}
},
login: {
allowed_types: {
email$bool: !0,
facebook$bool: !0,
twitter$bool: !1,
google$bool: !0
},
phone_display$bool: !1,
restrict_profile$bool: !1
},
concierge: {
display_name$string: t("Live Support"),
title$string: t("Ask us anything"),
avatar_path$string: "",
avatar_data$string: "",
greeting: {
enabled$bool: !1,
message$string: t("Hi, welcome to our website!")
}
},
branding: {
hide_branding$bool: !1,
hide_favicon$bool: !1,
custom_favicon_path$string: ""
},
language: {
language$string: "--"
},
cookie_law: {
enabled$bool: !1
},
sound: {
disabled$bool: !1
},
popout: {
enabled$bool: !0
},
rating: {
enabled$bool: !0
},
end_chat_menu: {
enabled$bool: !0,
message$string: ""
},
emoticons: {
enabled$bool: !1
},
bubble: {
enabled$bool: !0,
title$string: t("Questions?"),
text$string: t("Click here to chat with us")
},
forms: {
pre_chat_form: {
required$bool: !1,
profile_required$bool: !1,
message$string: "",
form: {
0: {
name$string: "name",
required$bool: 0
},
1: {
name$string: "email",
required$bool: 0
},
2: {
label$string: t("Choose a Department"),
name$string: "department",
required$bool: 0,
type$string: "department"
},
3: {
label$string: t("Message"),
name$string: "message",
required$bool: 0,
type$string: "textarea"
},
4: {
label$string: t("Phone"),
name$string: "phone",
required$bool: 0,
type$string: "text",
hidden$bool: !0
}
}
},
offline_form: {
message$string: t("Sorry, we aren't online at the moment. Leave a message and we'll get back to you."),
message_disabled$string: t("Sorry, we aren't online at the moment."),
post_submit_message$string: t("Thanks for the message! We'll get back to you as soon as we can."),
profile_required$bool: !0,
form: {
0: {
name$string: "name",
required$bool: 1
},
1: {
name$string: "email",
required$bool: 1
},
2: {
label$string: t("Message"),
name$string: "message",
required$bool: 1,
type$string: "textarea"
},
3: {
label$string: t("Phone"),
name$string: "phone",
required$bool: 0,
type$string: "text",
hidden$bool: !0
}
}
},
post_chat_form: {
header$string: t("Nice chatting with you!"),
message$string: t("How would you rate the chat experience you just had?"),
comments_enabled$bool: !0,
comments_messages: {
good: {
message$string: t("Thanks for the good rating! Would you like to leave a comment?"),
placeholder$string: t("What did you like about this chat?")
},
bad: {
message$string: t("Sorry that we disappointed you. We'd appreciate it if you could tell us how to improve."),
placeholder$string: t("What did you dislike about this chat?")
}
}
},
card_form: {}
}
}
}
};
n(e, "meshim_widget_controllers_DefaultDataNode");
return e;
}();
}).call(t, n(23), n(1));
}, function(e, t, n) {
(function(t, i, o) {
e.exports = function() {
function e(e, t) {
h = e;
d = t;
h.$("livechat").$("channel").$("department_id$int").on("value", function(e) {
e && (p = e);
});
}
function r(e, t, n) {
var i = parseInt(t, 10) || parseInt(d.getServerTime().toFixed(0), 10), o = i + "", r = h.$("livechat").$("profile"), s = p, a = (e.msg || "") + "";
"department" in e && (s = e.department);
h.$("livechat").$("channel").$("log").$(o).write({
timestamp$int: i,
type$string: "chat.msg",
msg$string: a,
nick$string: r.$("nick$string").getValue() || "",
display_name$string: r.$("display_name$string").getValue() || "",
department_id$int: s,
unverified$bool: !0,
__client$bool: !0
}, n);
}
function s(e, t) {
var n = parseInt(t, 10) || parseInt(d.getServerTime().toFixed(0), 10), i = n + "";
h.$("livechat").$("channel").$("log").$(i).write({
timestamp$int: n,
nick$string: h.$("livechat").$("profile").$("nick$string").getValue() || "",
display_name$string: h.$("livechat").$("profile").$("display_name$string").getValue() || "",
type$string: "chat.file.upload",
file_name$string: e.file_name || "",
file_type$string: e.file_type || "",
file_size$int: e.file_size || 0,
unverified$bool: !0,
__client$bool: !0
});
return n;
}
function a(e, n) {
function o(e) {
if ("ok" !== e.raw.__status) return n(new window.Error(f(e.raw.error)));
if (!e.raw.data || "chat.file" !== e.raw.data.type) return n(new window.Error("INTERNAL_ERROR"));
n(null, w.pick(e.raw.data, [ "mime_type", "name", "size", "url" ]));
}
var r = $._validateAndPrepareData([ e ]);
n = m.once(n);
if (t(r)) i(function() {
n(new window.Error(r));
}); else {
var s = d.registerCallback(o), a = "https://" + r.host + g.CALLBACK_FILE_UPLOAD_PATH, c = {
ts: parseInt(d.getServerTime().toFixed(0), 10),
__messageID: s
}, u = {
"X-Zopim-MID": r.mid,
"X-Zopim-UID": r.uid
}, l = {
error: function() {
n(new window.Error("CONN_ERROR"));
},
load: function() {
if (200 !== this.status) {
var e;
try {
e = JSON.parse(this.responseText);
} catch (e) {}
n(e && e.error ? new window.Error(f(e.error)) : new window.Error("INTERNAL_ERROR"));
}
}
};
$._uploadFiles(r.form_data, a, c, u, l);
}
}
function c(e, n) {
var i = $._validateAndPrepareData(e);
if (t(i)) return i;
var o = s({
file_name: i.name,
file_type: i.type,
file_size: i.size
}, n), r = "https://" + i.host + g.FILE_UPLOAD_PATH, a = {
ts: o
}, c = {
"X-Zopim-MID": i.mid,
"X-Zopim-UID": i.uid
};
$._uploadFiles(i.form_data, r, a, c);
}
function u(e) {
if (!window.FormData) return "NOT_SUPPORTED";
var t = h.$("livechat"), n = t.$("settings").$("file_sending"), i = t.$("settings").$("package"), o = n.$("enabled$bool").getValue(), r = void 0 === o || o, s = (n.$("allowed_extensions$string").getValue() || "").trim().replace(/\s*,\s*/g, ",").split(","), a = i.$("color_customization_enabled$int").getValue() || i.$("widget_customization_enabled$int").getValue(), c = t.$("profile").$("mid$string").getValue(), u = t.$("profile").$("uid$string").getValue(), l = d.getHost(), f = new window.FormData(), p = [], m = [], v = 0;
if (!l) return "CONN_ERROR";
if (!a) return "INVALID_PLAN";
if (!r) return "NOT_ALLOWED";
for (var w = 0, b = e.length; w < b; w++) {
if (!_.isValidType(e[w].name, s)) return "INVALID_EXTENSION";
p.push(e[w].name);
m.push(e[w].type);
v += e[w].size || 0;
f.append("file_" + e[w].name, e[w]);
}
return v > g.FILE_UPLOAD_MAX ? "EXCEED_SIZE_LIMIT" : {
form_data: f,
name: p.join(", "),
type: m.join(", "),
size: v,
host: l,
mid: c,
uid: u
};
}
function l(e, t, n, i, o) {
var r = new window.XMLHttpRequest(), s = t + (Object.keys(n).length ? "?" + v.buildQuery(n) : "");
if (r.upload) {
r.open("POST", s, !0);
for (var a in i) i.hasOwnProperty(a) && r.setRequestHeader(a, i[a]);
for (var c in o) o.hasOwnProperty(c) && r.addEventListener(c, o[c]);
r.send(e);
}
}
function f(e) {
return y[e] || "UNKNOWN_ERROR";
}
var h, d, p, m = n(48), g = n(12), _ = n(49), v = n(17), w = n(22), b = {
NOT_SUPPORTED: "NOT_SUPPORTED",
NOT_ALLOWED: "NOT_ALLOWED",
CONN_ERROR: "CONN_ERROR",
INVALID_EXTENSION: "INVALID_EXTENSION",
INVALID_PLAN: "INVALID_PLAN",
EXCEED_SIZE_LIMIT: "EXCEED_SIZE_LIMIT",
INTERNAL_ERROR: "INTERNAL_ERROR",
UNKNOWN_ERROR: "UNKNOWN_ERROR"
}, y = {
TOO_LARGE: "EXCEED_SIZE_LIMIT",
ILLEGAL_TYPE: "INVALID_EXTENSION",
NO_SESSION: "INTERNAL_ERROR",
UNEXPECTED_ERROR: "INTERNAL_ERROR",
UNABLE_TO_GET_SETTINGS: "INTERNAL_ERROR",
S3_UPLOAD_ERROR: "INTERNAL_ERROR",
NO_GATES: "INTERNAL_ERROR",
FILE_UPLOADS_DISABLED: "NOT_ALLOWED",
FILE_UPLOADS_TEMPORARILY_DISABLED: "INVALID_PLAN"
}, $ = {
FILE_SENDING_ERRORS: b,
init: e,
sendChatMsg: r,
sendFiles: c,
sendFileWithCallback: a,
_validateAndPrepareData: u,
_uploadFiles: l
};
o($, "meshim_widget_controllers_ChatUtils");
return $;
}();
}).call(t, n(9), n(28), n(1));
}, function(e, t, n) {
(function(t, n) {
e.exports = function() {
function e(e, n) {
if (!t(e)) throw new TypeError("FunctionUtils.bind - what is trying to be bound is not callable");
if (t(e.bind) && !("prototype" in e.bind)) return e.bind.apply(e, r.call(arguments, 1));
var i = r.call(arguments, 2), o = function() {}, s = function() {
return e.apply(this instanceof o && n ? this : n, i.concat(r.call(arguments)));
};
o.prototype = s.prototype;
s.prototype = new o();
return s;
}
function i(e) {
var t;
return function() {
if (!t) {
t = !0;
return e.apply(this, r.call(arguments));
}
};
}
var o = {
bind: e,
once: i
}, r = Array.prototype.slice;
n(o, "jx_core_FunctionUtils");
return o;
}();
}).call(t, n(6), n(1));
}, function(e, t, n) {
(function(t, n, i, o) {
e.exports = function() {
var e = t("File size too large. Maximum limit is <size>."), r = t("The file you are trying to send is not supported."), s = t("File sending is temporarily disabled. Please try again later."), a = t("<size> bytes"), c = t("<size> KB"), u = t("<size> MB"), l = {};
l.ERR_SIZE = "TOO_LARGE";
l.ERR_FORMAT = "ILLEGAL_TYPE";
l.ERR_DISABLED = "FILE_UPLOADS_TEMPORARILY_DISABLED";
var f = /^(x-|vnd\.)/i, h = [ "png", "jpg", "jpeg", "gif", "txt", "pdf" ], d = {}, p = t("Failed to send. Please try again.");
d[l.ERR_SIZE] = e;
d[l.ERR_FORMAT] = r;
d[l.ERR_DISABLED] = s;
l.prettySize = function() {
var e = 1e3, t = 1024, n = [ a, c, u ], i = [ 0, 1, 2 ];
return function(o, r) {
o = Math.max(parseInt(o, 10) || 0, 0);
r = r || {};
for (var s, a = r.base2 ? t : e, c = n.length; c--; ) {
s = Math.pow(a, c);
if (o >= s) return n[c].replace("<size>", (o / s).toFixed(i[c]));
}
};
}();
l.prettyType = function(e, t, n) {
n = n || window.Infinity;
var i = e.split("/")[1];
i = i && i.replace(f, "");
if (i && i.length < n) return i.toLowerCase();
i = t.split(".").pop();
return (i || "").toLowerCase();
};
l.isValidType = function(e, t) {
if (e) {
t = t || h;
var i = e.substr(e.lastIndexOf(".") + 1).toLowerCase();
return n(i, t) !== -1;
}
};
l.prettyError = function(e, t) {
var n = e in d ? d[e] : p;
i(t) || (n = n.replace("<size>", l.prettySize(t || 5e6)));
return n;
};
l.blobToFile = function(e, t, n) {
e.lastModifiedDate = new Date();
e.name = t;
return new window.File([ e ], t, {
type: n
});
};
l.getExtension = function(e) {
var t = e.lastIndexOf(".");
return t === -1 ? null : e.substr(t + 1).toLowerCase();
};
o(l, "meshim_common_FileUtil");
return l;
}();
}).call(t, n(23), n(42), n(7), n(1));
}, function(e, t, n) {
(function(t, i) {
e.exports = function() {
function e(n, i, o, r) {
if (!p) throw "No available transports";
this.provider = p;
this.options = r = r || {};
for (var s in _) _.hasOwnProperty(s) && (s in r || (r[s] = _[s]));
t.extend(this);
this.id = o || e.generateID();
this.host = n;
this.ns = i;
this.path = "/" + [ "s", this.ns, this.provider.protocol, this.id ].join("/");
this.url = this.host + this.path + "/";
this.status = "connecting";
this.connected = !1;
this.quality = 0;
this.rtt = r.INITIAL_RTT;
this.clock_skew = 0;
this.connect_attempts = 0;
this.connections = 0;
this.disconnects = 0;
this.sent_bytes = 0;
this.recv_bytes = 0;
this.sent_messages = 0;
this.recv_messages = 0;
this.sent_frames = 0;
this.recv_frames = 0;
this.lost_frames = 0;
this.ooo_frames = 0;
this.remote_seq = 0;
this.local_seq = 0;
this.timeout_server = 0;
this.timeout_response_soft = 0;
this.timeout_response_hard = 0;
this.bytes_at_connect = -1;
this.time_last_alive = -1;
this.time_last_open = -1;
this.starttime = +new Date();
this.uptime = 0;
this.connected_time = new a();
this.idle_time = new a();
this.last_frame_time = 0;
this.raw_clock_skew = 0;
this.smooth_skewed_transit_time_in = 0;
this.remote_smooth_skewed_transit_time_out = 0;
this.cur_conn_recv_messages = 0;
this.drained = !0;
this.buffer = [];
this.glitch_timer = this.reconnect_timer = null;
this.reconnect_delay = r.RECONNECT_DELAY_MS * (.2 * Math.random() + .8);
this.keep_alive_interval = 15e3;
this.data_packet_queue = new c(this);
this.connect();
var u = this;
this.onoffline = function() {
e.prototype.onoffline.call(u);
};
this.ononline = function() {
e.prototype.ononline.call(u);
};
t.window.on("offline", this.onoffline);
t.window.on("online", this.ononline);
}
function o() {
var e = E, t = new Date(), n = t.getUTCFullYear() - 2e3, i = t.getUTCMonth() + 1, o = t.getUTCDate(), r = t.getUTCHours(), s = t.getUTCMinutes(), a = t.getUTCSeconds(), c = t.getUTCMilliseconds();
return e[n] + e[i] + e[o] + e[r] + e[s] + e[a] + e[c >> 6] + e[63 & c];
}
function r(e) {
for (var t = "", n = E; e-- > 0; ) t += n.charAt(Math.floor(Math.random() * n.length));
return t;
}
function s(e, t, n) {
return Math.min(n, Math.max(t, e));
}
function a() {
this.count = 0;
this.sum = 0;
this.sq_sum = 0;
this.mean = 0;
this.stddev = 0;
}
function c(e) {
this.socket = e;
this.queue = [];
this.curFrame = null;
this.curIdx = 0;
this.last_work_finished_time = 0;
this.work_timer = null;
this.processing = !1;
}
var u = n(20), l = n(51), f = n(52), h = n(53), d = n(54), p = h || l || f || d, m = d, g = 45e3, _ = {
INITIAL_RTT: 1e3,
RECONNECT_DELAY_MS: 3e4,
FAST_RECONNECT_MS: 100,
FLUSH_DELAY_MS: 75,
MAX_BLOCKING_TIME_MS: 40,
MAX_NO_WORK_TIME_MS: 15
};
e.available = function() {
return !!p;
};
e.generateID = function() {
return r(16);
};
e.prototype.connect = function(e) {
this.debug("connect(" + (e && "glitch" || "") + ")");
if (!this.reconnect_timer) {
var t = this, n = this.options;
this.connections && this.cur_conn_recv_messages || (this.provider = 1 & this.connect_attempts ? m : p);
this.response_timer = clearTimeout(this.response_timer);
this.timeout_timer = clearTimeout(this.timeout_timer);
if (this.socket) {
this.socket.onclose = this.socket.ondrain = this.socket.onerror = this.socket.onmessage = this.socket.onopen = null;
this.socket.abort("connect");
this.socket = null;
}
this.connected = !1;
this.cur_conn_recv_messages = 0;
if (e) {
this.reconnect_delay = n.RECONNECT_DELAY_MS * (.2 * Math.random() + .9);
this.glitch_timer = setTimeout(function() {
t.quality = 0;
t.glitch_timer = setTimeout(function() {
t.status = "reconnecting";
t.fire_break();
}, s(3 * t.rtt, 1e3, 5e3));
}, s(3 * this.rtt, 1e3, 5e3));
}
this.debug("reconnect_delay: " + this.reconnect_delay);
clearTimeout(this.reconnect_timer);
this.reconnect_timer = setTimeout(function() {
t.reconnect_timer = null;
t.reconnect_delay = Math.min(1.4 * t.reconnect_delay + 1e3, 6e4);
t.reconnect_delay *= .2 * Math.random() + .9;
t.connect();
}, this.reconnect_delay);
this.path = "/" + [ "s", this.ns, this.provider.protocol, this.id ].join("/");
this.url = this.host + this.path + "/";
this.debug("connecting: " + this.url);
this.socket = new this.provider(this.url);
this.transport = this.provider.protocol;
this.connect_attempts++;
this.socket.onopen = function() {
t.status = "connected";
t.glitch_timer = clearTimeout(t.glitch_timer);
t.reconnect_timer = clearTimeout(t.reconnect_timer);
t.connections++;
t.drained = !0;
t.connected = !0;
t.time_last_open = t.time_last_alive = +new Date();
t.uptime >= 0 && (t.uptime -= t.time_last_open);
1 == t.connections ? t.fire("open") : t.fire_resume();
t.flush();
t.keep_alive();
t.debug("connected");
t.bytes_at_connect == -1 && setTimeout(function() {
t.bytes_at_connect = t.recv_bytes;
}, 50);
};
this.socket.onmessage = function(e, n) {
t.onmessage(e, n);
};
this.socket.onclose = function(e) {
t._onclose(e);
};
this.socket.ondrain = function(e) {
t._ondrain(e);
};
this.socket.onerror = function(e) {
t._onerror(e);
};
}
};
e.prototype.reconnect = function() {
this.reconnect_timer = clearTimeout(this.reconnect_timer);
this.broken_reason = "FORCED_RECONNECT";
this.connect();
};
e.prototype.send = function(e, t) {
if ("disconnected" != this.status) {
"null" == this.buffer[0] && (this.buffer = []);
this.buffer.push(u.stringify(e));
this.schedule_flush();
t && this.response_timeout();
}
};
e.prototype.close = function(e) {
this.debug("close()");
this.flush_scheduled = clearTimeout(this.flush_scheduled);
this.keep_alive_timer = clearTimeout(this.keep_alive_timer);
this.reconnect_timer = clearTimeout(this.reconnect_timer);
this.response_timer = clearTimeout(this.response_timer);
this.timeout_timer = clearTimeout(this.timeout_timer);
this.broken_reason || (this.broken_reason = "CLOSE");
this.fire_break();
this.status = e ? "reconnecting" : "disconnected";
this.connected = !1;
this.quality = 0;
if (this.socket) {
this.socket.onclose = this.socket.ondrain = this.socket.onerror = this.socket.onmessage = this.socket.onopen = null;
this.socket.abort("close");
this.socket = null;
if (!e) {
t.window.un("offline", this.onoffline);
t.window.un("online", this.ononline);
}
}
};
e.prototype.hibernate = function() {};
e.prototype.onoffline = function() {
this.broken_reason = "OFFLINE";
this.debug("onoffline");
this.close(!0);
};
e.prototype.ononline = function() {
this.debug("ononline");
if ("disconnected" != this.status && !this.connected) {
this.reconnect_timer = clearTimeout(this.reconnect_timer);
this.connect();
}
};
e.prototype.schedule_flush = function() {
if ("disconnected" != this.status && !this.flush_scheduled && this.drained && this.connected) {
var e = this, t = this.options;
this.flush_scheduled = setTimeout(function() {
e.flush();
}, t.FLUSH_DELAY_MS);
}
};
e.prototype.flush = function() {
if ("disconnected" != this.status && this.buffer.length && this.drained && this.connected) {
var e = this.buffer;
this.sent_messages += e.length;
this.sent_frames++;
e = this.generate_frame(e.join("\n"));
this.drained = this.socket.send(e);
this.sent_bytes += e.length;
this.flush_scheduled = clearTimeout(this.flush_scheduled);
this.buffer = [];
this.keep_alive();
this.time_last_alive = +new Date();
}
};
e.prototype.keep_alive = function() {
if ("disconnected" != this.status) {
clearTimeout(this.keep_alive_timer);
var e = this;
this.keep_alive_timer = setTimeout(function() {
e.debug("pong!");
e.send(null);
}, this.keep_alive_interval);
}
};
e.prototype.response_timeout = function() {
if (!this.response_timer) {
var e = this, t = s(4 * this.rtt + this.options.FLUSH_DELAY_MS, 2e3, 2e4);
this.response_timer = setTimeout(function() {
e.timeout_response_soft++;
e.debug("response timeout, " + t + "ms");
e.fire_break("SOFT_RESPONSE_TIMEOUT");
e.response_timer = setTimeout(function() {
e.timeout_response_hard++;
e.debug("response timeout - reconnecting");
e.broken_reason = "HARD_RESPONSE_TIMEOUT";
e.connect(!0);
}, 2 * t);
}, t);
}
};
e.prototype.reset_server_timeout = function() {
clearTimeout(this.timeout_timer);
var e = this, t = 4 * this.keep_alive_interval + s(4 * e.rtt, 2e3, 2e4);
this.timeout_timer = setTimeout(function() {
e.timeout_server++;
e.debug("server " + t + "ms timeout, reconnecting");
e.broken_reason = "SERVER_TIMEOUT";
e.connect(!0);
}, t);
};
e.prototype.fire_break = function(e) {
this.broken || this.fire("break", e || this.broken_reason);
this.broken = !0;
this.broken_reason = "";
this.uptime < 0 && (this.uptime += +new Date());
};
e.prototype.fire_resume = function() {
this.broken_reason = "";
this.broken && this.fire("resume");
this.broken = !1;
this.uptime >= 0 && (this.uptime -= +new Date());
};
e.prototype.onmessage = function(e, t) {
this.recv_bytes += e.length;
e = e.split("\n");
if (e.length < 6) this.debug("Bad data: " + e.join("\n")); else {
var n = +new Date(), i = +e[0], o = +e[1], r = +e[2], s = (+e[3], e[4]);
this.calculate_clocks(t || +new Date(), i, o);
this.reset_server_timeout();
switch (s) {
case "a":
this.broken_reason = "ABORT";
this.close();
break;

case "d":
this.response_timer = clearTimeout(this.response_timer);
this.fire_resume();
this.check_sequence(r);
this.data_packet_queue.queueFrame(e, 5, n);
break;

case "e":
this.debug("server: Are you still there?");
this.send(null);
this.flush();
break;

case "n":
this.remote_seq = r;
this.keep_alive_interval = +e[5] || 15e3;
this.debug("keep_alive is " + this.keep_alive_interval + "ms");
this.connections > 1 && this.fire("reopen");
break;

case "p":
this.debug("ping!");
}
}
};
e.prototype._onclose = function(e) {
var t = this, n = this.options;
0 == this.connections && 0 == this.disconnects && this.fire("close");
this.debug("_onclose");
this.disconnects++;
this.broken_reason = "HANGUP";
if (this.connected) this.reconnect_timer = setTimeout(function() {
t.reconnect_timer = null;
t.connect(!0);
}, n.FAST_RECONNECT_MS); else if (!this.connections && 1 == this.connect_attempts) {
clearTimeout(this.reconnect_timer);
this.reconnect_timer = setTimeout(function() {
t.reconnect_timer = null;
t.connect();
}, 0);
}
this.connected = !1;
clearTimeout(this.keep_alive_timer);
this.time_last_alive > 0 && this.idle_time.add(+new Date() - this.time_last_alive);
this.time_last_open > 0 && this.connected_time.add(+new Date() - this.time_last_open);
this.time_last_alive = this.time_last_open = -1;
this.uptime < 0 && (this.uptime += +new Date());
};
e.prototype._ondrain = function() {
this.drained = !0;
this.flush();
};
e.prototype._onerror = function(e) {
this.debug("_error");
this.fire("error", e);
};
e.prototype.generate_frame = function(e, t) {
return [ +new Date(), this.smooth_skewed_transit_time_in, ++this.local_seq, this.remote_seq, t || "d", e ].join("\n");
};
var v = .1, w = 50, b = 1e3, y = Math.pow(w, v), $ = Math.pow(b, v) - y;
e.prototype.calculate_clocks = function(e, t, n) {
var i = e - t, o = Math.max(0, e - this.last_frame_time), r = 1 / (o / g + 1);
this.smooth_skewed_transit_time_in ? this.smooth_skewed_transit_time_in = r * this.smooth_skewed_transit_time_in + (1 - r) * i : this.smooth_skewed_transit_time_in = i;
this.remote_smooth_skewed_transit_time_out = n;
if (this.smooth_skewed_transit_time_in && this.remote_smooth_skewed_transit_time_out) {
this.rtt = this.smooth_skewed_transit_time_in + this.remote_smooth_skewed_transit_time_out;
this.quality = ~~(100 * (1 - (Math.pow(this.rtt, v) - y) / $));
this.quality = Math.min(100, Math.max(0, this.quality));
this.raw_clock_skew = i - this.rtt / 2;
this.clock_skew ? this.clock_skew = .9 * this.clock_skew + .1 * this.raw_clock_skew : this.clock_skew = this.raw_clock_skew;
}
this.time_last_alive = this.last_frame_time = e;
};
e.prototype.check_sequence = function(e) {
if (this.remote_seq + 1 == e) this.remote_seq = e; else if (this.remote_seq < e) {
var t = e - this.remote_seq + 1;
this.lost_frames += t;
this.fire("lost", t);
this.remote_seq = e;
} else {
this.ooo_frames++;
this.fire("out_of_order");
}
};
p && (e.prototype.transport = p.protocol);
e.prototype.debug = function() {};
var E = "+-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
e.genDate = o;
e.genID = r;
a.prototype.add = function(e) {
this.count++;
this.sum += e;
this.sq_sum += e * e;
this.mean = this.sum / this.count;
this.stddev = Math.sqrt(this.sq_sum / this.count - this.mean * this.mean);
};
var k = c.prototype;
k.queueFrame = function(e, t, n) {
this.queue.push({
msgs: e,
start_idx: t,
receive_time: n
});
this.process();
};
k.process = function() {
var e = +new Date() - this.last_work_finished_time;
if (!(this.processing && e < this.socket.options.MAX_NO_WORK_TIME_MS)) {
this.work_timer = window.clearTimeout(this.work_timer);
this.processing = !0;
this.work();
}
};
k.work = function() {
for (var e, t, n, i = +new Date() + this.socket.options.MAX_BLOCKING_TIME_MS, o = !1, r = this.socket.recv_frames, s = this, a = 0; a < this.queue.length; a++) {
e = this.queue[a];
if (!("start_time" in e)) {
e.start_time = +new Date();
e.ticks = 0;
e.idx = e.start_idx;
}
e.ticks++;
t = e.msgs;
n = t.length;
for (;e.idx < n; ) {
var c, l = +new Date();
if (l > i) {
o = !0;
break;
}
this.socket.dispatch_delay = l - e.receive_time;
try {
c = u.parse(t[e.idx]);
e.idx++;
} catch (n) {
this.socket.debug("Invalid json message: " + t[e.idx]);
continue;
}
this.socket.fire("message", c);
this.socket.recv_messages++;
this.socket.cur_conn_recv_messages++;
}
e.idx >= n && this.socket.recv_frames++;
if (o) break;
}
this.queue.splice(0, this.socket.recv_frames - r);
this.queue.length ? this.work_timer = window.setTimeout(function() {
s.work();
}, 0) : this.processing = !1;
this.last_work_finished_time = +new Date();
};
i(e, "jx_io_Socket");
return e;
}();
}).call(t, n(3), n(1));
}, function(e, t, n) {
(function(t, n) {
e.exports = function() {
function e(e) {
function n(e) {
s("extracting data");
!o && c.onopen && c.onopen();
o = e;
u += a.responseText.substr(l);
l = a.responseText.length;
u = u.split("\n\n");
for (var t = 0; t < u.length - 1; t++) c.onmessage && c.onmessage(u[t], o);
u = u[u.length - 1];
(l > 1048576 && !u.length || l > 4194304) && c.abort();
}
var o, a = this.xhr = new i(), c = this, u = "", l = 0;
this.url = r + e;
a.open("GET", this.url + [ "c", +new Date() ].join("/"), !0);
a.onerror = function(e) {
c.abort(e);
};
if (t.isIE) {
a.onprogress = function() {
n(+new Date());
};
a.onload = function() {
c.abort("close");
};
} else a.onreadystatechange = function() {
switch (a.readyState) {
case 3:
n(+new Date());
break;

case 4:
c.abort("close");
}
};
s("CXHR connecting to: " + this.url);
a.send();
}
var i = t.isIE ? window.XDomainRequest : !t.isOpera && !t.isAndroid && window.XMLHttpRequest, o = i ? e : null, r = t.isIE ? "//" : "https://";
e.protocol = "cxhr";
e.prototype.send = function(e) {
function n() {
c.abort("send failed");
}
function o() {
c.xhr_sender = null;
clearTimeout(r);
c.ondrain && c.ondrain();
}
var r, s = this.url + [ "d", +new Date() ].join("/"), a = new i(), c = this;
a.open("POST", s, !0);
a.send(e);
if (t.isIE) {
a.onerror = n;
a.onload = o;
} else a.onreadystatechange = function() {
if (4 == a.readyState) {
200 != a.status && n();
o();
}
};
r = setTimeout(n, 5e3);
this.xhr_sender = a;
return !1;
};
e.prototype.abort = function(e) {
if (!this._abort) {
this._abort = !0;
s(e);
this.xhr && this.xhr.abort();
this.xhr_sender && this.xhr_sender.abort();
this.onclose && this.onclose(e);
this.onerror = this.onload = this.onprogress = this.onreadystatechange = this.xhr = this.xhr_sender = null;
}
};
var s = function() {};
n(o, "jx_io_socket_ChunkedXHR");
return o;
}();
}).call(t, n(4), n(1));
}, function(e, t, n) {
(function(t, n) {
e.exports = function() {
function e(e) {
function t(e) {
!c && s.onopen && s.onopen();
c = +new Date();
e.origin == o && ("event-stream" == e.data ? a.onload = null : s.onmessage && s.onmessage(e.data, c));
}
var n, o, s = this, a = this.iframe = i("iframe");
this.url = "https://" + e;
a.src = this.src = n = this.url + [ "c", +new Date() ].join("/");
o = n.match(/https?:\/\/[^\/]+/)[0];
a.onload = function(e) {
s.abort(e);
};
document.body.insertBefore(a, document.body.firstChild);
r("SPM connecting to: " + this.url);
window.addEventListener("message", t, !1);
this.remove_listeners = function() {
window.removeEventListener("message", t, !1);
};
var c;
}
function i(e) {
var t = document.createElement(e), n = t.style;
n.position = "absolute";
n.width = n.height = 0;
n.overflow = "hidden";
return t;
}
var o = window.postMessage ? !t.isAndroid && e : null;
e.protocol = "spm";
e.prototype.send = function(e) {
this.iframe.contentWindow.postMessage(e, this.src);
return !0;
};
e.prototype.abort = function(e) {
if (!this._abort) {
this._abort = !0;
r(e);
this.iframe && document.body.removeChild(this.iframe);
this.onclose && this.onclose(e);
this.remove_listeners();
this.iframe = this.remove_listeners = null;
}
};
var r = function() {};
n(o, "jx_io_socket_StreamingPostMessage");
return o;
}();
}).call(t, n(4), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
var t = new n("wss://" + e + [ "c", +new Date() ].join("/")), i = this;
t.onclose = function(e) {
i.onclose && i.onclose(e);
};
t.onerror = function(e) {
i.onerror && i.onerror(e);
};
t.onmessage = function(e) {
i.onmessage && i.onmessage(e.data, +new Date());
};
t.onopen = function(e) {
i.onopen && i.onopen(e);
};
this.ws = t;
}
var n = window.WebSocket || window.MozWebSocket, i = n ? e : null;
e.prototype.abort = function() {
if (!this._aborted) {
this._aborted = !0;
var e = this.ws;
e.readyState == n.CONNECTING ? e.onopen = function() {
e.close();
} : e.close();
}
};
e.prototype.send = function(e) {
this.ws.send(e);
return !0;
};
e.protocol = "ws";
t(i, "jx_io_socket_WebSocket");
return i;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, i) {
e.exports = function() {
function e(e) {
var n = this, i = this.longpoll = new r(!0), o = this.sender = new r(!0);
i.on("success", function(e) {
n.process_data(e);
});
i.on("error", function() {
n.abort("longpoll error");
});
o.on("success", function() {
n.ondrain && n.ondrain();
});
o.on("error", function() {
n.abort("sender error");
});
this.url = "https://" + e;
t.window.on("unload", this.unload = function() {
n.abort("unload");
});
this.longpoll.load(this.url + [ "c", +new Date() ].join("/"));
}
var o = e;
e.protocol = "xdds";
var r = n(27);
e.prototype.process_data = function(e) {
if (e && !this._abort) {
!this.ts && this.onopen && this.onopen();
this.ts = +new Date();
this.onmessage && this.onmessage(e, this.ts);
this.longpoll && this.longpoll.load(this.url + [ "p", +new Date() ].join("/"));
}
};
e.prototype.send = function(e) {
if (this._abort) return !1;
var t = this.url + [ "d", +new Date(), window.encodeURIComponent(e) ].join("/");
this.sender && this.sender.load(t);
return !1;
};
e.prototype.abort = function(e) {
if (!this._abort) {
this._abort = !0;
s("XDDS - abort: " + e);
t.window.un("unload", this.unload);
this.longpoll.destroy();
this.sender.destroy();
this.longpoll = this.sender = this.unload = null;
this.onclose && this.onclose(e);
window.CollectGarbage && window.CollectGarbage();
}
};
var s = function() {};
i(o, "jx_io_socket_XDomainDynScript");
return o;
}();
}).call(t, n(3), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
var e = {
CLUSTERS: {
US: [ "us08", "us10", "us12", "us14", "us16", "us18", "us20", "us22", "us24", "us26", "us28", "us30", "us32", "us34", "us36", "us38", "us40", "us42", "us44", "us46" ],
DE: [ "de04", "de06", "de08", "de10", "de12", "ie02", "ie04", "ie06", "ie08", "ie10", "ie12", "ie14", "ie16", "de14", "de16", "de18", "de20", "ie18", "ie20", "ie22", "ie24", "de22", "de24", "de26", "de28" ],
SG: [ "sg06", "sg08", "sg10", "sg12", "sg14", "sg16", "sg18", "sg20" ],
JP: [ "jp02", "jp04", "jp06", "jp08" ],
AU: [ "au02", "au04" ],
BR: [ "br02", "br04", "br06", "br08", "br10", "br12" ]
},
FALLBACKS: {
US: [ "DE" ],
DE: [ "US" ],
SG: [ "US" ],
JP: [ "US" ],
AU: [ "SG", "US" ],
BR: [ "US" ]
},
NEAR_MAP: {
AL: "DE",
AD: "DE",
AM: "DE",
AT: "DE",
BY: "DE",
BE: "DE",
BA: "DE",
BG: "DE",
CH: "DE",
CY: "DE",
CZ: "DE",
DE: "DE",
DK: "DE",
EE: "DE",
ES: "DE",
EU: "DE",
FO: "DE",
FI: "DE",
FR: "DE",
GB: "DE",
GE: "DE",
GI: "DE",
GR: "DE",
HU: "DE",
HR: "DE",
IE: "DE",
IM: "DE",
IS: "DE",
IT: "DE",
LT: "DE",
LU: "DE",
LV: "DE",
MC: "DE",
MK: "DE",
MT: "DE",
NO: "DE",
NL: "DE",
PK: "DE",
PO: "DE",
PT: "DE",
RO: "DE",
SA: "DE",
SE: "DE",
SI: "DE",
SK: "DE",
SM: "DE",
TR: "DE",
UA: "DE",
VA: "DE",
ZA: "DE",
NG: "DE",
MA: "DE",
AP: "SG",
BD: "SG",
BN: "SG",
CN: "SG",
ID: "SG",
IN: "SG",
LA: "SG",
KH: "SG",
LK: "SG",
MM: "SG",
MY: "SG",
SG: "SG",
TH: "SG",
VN: "SG",
AU: "AU",
NZ: "AU",
HK: "JP",
KR: "JP",
JP: "JP",
PH: "US",
RU: "JP",
TW: "JP",
AR: "BR",
BO: "BR",
BR: "BR",
CL: "BR",
PE: "BR",
PY: "BR",
UY: "BR",
DEFAULT: "US"
}
};
t(e, "meshim_config_geo_WidgetMediatorsAccessDefinition");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
function e(e) {
window.__$__GEO = e;
}
function i(e, t) {
this.clusters_config = e;
this.setGeoCode("geo" === s ? a : s);
try {
if (t.length <= 0) throw "SSI cluster definition not found";
if ("<" == t.charAt(0)) throw "SSI not processed";
this.clusters_config = JSON.parse(t);
} catch (e) {}
}
var o = n(57), r = n(10), s = '<!--# echo var="http_cf_ipcountry" default="geo" -->'.toUpperCase(), a = '<!--# echo var="geoip_country_code" default="geo" -->'.toUpperCase(), c = ".zopim.com", u = [ ".zopim.net", ".zopim.org", ".zdch.at" ];
"<" == s.charAt(0) && (s = "geo");
"<" == a.charAt(0) && (a = "geo");
i.SUPPORTED_DOMAINS = u;
var l = i.prototype;
l.getGeoCode = function() {
return this.countryCode;
};
l.setGeoCode = function(t) {
if (t && "--" !== t) {
this.countryCode = t;
e(t);
}
};
l.updateClustersConfig = function(e) {
try {
r.extend(this.clusters_config, JSON.parse(e));
} catch (e) {
window.console && window.console.log("Unable to process update");
}
};
l.getGeoAccess = function(e, t, n, i, r, s) {
return new o(this.clusters_config, r || c, this.countryCode, e, t, n, i, s || u);
};
t(i, "meshim_common_GeoAccessFactory");
return i;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, i, o) {
e.exports = function() {
function e(e, t, n, i, o, a, c, u) {
this.CLUSTERS = e.CLUSTERS;
this.WEIGHTS = e.WEIGHTS;
this.NEAR_MAP = e.NEAR_MAP;
this.FALLBACKS = e.FALLBACKS;
this.geo_code = n || "geo";
this.default_domain = t;
this.supported_domains = (u || []).concat(this.default_domain);
var l = r.map(this.supported_domains, s.escape);
this.supported_proxy_re = new RegExp("^[a-z][a-z0-9_-]*(.[a-z][a-z0-9_-]*)*(" + l.join("|") + ")(:\\d+)?$", "i");
this.cluster_hosts = [];
this.host_list = [];
this.host_index = 0;
this.last_connected_host = o && this.getValidatedHost(o);
this.override_proxy = i && this.getValidatedHost(i);
this.num_primary_hosts = a || 0;
this.num_fallback_hosts = c || 0;
this.init();
}
var r = n(58), s = n(59), a = /^([a-z][a-z0-9_-]*)(:\d+)?$/i, c = e.prototype;
c.init = function() {
var e = this.geo_code && this.geo_code in this.NEAR_MAP ? this.NEAR_MAP[this.geo_code] : this.NEAR_MAP.DEFAULT;
if (!e) throw "Error: no cluster code found for " + this.geo_code;
if (e in this.CLUSTERS) this._growClusterHosts(e, this.num_primary_hosts); else if (!this.override_proxy && !this.last_connected_host) throw "Error: " + e + " has no cluster definition";
if (e in this.FALLBACKS) for (var t = this.FALLBACKS[e], n = 0, i = t.length; n < i; n++) {
var o = t[n];
o in this.CLUSTERS && this._growClusterHosts(o, this.num_fallback_hosts);
}
this._makeHostList();
};
c._verifyHostInGeoConfig = function(e) {
var t = this;
return Object.keys(t.CLUSTERS).some(function(n) {
return t.CLUSTERS[n].some(function(n) {
return e === t.getValidatedHost(n);
});
});
};
c._growClusterHosts = function(e, t) {
var n = this.CLUSTERS[e], i = this.getWeights(e);
r.shuffle(n, i);
t && (n = n.slice(0, t));
this.cluster_hosts = this.cluster_hosts.concat(n);
};
c.getWeights = function(e) {
if (!(e in this.CLUSTERS)) return [];
var n, i = this.CLUSTERS[e], o = i.length, r = new Array(o);
if (this.WEIGHTS && this.WEIGHTS[e]) {
var s = this.WEIGHTS[e];
for (n = o; n--; ) {
var a = i[n];
r[n] = t(s[a]) ? s[a] : 1;
}
} else for (n = o; n--; ) r[n] = 1;
return r;
};
c.getValidatedHost = function(e, t) {
if (e) {
if (!t && a.test(e)) return this._expandSimpleHost(e);
if (this.supported_proxy_re.test(e)) return e;
}
return !1;
};
c._expandSimpleHost = function(e) {
return e.replace(a, "$1" + this.default_domain + "$2");
};
c._makeHostList = function() {
var e = this, t = r.map(this.cluster_hosts, function(t) {
return e._expandSimpleHost(t);
}), n = [];
this.override_proxy && n.push(this.override_proxy);
this.last_connected_host && this.last_connected_host !== this.override_proxy && this._verifyHostInGeoConfig(this.last_connected_host) && n.push(this.last_connected_host);
t = t.filter(function(e) {
return i(e, n) === -1;
});
this.host_list = n.concat(t);
this.host_index = 0;
};
c.getHostList = function() {
return this.host_list;
};
c.getNextHost = function() {
return this.host_index >= this.host_list.length ? "" : this.host_list[this.host_index++];
};
c.hasNext = function() {
return this.host_index < this.host_list.length;
};
c.rewind = function() {
this.host_index = 0;
};
c.pushHostToLast = function(e) {
var t, n = this.getValidatedHost(e), o = i(n, this.host_list);
if (o !== -1) {
t = this.host_list.splice(o, 1);
this.host_list = this.host_list.concat(t);
}
};
o(e, "meshim_common_GeoAccess");
return e;
}();
}).call(t, n(8), n(42), n(1));
}, function(e, t, n) {
(function(t, n, i) {
e.exports = function() {
function e(e, t) {
return t ? s(e, t) : o(e);
}
function o(e) {
for (var t, n, i = e.length; i > 1; ) {
t = Math.floor(i-- * Math.random());
n = e[t];
e[t] = e[i];
e[i] = n;
}
return e;
}
function r(e, t) {
if (!e || e.length <= 0) return -1;
if (!t) return Math.floor(Math.random() * e.length);
t = a(e, t);
var n, i = 0;
for (n = t.length; n--; ) i += t[n];
var o = Math.random() * i, r = 0, s = t.length;
for (n = 0; n < s - 1; n++) {
r += t[n];
if (o <= r) return n;
}
return n;
}
function s(e, t) {
var n, i, o, r, s, c = e.concat();
t = a(e, t);
e.length = 0;
s = 0;
for (n = t.length; n--; ) s += t[n];
o = Math.random() * s;
r = 0;
n = 0;
for (;c.length; ) {
r += t[n];
if (o <= r) {
s -= t[n];
i = c.splice(n, 1)[0];
t.splice(n, 1);
e.push(i);
o = Math.random() * s;
r = 0;
n = 0;
} else n++;
}
return e;
}
function a(e, i) {
if (t(i)) {
if (i.length === e.length) return i.concat();
throw new window.Error("Invalid weights array: length does not match");
}
if (n(i)) return c(e, i);
throw new window.Error("Invalid weights supplied");
}
function c(e, i, o) {
var r, s, a;
if (!t(e)) throw new TypeError(" arr is not an array");
var c = Object(e), u = c.length >>> 0;
if (!n(i)) throw new TypeError(i + " is not a function");
arguments.length > 2 && (r = o);
s = new Array(u);
a = 0;
for (;a < u; ) {
var l, f;
if (a in c) {
l = c[a];
f = i.call(r, l, a, c);
s[a] = f;
}
a++;
}
return s;
}
var u = {
shuffle: e,
random_index: r,
map: c
};
i(u, "meshim_common_ArrayUtils");
return u;
}();
}).call(t, n(18), n(6), n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
var e = "[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+([a-z0-9][a-z0-9-]*[a-z0-9])", n = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)", i = {
email: new RegExp("^" + e + "$", "i"),
ip_token: new RegExp("^" + n + "$"),
ip: new RegExp("^(?:" + n + "\\.){3}" + n + "$"),
tld: /^(AERO|ARPA|ASIA|A[CDEFGILMNOQRSTUWXZ]|BIZ|B[ABDEFGHIJMNORSTVWYZ]|CAT|COM|COOP|C[ACDFGHIKLMNORUVXYZ]|D[EJKMOZ]|EDU|E[CEGRSTU]|F[IJKMOR]|GOV|G[ABDEFGHILMNPQRSTUWY]|H[KMNRTU]|INFO|INT|I[DELMNOQRST]|JOBS|J[EMOP]|K[EGHIMNPRWYZ]|L[ABCIKRSTUVY]||MIL|MOBI|MUSEUM|M[ACDEGHKLMNOPQRSTUVWXYZ]|NAME|NET|N[ACEFGILOPRUZ]|ORG|OM|PRO|P[AEFGHKLMNRSTWY]|QA|R[EOSUW]|S[ABCDEGHIJKLMNORTUVYZ]|TEL|TRAVEL|T[CDFGHJKLMNOPRTVWZ]|U[AGKSYZ]|V[ACEGINU]|W[FS]|XN|Y[ET]|Z[AMW])$/i,
search: {
email: new RegExp(e, "ig"),
email_lws: new RegExp("(^|\\s+)" + e, "ig"),
hurl: /(^|\s+)(?:(?:https?|ftps?):\/\/)(?:\S+)/gi,
url: /(^|\s+)(?:[\w-]+\.)+(\w{2,})(?::[0-9]+)?(?:\/\S*)?/g,
phone_number: /(?:^|\s+)(?:(?:\+?\d{1,3}|\(\d{1,3}\))([-.\s])?)?\d{3,10}(?:([-.\s])\d{3,10})?/gi
},
file_upload: /uploaded.+\n.+https?:\/\/v2uploads\.zopim\.(com|io)\//i,
escape: function(e) {
return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
};
t(i, "meshim_common_Regex");
return i;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t) {
e.exports = function() {
var e = {};
e.SECOND = 1e3;
e.MINUTE = 60 * e.SECOND;
e.HOUR = 60 * e.MINUTE;
e.DAY = 24 * e.HOUR;
e.WEEK = 7 * e.DAY;
t(e, "meshim_common_Time");
return e;
}();
}).call(t, n(1));
}, function(e, t, n) {
(function(t, n) {
e.exports = function() {
function e(e) {
r = e.$("livechat").$("profile");
t.document.on("mousemove", i);
t.window.on("click", i);
t.window.on("scroll", i);
t.window.on("keypress", i);
o();
}
function i() {
a++;
}
function o() {
a && r.write({
active$int: +new Date()
});
a = 0;
window.setTimeout(o, c);
}
var r, s = {
init: e
}, a = 1, c = 2e4;
n(s, "meshim_widget_controllers_Tracker");
return s;
}();
}).call(t, n(3), n(1));
}, function(e, t, n) {
(function(t, i) {
e.exports = function() {
function e() {
var e = this;
this.arr = [];
this.validate = p.bind(this.validate, this);
_.concat([ "validateAndThrow", "validateAndLog" ]).forEach(function(t) {
e.validate[t] = e[t].bind(e);
});
return this.validate;
}
function o(e) {
return function(t) {
if (0 === e.length) return !1;
for (var n = 0, i = e.length; n < i; n++) {
var o = e[n], r = o(t);
if (!r) return !1;
}
return new m('Expect "' + t + '" to fulfill at least one condition');
};
}
function r(e) {
return function(t) {
if (t !== e) return new m('expect "' + t + '" to equal "' + e + '"');
};
}
function s(e, t) {
return function(n) {
if ("object" != typeof n || !n) return new m('Expect "' + n + '" to be an object');
if (t && t.requiredKeys) for (var i = 0, o = t.requiredKeys.length; i < o; i++) {
var r = t.requiredKeys[i];
if (!(r in n)) return new m('Expect key "' + r + '" to be defined');
}
for (var s in n) if (n.hasOwnProperty(s)) {
var a, c = n[s], u = e[s];
if (!u) continue;
a = u(c);
if (a) return a;
}
};
}
function a(e) {
return function(t) {
var n = typeof t;
if (n !== e) return new m('Expect "' + t + '" to have type "' + e + '"');
};
}
function c() {
return function(e) {
if (!e) return new m('Expect "' + e + '" to be truthty');
};
}
function u(e) {
return function(t) {
e.lastIndex = 0;
if (!e.test(t)) return new m('Expect "' + t + '" to match predefined format');
};
}
function l() {
return function(e) {
if (!t(e)) return new m('Expect "' + e + '" to be an Array');
};
}
function f(e) {
return function(n) {
var i;
if (!t(n)) return new m('Expect "' + n + '" to be an Array');
for (var o = 0, r = n.length; o < r; o++) {
i = e(n[o]);
if (i) return i;
}
};
}
function h(e) {
return e;
}
function d(e) {
var t = window.console;
t.error ? t.error(e) : t.log && t.log(e);
}
var p = n(48), m = window.Error, g = {
any: o,
equal: r,
obj: s,
type: a,
ok: c,
chain: h,
regex: u,
array: l,
each: f
}, _ = Object.keys(g), v = e.prototype;
_.forEach(function(t) {
var n = g[t];
e[t] = v[t] = function() {
if (!(this instanceof e)) {
var i = new e();
return i[t].apply(i, arguments);
}
var o = n.apply(null, arguments);
this.arr.push(o);
return this.validate;
};
});
v.validate = function(e) {
for (var t, n, i = 0, o = this.arr.length; i < o; i++) {
t = this.arr[i];
n = t(e);
if (n) return n;
}
};
v.validateAndThrow = function(e, t) {
var n = this.validate(e);
t = t ? t + " - " : "";
if (n) throw new m(t + n.message);
};
v.validateAndLog = function(e, t) {
var n = this.validate(e);
t = t ? t + " - " : "";
if (n) {
d(new m(t + n.message));
return n;
}
};
i(e, "meshim_widget_utils_Validator");
return e;
}();
}).call(t, n(18), n(1));
} ]);
});
//# sourceMappingURL=web_sdk.map
