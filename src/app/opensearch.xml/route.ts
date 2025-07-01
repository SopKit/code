export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>SopKit Code Tools</ShortName>
  <Description>Search developer tools for JSON, XML, YAML, HTML processing</Description>
  <Tags>json xml yaml html tools developer</Tags>
  <Contact>contact@sopkit.github.io</Contact>
  <Url type="text/html" method="get" template="https://sopkit.github.io/code/tools?search={searchTerms}"/>
  <Image height="16" width="16" type="image/x-icon">https://sopkit.github.io/code/favicon.ico</Image>
  <Image height="64" width="64" type="image/png">https://sopkit.github.io/code/icon-64.png</Image>
  <Developer>SopKit</Developer>
  <Attribution>Copyright SopKit. All rights reserved.</Attribution>
  <SyndicationRight>open</SyndicationRight>
  <AdultContent>false</AdultContent>
  <Language>en-us</Language>
  <OutputEncoding>UTF-8</OutputEncoding>
  <InputEncoding>UTF-8</InputEncoding>
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/opensearchdescription+xml',
    },
  });
}
