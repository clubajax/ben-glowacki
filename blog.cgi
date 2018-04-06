#!/usr/bin/perl

############################################################################
##                                                                        ##
##  DESCRIPTION: BLOG Driver (loads from blog/blog_list.txt and blog/*.blog pages)
##               Pass blog_no to load a specific blog (number = order in Excel file, and 0 = list all)
##  Author: Jay  Wegert,  jay@wegert.net
##  Date:   2018-03-14
##
##  Copyright (c) 2018 Jay Wegert (jay@wegert.net)
##  All  rights reserved.
##                                                                        ##
############################################################################

use lib 'cgi-bin';
use CGI qw/:standard/;
require("jerror.cgi");
require("tools.cgi");

MAIN:
{
  my $sBlogScript          = q[blog.cgi];  ## This program
  my $sBlogNo              = param('blog_no') || 0;
  my $sBlogPath            = q[blog];
  my $sBlogIndex           = qq[$sBlogPath/blog_list.txt];
  my $sBlogTemplate        = q[blog_template.html];
  my @sBlogIndex;
  my $sBlogItems;
  my $sBlogIndexContent;
  my $sBlogContent;
  my $COL_FILENAME       = 0;
  my $COL_DATE           = 1;
  my $COL_TITLE          = 2;
  my $COL_DESCRIPTION    = 3;
  my $COL_STATUS         = 4;

  print &PrintHeader;

  ## Load index
  $sBlogIndexContent = qq[<article class="post">\n<h2>Matt's Blogs</h2><hr>\n];   #'
  open (FILE1, "$sBlogIndex") || print "Index file not found\n";
  my $sLoop = 0;
  while (<FILE1>) {
    if ($sLoop) {   ## Skip header line
      my @sBlogInfo = split(/\t/, $_);
      push @sBlogIndex, \@sBlogInfo;  ## Push array references
      if ($sBlogInfo[$COL_STATUS]) {
        $sBlogInfo[$COL_TITLE] = StripQuotes($sBlogInfo[$COL_TITLE]);
        $sBlogInfo[$COL_DESCRIPTION] = StripQuotes($sBlogInfo[$COL_DESCRIPTION]);
        $sBlogIndexContent .= qq{<p><a href="${sBlogScript}?blog_no=$sLoop">"$sBlogInfo[$COL_TITLE]"</a>: $sBlogInfo[$COL_DESCRIPTION]<br><small> - $sBlogInfo[$COL_DATE]</small></p><hr>\n\n};
      }
    }
    $sLoop++;
  }
  close(FILE1);
  $sBlogIndexContent .= qq[</article>\n];   #'
  $sBlogItems = scalar(@sBlogIndex);  ## Find number of items
  $sBlogContent = $sBlogIndexContent;  ## Default to index content

  if (($sBlogNo > 0) && ($sBlogNo <= $sBlogItems)) {
    ## Generate the desired blog page
    my @sBlogInfo = @{$sBlogIndex[$sBlogNo - 1]};
    my $sBlogFilename = $sBlogInfo[$COL_FILENAME];
    if ($sBlogFilename) {
      ## Load index
      open (FILE1, "$sBlogPath/$sBlogFilename") || print "Blog file not found: $sBlogFilename\n";
      $sBlogContent = q[];
      while (<FILE1>) {
        $sBlogContent .= $_;
      }
      close(FILE1);
    }
  }

  ## Now use the blog_template to generate the output
  ##print header;
  open (FILE1, "$sBlogTemplate") || print "Blog template not found: $sBlogTemplate\n";
  my $sDisable = 0;
  while (<FILE1>) {
    my $sFileLine .= $_;
    if ($sFileLine =~ /<!--script insert-->/) {
      print qq[pages = $sBlogItems;curpage = $sBlogNo;script = '${sBlogScript}';];

    }
    if ($sDisable) {
      if ($sFileLine =~ /<!--blog end-->/) {
        $sDisable = 0;
      }
    }
    if ($sFileLine =~ /<!--blog begin-->/) {
      $sDisable = 1;
      print $sFileLine;
      print $sBlogContent;
    } else {
      unless ($sDisable) {
        print $sFileLine;
      }
    }
  }
  close(FILE1);
}
1;
