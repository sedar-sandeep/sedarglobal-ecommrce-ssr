/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import parse from 'html-react-parser';
import { langName } from '@utils/i18n';

const TermsAndContitions = (props) => {

  return (
    <section className="TermsAndContitions">
      <Container className="max-content">
        <Row>
          <Col sm={12} className="col-first">
            <div className="desc">
              {props.CHILD && props.CHILD[0] && props?.CHILD[0]?.description ? parse(props?.CHILD[0]?.description) : ''}
            </div>
          </Col>
        </Row>
      </Container>
      <div className="cartPage_term_condition">
        {props.page && props.page == "cart" ?
          (
            langName == "en" ?
              <>
                <div className="col-md-12">
                  <p>
                    THROUGHOUT THIS WEBSITE, THE TERMS “US”, “WE” AND/OR “OUR” SHALL REFER TO
                    SEDAR, SEDAR GLOBAL, ITS AFFILIATES AND SUBSIDIARIES.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Return Policy</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We’d like you to be happy with everything you purchase from us. As all of
                    our blinds and shades are custom made, we cannot offer a refund or exchange
                    (remake) unless a product is defective, as per our sole determination.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>
                        <strong>Conditions for returns</strong>
                      </p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>Defect in material or workmanship (by our employees)</p>
                    </li>
                    <li>
                      <p>Something doesn’t work properly</p>
                    </li>
                    <li>
                      <p>
                        Product in wrong size due to an error made at our production facility
                      </p>
                    </li>
                    <li>
                      <p>
                        Return request must be made within 2 days of the delivery date and items
                        must be unused and in their original packaging.
                      </p>
                    </li>
                    <li>
                      <p>Product is not repairable</p>
                    </li>
                    <li>
                      <p>
                        Items can only be returned to a store. Items can be returned to a store
                        for a refund. If the store carries the item you can purchase it after
                        returning the original
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>
                        <strong>Conditions for rejecting returns</strong>
                      </p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>Cut meter fabrics</p>
                    </li>
                    <li>
                      <p>
                        Products that have been used, modified or altered, washed, assembled or
                        installed, unless they are defective.
                      </p>
                    </li>
                    <li>
                      <p>
                        Products damaged by misuse or showing signs of wear, even if they are
                        still under warranty
                      </p>
                    </li>
                    <li>
                      <p>
                        Products that have already been assembled, unless our team determines
                        that there is a manufacturing defect. We reserve the right to check for
                        defects and will repair or replace the defective products at our
                        discretion.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    If you return an item that you received defective, damaged or incorrect,
                    you’ll be refunded the full delivery cost, once your return is processed.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Pickup Process: Once the complaint is approved, the product pickup process
                    will start.
                  </p>
                  <p>
                    <br />
                  </p>
                  <ol>
                    <li>
                      <p>
                        Within UAE: The Product(s) will be picked up by our delivery team for
                        UAE customers
                      </p>
                    </li>
                  </ol>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>
                        There will be no pickup charges if Return claim has been raised within 2
                        days(48 hours)
                      </p>
                    </li>
                    <li>
                      <p>
                        Pickup request if cancelled for any reason can be rescheduled once on
                        request without any additional charges, however, if second pick up
                        request is cancelled, claim ticket will be closed, unless Sedar deem
                        otherwise at their own discretion.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    b. Outside UAE: This will be handled on a case by case basis and in
                    agreement with us.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Refund</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    When you buy from us we want you to be happy with your purchase. So if you
                    need to get it refunded, we want to make it as easy as possible.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We will refund the delivery charge in full if the product received is faulty
                    / damaged and you return all products of your order at the same time. If you
                    choose to keep some of the products, we will retain the balance of the
                    delivery charge that applies to the products you keep.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Once we have received your product, we will refund your money in the same
                    way you initially paid for it. If payment was made credit or debit card, the
                    refunded amount will be returned into the same card account. The refund
                    process normally takes between 3-5 working days to show in your account.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If you purchased at an offer price, your refund will be based on that
                    promotional price. If you are returning items that were purchased on a
                    promotion, such as ‘Buy one get one half price’ or ‘3 for 2’, then the
                    promotion will no longer apply and your refund value will be adjusted
                    accordingly.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Where you use a coupon when paying for your order, the coupon will be
                    considered used where you are returning only some of the goods to which the
                    coupon applies. You will only be able to redeem the coupon or we will issue
                    a new coupon against a future purchase if you are returning all the goods to
                    which the coupon applies.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If you have any questions concerning receiving a refund please call our
                    customer service team on 800 73327
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Exchange</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>Your satisfaction is very important to us.</p>
                  <p>
                    <br />
                  </p>
                  <p>
                    In case of an incident where a replacement product may be required again,
                    please contact the customer services team who will arrange this in line with
                    the Terms &amp; Conditions for replacement and/or faulty products.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>Privacy Policy</p>
                  <p>
                    <br />
                  </p>
                  <p>Your privacy is critically important to us.</p>
                  <p>
                    <br />
                  </p>
                  <p>
                    It is our policy to respect your privacy regarding any and all information
                    we may collect while operating our website. This Privacy Policy applies to
                    sedarglobal.com (hereinafter, "us", "we", or "sedarglobal.com"). We respect
                    your privacy and are committed to protecting personally identifiable
                    information you may provide us through our Website. We have adopted this
                    privacy policy ("<strong>Privacy Policy</strong>") to explain what
                    information may be collected on our Website, how we use this information,
                    and under what circumstances we may disclose the information to third
                    parties. This Privacy Policy applies only to information we collect through
                    our Website and does not apply to our collection of information from other
                    sources.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    This Privacy Policy, together with the Terms and conditions posted on our
                    Website, set forth the general rules and policies governing your use of our
                    Website. Depending on your activities when visiting our Website, you may be
                    required to agree to additional terms and conditions.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Website Visitors</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Like most website operators, we collect non-personally-identifying
                    information of the sort that web browsers and servers typically make
                    available, such as, but not limited to, the browser type, language
                    preference, referring site, and the date and time of each visitor request.
                    Our purpose in collecting non-personally identifying information is to
                    better understand how our visitors use our website. From time to time, we
                    may release non-personally-identifying information in the aggregate, e.g.,
                    by publishing a report on trends in the usage of our website.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We also collect potentially personally-identifying information like Internet
                    Protocol (IP) addresses for logged in users and for users leaving comments
                    on http://sedarglobal.com blog posts. We only disclose logged in user and
                    commenter IP addresses under the same circumstances that it uses and
                    discloses personally-identifying information as described below.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Gathering of Personally-Identifying Information</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Certain visitors to our website choose to interact with us in ways that
                    require us to gather personally-identifying information. The amount and type
                    of information that we gather depends on the nature of the interaction. For
                    example, we ask visitors who sign up for a blog at http://sedarglobal.com to
                    provide a username and email address.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Security</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    The security of your Personal Information is important to us, but remember
                    that no method of transmission over the Internet, or method of electronic
                    storage is 100% secure. While we strive to use commercially acceptable means
                    to protect your Personal Information, we cannot guarantee its absolute
                    security.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Advertisements</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Ads appearing on our website may be delivered to users by advertising
                    partners, who may set cookies. These cookies allow the ad server to
                    recognize your computer each time they send you an online advertisement to
                    compile information about you or others who use your computer. This
                    information allows ad networks to, among other things, deliver targeted
                    advertisements that they believe will be of most interest to you. This
                    Privacy Policy covers the use of cookies by us and does not cover the use of
                    cookies by any advertisers.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Links To External Sites</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Our Service may contain links to external sites that are not operated by us
                    nor do we take any responsibility for their content, privacy or security.
                    You enter these third party websites at your own risk. If you click on a
                    third party link, you will be directed to that third party's site. We
                    strongly advise you to review the Privacy Policy and terms and conditions of
                    every site you visit.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We have no control over, and assume no responsibility for the content,
                    privacy policies or practices of any third party sites, products or services
                    which you enter, whether directly or indirectly, while browsing our website.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    You hereby confirm that we are not liable for any harm or damages related to
                    the purchase or use of goods, services, resources, content, or any other
                    transactions made in connection with any third-party websites. Complaints,
                    claims, concerns, or questions regarding third-party products should be
                    directed to the third-party.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Google AdWords </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Sedarglobal.com uses remarketing services to advertise on third party
                    websites (including Google) to previous visitors to our site. It could mean
                    that we advertise to previous visitors who haven't completed a task on our
                    site. For example, using the contact form to make an enquiry. This could be
                    in the form of an advertisement on the Google search results page or a site
                    in the Google Display Network. Third-party vendors, including Google, use
                    cookies to serve ads based on someone's past visits. Any data collected as a
                    result of this exercise, will be used in accordance with our privacy policy
                    and Google's privacy policy.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Aggregated Statistics</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We may collect statistics about the behavior of visitors to our website. We
                    may display this information publicly or provide it to others. However, we
                    do not disclose your personally-identifying information.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Affiliate Disclosure</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Our website uses affiliate links and in certain circumstances earns a
                    commission from some links. However, this does not affect your purchases or
                    the price you pay for such purchases.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Cookies</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    To enrich and perfect your online experience, we use "Cookies" and similar
                    technologies and services provided by others to display personalized
                    content, appropriate advertising and store your preferences on your
                    computer.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    A cookie is a string of information that a website stores on a visitor's
                    computer and that the visitor's browser provides to the website each time
                    the visitor returns. We use cookies to help us identify and track visitors,
                    their usage of our website and their website access preferences.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Visitors who do not wish to have cookies placed on their computers should
                    set their browsers to refuse cookies before using our website, however, in
                    doing so, certain features of our websites may not function properly.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    By continuing to navigate our website without changing your cookie settings,
                    you hereby acknowledge and agree to our use of cookies.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>E-commerce</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Those who engage in transactions with us – by purchasing any of our services
                    or products, are asked to provide additional information, including but not
                    limited to, personal and financial information required to process those
                    transactions. In each case, we collect such information only in so far as is
                    necessary or appropriate to fulfill the purpose of the visitor's interaction
                    with our website. We do not disclose personally-identifying information
                    other than as described herein. Visitors can always refuse to supply
                    personally-identifying information, with the caveat that it may prevent them
                    from engaging in certain website-related activities.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Business Transfers</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If we, or substantially any of our assets, were acquired, or in the unlikely
                    event that we go out of business or enter bankruptcy, user information would
                    be one of the assets that are transferred or acquired by a third party. You
                    acknowledge that such transfers may occur, and that any acquirer of Sedar
                    may continue to use your personal information as set forth in this policy.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Privacy Policy Changes</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We may change our Privacy Policy from time to time, and at our own sole
                    discretion. Therefore, we encourage our visitors to frequently check this
                    page for any changes to the Privacy Policy. Your continued use of our
                    website after any changes in this Privacy Policy will constitute your
                    acceptance of such change.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Terms of use</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Terms and Conditions</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    These terms and conditions outline the provisions for the use of Sedar
                    Global's Website, located at sedarglobal.com.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    PLEASE READ THESE TERMS OF SERVICE CAREFULLY. THIS IS A LEGAL AGREEMENT
                    BETWEEN US AND YOU WHICH GOVERNS THE USE OF YOUR USE OF OUR WEBSITE AND
                    CONSITITUTES YOUR ACCEPTANCE OF AND AGREEMENT TO ALL THE TERMS OF USE
                    CONTAINED HEREIN. IF YOU DO NOT AGREE TO ALL TERMS AND CONDITIONS PROVIDED
                    UNDER THESE TERMS, THEN YOU MAY NOT ACCESS THE WEBSITE OR USE ANY SERVICES
                    PROVIDED BY US.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    By visiting our website and/or purchasing something from us, you engage in
                    our services and agree to be bound by the following terms and conditions
                    (“Terms”). These Terms apply to all users of our website, including without
                    limitation, users who are browsers, vendors, customers, merchants, and/or
                    contributors of content, irrespective whether they are registered on our
                    website or not.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    By agreeing to these Terms, you represent and confirm that you are: (a) at
                    least eighteen (18) years of age; or (b) have given your explicit consent to
                    allow any of your minor dependents to use and access the Website using your
                    login credentials to use same.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Cookies</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We employ the use of cookies. By accessing our website, you agreed to use
                    cookies in agreement with the Sedar Global's Privacy Policy. For more
                    information, please visit our Privacy Policy.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>License</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Unless otherwise stated, we and/or our licensors own the intellectual
                    property rights for all material on our website. All intellectual property
                    rights are reserved. You may access this from our website for your own
                    personal use subjected to restrictions set in these terms and conditions.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>You are not permitted to:</p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>Republish material from our website;</p>
                    </li>
                    <li>
                      <p>Sell, rent or sub-license material from our website;</p>
                    </li>
                    <li>
                      <p>Reproduce, duplicate or copy material from our website; or</p>
                    </li>
                    <li>
                      <p>Redistribute content from our website.</p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    Parts of this website offer an opportunity for users to post and exchange
                    opinions and information in certain areas. We do not filter, edit, publish
                    or review comments prior to their presence on the website. Comments do not
                    reflect our views and opinions, our agents and/or affiliates. Comments
                    reflect the views and opinions of the person who post their views and
                    opinions. To the extent permitted by applicable laws, we shall not be liable
                    for the comments or for any liability, damages or expenses caused and/or
                    suffered as a result of any use of and/or posting of and/or appearance of
                    the comments on our website.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We reserve the right to monitor all comments and to remove any comments
                    which can be, in our sole opinion, considered inappropriate, offensive or
                    causes breach of these Terms.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>You warrant and represent that:</p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>
                        You are entitled to post the comments on our website and have all
                        necessary licenses and consents to do so;
                      </p>
                    </li>
                    <li>
                      <p>
                        The comments do not infringe any intellectual property right, including
                        without limitation copyright, patent or trademark of any third party;
                      </p>
                    </li>
                    <li>
                      <p>
                        The comments do not contain any defamatory, libelous, offensive,
                        indecent or otherwise unlawful material which may be considered to be an
                        invasion of privacy; and
                      </p>
                    </li>
                    <li>
                      <p>
                        The comments will not be used to solicit or promote business or custom
                        or present commercial activities or any unlawful activity.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    You hereby grant us a non-exclusive license to use, reproduce, edit and
                    authorize others to use, reproduce and edit any of your comments in any and
                    all forms, formats or media.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Prohibited Uses</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    {" "}
                    In addition to other prohibitions as set forth in these Terms, you are
                    prohibited from using our website or its content: (a) for any unlawful
                    purpose; (b) to solicit others to perform or participate in any unlawful
                    acts; (c) to violate any international, federal, provincial or state
                    regulations, rules, laws, or local ordinances; (d) to infringe upon or
                    violate our intellectual property rights or the intellectual property rights
                    of others; (e) to harass, abuse, insult, harm, defame, slander, disparage,
                    intimidate, or discriminate based on gender, sexual orientation, religion,
                    ethnicity, race, age, national origin, or disability; (f) to submit false or
                    misleading information; (g) to upload or transmit viruses or any other type
                    of malicious code that will or may be used in any way that will affect the
                    functionality or operation of our website, other websites or the internet;
                    (h) to collect or track the personal information of others; (i) to spam,
                    phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or
                    immoral purpose; (k) to interfere with or circumvent the security features
                    of our website or the Internet. We reserve the right to terminate your use
                    of our service or any related website for violating any of the prohibited
                    uses.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Hyperlinking to our Content</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    The following organizations may link to our website without prior written
                    approval:
                  </p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>Government agencies;</p>
                    </li>
                    <li>
                      <p>Search engines;</p>
                    </li>
                    <li>
                      <p>News organizations;</p>
                    </li>
                    <li>
                      <p>
                        Online directory distributors may link to our Website in the same manner
                        as they hyperlink to the Websites of other listed businesses; and
                      </p>
                    </li>
                    <li>
                      <p>
                        System wide Accredited Businesses except soliciting non-profit
                        organizations, charity shopping malls, and charity fundraising groups
                        which may not hyperlink to our Web site.
                      </p>
                    </li>
                    <li>
                      <p>
                        These organizations may link to our home page, to publications or to
                        other Website information so long as the link: (a) is not in any way
                        deceptive; (b) does not falsely imply sponsorship, endorsement or
                        approval of the linking party and its products and/or services; and (c)
                        fits within the context of the linking party’s site.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    We may consider and approve other link requests from the following types of
                    organizations:
                  </p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>commonly-known consumer and/or business information sources;</p>
                    </li>
                    <li>
                      <p>dot.com community sites;</p>
                    </li>
                    <li>
                      <p>associations or other groups representing charities;</p>
                    </li>
                    <li>
                      <p>online directory distributors;</p>
                    </li>
                    <li>
                      <p>internet portals;</p>
                    </li>
                    <li>
                      <p>accounting, law and consulting firms; and</p>
                    </li>
                    <li>
                      <p>educational institutions and trade associations.</p>
                    </li>
                    <li>
                      <p>
                        We will approve link requests from these organizations if we decide
                        that: (a) the link would not make us look unfavorably to ourselves or to
                        our accredited businesses; (b) the organization does not have any
                        negative records with us; (c) the benefit to us from the visibility of
                        the hyperlink compensates the absence of Sedar Global; and (d) the link
                        is in the context of general resource information.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    These organizations may link to our home page so long as the link: (a) is
                    not in any way deceptive to our knowledge; (b) does not falsely imply
                    sponsorship, endorsement or approval of the linking party and its products
                    or services; and (c) fits within the context of the linking party’s site.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If you are one of the organizations listed above and are interested in
                    linking to our website, you must inform us by sending an e-mail to [*].
                    Please include your name, your organization name, contact information as
                    well as the URL of your site, a list of any URLs from which you intend to
                    link to our website, and a list of the URLs on our site to which you would
                    like to link. We will endevour to respond within 3 weeks.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>Approved organizations may hyperlink to our Website as follows:</p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>By using of our corporate name; </p>
                    </li>
                    <li>
                      <p>By using of the uniform resource locator being linked to; </p>
                    </li>
                    <li>
                      <p>
                        By use of any other description of our website being linked to that
                        makes sense within the context and format of content on the linking
                        party’s site; and
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    No use of our logo or any trademark, registered or not, or other artwork
                    will be allowed for linking absent a trademark license agreement.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>iFrames</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Without prior approval and written permission, you may not create frames
                    around our Webpages that alter in any way the visual presentation or
                    appearance of our website.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Content Liability</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We shall not be hold responsible for any content that appears on your
                    website. You agree to protect and defend us against all claims that is
                    rising on your website. No link(s) should appear on any website that may be
                    interpreted as libelous, obscene or criminal, or which infringes, otherwise
                    violates, or advocates the infringement or other violation of, any third
                    party rights.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Reservation of Rights</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We reserve the right to request that you remove all links or any particular
                    link to our website. You confirm that you will immediately remove all links
                    to our website upon request. We also reserve the right to amend these terms
                    and conditions and it’s linking policy at any time. By continuously linking
                    to our website, you agree to be bound to and follow these linking
                    provisions.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Removal of links from our website</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If you find any link on our website that is offensive for any reason, you
                    are free to contact and inform us. We will consider requests to remove links
                    but we are not obligated to or so or to respond to you directly.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Completeness and Accuracy of Information </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We are not responsible if information made available on our website is not
                    accurate, complete or not current. The material on our website is provided
                    for general information only and should not be relied upon or used as the
                    sole basis for making decisions without consulting primary, more accurate,
                    more complete or more timely sources of information. Any reliance on the
                    material on our web ite is at your own risk and you confirm your
                    understanding of same.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Products and Services</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We have made every effort to display as accurately as possible the images
                    and colors of our products that appear on our website. We cannot guarantee
                    that your settings or your computer’s monitor display of any color will be
                    accurate.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We reserve the right to discontinue any product or service at any time. We
                    reserve the right, but are under no obligated, to limit the sales of our
                    products or services to any person, geographic region or jurisdiction. We
                    may exercise this right on a case-by-case basis. All descriptions of
                    products or product pricing are subject to change at any time without notice
                    and at our sole and complete discretion.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We do not warrant that the quality of any products, services, information,
                    or other material purchased or obtained by you will meet your expectations.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Product Information</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Most products displayed on our website are available in select Sedar stores.
                    In some cases, merchandise displayed for sale on our website may not be
                    available at Sedar Global stores.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Price Information</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Our goal is to have clear and understandable pricing for our products. Our
                    products’ prices are consistent in catalogs, in stores and online; however,
                    product prices may be displayed differently in our stores. We use these
                    pricing terms in our catalogs and online.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    The prices displayed on our website are quoted in respective region currency
                    and are valid and effective only in those countries. Additional shipping and
                    other charges may apply for orders depending upon the country you choose,
                    and you will be advised of such charges and your responsibility for any
                    portion thereof before we finalize and ship your order. Furthermore, while
                    we do our best to assure that the taxes quoted for a particular order are
                    accurate for the applicable location to which the order is being shipped,
                    should an erroneous quote be provided, we will notify you of such error
                    before finalizing and shipping your order. You will be responsible for all
                    applicable taxes, regardless of the amount quoted on our website at the time
                    of your order.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We reserve the right to correct any errors, inaccuracies, or omissions and
                    to change or update product pricing, availability or other information at
                    any time without prior notice (including after you have submitted your
                    order). If you do not wish to continue your purchase after pricing or other
                    information has been corrected, please contact us right away and we will
                    work with you to cancel or return your order as per our return/refund policy
                    stipulated herein.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We strive for accuracy in all item descriptions, photographs, detailed
                    specifications, pricing, links and any other product-related information
                    contained herein or referenced on our website. Due to human error and other
                    determinates we cannot guarantee that all item descriptions, photographs,
                    compatibility references, detailed specifications, pricing, links and any
                    other product-related information listed is entirely accurate, complete or
                    current, nor can we assume responsibility for these errors. In the event a
                    product listed on our website is labeled with an incorrect price due to some
                    typographical, informational, technical or other error, we shall at its sole
                    discretion have the right to refuse and/or cancel any order for said product
                    and immediately amend, correct and/or remove the inaccurate information.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Disclaimer</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    To the maximum extent permitted by applicable law, we exclude all
                    representations, warranties and conditions relating to our website and the
                    use of this website. Nothing in this disclaimer will:
                  </p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>
                        limit or exclude our or your liability for death or personal injury;
                      </p>
                    </li>
                    <li>
                      <p>
                        limit or exclude our or your liability for fraud or fraudulent
                        misrepresentation;
                      </p>
                    </li>
                    <li>
                      <p>
                        limit any of our or your liabilities in any way that is not permitted
                        under applicable law; or
                      </p>
                    </li>
                    <li>
                      <p>
                        exclude any of our or your liabilities that may not be excluded under
                        applicable law.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    The limitations and prohibitions of liability set in this Section and
                    elsewhere in this disclaimer: (a) are subject to the preceding paragraph;
                    and (b) govern all liabilities arising under the disclaimer, including
                    liabilities arising in contract, in tort and for breach of statutory duty.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We do not guarantee, represent or warrant that your use of our website will
                    be uninterrupted, timely, secure or error-free.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We do not warrant that the results that may be obtained from the use of our
                    website will be accurate or reliable.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    You expressly agree that your use of, or inability to use, the website is at
                    your sole risk. All products and services delivered to you through our
                    website are provided 'as is' and 'as available' for your use, without any
                    representation, warranties or conditions of any kind, either express or
                    implied, including all implied warranties or conditions of merchantability,
                    merchantable quality, fitness for a particular purpose, durability, title,
                    and non-infringement.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    In no case shall we, our directors, officers, employees, affiliates, agents,
                    contractors, interns, suppliers, service providers or licensors be liable
                    for any injury, loss, claim, or any direct, indirect, incidental, punitive,
                    special, or consequential damages of any kind, including, without limitation
                    lost profits, lost revenue, lost savings, loss of data, replacement costs,
                    or any similar damages, whether based in contract, tort (including
                    negligence), strict liability or otherwise, arising from your use of any of
                    our website or any products procured using our website, or for any other
                    claim related in any way to your use of the Service or any product,
                    including, but not limited to, any errors or omissions in any content, or
                    any loss or damage of any kind incurred as a result of the use of the
                    service or any content (or product) posted, transmitted, or otherwise made
                    available via the service, even if advised of their possibility.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Notwithstanding anything to the contrary herein and to the extent permitted
                    by law, our aggregate liability to you, whether in contract, tort (including
                    negligence) or otherwise, will be limited to a maximum of (I) {"{"}
                    {"{"}total_ccy_code{"}"}
                    {"}"} 1,000, or the amount you paid for the products, whichever is lower.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Warranty/Guarantee</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Whether it’s a simple coffee spill or a major system failure, the
                    consequences can vary significantly within each home and within each
                    industry. The key is ensure that the potential fallout from any downtime –
                    including productivity, profit, and reputation – is minimal.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We offer a 12 months manufacturers guarantee on manufacturing faults. We
                    reserve the right to either replace or repair the product and it may be
                    necessary to return the goods to us for inspection prior to a replacement
                    product being dispatched.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>What is covered?</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>
                        All Fabric products will be covered for one year from date-of-purchase
                        against issues arising from manufacturing defects and faults. This cover
                        is only available to the original owner and is not transferable.{" "}
                      </p>
                    </li>
                    <li>
                      <p>
                        Cover is only applicable to products when purchased new from our stores
                        or through our website.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>What is not covered?</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>The warranty period has expired.</p>
                    </li>
                    <li>
                      <p>
                        Damage caused by general wear and tear, wear against abrasive surfaces
                        such as rough seams, non-cycle specific clothing or under-saddle
                        fenders.
                      </p>
                    </li>
                    <li>
                      <p>
                        Damage caused by UV (Sunlight or other natural phenomena), fire, bleach,
                        colored materials or bicycle cleaners
                        {/*{cke_protected}{C}%3C!%2D%2D%20Not%20sure%20what%20these%20are.%20%2D%2D%3E*/}
                        .
                      </p>
                    </li>
                    <li>
                      <p>
                        Rips, burns, tears and damages due to accident, normal wear and tear,
                        improper care, misuse, or the natural breakdown of colors, finishes and
                        materials over time.
                      </p>
                    </li>
                    <li>
                      <p>
                        Damaged caused by improper repair, adjustments or lack of maintenance.
                      </p>
                    </li>
                    <li>
                      <p>Proof of purchase is not presented.</p>
                    </li>
                    <li>
                      <p>
                        This warranty does not cover damage, disintegration or loss arising from
                        abuse, misuse, vandalism, burns, cuts, punctures, *dye transfer,
                        improper installation, insufficient seam allowance, **inadequate
                        stitches per inch.
                      </p>
                    </li>
                    <li>
                      <p>
                        The use of improper cleaning agents or methods, lack of cleaning,
                        application of a post treatment defects in design or manufacture of
                        seating, inadequate padding, abrasion from other furniturecomponents.
                      </p>
                    </li>
                    <li>
                      <p>
                        The use of polyurethane as welt cord, any use other than intended, or
                        use subsequent to ownership by the original purchaser.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Description and Photography</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    All of the content you see on our website, including, for example, but not
                    limited to, all of the page headers, images, illustrations, graphics, audio
                    clips, video clips, and text (referred to herein as the “
                    <strong>Content</strong>”) is the exclusive property of Sedar Global and/or
                    is subject to trademark, service mark, trade dress, copyright and/or other
                    intellectual property rights or licenses held by Sedar Global, by one of its
                    affiliates or by third parties who have licensed or assigned their rights,
                    interests and/or materials to Sedar Global.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Except as noted above, you may not copy, download, reproduce, modify,
                    publish, distribute, transmit, transfer or create derivative works from the
                    Content without first obtaining our express written permission.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Products may come from different dye lots, sample colors may also vary
                    slightly from the color of the blinds you receive. To ensure the finished
                    product comes from the same dye lot and matches the color you sampled, we
                    recommend ordering products within 15 days of sampling. And if it’s been a
                    month or more since you received your samples, it’s a good idea to re-order
                    them just to be on the safe side when you’re ready to place your order. If
                    ordering multiple blinds, we strongly recommend that you order all of them
                    at the same time to ensure they come from the same dye lot and match one
                    another.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Alteration</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <ul>
                    <li>
                      <p>
                        Alteration and remake requests must be initiated within 2 days of when
                        you receive your order.
                      </p>
                    </li>
                    <li>
                      <p>
                        After a remake or alteration request has been submitted please expect
                        around two weeks for an updated item to be delivered and/or installed
                      </p>
                    </li>
                    <li>
                      <p>
                        Each customer is entitled to more remakes for an additional charge.{" "}
                      </p>
                    </li>
                    <li>
                      <p>
                        Customers outside of the UAE are responsible for return shipping costs.
                      </p>
                    </li>
                    <li>
                      <p>
                        Alterations and remakes are subject to material/fabric stock and
                        availability. If a material/fabric is no longer in stock, we may not
                        process the order.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>
                      Freight Damages/Defective &amp; Damaged Goods/Delivery of goods
                    </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    After receiving your products, we ask that you inspect and report any damage
                    within two days of delivery. Please do not attempt to install blinds that
                    have been damaged in delivery, as this will void any warranty claim.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If we are not notified within this period, we cannot be held responsible for
                    the damaged item or replacement cost.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Please take a photo of the damaged goods and send through to
                    info@sedarglobal.com with a description of the damaged areas.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If the box is visibly damaged upon receipt, please refuse delivery and the
                    box will be returned to us. Please notify us immediately so that we can file
                    a claim with the carrier.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Once we receive the damaged goods we will immediately repair or
                    re-manufacture your blinds provided the Delivery Insurance was paid for at
                    the time of purchase.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Order Cancelation</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Cancellation Period</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    The cancellation period starts when we send you the dispatch confirmation
                    email (this email indicates that your order has been accepted by us and,
                    therefore, that a contract has been formed between us) and ends 2 calendar
                    days after the day on which the product(s) is/are delivered to you. If you
                    ordered multiple products in a single order and we will ship those products
                    in separate deliveries to you, the cancellation period will end on the 2nd
                    day starting from the day after you received the last of the products in
                    that order.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Bank Card Issues</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    All credit/debit card payments are subject to validation by the issuer. If
                    the issuer of your card refuses to authorize payment, we will cancel your
                    order and contact you for an alternative method of payment. We will not be
                    held responsible nor liable in any way if this should result in a delay in
                    dispatching your goods/Products.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Delivery</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Delivery charges</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    You can choose to have your item(s) delivered to your home. The delivery
                    charge is charged on your total order. If your order is made up of a mixture
                    of small/medium sized items you will incur a 'standard delivery' charge but
                    if you include a large item your delivery charge will be at the higher
                    price.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Delivery time estimates</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Please note that while we aim to deliver within the timescales set. If the
                    delivery address is in a remote location or you have ordered some larger
                    item(s) your delivery may take a little longer to arrive. On certain items
                    there is a longer delivery period of up to 10 days.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Items requiring signature</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    A signature may sometimes be required at delivery. By placing an order you
                    are authorizing us to accept signature from another person at the same
                    address on your behalf if you are not present at the time of delivery.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Instructions to leave an item in an alternative location </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    For some items that do not require a signature at delivery you may be able
                    to give instructions explaining if and where you would like the item to be
                    left if no one is present at the time of delivery, such as with a neighbor.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Large items</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Should your order include long rods, it is your responsibility to ensure you
                    check access to your premises before placing your order. We advise that you
                    do not book kitchen fitters or installation engineers until your items have
                    arrived, as we will not be held responsible for any costs associated with
                    this.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Pricing</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    You agree to pay the full amount payable for the product as indicated during
                    the order process, including any shipping costs or charges incurred with
                    that order. All prices are displayed in respective region currencies.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Sedar Global will use reasonable endeavors to provide you with attractive
                    prices on our website as well as in its stores, however, sometimes the price
                    online will not match the price in a store.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Measurements</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We are not responsible for any delays in the shipping of your ordered and
                    purchased product/s, lost or missing product/s or the incorrect delivery of
                    the product/s to you, which is due to your fault or due to inaccurate, false
                    or incomplete information provided by you.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Never just measure your old blinds or shades and use those measurements for
                    your new ones. Always measure each individual window. (Even if they look
                    like they’re the same size, trust us. They’re not.)
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Your choice of mount type (inside or outside mount) affects how your custom
                    treatment will fit in or over your window. Before measuring your windows, be
                    sure to check the listed specifications on each product page for your
                    product’s minimum/maximum width, height and depth requirements to ensure
                    you’re measuring for the proper mount type.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If you have any questions about measuring your windows before placing your
                    order, call our Customer Care Team. We’re here to help you get the perfect
                    fit for every window, every time!
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Payment Methods</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    The following payment methods are available: Visa, Visa electron,
                    Mastercard, American Express. All GCC approved bank cards can be used for
                    the transaction.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Card Rejection Scenario</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    The details we request from you must be the same as those on your credit
                    card. A simple typing error can cause the operation to be rejected, so we
                    ask you to complete the payment form carefully. Your credit limit may have
                    been exceeded or the card might have expired.
                  </p>
                  <p>
                    Please contact your bank about any queries you may have about your payment
                    credit card.
                  </p>
                  <p>Invoicing on company name</p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Yes. In the shopping basket, you can indicate whether the purchase is made
                    for an individual or a company.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If charged twice, please consult our customer service desk or reach our
                    customer service on
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Severability </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If any provision of these Terms is or may become, under any applicable law,
                    or is found by any court or administrative body of competent jurisdiction to
                    be, illegal, void, invalid, prohibited or unenforceable then such provision
                    shall be ineffective to the extent of such illegality, invalidity,
                    prohibition or unenforceability and the remaining provisions of these Terms
                    shall remain in full force and effect.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Termination of Use</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We may, in our sole discretion, terminate or suspend your access to and use
                    of our website without notice and for any reason, including for violation of
                    these Terms, or for other conduct which we believe, in our sole discretion,
                    is unlawful or harmful to others. In the event of termination, you will no
                    longer be authorized to access the site and we will use any means possible
                    to enforce this termination.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>No Agency </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    Nothing in these Terms shall be construed as creating an agency,
                    partnership, joint venture, or employment between you and us. You agree and
                    understand that you do not have any authority to bind us in any respect
                    whatsoever under any circumstances.{" "}
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Delay in Exercising Rights </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    No failure or delay on our part to exercise any right or remedy available to
                    us under these Terms or the law shall be construed or operate as a waiver
                    thereof nor shall any single or partial exercise of any right or remedy as
                    the case may be. The rights and remedies provided for in these Terms are
                    cumulative and are not exclusive of any rights or remedies provided by law.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Assignment </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    We may assign any or all our rights and duties under these Terms to any
                    party at any time without notice to you.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Governing Law</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws
                    of the United Arab Emirates and the Emirate of Dubai.
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Questions and Contact Information </strong>
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    If you would like to: access, correct, amend or delete any personal
                    information we have about you, register a request, or simply want more
                    information contact us at [*].
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
                  </p>
                </div>
              </>
              :
              <>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <p>
                    من خلال هذا الموقع الإلكتروني ، تشير المصطلحات "نحن" و / أو "لنا" إلى
                    والشركات التابعة لها والشركات <br />
                    الفرعية{" "}
                  </p>
                  <h3>سياسة الإرجاع </h3>
                  <p>
                    نود أن تكون سعيدًا بكل ما تشتريه منا. نظرًا لأن جميع ستائرنا مصنوعة حسب
                    الطلب ، فلا يمكننا تقديم استرداد أو استبدال (إعادة صنع) ما لم يكن المنتج
                    معيبًا ، وفقًا لتقديرنا فقط
                  </p>
                  <h3>شروط الارجاع</h3>
                  <p>
                    عيب في المواد, أو التصنيع من قبل موظفينا شيء ما لا يعمل بشكل صحيح المنتج
                    بحجم خاطئ بسبب خطأ من منشأة الإنتاج يجب تقديم طلب الإرجاع خلال يومين من
                    تاريخ التسليم وعلى المنتجات أن تكون غير مستخدمة وفي عبواتها الأصلية
                  </p>
                  <h3> المنتج غير قابل للتصليح</h3>
                  <p>
                    يمكن إرجاع المنتج إلى المتجرلاسترداد الأموال. إذا كان المتجر يملك هذا المنتج
                    ، يمكنك شرائه بعد إعادة الأصل
                  </p>
                  <h3> شروط رفض الإرجاع قطع الأقمشة يالمتر</h3>{" "}
                  <p>
                    {" "}
                    المنتجات التي تم استخدامها أو تعديلها أو تغييرها أو غسلها أو تجميعها أو
                    تركيبها ما لم تكن معيبة المنتجات التالفة بسبب سوء الاستخدام أو التي تظهر
                    عليها علامات التآكل ، حتى لو كانت لا تزال تحت الضمان المنتجات التي تم
                    تجميعها بالفعل ، ما لم يقرر فريقنا وجود عيب في التصنيع. نحتفظ بالحق في
                    التحقق من وجود عيوب وسنقوم بإصلاح أو استبدال المنتجات المعيبة وفقًا لتقديرنا
                    إذا قمت بإرجاع سلعة استلمتها معيبة أو تالفة أو غير صحيحة ، فسيتم رد تكلفة
                    التسليم الكاملة ، بمجرد معالجة عملية الإرجاع{" "}
                  </p>
                  <h3>
                    عملية الاستلام: بمجرد الموافقة على الشكوى ، ستبدأ عملية استلام المنتج
                  </h3>{" "}
                  <p>
                    ا- داخل الإمارات العربية المتحدة: سيتم اختيار المنتج (المنتجات) من قبل فريق
                    التسليم لعملاء الإمارات العربية المتحدة لن تكون هناك رسوم استلام إذا تم رفع
                    طلب الإرجاع في غضون يومين: 48 ساعة يمكن إعادة جدولة طلب الاستلام إذا تم
                    إلغاؤه لأي سبب من الأسباب مرة واحدة عند الطلب ودون أي رسوم إضافية ،اما إذا
                    تم إلغاء طلب الاستلام الثاني ، فسيتم إغلاق تذكرة المطالبة ، ما لم تعتبرشركة
                    سيدار خلاف ذلك وفقًا لتقديرها الخاص
                  </p>
                  <h3> ب- خارج الإمارات العربية المتحدة:</h3>{" "}
                  <span>سيتم التعامل مع هذا على أساس كل حالة على حدة وبالتوافق معنا</span>
                  <h3> إعادة المال</h3>{" "}
                  <p>
                    عندما تشتري منا ، نريدك أن تكون سعيدًا بعملية الشراءهذه. لذلك إذا كنت بحاجة
                    إلى اعادتها ، فنحن نريد أن نجعل هذه العملية سهلة قدر الإمكان سنقوم برد رسوم
                    التوصيل بالكامل إذا كان المنتج المستلم به عيب او تالف وقمت بإرجاع جميع
                    منتجات طلبك في نفس الوقت.اما إذا اخترت الاحتفاظ ببعض منها ، فسنحتفظ برصيد
                    رسوم التوصيل التي تعود للمنتجات التي تحتفظ بها بمجرد استلامنا لمنتجك ، سنعيد
                    أموالك بنفس الطريقة التي دفعت بها ثمنه في البداية. إذا تم السداد ببطاقة
                    ائتمان أو خصم ، فسيتم إرجاع المبلغ المسترد إلى حساب البطاقة نفسه. تستغرق
                    عملية استرداد الأموال عادةً ما بين 3-5 أيام عمل لتظهر في حسابك إذا اشتريت
                    بسعرترويجي ، فسيعتمد رد الأموال على هذا السعر الترويجي. إذا كنت تعيد السلع
                    التي تم شراؤها في عرض ترويجي ، مثل "اشترِ واحدة واحصل على نصف السعر للثانية"
                    أو "3 مقابل 2" ، فلن يتم تطبيق العرض الترويجي وسيتم تعديل قيمة الاسترداد
                    وفقًا لذلك عندما تستخدم قسيمة عند الدفع مقابل طلبك ، سيتم اعتبار القسيمة
                    مستخدمة اذا تعيد فقط بعض البضائع التي تنطبق عليها القسيمة. ستتمكن فقط من
                    استرداد قيمة القسيمة أو سنصدر واحدة جديدة لعملية شراء مستقبلية إذا كنت تعيد
                    جميع السلع التي تنطبق عليها القسيمة إذا كان لديك أي أسئلة تتعلق باسترداد
                    الأموال ، يرجى الاتصال بفريق خدمة العملاء لدينا على الرقم 80073327
                  </p>
                  <h3>استبدال</h3>{" "}
                  <p>
                    . إرضاؤك مهم جدا لنا في حالة وقوع حادث قد يتطلب منتج بديل مرة أخرى ، يرجى
                    الاتصال بفريق خدمة العملاء الذي سيقوم بترتيب ذلك بما يتماشى مع الشروط
                    والأحكام للاستبدال و / أو المنتجات المعيبة
                  </p>
                  <h3> سياسة الخصوصية</h3> <h3>خصوصيتك أمر بالغ الأهمية بالنسبة لنا</h3>
                  <p>
                    {" "}
                    تتمثل سياستنا في احترام خصوصيتك فيما يتعلق بأي وجميع المعلومات التي قد
                    نجمعها أثناء تشغيل موقعنا الالكتروني. تنطبق سياسة الخصوصية هذه على موقع
                    سيدار غلوبال (يشار إليه فيما بعد باسم "نحن" أو "نحن" (sedarglobal.comأو نحن
                    نحترم خصوصيتك ونلتزم بحماية معلومات التعريف الشخصية التي قد تزودنا بها من
                    خلال موقعنا لقد اعتمدنا سياسة الخصوصية هذه لشرح المعلومات التي يمكن جمعها
                    على موقعنا الإلكتروني ، وكيف نستخدم هذه المعلومات ، وتحت أي ظروف قد نكشفها
                    إلى أطراف ثالثة. تنطبق سياسة الخصوصية هذه فقط على المعلومات التي نجمعها من
                    خلال موقعنا ولا تنطبق على مجموعة المعلومات الخاصة بنا من مصادر أخرى تحدد
                    سياسة الخصوصية هذه ، جنبًا إلى جنب مع الشروط والأحكام المنشورة على موقعنا ،
                    القواعد والسياسات العامة التي تحكم استخدامك لموقعنا. بناءً على أنشطتك عند
                    زيارة موقعنا ، قد يُطلب منك الموافقة على شروط وأحكام إضافية
                  </p>
                  <h3> زوار الموقع</h3>{" "}
                  <p>
                    مثل معظم مشغلي مواقع الويب ، نقوم بجمع معلومات غير شخصية من النوع الذي توفره
                    مستعرضات الويب والخوادم عادةً ، مثل ، على سبيل المثال لا الحصر ، نوع المتصفح
                    ، وتفضيل اللغة ، والموقع المرجعي ، وتاريخ ووقت كل طلب زائر. هدفنا في جمع
                    معلومات التعريف غير الشخصية هو فهم أفضل لكيفية استخدام زوارنا لموقعنا على
                    الويب. من وقت لآخر ، قد نصدر معلومات غير محددة للهوية بشكل إجمالي ، على سبيل
                    المثال ، عن طريق نشر تقرير عن الاتجاهات في استخدام موقعنا (IP) نقوم أيضًا
                    بجمع معلومات التعريف الشخصية المحتملة مثل عناوين بروتوكول الإنترنت
                    للمستخدمين الذين قاموا بتسجيل الدخول وللمستخدمين الذين يتركون تعليقات على
                    منشورات مدونة
                    <a href="http://sedarglobal.com"> http://sedarglobal.com</a>
                    نحن نكشف عن عناوين (اي بي )الخاصة بالمستخدمين والمعلقين الذين قاموا بتسجيل
                    الدخول في نفس الظروف التي يستخدمها ويكشف عن معلومات التعريف الشخصية كما هو
                    موضح أدناه{" "}
                  </p>
                  <h3>جمع معلومات التعريف الشخصية</h3>{" "}
                  <p>
                    يختار بعض زوار موقعنا التفاعل معنا بطرق تتطلب منا جمع معلومات التعريف
                    الشخصية. يعتمد مقدار ونوع المعلومات التي نجمعها على طبيعة التفاعل. على سبيل
                    المثال ، نطلب من الزائرين الذين اشتركوا في مدونة
                    <a href="http://sedarglobal.com"> http://sedarglobal.com</a>
                    تقديم اسم مستخدم وعنوان بريد إلكتروني
                  </p>
                  <h3>الأمان </h3>{" "}
                  <p>
                    يعد أمان معلوماتك الشخصية أمرًا مهمًا بالنسبة لنا ، ولكن تذكر أنه لا توجد
                    وسيلة نقل عبر الإنترنت أو طريقة تخزين إلكتروني آمنة بنسبة 100٪. بينما نسعى
                    جاهدين لاستخدام وسائل مقبولة تجاريًا لحماية معلوماتك الشخصية ، لا يمكننا
                    ضمان أمنها المطلق
                  </p>
                  <h3>الإعلانات</h3>{" "}
                  <p>
                    قد يتم تسليم الإعلانات التي تظهرعلى موقعنا إلى المستخدمين عن طريق شركاء
                    الإعلان ، الذين قد يقومون بتعيين ملفات تعريف الارتباط. تسمح ملفات تعريف
                    الارتباط هذه لخادم الإعلانات بالتعرف على جهاز الكمبيوتر الخاص بك في كل مرة
                    يرسلون لك إعلانًا عبر الإنترنت لتجميع معلومات عنك أو عن الآخرين الذين
                    يستخدمون جهازكمبيوترك. تسمح هذه المعلومات لشبكات الإعلانات ، من بين أمور
                    أخرى ، بتقديم إعلانات مستهدفة تعتقد أنها ستكون ذات أهمية قصوى بالنسبة لك.
                    تغطي سياسة الخصوصية هذه استخدام ملفات تعريف الارتباط من قبلنا ولا تغطي
                    استخدام ملفات تعريف الارتباط من قبل أي معلنين
                  </p>
                  <h3> روابط لمواقع خارجية</h3>{" "}
                  <p>
                    قد تحتوي خدمتنا على روابط لمواقع خارجية لا نقوم بتشغيلها ولا نتحمل أي
                    مسؤولية عن محتواها أو خصوصيتها أو أمنها. أنت تدخل مواقع الطرف الثالث هذه على
                    مسؤوليتك الخاصة. إذا قمت بالنقر فوق ارتباط جهة خارجية ، فسيتم توجيهك إلى
                    موقع الطرف الثالث. ننصحك بشدة بمراجعة سياسة الخصوصية وشروط وأحكام كل موقع
                    تزوره ليس لدينا أي سيطرة ولا نتحمل أي مسؤولية عن المحتوى أو سياسات الخصوصية
                    أو ممارسات أي مواقع أو منتجات أو خدمات تابعة لجهات خارجية تدخلها ، سواء بشكل
                    مباشر أو غير مباشر ، أثناء تصفح موقعنا على الويب أنت تؤكد بموجبه أننا لسنا
                    مسؤولين عن أي ضرر أو أضرار تتعلق بشراء أو استخدام السلع أو الخدمات أو
                    الموارد أو المحتوى أو أي معاملات أخرى تتم فيما يتعلق بأي مواقع ويب تابعة
                    لجهات خارجية. يجب توجيه الشكاوى أو المطالبات أو المخاوف أو الأسئلة المتعلقة
                    بمنتجات الجهات الخارجية إلى الجهة الخارجية.
                  </p>
                  <h3> شركة اعلانات غوغل ادوردز</h3>{" "}
                  <p>
                    {" "}
                    Sedarglobal.com يستخدم خدمات تجديد النشاط التسويقي للإعلان على مواقع الطرف
                    الثالث (بما في ذلك غوغل) للزوار السابقين لموقعنا. قد يعني ذلك أننا نعلن
                    للزوار السابقين الذين لم يكملوا مهمة على موقعنا. على سبيل المثال ، استخدام
                    نموذج الاتصال لإجراء استفسار. قد يكون هذا في شكل إعلان على صفحة نتائج بحث
                    غوغل أو موقع في شبكة ملفات تعريف الارتباط بائعي الجهات الخارجية ، بما في ذلك
                    غوغل يستخدمون ملفات لعرض الإعلانات بناءً على الزيارات السابقة لشخص ما. سيتم
                    استخدام أي بيانات تم جمعها نتيجة لهذا التمرين وفقًا لسياستنا الخصوصية وسياسة
                    خصوصية الإعلانية
                  </p>
                  <h3>احصائيات مجمّعة</h3>{" "}
                  <p>
                    {" "}
                    قد نقوم بجمع إحصائيات حول سلوك زوار موقعنا. قد نعرض هذه المعلومات علنًا أو
                    نقدمها للآخرين. ومع ذلك ، فإننا لا نكشف عن معلومات التعريف الشخصية خاصتك
                  </p>
                  <h3> الإفصاح عن الشركات التابعة</h3>{" "}
                  <p>
                    {" "}
                    يستخدم موقعنا روابط تابعة وفي ظروف معينة يكسب عمولة من بعض الروابط. ومع ذلك
                    ، هذا لا يؤثر على مشترياتك أو السعر الذي تدفعه مقابل هذه المشتريات
                  </p>
                  <h3> ملفات تعريف الارتباط على الإنترنت</h3>{" "}
                  <p>
                    {" "}
                    لإثراء تجربتك على الإنترنت وإتقانها ، نستخدم "ملفات تعريف الارتباط"
                    والتقنيات والخدمات المماثلة التي يقدمها الآخرون لعرض المحتوى المخصص والإعلان
                    المناسب وتخزين تفضيلاتك على جهاز الكمبيوتر الخاص بك ملف تعريف الارتباط هو
                    سلسلة من المعلومات التي يخزنها موقع الويب على كمبيوتر الزائر والتي يوفرها
                    متصفح الزائر للموقع في كل مرة يعود فيها الزائر. نحن نستخدم ملفات تعريف
                    الارتباط لمساعدتنا في التعرف على الزوار وتتبعهم واستخدامهم لموقعنا وتفضيلات
                    الوصول إلى مواقعهم يجب على الزوار الذين لا يرغبون في وضع ملفات تعريف
                    الارتباط على أجهزة الكمبيوتر الخاصة بهم تعيين متصفحاتهم لرفض ملفات تعريف
                    الارتباط قبل استخدام موقعنا ، ومع ذلك ، عند القيام بذلك ، قد لا تعمل بعض
                    ميزات مواقعنا الإلكترونية بشكل صحيح من خلال الاستمرار في التنقل في موقعنا
                    على الويب دون تغيير إعدادات ملفات تعريف الارتباط ، فإنك تقر وتوافق بموجب هذا
                    على استخدامنا لملفات تعريف الارتباط
                  </p>
                  <h3>التجارة الإلكترونية</h3>{" "}
                  <p>
                    يُطلب من أولئك الذين ينعاملون معنا - عن طريق شراء أي من خدماتنا أو منتجاتنا
                    ، تقديم معلومات إضافية ، بما في ذلك على سبيل المثال لا الحصر ، المعلومات
                    الشخصية والمالية المطلوبة لمعالجة هذه المعاملات. في كل حالة ، نقوم بجمع هذه
                    المعلومات فقط بقدر ما هو ضروري أو مناسب لتحقيق الغرض من تفاعل الزائر مع
                    موقعنا. نحن لا نكشف عن معلومات التعريف الشخصية بخلاف ما هو موضح هنا. يمكن
                    للزوار دائمًا رفض تقديم معلومات التعريف الشخصية ، مع التحذير من أنها قد
                    تمنعهم من المشاركة في أنشطة معينة متعلقة بالموقع
                  </p>
                  <h3>تحويلات الأعمال</h3>{" "}
                  <p>
                    إذا تم الاستحواذ علينا ، أو إلى حد كبير على أي من أصولنا ، أو في حالة احتمال
                    توقفنا عن العمل أو دخولنا في الإفلاس ، فإن معلومات المستخدم ستكون أحد الأصول
                    التي يتم نقلها أو الحصول عليها من قبل طرف ثالث. أنت تقر بأن عمليات النقل هذه
                    قد تحدث ، وأن أي مستحوذ على سيدار قد يستمر في استخدام معلوماتك الشخصية على
                    النحو المنصوص عليه في هذه السياسة
                  </p>
                  <h3>تغييرات سياسة الخصوصية</h3>{" "}
                  <p>
                    يجوز لنا تغيير سياستنا الخصوصية من وقت لآخر، ووفقًا لتقديرنا الخاص. لذلك ،
                    نشجع زوارنا على مراجعة هذه الصفحة بشكل متكرر لمعرفة أي تغييرات قد تطرأ على
                    سياسة الخصوصية. ان استمرار استخدامك لموقعنا على الويب بعد أي تغييرات في
                    سياسة الخصوصية هذه يشكل موافقتك على هذا التغيير
                  </p>
                  <h3> شروط الاستخدام الأحكام والشروط </h3>{" "}
                  <p>
                    {" "}
                    تحدد هذه الشروط والأحكام الخاصة باستخدام موقع سيدارغلوبال الموجود على موقع
                    <a href="http://sedarglobal.com">sedarglobal.com</a>
                  </p>
                  <p>
                    {" "}
                    <strong>
                      يُرجى قراءة شروط الخدمة هذه بعناية. هذه اتفاقية قانونية بيننا وبينك تحكم
                      استخدامك لموقعنا على الويب وتشترط قبولك وموافقتك على جميع شروط الاستخدام
                      الواردة هنا. إذا كنت لا توافق على جميع الشروط والأحكام المنصوص عليها في
                      هذه الشروط ، فلا يجوز لك الوصول إلى الموقع الإلكتروني أو استخدام أي من
                      الخدمات التي نقدمها
                    </strong>
                  </p>{" "}
                  <p>
                    {" "}
                    من خلال زيارة موقعنا و / أو شراء شيء منا ، فإنك تشارك في خدماتنا وتوافق على
                    الالتزام بالشروط والأحكام التالية ("الشروط"). تنطبق هذه الشروط على جميع
                    مستخدمي موقعنا ، بما في ذلك على سبيل المثال لا الحصر ، المستخدمين من
                    المتصفحات و / أو البائعين و / أو العملاء و / أو التجار و / أو المساهمين في
                    المحتوى ، بغض النظر عما إذا كانوا مسجلين على موقعنا أم لا بالموافقة على هذه
                    الشروط ، فإنك تقر وتؤكد أن عمرك: (أ) لا يقل عن ثمانية عشر (18) عامًا ؛ أو
                    (ب) منحك موافقتك الصريحة على السماح لأي من المعالين القصر باستخدام موقع
                    الويب بواسطة بيانات اعتماد تسجيل الدخول الخاصة بك لاستخدامه
                  </p>
                  <h3> ملفات تعريف الارتباط على الإنترنت</h3>{" "}
                  <p>
                    {" "}
                    نحن نوظف استخدام ملفات تعريف الارتباط. من خلال الوصول إلى موقعنا الإلكتروني
                    ، فإنك توافق على استخدام ملفات تعريف الارتباط بالاتفاق مع سياسة الخصوصية
                    الخاصة بشركة سيدار غلوبال لمزيد من المعلومات ، يرجى زيارة سياستنا الخصوصية
                    الوصول إليه
                  </p>
                  <h3> رخصة</h3>{" "}
                  <p>
                    ما لم ينص على خلاف ذلك ، نحن و / أو المرخصون لدينا نمتلك حقوق الملكية
                    الفكرية لجميع المواد على موقعنا. جميع حقوق الملكية الفكرية محفوظة. يمكنك
                    الوصول إلى هذا من موقعنا على الإنترنت لاستخدامك الشخصي مع مراعاة القيود
                    المنصوص عليها في هذه الشروط والأحكام
                  </p>
                  <h3>لا يجوز لك</h3>{" "}
                  <p>
                    {" "}
                    إعادة نشر المواد من موقعنا على الإنترنت ؛ بيع أو تأجير أو ترخيص المواد من
                    موقعنا على الإنترنت ؛ إعادة إنتاج أواصدار نسخة طبق الاصل أو نسخ المواد من
                    موقعنا على الإنترنت ؛ أو إعادة توزيع المحتوى من موقعنا توفر أجزاء من هذا
                    الموقع فرصة للمستخدمين لنشر وتبادل الآراء والمعلومات في مناطق معينة. نحن لا
                    نقوم بتصفية أو تعديل أو نشر أو مراجعة التعليقات قبل وجودها على الموقع. لا
                    تعكس التعليقات وجهات نظرنا وآرائنا ووكلائنا و / أو الشركات التابعة لنا. تعكس
                    التعليقات وجهات نظر وآراء الشخص الذي ينشر وجهات نظره وآرائه. إلى الحد الذي
                    تسمح به القوانين المعمول بها ، لن نكون مسؤولين عن التعليقات أو عن أي مسؤولية
                    أو أضرار أو نفقات ناتجة و / أو تكبدتها نتيجة لأي استخدام و / أو نشر و / أو
                    ظهور التعليقات على موقعنا الالكتروني نحتفظ بالحق في مراقبة جميع التعليقات
                    وإزالة أي تعليقات قد تعتبر ، في رأينا الخاص ، غير ملائمة أو مسيئة أو تسبب
                    انتهاكًا لهذه الشروط
                  </p>
                  <h3> أنت تضمن وتمثل ما يلي</h3>{" "}
                  <p>
                    {" "}
                    يحق لك نشر التعليقات على موقعنا والحصول على جميع التراخيص والموافقات اللازمة
                    للقيام بذلك لا تنتهك التعليقات أي حق من حقوق الملكية الفكرية ، بما في ذلك
                    على سبيل المثال لا الحصر حقوق النشر أو براءات الاختراع أو العلامات التجارية
                    لأي طرف ثالث ؛ لا تحتوي التعليقات على أي مواد تشهيرية أوقدح وذم او مسيئة أو
                    غير لائقة أو غير قانونية بطريقة أخرى والتي يمكن اعتبارها انتهاكًا للخصوصية ؛
                    لن يتم استخدام التعليقات لالتماس أو الترويج للأعمال أو الأنشطة التجارية
                    المخصصة أو الحالية أو أي نشاط غير قانوني أنت تمنحنا بموجب هذا ترخيصًا غير
                    حصري لاستخدام وإعادة إنتاج وتحرير وتفويض الآخرين لاستخدام وإعادة إنتاج
                    وتحرير أي من تعليقاتك في أي وجميع الأشكال أو التنسيقات أو الوسائط او وسائل
                    الاعلام
                  </p>
                  <h3> الاستخدامات المحظورة</h3>{" "}
                  <p>
                    بالإضافة إلى المحظورات الأخرى المنصوص عليها في هذه الشروط ، يُحظر عليك
                    استخدام موقعنا الإلكتروني أو محتواه: (أ) لأي غرض غير قانوني ؛ (ب) حث الآخرين
                    على أداء أو المشاركة في أي أعمال غير قانونية ؛ (ج) انتهاك أي لوائح أو قواعد
                    أو قوانين أو مراسيم محلية دولية أو فيدرالية أو إقليمية أو خاصة بالولاية ؛
                    (د) التعدي على أو انتهاك حقوق الملكية الفكرية الخاصة بنا أو حقوق الملكية
                    الفكرية للآخرين ؛ (هـ) المضايقة أو الإساءة أو الإهانة أو الأذى أو التشهير أو
                    القذف أو الاستخفاف أو التخويف أو التمييز على أساس الجنس أو التوجه الجنسي أو
                    الدين أو العرق أو السن أو الأصل القومي أو الإعاقة ؛ (و) تقديم معلومات خاطئة
                    أو مضللة ؛ (ز) لتحميل أو نقل فيروسات أو أي نوع آخر من الشفرات الخبيثة التي
                    سيتم استخدامها أو قد يتم استخدامها بأي طريقة من شأنها التأثير على وظائف أو
                    تشغيل موقعنا على الويب أو مواقع الويب الأخرى أو الإنترنت ؛ (ح) لجمع أو تتبع
                    المعلومات الشخصية للآخرين ؛ (1) إرسال بريد عشوائي أو احتيالي أو ذريعة (ي)
                    لأي غرض فاحش أو غير أخلاقي ؛ (ك) للتدخل أو التحايل على ميزات الأمان الخاصة
                    بموقعنا أو الإنترنت. نحتفظ بالحق في إنهاء استخدامك لخدمتنا أو أي موقع ويب ذي
                    صلة لانتهاك أي من الاستخدامات المحظورة
                  </p>
                  <h3> الارتباط التشعبي إلى المحتوى الخاص بنا</h3>{" "}
                  <p>
                    قد ترتبط المنظمات التالية بموقعنا على الويب دون موافقة كتابية مسبقة
                    <br />
                    وكالات الحكومة؛
                    <br />
                    محركات البحث
                    <br />
                    المنظمات الإخبارية ؛ يجوز لموزعي الدليل عبر الإنترنت الارتباط بموقعنا
                    الإلكتروني بنفس طريقة الارتباط التشعبي لمواقع الويب الخاصة بالشركات الأخرى
                    المدرجة ؛ و الشركات المعتمدة على مستوى النظام باستثناء طلب المنظمات غير
                    الربحية ومراكز التسوق الخيرية ومجموعات جمع التبرعات الخيرية التي قد لا ترتبط
                    ارتباطًا تشعبيًا بموقعنا على الويب قد ترتبط هذه المنظمات بصفحتنا الرئيسية أو
                    بالمنشورات أو بمعلومات موقع الويب الأخرى طالما أن الرابط: (أ) ليس مضللاً بأي
                    شكل من الأشكال (ب) لا يعني ضمنيًا رعاية أو تأييد أو موافقة الطرف المرتبط
                    ومنتجاته و / أو خدماته ؛ و (ج) يناسب سياق موقع الطرف المرتبط
                    <br />
                    يجوز لنا النظر في طلبات الارتباط الأخرى والموافقة عليها من الأنواع التالية
                    من المؤسسات:
                    <br />
                    مصادر معلومات المستهلك و / أو الأعمال المعروفة ؛
                    <br />
                    مواقع مجتمع dot.com
                    <br />
                    الجمعيات أو المجموعات الأخرى التي تمثل الجمعيات الخيرية ؛
                    <br />
                    موزعي الدليل عبر الإنترنت ؛
                    <br />
                    بوابات الإنترنت
                    <br />
                    شركات المحاسبة والقانون والاستشارات ؛ و
                    <br />
                    المؤسسات التعليمية والجمعيات التجارية
                    <br />
                    سنوافق على طلبات الارتباط من هذه المنظمات إذا قررنا ما يلي: (أ) لن يجعلنا
                    الرابط ننظر سلبا إلى أنفسنا أو إلى شركائنا المعتمدين ؛ (ب) ليس لدى المنظمة
                    أي سجلات سلبية معنا ؛ (ج) تعوض الاستفادة من رؤية الارتباط التشعبي غياب سيدار
                    غلوبال؛ و (د) الارتباط في سياق موارد المعلومات العامة قد ترتبط هذه المنظمات
                    بصفحتنا الرئيسية طالما أن الرابط: (أ) ليس بأي حال من الأحوال مخادعًا
                    لمعرفتنا؛ (ب) لا يعني ضمنيًا رعاية أو تأييد أو موافقة الطرف المرتبط ومنتجاته
                    أو خدماته ؛ و (ج) يناسب سياق موقع الطرف المرتبط
                    <br /> إذا كنت أحد المنظمات المذكورة أعلاه وتهتم بالارتباط بموقعنا على الويب
                    ، فيجب عليك إبلاغنا عن طريق إرسال بريد إلكتروني إلى [*]. يرجى تضمين اسمك
                    واسم مؤسستك ومعلومات الاتصال بالإضافة إلى عنوان -يو ارال- لموقعك وقائمة بأية
                    عناوين - يو ار ال - تنوي الارتباط بموقعنا على الويب وقائمة عناوين – يو ار ال
                    - الموجودة على موقعنا والتي ترغب في حلقة الوصل. سنلتزم بالرد خلال 3 أسابيع
                    <br />
                    يو ار ال =URL
                    <br />
                    يجوز للمنظمات المعتمدة الارتباط التشعبي لموقعنا على النحو التالي
                    <br />
                    باستخدام اسم شركتنا ؛
                    <br />
                    باستخدام محدد موقع الموارد الموحد المرتبط بـ ؛
                    <br />
                    من خلال استخدام أي وصف آخر لموقعنا على الويب يتم ربطه بهذا الأمر في سياق
                    وشكل المحتوى على موقع الطرف المرتبط ؛ و
                    <br />
                    لن يُسمح بأي استخدام لشعارنا أو أي علامة تجارية مسجلة أو غير مسجلة أو أي عمل
                    فني آخر لربط غياب اتفاقية ترخيص العلامة التجارية
                  </p>
                  <h3> إطارات I</h3>{" "}
                  <p>
                    بدون موافقة مسبقة وإذن كتابي ، لا يجوز لك إنشاء إطارات حول صفحات الويب
                    الخاصة بنا والتي تغير بأي شكل من الأشكال العرض التقديمي المرئي لموقعنا أو
                    مظهره
                  </p>
                  <h3>المسؤولية عن المحتوى</h3>{" "}
                  <p>
                    لن نتحمل المسؤولية عن أي محتوى يظهر على موقع الويب الخاص بك. أنت توافق على
                    حمايتنا والدفاع عنا ضد جميع المطالبات التي تنشأ على موقع الويب الخاص بك. يجب
                    ألا يظهر أي رابط (روابط) على أي موقع ويب يمكن تفسيره على أنه تشهيري أو فاحش
                    أو إجرامي ، أو ينتهك أو يدعو إلى التعدي أو لانتهاك حقوق أي طرف ثالث
                  </p>
                  <h3> حفظ الحقوق</h3>{" "}
                  <p>
                    نحتفظ بالحق في مطالبتك بإزالة جميع الروابط أو أي رابط معين لموقعنا على
                    الويب. أنت تؤكد أنك ستزيل على الفور جميع الروابط إلى موقعنا على الويب عند
                    الطلب. نحتفظ أيضًا بالحق في تعديل هذه الشروط والأحكام وسياسة الربط الخاصة
                    بها في أي وقت. من خلال الارتباط المستمر بموقعنا ، فإنك توافق على الالتزام
                    بأحكام الربط هذه واتباعها.
                  </p>
                  <h3> إزالة الروابط من موقعنا</h3>{" "}
                  <p>
                    {" "}
                    إذا وجدت أي رابط على موقعنا مسيء لأي سبب من الأسباب ، فأنت حر في الاتصال بنا
                    وإبلاغنا. سننظر في طلبات إزالة الروابط ولكننا لسنا ملزمين بذلك أو بالرد عليك
                    مباشرة.
                  </p>
                  <h3> اكتمال ودقة المعلومات</h3>{" "}
                  <p>
                    لا نتحمل المسؤولية إذا كانت المعلومات المتوفرة على موقعنا الإلكتروني غير
                    دقيقة أو كاملة أو غير حديثة. يتم توفير المواد الموجودة على موقعنا للحصول على
                    معلومات عامة فقط ولا ينبغي الاعتماد عليها أو استخدامها كأساس وحيد لاتخاذ
                    القرارات دون استشارة مصادر المعلومات الأولية أو الأكثر دقة أو الأكثر
                    اكتمالًا أو في الوقت المناسب. أي اعتماد على المواد الموجودة على موقع الويب
                    الخاص بنا يكون على مسؤوليتك الخاصة وتؤكد فهمك لذلك
                  </p>
                  <h3> منتجات وخدمات</h3>{" "}
                  <p>
                    لقد بذلنا قصارى جهدنا لعرض صور وألوان منتجاتنا التي تظهر على موقعنا بأكبر
                    قدر ممكن من الدقة. لا يمكننا ضمان دقة إعداداتك أو عرض شاشة جهاز الكمبيوتر
                    الخاص بك لأي لون نحن نحتفظ بالحق في إيقاف أي منتج أو خدمة في أي وقت. نحن
                    نحتفظ بالحق ، ولكننا لسنا ملزمين ، بالحد من مبيعات منتجاتنا أو خدماتنا لأي
                    شخص أو منطقة جغرافية أو ولاية قضائية. يجوز لنا ممارسة هذا الحق على أساس كل
                    حالة على حدة. تخضع جميع أوصاف المنتجات أو أسعار المنتجات للتغيير في أي وقت
                    دون إشعار ووفقًا لتقديرنا الوحيد والكامل نحن لا نضمن أن جودة أي من المنتجات
                    أو الخدمات أو المعلومات أو المواد الأخرى التي اشتريتها أو حصلت عليها ستفي
                    بتوقعاتك
                  </p>
                  <h3>معلومات المنتج</h3>{" "}
                  <p>
                    تتوفر معظم المنتجات المعروضة على موقعنا في متاجر سيدار المختارة. في بعض
                    الحالات ، قد لاتكون البضائع المعروضة للبيع على موقعنا الإلكتروني متاحة في
                    متاجر سيدار غلوبال
                  </p>
                  <h3> معلومات السعر</h3>{" "}
                  <p>
                    هدفنا هو الحصول على أسعار واضحة ومفهومة لمنتجاتنا. أسعار منتجاتنا متسقة في
                    الكتالوجات والمتاجر وعبر الإنترنت ؛ ومع ذلك ، قد يتم عرض أسعار المنتجات بشكل
                    مختلف في متاجرنا. نستخدم شروط التسعير هذه في كتالوجاتنا وعلى الإنترنت
                    <br />
                    الأسعار المعروضة على موقعنا الإلكتروني معروضة بعملة المنطقة المعنية وهي
                    صالحة وفعالة فقط في تلك البلدان. قد يتم تطبيق رسوم شحن ورسوم أخرى إضافية على
                    الطلبات اعتمادًا على البلد الذي تختاره ، وسيتم إخطارك بهذه الرسوم ومسؤوليتك
                    عن أي جزء منها قبل إنهاء طلبك وشحنه. علاوة على ذلك ، بينما نبذل قصارى جهدنا
                    للتأكد من أن الضرائب المعروضة لطلب معين دقيقة بالنسبة للموقع المطبق الذي يتم
                    شحن الطلب إليه ، في حالة تقديم عرض أسعار خاطئ ، فسوف نخطرك بمثل هذا الخطأ
                    قبل الانتهاء من شحن الطلب الخاص بك. ستكون مسؤولاً عن جميع الضرائب المطبقة ،
                    بغض النظر عن المبلغ المذكور على موقعنا في وقت طلبك نحتفظ بالحق في تصحيح أي
                    أخطاء أو عدم دقة أو سهو وتغيير أو تحديث أسعار المنتج أو توفره أو أي معلومات
                    أخرى في أي وقت دون إشعار مسبق (بما في ذلك بعد تقديمك لطلبك). إذا كنت لا ترغب
                    في مواصلة الشراء بعد تصحيح الأسعار أو غيرها من المعلومات ، فيرجى الاتصال بنا
                    على الفور وسنعمل معك لإلغاء أو إرجاع طلبك وفقًا لسياسة الإرجاع / الاسترداد
                    المنصوص عليها هنا
                    <br /> نحن نسعى جاهدين من أجل الدقة في جميع أوصاف العناصر ، والصور ،
                    والمواصفات التفصيلية ، والأسعار ، والروابط وأي معلومات أخرى متعلقة بالمنتج
                    واردة هنا أو مشار إليها على موقعنا. نظرًا للخطأ البشري ومحددات أخرى ، لا
                    يمكننا ضمان أن جميع أوصاف العناصر والصور ومراجع التوافق والمواصفات
                    التفصيليةالشراء بعد تصحيح الأسعار أو غيرها من المعلومات ، يرجى الاتصال بنا
                    على الفور وسنعمل معك لإلغاء طلبك أو إرجاعه وفقًا لسياسة الإرجاع / الاسترداد
                    المنصوص عليها هنا
                    <br /> نحن نسعى جاهدين من أجل الدقة في جميع أوصاف العناصر ، والصور ،
                    والمواصفات التفصيلية ، والأسعار ، والروابط وأي معلومات أخرى متعلقة بالمنتج
                    واردة هنا أو مشار إليها على موقعنا. نظرًا لخطأ بشري وتحديدات أخرى ، لا
                    يمكننا ضمان أن جميع أوصاف العناصر والصور ومراجع التوافق والمواصفات التفصيلية
                    والتسعير والروابط وأي معلومات أخرى متعلقة بالمنتج مدرجة دقيقة أو كاملة أو
                    حديثة ، ولا يمكننا تحمل المسؤولية عن هذه الأخطاء . في حالة تسمية منتج مدرج
                    على موقعنا بسعر غير صحيح بسبب خطأ مطبعي أو إعلامي أو تقني أو أي خطأ آخر ،
                    يحق لنا وفقًا لتقديرنا المطلق رفض و / أو إلغاء أي طلب للمنتج المذكور
                    والتعديل الفوري ، تصحيح و / أو إزالة المعلومات غير الدقيقة
                  </p>
                  <h3>اخلاء المسؤولية</h3>{" "}
                  <p>
                    {" "}
                    إلى أقصى حد يسمح به القانون المعمول به ، نستبعد جميع الإقرارات والضمانات
                    والشروط المتعلقة بموقعنا على الويب واستخدام هذا الموقع. لا شيء في إخلاء
                    المسؤولية هذا تحديد أو استبعاد مسؤوليتنا أو مسؤوليتك عن الوفاة أو الإصابة
                    الشخصية ؛ تحديد أو استبعاد مسؤوليتنا أو مسؤوليتك عن الاحتيال أو التحريف
                    الاحتيالي ؛
                    <br />
                    تحديد أي من التزاماتنا أو التزاماتك بأي طريقة غير مسموح بها بموجب القانون
                    المعمول به ؛ أو استبعاد أي من التزاماتنا أو التزاماتك التي قد لا يتم
                    استبعادها بموجب القانون المعمول به قيود وحظر المسؤولية المنصوص عليها في هذا
                    القسم وفي أي مكان آخر في إخلاء المسؤولية هذا: (أ) تخضع للفقرة السابقة ؛ و
                    (ب) تحكم جميع الالتزامات الناشئة بموجب إخلاء المسؤولية ، بما في ذلك
                    الالتزامات الناشئة في العقد ، في حالة المسؤولية التقصيرية وخرق الواجب
                    القانوني.
                    <br />
                    نحن لا نضمن أو نتعهد أو نكفل أن استخدامك لموقعنا الإلكتروني سيكون دون انقطاع
                    أو في الوقت المناسب أو آمنًا أو خاليًا من الأخطاء
                    <br />
                    نحن لا نضمن أن النتائج التي يمكن الحصول عليها من استخدام موقعنا ستكون دقيقة
                    أو موثوقة أنت توافق صراحة على أن استخدامك للموقع أو عدم قدرتك على استخدامه
                    يكون على مسؤوليتك وحدك. يتم توفير جميع المنتجات والخدمات المقدمة لك من خلال
                    موقعنا على الويب "كما هي" و "كما هي متوفرة" لاستخدامك ، دون أي تمثيل أو
                    ضمانات أو شروط من أي نوع ، سواء كانت صريحة أو ضمنية ، بما في ذلك جميع
                    الضمانات الضمنية أو شروط القابلية للتسويق ، الجودة التجارية ، والملاءمة لغرض
                    معين ، والمتانة ، والملكية ، وعدم الانتهاك
                    <br />
                    لن نتحمل بأي حال من الأحوال نحن ، مديرينا أو مسؤولينا أو موظفينا أو الشركات
                    التابعة لنا أو الوكلاء أو المقاولين أو المتدربين أو الموردين أو مقدمي
                    الخدمات أو المرخصين المسؤولية عن أي إصابة أو خسارة أو مطالبة أو أي ضرر مباشر
                    أو غير مباشر أو عرضي أو عقابي أو خاص أو الأضرار التبعية من أي نوع ، بما في
                    ذلك ، على سبيل المثال لا الحصر ، الأرباح المفقودة ، أو الإيرادات المفقودة ،
                    أو المدخرات الضائعة ، أو فقدان البيانات ، أو تكاليف الاستبدال ، أو أي أضرار
                    مماثلة ، سواء كانت قائمة على العقد ، أو الضرر (بما في ذلك الإهمال) ، أو
                    المسؤولية الصارمة أو غير ذلك ، الناشئة عن استخدام أي من مواقع الويب الخاصة
                    بنا أو أي منتجات تم شراؤها باستخدام موقعنا ، أو لأي مطالبة أخرى تتعلق بأي
                    شكل من الأشكال باستخدامك للخدمة أو أي منتج ، بما في ذلك ، على سبيل المثال لا
                    الحصر ، أي أخطاء أو سهو في أي محتوى ، أو أي خسارة أو ضرر من أي نوع يحدث
                    نتيجة لاستخدام الخدمة أوأي محتوى (أو منتج) يتم نشره أو نقله أو إتاحته بطريقة
                    أخرى عبر الخدمة ، حتى لو تم إعلامك بإمكانية ذلك
                    <br />
                    بصرف النظر عن أي شيء يتعارض مع هذه الاتفاقية وإلى الحد الذي يسمح به القانون
                    ، فإن مسؤوليتنا الإجمالية تجاهك ، سواء في العقد أو المسؤولية التقصيرية (بما
                    في ذلك الإهمال) أو غير ذلك ، ستقتصر على 1،000 درهم كحد أقصى ، أو المبلغ الذي
                    دفعته بالنسبة للمنتجات ، أيهما أقل
                  </p>
                  <h3>ضمان</h3>{" "}
                  <p>
                    سواء كان الأمر يتعلق بانسكاب قهوة بسيط أو فشل كبير في النظام ، يمكن أن تختلف
                    العواقب بشكل كبير داخل كل منزل وداخل كل صناعة. المفتاح هو التأكد من أن
                    التداعيات المحتملة من أي توقف - بما في ذلك الإنتاجية والربح والسمعة - ضئيلة
                    للغاية
                    <br />
                    نقدم ضمانًا لمدة 12 شهرًا للمصنعين على أخطاء التصنيع. نحتفظ بالحق في استبدال
                    المنتج أو إصلاحه وقد يكون من الضروري إعادة البضائع إلينا لفحصها قبل إرسال
                    منتج بديل
                  </p>
                  <h3> ما هو مغطى؟</h3>{" "}
                  <p>
                    ستتم تغطية جميع منتجات القماش لمدة عام واحد من تاريخ الشراء ضد المشكلات
                    الناشئة عن عيوب التصنيع وأعطاله. هذا الغطاء متاح فقط للمالك الأصلي وغير قابل
                    للتحويل لا ينطبق الغطاء إلا على المنتجات عند شرائها جديدة من متاجرنا أو من
                    خلال موقعنا الإلكتروني
                  </p>
                  <h3> ما الذي لم يتم تغطيته؟</h3>{" "}
                  <p>
                    انتهت فترة الضمان.لأضرار الناجمة عن البلى العام ، والتآكل ضد الأسطح الكاشطة
                    مثل اللحامات الخشنة والملابس غير المخصصة للدورة أو الرفارف السفلية الضرر
                    الناجم عن الأشعة فوق البنفسجية (أشعة الشمس أو الظواهر الطبيعية الأخرى) أو
                    الحريق أو التبييض أو المواد الملونة أو منظفات الدراجات
                    <br />
                    التشققات والحروق والتمزقات والأضرار الناجمة عن الحوادث ، والبلى العادي ،
                    والرعاية غير الملائمة ، وسوء الاستخدام ، أو الانهيار الطبيعي للألوان
                    والتشطيبات والمواد بمرور الوقت التلف الناتج عن الإصلاح غير السليم أو
                    التعديلات أو نقص الصيانة لم يتم تقديم إثبات الشراء
                    <br />
                    لا يغطي هذا الضمان التلف أو التفكك أو الضياع الناتج عن إساءة الاستخدام أو
                    سوء الاستخدام أو التخريب أو الحروق أو الجروح أو الثقوب أو * نقل الصبغة أو
                    التركيب غير السليم أو عدم كفاية التماس المسموح به أو ** غرز غير كافية في
                    البوصة استخدام عوامل أو طرق تنظيف غير مناسبة ، وقلة التنظيف ، وتطبيق عيوب ما
                    بعد المعالجة في تصميم أو تصنيع المقاعد ، وعدم كفاية الحشو ، والتآكل من
                    مكونات الأثاث الأخرى استخدام البولي يوريثين كسلك لحام ، أي استخدام بخلاف
                    المقصود ، أو استخدام لاحق لملكية المشتري الأصل
                  </p>
                  <h3>الوصف والتصوير</h3>{" "}
                  <p>
                    كل المحتوى الذي تشاهده على موقعنا ، بما في ذلك ، على سبيل المثال لا الحصر ،
                    جميع عناوين الصفحات والصور والرسوم التوضيحية والرسومات ومقاطع الصوت ومقاطع
                    الفيديو والنص (المشار إليه هنا باسم "المحتوى") هي ملكية حصرية لشركة سيدار
                    غلوبال و / أو تخضع للعلامة التجارية و / أو علامة الخدمة والمظهر التجاري
                    وحقوق التأليف والنشر و / أو غيرها من الحقوق الفكرية او حقوق الملكية أو
                    التراخيص التي تحتفظ بها أو إحدى الشركات التابعة لها أو من قبل أطراف ثالثة
                    قامت بترخيص أو التنازل عن حقوقها و / أو مصالحها و / أو موادها إلى
                    <br /> باستثناء ما هو مذكور أعلاه ، لا يجوز لك نسخ أو تنزيل أو إعادة إنتاج
                    أو تعديل أو نشر أو توزيع أو نقل أو نقل أو إنشاء أعمال مشتقة من المحتوى دون
                    الحصول أولاً على إذن كتابي صريح منا قد تأتي المنتجات من مجموعات اصباغ مختلفة
                    ، وقد تختلف ألوان العينة أيضًا قليلاً عن لون الستائر التي تتلقاها للتأكد من
                    أن المنتج النهائي يأتي من نفس مجموعة الصبغة ومطابقته للون الذي أخذت منه
                    العينة ، نوصي بطلب المنتجات في غضون 15 يومًا من أخذ العينات. وإذا مر شهر أو
                    أكثر منذ استلامك للعينات ، فمن الجيد إعادة طلبها لمجرد البقاء في الجانب
                    الآمن عندما تكون مستعدًا لتقديم طلبك. إذا طلبت عدة ستائر ، نوصيك بشدة أن
                    تطلبها جميعًا في نفس الوقت للتأكد من أنها تأتي من نفس مجموعة الصبغة وتتطابق
                    مع بعضها البعض
                  </p>
                  <h3>تعديل</h3>{" "}
                  <p>
                    {" "}
                    يجب أن تبدأ طلبات التعديل وإعادة التصنيع في غضون يومين من استلامك لطلبك. بعد
                    تقديم طلب إعادة التصنيع أو التغيير ، يرجى توقّع تسليم و / أو تثبيت المنتج
                    الجديد خلال فترة أسبوعين يحق لكل عميل إعادة التصنيع لعدة مرات مقابل رسوم
                    إضافية العملاء خارج الإمارات العربية المتحدة مسؤولون عن تكاليف إعادة الشحن
                    تخضع التعديلات وإعادة التصنيع لتوافر مخزون المواد / النسيج. إذا لم يعد هناك
                    مواد / قماش في المخزون ، فقد لا نقوم بمعالجة الطلب
                  </p>
                  <h3> أضرار الشحن / البضائع التالفة والمعيبة / تسليم البضائع</h3>{" "}
                  <p>
                    بعد استلام منتجاتك ، نطلب منك فحص أي ضرر والإبلاغ عنه في غضون يومين من
                    التسليم. يرجى عدم محاولة تركيب الستائر التي تعرضت للتلف أثناء التسليم ، حيث
                    سيؤدي ذلك إلى إبطال أي مطالبة بالضمان إذا لم يتم إخطارنا خلال هذه الفترة ،
                    فلن نتحمل المسؤولية عن العنصر التالف أو تكلفة الاستبدال يرجى التقاط صورة
                    للبضائع التالفة مع وصف المناطق المتضررة. وإرسالها إلى
                    <br />
                    <a href="mailto:info@sedarglobal.com"> info@sedarglobal.com</a>
                    <br />
                    في حالة تلف الصندوق بشكل واضح عند الاستلام ، يرجى رفض التسليم وسيتم إرجاع
                    الصندوق إلينا. يرجى إخطارنا على الفور حتى نتمكن من تقديم شكوى إلى شركة النقل
                    بمجرد استلامنا البضائع التالفة ، سنقوم على الفور بإصلاح الستائر أو إعادة
                    تصنيعها بشرط دفع تأمين التسليم في وقت الشراء
                  </p>
                  <h3> طلب إلغاء فترة الإلغاء </h3>{" "}
                  <p>
                    تبدأ فترة الإلغاء عندما نرسل إليك رسالة بالبريد الإلكتروني لتأكيد الإرسال
                    (تشير هذه الرسالة الإلكترونية إلى أن طلبك قد تم قبوله من قبلنا ، وبالتالي ،
                    تم تكوين عقد بيننا) وتنتهي بعد يومين تقويميين من اليوم الذي تم فيه تسلبم
                    المنتج (ات) اليك. إذا طلبت عدة منتجات في طلب واحد وسنقوم بشحن هذه المنتجات
                    في عمليات تسليم منفصلة إليك ،تنتهي فترة الإلغاء في اليوم الثاني بدءًا من
                    اليوم الذي يلي استلامك لآخر المنتجات بهذا الطلب
                  </p>
                  <h3> مشاكل البطاقة المصرفية</h3>{" "}
                  <p>
                    تخضع جميع مدفوعات بطاقات الائتمان / الخصم للتحقق من قبل جهة الإصدار. إذا رفض
                    مُصدر بطاقتك الإذن بالدفع ، فسنلغي طلبك ونتصل بك للحصول على طريقة دفع بديلة.
                    لن نتحمل أي مسؤولية أو التزام بأي شكل من الأشكال إذا أدى ذلك إلى تأخير إرسال
                    البضائع / المنتجات الخاصة بك
                  </p>
                  <h3>توصيل رسوم التوصيل</h3>
                  <p>
                    يمكنك اختيار تسليم أغراضك إلى منزلك. يتم احتساب رسوم التوصيل على إجمالي
                    طلبك. إذا كان طلبك يتكون من مزيج من المنتجات الصغيرة / المتوسطة الحجم ،
                    فستتحمل رسوم "التسليم المعتاد" ولكن إذا قمت بتضمين الطلب منتج كبيرالحجم ،
                    فستكون رسوم التوصيل بسعر أعلى
                  </p>
                  <h3>تقديرات وقت التسليم</h3>{" "}
                  <p>
                    {" "}
                    يرجى الملاحظة بأنه بينما نهدف إلى التسليم ضمن الجداول الزمنية المحددة. فإذا
                    كان عنوان التسليم في موقع بعيد أو كنت قد طلبت بعض المنتجات اكبر حجمًا ، قد
                    يستغرق التسليم وقتًا أطول قليلاً. بالنسبة لبعض االمنتجات ، هناك فترة تسليم
                    أطول تصل إلى 10 أيام
                  </p>
                  <h3> المنتجات التي تتطلب التوقيع </h3>{" "}
                  <p>
                    {" "}
                    قد يكون التوقيع مطلوبًا في بعض الأحيان عند التسليم. من خلال تقديم طلبك ،
                    فإنك تفوضنا بقبول التوقيع من شخص آخر على نفس العنوان نيابة عنك إذا لم تكن
                    موجودًا في وقت التسليم
                  </p>
                  <h3> تعليمات لترك المنتج في مكان بديل</h3>{" "}
                  <p>
                    بالنسبة لبعض المنتحات التي لا تتطلب توقيعًا عند التسليم ، قد تتمكن من إعطاء
                    تعليمات توضح عما إذا كنت ترغب في تركها واين إذا لم يكن هناك أحد في وقت
                    التسليم ، مثلا عند أحد الجيران
                  </p>
                  <h3>المنتجات الكبيرة</h3>{" "}
                  <p>
                    {" "}
                    إذا كان طلبك يتضمن قضبان طويلة ، فمن مسؤوليتك التأكد من امكانية الوصول إلى
                    مكانك قبل تقديم طلبك. ننصحك بعدم حجز مركب الات المطبخ أو مهندس التركيب حتى
                    وصول المنتحات الى المكان المطلوب ، لاننا لن نتحمل المسؤولية عن أي تكاليف
                    مرتبطة بهذا الامر
                  </p>
                  <h3>التسعير</h3>{" "}
                  <p>
                    {" "}
                    أنت توافق على دفع كامل المبلغ المستحق الدفع للمنتج كما هو موضح أثناء عملية
                    الطلب ، بما في ذلك أي تكاليف شحن أو مصاريف يتم تكبدها مع هذا الطلب. يتم عرض
                    جميع الأسعار بعملات المنطقة المعنية ستبذل سيدار غلوبال جهودًا معقولة لتزويدك
                    بأسعار جذابة على موقعها الإلكتروني وكذلك في متاجرها ، ومع ذلك و في بعض
                    الأحيان ، لن يتطابق السعر عبر الإنترنت مع السعر في المتجر
                  </p>
                  <h3>قياسات</h3>{" "}
                  <p>
                    {" "}
                    نحن لسنا مسؤولين عن أي تأخير في شحن منتجاتك المطلوبة والمشتراة ، أو المنتج /
                    المنتجات المفقودة أو الضائعة أو تسليمك غيرالمنتج / المنتجات المطلوبة ، بسبب
                    خطأك أوعدم الدقة في المعلومات غير الكاملة التي قدمتها
                    <br /> لا تقم أبدًا بقياس الستائر أو الستائر القديمة ولاتستخدم تلك القياسات
                    مع الستائر الجديدة. قم دائمًا بقياس كل نافذة على حدة.(حتى لوبدت وكأنها من
                    نفس الحجم ، ثق بنا. ليسوا كذلك
                    <br /> يؤثر اختيارك لنوع التثبيت (الحامل الداخلي أو الخارجي) على كيفية
                    ملائمة المعالجة المختصة في نافذتك أو فوقها. قبل قياس النوافذ ، تحقق من
                    المواصفات المدرجة في كل صفحة منتج لمعرفة الحد الأدنى / الأقصى لمتطلبات العرض
                    والارتفاع والعمق الخاصة بمنتجك للتأكد من أنك تقيس نوع التثبيت المناسب إذا
                    كان لديك أي أسئلة حول قياس النوافذ قبل تقديم طلبك ، فاتصل بفريق خدمة العملاء
                    لدينا. نحن هنا لمساعدتك في الحصول على الملاءمة المثالية لكل نافذة ، في كل
                    مرة
                  </p>
                  <h3> طرق الدفع</h3>{" "}
                  <p>
                    تتوفر طرق الدفع التالية Visa و Visa electron و Mastercard و American
                    Express. يمكن استخدام جميع البطاقات المصرفية المعتمدة في دول مجلس التعاون
                    الخليجي لإجراء المعاملة.
                  </p>
                  <h3> سيناريو رفض البطاقة</h3>{" "}
                  <p>
                    يجب أن تكون التفاصيل التي نطلبها منك مماثلة لتلك الموجودة على بطاقة الائتمان
                    الخاصة بك. قد يتسبب خطأ كتابي بسيط في رفض العملية ، لذا نطلب منك إكماال
                    نموذج الدفع بعناية. ربما تم تجاوز حد الائتمان الخاص بك أو ربما انتهت صلاحية
                    البطاقة يرجى الاتصال بالمصرف الذي تتعامل معه بشأن أي استفسارات قد تكون لديك
                    حول بطاقة ائتمانك
                  </p>
                  <h3>إصدار الفواتير باسم الشركة</h3>{" "}
                  <p>
                    {" "}
                    نعم. في سلة التسوق ، يمكنك تحديد ما إذا تم الشراء لفرد أو شركة في حالة
                    اقتطاع الرسوم مرتين ، يرجى استشارة مكتب خدمة العملاء لدينا أو الاتصال بخدمة
                    العملاء على
                  </p>
                  <h3> قابلية التجزئة</h3>{" "}
                  <p>
                    {" "}
                    إذا كان أي بند من هذه البنود أو يمكن أن يصبح ، بموجب أي قانون معمول به ، أو
                    تم العثور عليه من قبل أي محكمة أو هيئة إدارية ذات اختصاص قضائي ، غير قانوني
                    أو باطل أو غير صالح أو محظور أو غير قابل للتنفيذ ، فإن هذا البند يكون غير
                    فعال وفقا لما تقدم من غير القانونية أو البطلان أو الحظر أو عدم قابلية
                    التنفيذ اما البنود المتبقية فتبقى سارية المفعول وكاملة التأثير
                  </p>
                  <h3> إنهاء الاستخدام</h3>{" "}
                  <p>
                    يجوز لنا ، وفقًا لتقديرنا الخاص ، إنهاء أو تعليق دخولك إلى موقعنا واستخدامه
                    دون إشعار ولأي سبب ، بما في ذلك انتهاك هذه الشروط ، أو أي سلوك آخر نعتقد ،
                    وفقًا لتقديرنا الخاص ، أنه غير قانوني أو ضار الى الاخرين. في حالة الإنهاء ،
                    لن يكون مصرحًا لك بالدخول إلى الموقع وسنستخدم أي وسيلة ممكنة لفرض هذا
                    الإنهاء
                  </p>
                  <h3>لا وكالة</h3>{" "}
                  <p>
                    {" "}
                    لا يوجد في هذه الشروط ما يمكن تفسيره على أنه إنشاء وكالة أو شراكة أو مشروع
                    مشترك أو توظيف بينك وبيننا. أنت توافق وتفهم أنه ليس لديك أي سلطة لإلزامنا
                    بأي شكل من الأشكال وتحت أي ظرف من الظروف
                  </p>
                  <h3>التأخير في ممارسة الحقوق</h3>{" "}
                  <p>
                    لا يجوز تفسير أي إخفاق أو تأخير من جانبنا في ممارسة أي حق أو تعويض متاح لنا
                    بموجب هذه الشروط أو القانون على أنه تنازل عنه ولا يجوز لأي ممارسة فردية أو
                    جزئية لأي حق أو تعويض حسب الحالة. الحقوق وسبل الانتصاف المنصوص عليها في هذه
                    الشروط تراكمية وليست مستثناة من أي حقوق أو تعويضات ينص عليها القانون
                  </p>
                  <h3> تخصيص</h3>{" "}
                  <p>
                    {" "}
                    يجوز لنا التنازل عن أي أو كل حقوقنا وواجباتنا بموجب هذه الشروط إلى أي طرف في
                    أي وقت دون إخطارك.
                  </p>
                  <h3> القانون الواجب التطبيق</h3>{" "}
                  <p>
                    {" "}
                    تخضع هذه الشروط وتُفسر وفقًا لقوانين دولة الإمارات العربية المتحدة وإمارة
                    دبي
                  </p>
                  <h3> أسئلة ومعلومات الاتصال</h3>{" "}
                  <p>
                    إذا كنت ترغب في: الوصول إلى أي معلومات شخصية لدينا عنك أو تصحيحها أو تعديلها
                    أو حذفها ، أو تسجيل طلب ، أو ببساطة تريد مزيدًا من المعلومات ، فاتصل بنا على{" "}
                  </p>
                </div>
              </>
          )
          : ''}
      </div>
    </section>
  )
}



export default TermsAndContitions;
