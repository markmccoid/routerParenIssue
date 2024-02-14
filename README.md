## Problem Description

Using Expo Router v3, sending params with parens "()", cause no parameters to be picked up by `useLocalSearchParams()`.

For example, the following Link component has parens in the params.  It "routes" fine, but the destination page does receives "undefined" for the id value.
```
<Link href={{ pathname: "/(tabs)/two", params: { id: "/123(test)" } }}>Link WITH Parens</Link>
```
I have played with replacing the parens manually when sending as follows:

```js
<Link href={{ pathname: "/(tabs)/two", params: { id: "/123(test)".replace(/\(/g, "%28").replace(/\)/g, "%29"); } }}>Link WITH Parens</Link>
```
This works, with no need to decode on the target path since the encodeURIComponent will decode all escape sequences.  The problem seems to be the fact that encodeURIComponent does NOT encode parens.

## Code description

`app/(tabs)/index.tsx` contains four links to the `two.tsx` file.

Two using <Link> and two using `router.push()`.  The first in each group sending a param named "id" without parens and the second sending a param named "id" WITH parens.

```js
{/* Link Component */}
      <Link href={{ pathname: "/(tabs)/two", params: { id: "/123#test#" } }}>
        Link Without Parens
      </Link>
      <Link href={{ pathname: "/(tabs)/two", params: { id: "/123(test)" } }}>Link WITH Parens</Link>
      <View style={{ height: 2, backgroundColor: "red", width: "100%", marginVertical: 10 }} />
      {/* router.push() */}
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/(tabs)/two", params: { id: "/123#test#" } })}
      >
        <Text>Push Without Parens</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/(tabs)/two", params: { id: "/123(test)" } })}
      >
        <Text>Push WITH Parens</Text>
      </TouchableOpacity>
```
In `app/(tabs)/two.tsx`, I use `useLocalSearchParams()` and destructure off "id" and then display that on the screen and if "id" is undefined display "Params NOT RECEIVED".

